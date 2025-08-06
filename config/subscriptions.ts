import { ProductTier } from "@/types/subscriptions";

export const SUBSCRIPTION_TIERS: ProductTier[] = [
  {
    name: "Free",
    id: "tier-free",
    productId: "", // Free tier doesn't have a product ID
    priceMonthly: "$0",
    priceYearly: "$0",
    description: "Perfect for trying out our Face-Lock buzz cut simulator",
    features: [
      "10 credits per day",
      "Watermarked images",
      "Basic color options (No change, Black, Brown, Gold, Gray)",
      "Ad-supported experience",
      "Buzz cut filter only",
      "24-hour image auto-deletion",
      "Community support"
    ],
    featured: false,
    discountCode: "",
    monthlyCredits: 0, // Free users get daily credits, not monthly
  },
  {
    name: "Pro Plan",
    id: "tier-pro",
    productId: "prod_36Wgp4JJF3b1i29KggQXiC", // $6 monthly subscription
    priceMonthly: "$6",
    priceYearly: "$3.6",
    description: "For users who want premium quality and features",
    features: [
      "300 credits per month (60 generations)",
      "No watermarks",
      "Ad-free experience",
      "Commercial usage rights",
      "2x faster processing queue",
      "All color adjustment options",
      "Complete privacy protection",
      "50+ AI hairstyle filters access",
      "Priority support"
    ],
    featured: true,
    discountCode: "",
    monthlyCredits: 300, // Pro plan gets 300 credits per month
  },
  {
    name: "Ultra Plan",
    id: "tier-ultra",
    productId: "prod_3qPYksZMtk94wQsdkgajrJ", // $10 monthly subscription
    priceMonthly: "$10",
    priceYearly: "$6",
    description: "For power users and content creators",
    features: [
      "1,500 credits per month (300 generations)",
      "No watermarks",
      "Ad-free experience",
      "Commercial usage rights",
      "2x faster processing queue",
      "All color adjustment options",
      "Complete privacy protection",
      "50+ AI hairstyle filters access",
      "Priority support"
    ],
    featured: false,
    discountCode: "",
    monthlyCredits: 1500, // Ultra plan gets 1500 credits per month
  },
];

export const CREDITS_TIERS: ProductTier[] = [
  {
    name: "Starter Pack",
    id: "tier-5-credits",
    productId: "prod_MqcjVo0Bpx0rbYmHVlrh2", // $1.99 one-time purchase
    priceMonthly: "$1.99",
    description: "5 credits for occasional use",
    creditAmount: 5,
    features: [
      "5 buzz cut generations",
      "4K quality output",
      "Watermark-free downloads",
      "No expiration date",
      "All color options"
    ],
    featured: false,
    discountCode: "",
  },
  {
    name: "Value Pack",
    id: "tier-25-credits",
    productId: "prod_4ICkTovEC6o9QY6UuL3aI0", // $5.99 one-time purchase
    priceMonthly: "$5.99",
    description: "25 credits for regular users",
    creditAmount: 25,
    features: [
      "25 buzz cut generations",
      "4K quality output",
      "Watermark-free downloads",
      "Priority processing",
      "No expiration date",
      "All color options"
    ],
    featured: true,
    discountCode: "",
  },
  {
    name: "Creator Pack",
    id: "tier-100-credits",
    productId: "prod_3b3oyQtIJA3eaMIHLNjyCc", // $14.99 one-time purchase
    priceMonthly: "$14.99",
    description: "100 credits for content creators",
    creditAmount: 100,
    features: [
      "100 buzz cut generations",
      "4K quality output",
      "Watermark-free downloads",
      "Priority processing",
      "Commercial usage rights",
      "No expiration date",
      "All color options"
    ],
    featured: false,
    discountCode: "",
  },
];
