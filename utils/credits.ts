import { createClient } from "@/utils/supabase/client";
import { createServiceRoleClient } from "@/utils/supabase/service-role";
import { SUBSCRIPTION_TIERS } from "@/config/subscriptions";

export interface CustomerCredits {
  credits: number;
  lastCreditDate: string | null;
  isSubscribed: boolean;
}

export interface CreditTransaction {
  amount: number;
  type: 'add' | 'subtract';
  description: string;
  metadata?: Record<string, any>;
}

// Client-side functions (for reading data)
export async function getUserCredits(userId: string): Promise<CustomerCredits | null> {
  const supabase = createClient();
  
  try {
    // Get customer data with credits and id
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('id, credits, updated_at')
      .eq('user_id', userId)
      .single();

    if (customerError && customerError.code !== 'PGRST116') {
      throw customerError;
    }

    // Check if user has active subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('customer_id', customer?.id)
      .in('status', ['active', 'trialing'])
      .single();

    const isSubscribed = !!subscription;

    return {
      credits: customer?.credits || 0,
      lastCreditDate: customer?.updated_at || null,
      isSubscribed,
    };
  } catch (error) {
    console.error('Error fetching user credits:', error);
    return null;
  }
}

// Server-side functions (using service role)
export async function ensureCustomerExists(userId: string, email: string, name?: string): Promise<string> {
  const supabase = createServiceRoleClient();
  
  try {
    // Check if customer exists
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (existingCustomer) {
      return existingCustomer.id;
    }

    // Generate a unique creem_customer_id by checking for conflicts
    let creemCustomerId = `free_${userId}`;
    let suffix = 1;
    
    while (true) {
      try {
        // Create new customer with 10 initial credits
        const { data: newCustomer, error } = await supabase
          .from('customers')
          .insert({
            user_id: userId,
            creem_customer_id: creemCustomerId,
            email: email.toLowerCase(),
            name: name || '',
            credits: 10, // Start with 10 credits for new users
            last_credit_grant_date: new Date().toISOString().split('T')[0]
          })
          .select('id')
          .single();

        if (error) {
          // If it's a unique constraint violation on creem_customer_id, try with suffix
          if (error.code === '23505' && error.message.includes('creem_customer_id')) {
            creemCustomerId = `free_${userId}_${suffix}`;
            suffix++;
            continue; // Try again with new ID
          }
          console.error('❌ Error creating customer:', error);
          throw error;
        }

        // Record initial credit grant
        await supabase
          .from('credits_history')
          .insert({
            customer_id: newCustomer.id,
            amount: 10,
            type: 'add',
            description: 'Welcome bonus - Daily free credits',
            metadata: {
              granted_date: new Date().toISOString().split('T')[0],
              welcome_bonus: true,
              user_email: email
            }
          });

        console.log(`✅ Created new customer with 10 initial credits: ${email} (${creemCustomerId})`);
        return newCustomer.id;
      } catch (insertError: any) {
        // If we still get a constraint error, try with a different ID
        if (insertError.code === '23505' && insertError.message.includes('creem_customer_id')) {
          creemCustomerId = `free_${userId}_${suffix}`;
          suffix++;
          if (suffix > 10) {
            throw new Error('Unable to generate unique customer ID after 10 attempts');
          }
          continue;
        }
        throw insertError;
      }
    }
  } catch (error) {
    console.error('❌ Error ensuring customer exists:', error);
    throw error;
  }
}

