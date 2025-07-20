import { ProductTier } from "@/types/subscriptions";

export const SUBSCRIPTION_TIERS: ProductTier[] = [
  {
    name: "Free",
    id: "tier-free",
    productId: "", // Free tier doesn't have a product ID
    priceMonthly: "$0",
    description: "Perfect for trying out our buzz cut simulator",
    features: [
      "3 generations per day",
      "720p JPG format with watermark",
      "Face-Lock Lite technology",
      "Basic color options",
      "24-hour image auto-deletion",
      "Community support"
    ],
    featured: false,
    discountCode: "",
  },
  {
    name: "Pro",
    id: "tier-pro",
    productId: "prod_36Wgp4JJF3b1i29KggQXiC", // $4.99 monthly subscription
    priceMonthly: "$4.99",
    description: "For serious users who want the best quality",
    features: [
      "Unlimited generations",
      "4K JPG/PNG/WebP formats",
      "Watermark-free downloads",
      "Ad-free experience",
      "Commercial usage rights",
      "2x faster processing queue",
      "All color adjustment options",
      "Priority support"
    ],
    featured: true,
    discountCode: "",
  },
  {
    name: "Studio",
    id: "tier-studio",
    productId: "prod_3qPYksZMtk94wQsdkgajrJ", // $9.99 monthly subscription
    priceMonthly: "$9.99",
    description: "For businesses and content creators",
    features: [
      "Everything in Pro",
      "API access included",
      "500 generations per month",
      "Batch processing",
      "GDPR compliance contract",
      "Service Level Agreement (SLA)",
      "Commercial licensing",
      "Dedicated account manager"
    ],
    featured: false,
    discountCode: "",
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
