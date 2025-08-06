-- Add last_credit_grant_date column to customers table
ALTER TABLE public.customers 
ADD COLUMN last_credit_grant_date date;

-- Create an index on this column for efficient queries
CREATE INDEX customers_last_credit_grant_date_idx ON public.customers(last_credit_grant_date);