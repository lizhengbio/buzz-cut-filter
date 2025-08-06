-- Add monthly credits tracking to customers table
ALTER TABLE public.customers 
ADD COLUMN last_monthly_credit_grant_date date,
ADD COLUMN monthly_credits_granted integer DEFAULT 0;

-- Add indexes for efficient queries
CREATE INDEX customers_last_monthly_credit_grant_date_idx ON public.customers(last_monthly_credit_grant_date);
CREATE INDEX customers_monthly_credits_granted_idx ON public.customers(monthly_credits_granted);

-- Update existing subscriptions to set their initial monthly credit grant date
-- This ensures existing subscribers get their monthly credits on the next billing cycle
UPDATE public.customers 
SET last_monthly_credit_grant_date = CURRENT_DATE - INTERVAL '1 month'
WHERE EXISTS (
    SELECT 1 FROM public.subscriptions 
    WHERE subscriptions.customer_id = customers.id 
    AND subscriptions.status IN ('active', 'trialing')
);