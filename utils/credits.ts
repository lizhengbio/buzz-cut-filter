import { createClient } from "@/utils/supabase/client";
import { createServiceRoleClient } from "@/utils/supabase/service-role";

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

    // Create new customer with 10 initial credits
    const { data: newCustomer, error } = await supabase
      .from('customers')
      .insert({
        user_id: userId,
        creem_customer_id: `free_${userId}`, // Placeholder for free users
        email: email.toLowerCase(),
        name: name || '',
        credits: 10, // Start with 10 credits for new users
        last_credit_grant_date: new Date().toISOString().split('T')[0]
      })
      .select('id')
      .single();

    if (error) {
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

    console.log(`✅ Created new customer with 10 initial credits: ${email}`);
    return newCustomer.id;
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