export async function grantDailyCredits(userId: string, email: string, name?: string): Promise<boolean> {
  const supabase = createServiceRoleClient();
  
  try {
    // Ensure customer exists (will give 10 credits if new user)
    const customerId = await ensureCustomerExists(userId, email, name);
    
    // Get current customer data
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('credits, last_credit_grant_date')
      .eq('id', customerId)
      .single();

    if (customerError) {
      throw customerError;
    }

    // Check if user has active subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('customer_id', customerId)
      .in('status', ['active', 'trialing'])
      .single();

    // Only grant daily credits to free users
    if (subscription) {
      console.log('ℹ️ User has active subscription, no daily credits needed');
      return false;
    }

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Check if credits were already granted today
    if (customer.last_credit_grant_date === today) {
      console.log('ℹ️ Daily credits already granted for today');
      return false;
    }

    // Grant daily credits (reset to 10)
    const { error: updateError } = await supabase
      .from('customers')
      .update({ 
        credits: 10,
        last_credit_grant_date: today
      })
      .eq('id', customerId);

    if (updateError) {
      throw updateError;
    }

    // Record the credit transaction
    const { error: historyError } = await supabase
      .from('credits_history')
      .insert({
        customer_id: customerId,
        amount: 10,
        type: 'add',
        description: 'Daily free credits',
        metadata: {
          granted_date: today,
          reset_previous: true,
          user_email: email,
          previous_credits: customer.credits
        }
      });

    if (historyError) {
      console.error('⚠️ Failed to record credit history:', historyError);
      // Don't throw error, credits were still granted
    }

    console.log(`✅ Granted 10 daily credits to user ${email} (previous: ${customer.credits})`);
    return true;
  } catch (error) {
    console.error('❌ Error granting daily credits:', error);
    throw error;
  }
}

export async function deductCredits(userId: string, amount: number, description: string, metadata?: Record<string, any>): Promise<boolean> {
  const supabase = createServiceRoleClient();
  
  try {
    // Get customer
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('id, credits')
      .eq('user_id', userId)
      .single();

    if (customerError || !customer) {
      throw new Error('Customer not found');
    }

    // Check if user has enough credits
    if (customer.credits < amount) {
      return false; // Insufficient credits
    }

    // Deduct credits
    const newCreditAmount = customer.credits - amount;
    const { error: updateError } = await supabase
      .from('customers')
      .update({ credits: newCreditAmount })
      .eq('id', customer.id);

    if (updateError) {
      throw updateError;
    }

    // Record the transaction
    const { error: historyError } = await supabase
      .from('credits_history')
      .insert({
        customer_id: customer.id,
        amount: amount,
        type: 'subtract',
        description: description,
        metadata: metadata || {}
      });

    if (historyError) {
      throw historyError;
    }

    console.log(`Deducted ${amount} credits from user ${userId}, remaining: ${newCreditAmount}`);
    return true;
  } catch (error) {
    console.error('Error deducting credits:', error);
    throw error;
  }
}

// Check if user has sufficient credits for a generation (5 credits)
export async function canGenerate(userId: string): Promise<{ canGenerate: boolean; credits: number; isSubscribed: boolean }> {
  const supabase = createClient();
  
  try {
    // Get customer data
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('id, credits')
      .eq('user_id', userId)
      .single();

    if (customerError && customerError.code !== 'PGRST116') {
      throw customerError;
    }

    // Check subscription status
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('customer_id', customer?.id)
      .in('status', ['active', 'trialing'])
      .single();

    const isSubscribed = !!subscription;
    const credits = customer?.credits || 0;
    
    // Subscribers can always generate (unlimited)
    // Free users need at least 5 credits
    const canGenerate = isSubscribed || credits >= 5;

    return { canGenerate, credits, isSubscribed };
  } catch (error) {
    console.error('Error checking generation eligibility:', error);
    return { canGenerate: false, credits: 0, isSubscribed: false };
  }
}

/**
 * Grant monthly credits to subscribed users
 * This function should be called monthly (e.g., via cron job or webhook)
 */
