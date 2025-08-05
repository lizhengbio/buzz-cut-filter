import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Star, Crown, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing - BuzzCut AI Plans & Pricing",
  description: "Choose the perfect plan for your buzz cut preview needs. Free trial available with Pro upgrades and flexible credit packages.",
};

const plans = [
  {
    name: "Free",
    price: "Free",
    period: "",
    description: "Perfect for trying out our Face-Lock buzz cut simulator",
    features: [
      "3 generations per day",
      "720p JPG format with watermark",
      "Face-Lock Lite technology",
      "Basic color options (black, brown)",
      "24-hour image auto-deletion",
      "Community support"
    ],
    limitations: [
      "Daily usage limits",
      "Basic resolution with watermark",
      "Limited color options"
    ],
    cta: "Get Started Free",
    ctaHref: "/buzz-cut-simulator",
    popular: false,
    icon: Zap
  },
  {
    name: "Pro",
    price: "$4.99",
    period: "/month",
    yearlyPrice: "$49",
    description: "For serious users who want the best quality and features",
    features: [
      "Unlimited generations",
      "4K JPG/PNG/WebP formats",
      "Watermark-free downloads",
      "Ad-free experience",
      "Commercial usage rights",
      "2x faster processing queue",
      "All color adjustment options",
      "Face-Lock Pro technology",
      "Priority support"
    ],
    limitations: [],
    cta: "Upgrade to Pro",
    ctaHref: "/dashboard",
    popular: true,
    icon: Star
  },
  {
    name: "Studio",
    price: "$9.99",
    period: "/month",
    yearlyPrice: "$99",
    description: "For businesses, content creators, and API integration",
    features: [
      "Everything in Pro",
      "API access included",
      "500 generations per month",
      "Batch processing capabilities",
      "GDPR compliance contract",
      "Service Level Agreement (SLA)",
      "Commercial licensing",
      "Dedicated account manager",
      "Custom integration support"
    ],
    limitations: [],
    cta: "Upgrade to Studio",
    ctaHref: "/dashboard",
    popular: false,
    icon: Crown
  }
];



export default function PricingPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-12 container px-4 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Choose Your Plan
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Start with a free trial and experience our Face-Lock technology. Upgrade to Pro for unlimited high-quality generations or choose Studio for business needs and API access.
        </p>
      </div>

      {/* Subscription Plans */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Subscription Plans</h2>
          <p className="text-muted-foreground">Monthly and annual billing options available</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                  <plan.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  {plan.yearlyPrice && (
                    <div className="text-sm text-green-600 font-medium">
                      or {plan.yearlyPrice}/year (save {plan.name === "Pro" ? "$10" : "$20"})
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-600">Features Included</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {plan.limitations.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-muted-foreground">Limitations</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <X className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <Button asChild className="w-full" size="lg" variant={plan.popular ? "default" : "outline"}>
                  <Link href={plan.ctaHref}>
                    {plan.cta}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>



      {/* Features Comparison */}
      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border rounded-xl p-6 md:p-8 space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Why Choose BuzzCut AI?</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">Face-Lock Technology</h3>
              <p className="text-sm text-muted-foreground">
                Our proprietary Face-Lock ensures 90%+ facial similarity, preventing unwanted face swapping
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                Images auto-delete after 24 hours, with optional manual deletion for complete privacy control
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto">
                <Crown className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">Commercial Rights</h3>
              <p className="text-sm text-muted-foreground">
                Pro and Studio users can use generated images for business purposes, social media, marketing, and content creation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="space-y-3">
            <h3 className="font-semibold">Can I cancel my subscription anytime?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, you can cancel your subscription anytime. Your Pro benefits will continue until the end of your current billing period.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold">Can I upgrade or downgrade my plan?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, you can upgrade or downgrade your subscription anytime. Changes will take effect at the start of your next billing cycle.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold">What's included in commercial rights?</h3>
            <p className="text-sm text-muted-foreground">
              Pro and Studio users can use generated images for business purposes, social media, marketing, and content creation
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold">How does Face-Lock technology work?</h3>
            <p className="text-sm text-muted-foreground">
              Our Face-Lock uses IP-Adapter FaceID to ensure generated images maintain 90%+ facial similarity to your original photo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 