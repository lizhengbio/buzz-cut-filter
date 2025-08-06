import { createServiceRoleClient } from "./service-role";
import { CreemCustomer, CreemSubscription } from "@/types/creem";

export async function createOrUpdateCustomer(
  creemCustomer: CreemCustomer,
  userId: string
) {
  const supabase = createServiceRoleClient();

  // First check if customer exists by user_id (primary lookup)
  const { data: existingCustomerByUserId, error: userIdFetchError } = await supabase
    .from("customers")
    .select()
    .eq("user_id", userId)
    .single();

  if (userIdFetchError && userIdFetchError.code !== "PGRST116") {
    throw userIdFetchError;
  }

  if (existingCustomerByUserId) {
    // Update existing customer with Creem data, but preserve the original creem_customer_id if it was already a free account
    const { error } = await supabase
      .from("customers")
      .update({
        email: creemCustomer.email,
        name: creemCustomer.name,
        country: creemCustomer.country,
        // Only update creem_customer_id if it's currently a free account pattern
        ...(existingCustomerByUserId.creem_customer_id.startsWith('free_') ? 
          { creem_customer_id: creemCustomer.id } : {}),
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingCustomerByUserId.id);

    if (error) throw error;
    return existingCustomerByUserId.id;
  }

  // Check if customer exists by creem_customer_id (secondary lookup)
  const { data: existingCustomer, error: fetchError } = await supabase
    .from("customers")
    .select()
    .eq("creem_customer_id", creemCustomer.id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    throw fetchError;
  }

  if (existingCustomer) {
    const { error } = await supabase
      .from("customers")
      .update({
        user_id: userId, // Update user_id in case it was missing
        email: creemCustomer.email,
        name: creemCustomer.name,
        country: creemCustomer.country,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingCustomer.id);

    if (error) throw error;
    return existingCustomer.id;
  }

  // Create new customer
  const { data: newCustomer, error } = await supabase
    .from("customers")
    .insert({
      user_id: userId,
      creem_customer_id: creemCustomer.id,
      email: creemCustomer.email,
      name: creemCustomer.name,
      country: creemCustomer.country,
      credits: 0, // Start with 0 credits for paid customers
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('❌ Error creating customer in webhook:', error);
    throw error;
  }
  
  console.log(`✅ Created new customer from webhook: ${creemCustomer.email} (${creemCustomer.id})`);
  return newCustomer.id;
}

export async function createOrUpdateSubscription(
  creemSubscription: CreemSubscription,
  customerId: string
) {
  const supabase = createServiceRoleClient();

  const { data: existingSubscription, error: fetchError } = await supabase
    .from("subscriptions")
    .select()
    .eq("creem_subscription_id", creemSubscription.id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    throw fetchError;
  }

  const subscriptionData = {
    customer_id: customerId,
    creem_product_id:
      typeof creemSubscription?.product === "string"
        ? creemSubscription?.product
        : creemSubscription?.product?.id,
    status: creemSubscription?.status,
    current_period_start: creemSubscription?.current_period_start_date,
    current_period_end: creemSubscription?.current_period_end_date,
    canceled_at: creemSubscription?.canceled_at,
    metadata: creemSubscription?.metadata,
    updated_at: new Date().toISOString(),
  };

  if (existingSubscription) {
    const { error } = await supabase
      .from("subscriptions")
      .update(subscriptionData)
      .eq("id", existingSubscription.id);

    if (error) throw error;
    return existingSubscription.id;
  }

  const { data: newSubscription, error } = await supabase
    .from("subscriptions")
    .insert({
      ...subscriptionData,
      creem_subscription_id: creemSubscription.id,
    })
    .select()
    .single();

  if (error) throw error;
  return newSubscription.id;
}

export async function getUserSubscription(userId: string) {
  const supabase = createServiceRoleClient();

  const { data, error } = await supabase
    .from("subscriptions")
    .select(
      `
      *,
      customer:customers(user_id)
    `
    )
    .eq("customer.user_id", userId)
    .eq("status", "active")
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data;
}

export async function addCreditsToCustomer(
  customerId: string,
  credits: number,
  creemOrderId?: string,
  description?: string
) {
  const supabase = createServiceRoleClient();
  // Start a transaction
  const { data: client } = await supabase
    .from("customers")
    .select("credits")
    .eq("id", customerId)
    .single();
  if (!client) throw new Error("Customer not found");
  console.log("🚀 ~ 1client:", client);
  console.log("🚀 ~ 1credits:", credits);
  const newCredits = (client.credits || 0) + credits;

  // Update customer credits
  const { error: updateError } = await supabase
    .from("customers")
    .update({ credits: newCredits, updated_at: new Date().toISOString() })
    .eq("id", customerId);

  if (updateError) throw updateError;

  // Record the transaction in credits_history
  const { error: historyError } = await supabase
    .from("credits_history")
    .insert({
      customer_id: customerId,
      amount: credits,
      type: "add",
      description: description || "Credits purchase",
      creem_order_id: creemOrderId,
    });

  if (historyError) throw historyError;

  return newCredits;
}

export async function useCredits(
  customerId: string,
  credits: number,
  description: string
) {
  const supabase = createServiceRoleClient();

  // Start a transaction
  const { data: client } = await supabase
    .from("customers")
    .select("credits")
    .eq("id", customerId)
    .single();
  if (!client) throw new Error("Customer not found");
  if ((client.credits || 0) < credits) throw new Error("Insufficient credits");

  const newCredits = client.credits - credits;

  // Update customer credits
  const { error: updateError } = await supabase
    .from("customers")
    .update({ credits: newCredits, updated_at: new Date().toISOString() })
    .eq("id", customerId);

  if (updateError) throw updateError;

  // Record the transaction in credits_history
  const { error: historyError } = await supabase
    .from("credits_history")
    .insert({
      customer_id: customerId,
      amount: credits,
      type: "subtract",
      description,
    });

  if (historyError) throw historyError;

  return newCredits;
}

export async function getCustomerCredits(customerId: string) {
  const supabase = createServiceRoleClient();

  const { data, error } = await supabase
    .from("customers")
    .select("credits")
    .eq("id", customerId)
    .single();

  if (error) throw error;
  return data?.credits || 0;
}

export async function getCreditsHistory(customerId: string) {
  const supabase = createServiceRoleClient();

  const { data, error } = await supabase
    .from("credits_history")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