export async function grantMonthlyCredits(userId: string, email: string): Promise<boolean> {
  const supabase = createServiceRoleClient();
  
  try {
    // Get customer and subscription info
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select(`
        id, 
        credits, 
        last_monthly_credit_grant_date,
        subscriptions (
          creem_product_id,
          status,
          current_period_start,
          current_period_end
        )
      `)
      .eq('user_id', userId)
      .single();

    if (customerError) {
      throw customerError;
    }

    // Check if user has active subscription
    const subscription = customer.subscriptions?.[0];
    if (!subscription || !['active', 'trialing'].includes(subscription.status)) {
      console.log('ℹ️ User has no active subscription, no monthly credits to grant');
      return false;
    }

    // Find the subscription tier config based on product ID
    const subscriptionTier = SUBSCRIPTION_TIERS.find(tier => tier.productId === subscription.creem_product_id);
    if (!subscriptionTier || !subscriptionTier.monthlyCredits) {
      console.log('ℹ️ No monthly credits configured for this subscription tier');
      return false;
    }

    // Check if credits were already granted this month
    const currentPeriodStart = new Date(subscription.current_period_start);
    const lastGrantDate = customer.last_monthly_credit_grant_date ? new Date(customer.last_monthly_credit_grant_date) : null;
    
    if (lastGrantDate && lastGrantDate >= currentPeriodStart) {
      console.log('ℹ️ Monthly credits already granted for this billing period');
      return false;
    }

    // Grant monthly credits (add to existing balance)
    const newCreditAmount = customer.credits + subscriptionTier.monthlyCredits;
    const today = new Date().toISOString().split('T')[0];
    
    const { error: updateError } = await supabase
      .from('customers')
      .update({ 
        credits: newCreditAmount,
        last_monthly_credit_grant_date: today,
        monthly_credits_granted: subscriptionTier.monthlyCredits
      })
      .eq('id', customer.id);

    if (updateError) {
      throw updateError;
    }

    // Record the credit transaction
    const { error: historyError } = await supabase
      .from('credits_history')
      .insert({
        customer_id: customer.id,
        amount: subscriptionTier.monthlyCredits,
        type: 'add',
        description: `Monthly credits - ${subscriptionTier.name}`,
        metadata: {
          granted_date: today,
          billing_period_start: subscription.current_period_start,
          billing_period_end: subscription.current_period_end,
          subscription_tier: subscriptionTier.name,
          product_id: subscription.creem_product_id,
          user_email: email,
          previous_credits: customer.credits
        }
      });

    if (historyError) {
      console.error('⚠️ Failed to record monthly credit history:', historyError);
      // Don't throw error, credits were still granted
    }

    console.log(`✅ Granted ${subscriptionTier.monthlyCredits} monthly credits to ${subscriptionTier.name} subscriber ${email} (previous: ${customer.credits}, new: ${newCreditAmount})`);
    return true;
  } catch (error) {
    console.error('❌ Error granting monthly credits:', error);
    throw error;
  }
}

/**
 * Grant monthly credits to all active subscribers
 * This function should be called by a scheduled job (e.g., daily cron)
 */
export async function grantMonthlyCreditsToAllSubscribers(): Promise<{ processed: number; granted: number; errors: number }> {
  const supabase = createServiceRoleClient();
  
  try {
    // Get all customers with active subscriptions
    const { data: customers, error } = await supabase
      .from('customers')
      .select(`
        user_id,
        email,
        credits,
        last_monthly_credit_grant_date,
        subscriptions!inner (
          creem_product_id,
          status,
          current_period_start,
          current_period_end
        )
      `)
      .in('subscriptions.status', ['active', 'trialing']);

    if (error) {
      throw error;
    }

    let processed = 0;
    let granted = 0;
    let errors = 0;

    for (const customer of customers || []) {
      processed++;
      try {
        const wasGranted = await grantMonthlyCredits(customer.user_id, customer.email);
        if (wasGranted) {
          granted++;
        }
      } catch (error) {
        console.error(`❌ Failed to grant monthly credits to ${customer.email}:`, error);
        errors++;
      }
    }

    console.log(`📊 Monthly credit grant summary: ${processed} processed, ${granted} granted, ${errors} errors`);
    return { processed, granted, errors };
  } catch (error) {
    console.error('❌ Error in bulk monthly credit grant:', error);
    throw error;
  }
}