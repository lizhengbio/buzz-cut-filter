import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { verifyCreemWebhookSignature } from "@/utils/creem/verify-signature";
import { CreemWebhookEvent } from "@/types/creem";
import {
  createOrUpdateCustomer,
  createOrUpdateSubscription,
  addCreditsToCustomer,
} from "@/utils/supabase/subscriptions";
import { grantMonthlyCredits } from "@/utils/credits";

const CREEM_WEBHOOK_SECRET = process.env.CREEM_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  try {
    const body = await request.text();

    const headersList = headers();
    const signature = (await headersList).get("creem-signature") || "";

    console.log('🔔 Received Creem webhook:', {
      hasSignature: !!signature,
      bodyLength: body.length,
      timestamp: new Date().toISOString()
    });

    // 记录到内存日志
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/webhook-logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'webhook_received',
          data: { hasSignature: !!signature, bodyLength: body.length }
        })
      });
    } catch (logError) {
      console.error('Failed to log webhook event:', logError);
    }

    // Verify the webhook signature
    if (
      !signature ||
      !verifyCreemWebhookSignature(body, signature, CREEM_WEBHOOK_SECRET)
    ) {
      console.error('❌ Webhook signature verification failed');
      return new NextResponse("Invalid signature", { status: 401 });
    }

    const event = JSON.parse(body) as CreemWebhookEvent;
    
    console.log('📝 Processing webhook event:', {
      eventType: event.eventType,
      objectId: event.object?.id,
      customerId: event.object?.customer?.id || event.object?.customer,
      metadata: event.object?.metadata
    });

    // 记录事件详情到内存日志
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/webhook-logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'event_processed',
          data: {
            eventType: event.eventType,
            objectId: event.object?.id,
            customerId: event.object?.customer?.id || event.object?.customer,
            metadata: event.object?.metadata
          }
        })
      });
    } catch (logError) {
      console.error('Failed to log event details:', logError);
    }

    // Handle different event types
    switch (event.eventType) {
      case "checkout.completed":
        await handleCheckoutCompleted(event);
        break;
      case "subscription.active":
        await handleSubscriptionActive(event);
        break;
      case "subscription.paid":
        await handleSubscriptionPaid(event);
        break;
      case "subscription.canceled":
        await handleSubscriptionCanceled(event);
        break;
      case "subscription.expired":
        await handleSubscriptionExpired(event);
        break;
      case "subscription.trialing":
        await handleSubscriptionTrialing(event);
        break;
      default:
        console.log(
          `❓ Unhandled event type: ${event.eventType}`,
          JSON.stringify(event, null, 2)
        );
    }

    console.log('✅ Webhook processed successfully:', event.eventType);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Error processing webhook:", error);
    return new NextResponse("Webhook error", { status: 400 });
  }
}

async function handleCheckoutCompleted(event: CreemWebhookEvent) {
  const checkout = event.object;
  console.log("🛒 Processing completed checkout:", {
    checkout_id: checkout.id,
    customer_email: checkout.customer?.email,
    product_type: checkout.metadata?.product_type,
    user_id: checkout.metadata?.user_id,
    has_subscription: !!checkout.subscription
  });

  try {
    // Create or update customer
    const customerId = await createOrUpdateCustomer(
      checkout.customer,
      checkout.metadata?.user_id // Make sure to pass user_id in metadata when creating checkout
    );

    // Check if this is a credit purchase
    if (checkout.metadata?.product_type === "credits") {
      await addCreditsToCustomer(
        customerId,
        checkout.metadata?.credits,
        checkout.order.id,
        `Purchased ${checkout.metadata?.credits} credits`
      );
    }
    // If subscription exists, create or update it
    else if (checkout.subscription) {
      await createOrUpdateSubscription(checkout.subscription, customerId);
      
      // ✅ 注意：不在checkout.completed中授予月度积分
      // 月度积分将在subscription.active事件中授予，避免重复
      console.log(`📋 Subscription created for checkout completion: ${checkout.customer?.email} - Credits will be granted in subscription.active event`);
    }
  } catch (error) {
    console.error("Error handling checkout completed:", error);
    throw error;
  }
}

async function handleSubscriptionActive(event: CreemWebhookEvent) {
  const subscription = event.object;
  console.log("🔔 Processing active subscription:", {
    subscription_id: subscription.id,
    customer_email: subscription.customer?.email,
    user_id: subscription.metadata?.user_id,
    product_id: subscription.product,
    status: subscription.status
  });

  try {
    // Create or update customer
    const customerId = await createOrUpdateCustomer(
      subscription.customer as any,
      subscription.metadata?.user_id
    );

    // Create or update subscription
    await createOrUpdateSubscription(subscription, customerId);

    // Grant monthly credits for active subscription
    if (subscription.metadata?.user_id && subscription.customer?.email) {
      try {
        await grantMonthlyCredits(
          subscription.metadata.user_id,
          subscription.customer.email
        );
        console.log(`✅ Monthly credits granted for subscription activation: ${subscription.customer.email}`);
      } catch (creditError) {
        console.error("⚠️ Failed to grant monthly credits on activation:", creditError);
        // Don't fail the webhook for credit errors
      }
    }
  } catch (error) {
    console.error("Error handling subscription active:", error);
    throw error;
  }
}

async function handleSubscriptionPaid(event: CreemWebhookEvent) {
  const subscription = event.object;
  console.log("💰 Processing paid subscription:", {
    subscription_id: subscription.id,
    customer_email: subscription.customer?.email,
    user_id: subscription.metadata?.user_id,
    product_id: subscription.product,
    status: subscription.status,
    period_start: subscription.current_period_start_date,
    period_end: subscription.current_period_end_date
  });

  try {
    // Update subscription status and period
    const customerId = await createOrUpdateCustomer(
      subscription.customer as any,
      subscription.metadata?.user_id
    );
    await createOrUpdateSubscription(subscription, customerId);

    // ✅ 注意：不在subscription.paid中授予月度积分
    // 月度积分已在subscription.active事件中授予，避免重复
    console.log(`💰 Subscription payment processed: ${subscription.customer?.email} - Credits already granted in subscription.active event`);
  } catch (error) {
    console.error("Error handling subscription paid:", error);
    throw error;
  }
}

async function handleSubscriptionCanceled(event: CreemWebhookEvent) {
  const subscription = event.object;
  console.log("Processing canceled subscription:", subscription);

  try {
    // Update subscription status
    const customerId = await createOrUpdateCustomer(
      subscription.customer as any,
      subscription.metadata?.user_id
    );
    await createOrUpdateSubscription(subscription, customerId);
  } catch (error) {
    console.error("Error handling subscription canceled:", error);
    throw error;
  }
}

async function handleSubscriptionExpired(event: CreemWebhookEvent) {
  const subscription = event.object;
  console.log("Processing expired subscription:", subscription);

  try {
    // Update subscription status
    const customerId = await createOrUpdateCustomer(
      subscription.customer as any,
      subscription.metadata?.user_id
    );
    await createOrUpdateSubscription(subscription, customerId);
  } catch (error) {
    console.error("Error handling subscription expired:", error);
    throw error;
  }
}

async function handleSubscriptionTrialing(event: CreemWebhookEvent) {
  const subscription = event.object;
  console.log("Processing trialing subscription:", subscription);

  try {
    // Update subscription status
    const customerId = await createOrUpdateCustomer(
      subscription.customer as any,
      subscription.metadata?.user_id
    );
    await createOrUpdateSubscription(subscription, customerId);
  } catch (error) {
    console.error("Error handling subscription trialing:", error);
    throw error;
  }
}
