"use client";

import { useState } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Star, Crown, Zap } from "lucide-react";

// Since this is a client component, we'll add metadata via a separate export
// The metadata will be handled by a separate metadata.ts file in this directory

const plans = [
  {
    name: "Free",
    priceMonthly: "Free",
    priceYearly: "Free",
    period: "",
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
    limitations: [
      "Daily usage limits",
      "Basic resolution with watermark",
      "Limited color options"
    ],
    cta: "Start Free Trial",
    ctaHref: "/buzz-cut-simulator",
    popular: false,
    icon: Zap
  },
  {
    name: "Pro Plan",
    priceMonthly: "$6",
    priceYearly: "$3.6",
    period: "/month",
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
    limitations: [],
    cta: "Upgrade to Pro",
    ctaHref: "/dashboard",
    popular: true,
    icon: Star
  },
  {
    name: "Ultra Plan",
    priceMonthly: "$10",
    priceYearly: "$6",
    period: "/month",
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
    limitations: [],
    cta: "Upgrade to Ultra",
    ctaHref: "/dashboard",
    popular: false,
    icon: Crown
  }
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="flex flex-col gap-8 md:gap-12 container px-4 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Choose Your Plan
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Start with a free trial and experience our Face-Lock technology. Upgrade to Pro for unlimited high-quality generations or choose Ultra for maximum credits.
        </p>
      </div>

      {/* Subscription Plans */}
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Subscription Plans</h2>
          <p className="text-muted-foreground">Choose between monthly and yearly billing</p>
          
          {/* Monthly/Yearly Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isYearly ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
              Yearly
            </span>
            {isYearly && (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                Save 40%
              </span>
            )}
          </div>
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
                    <span className="text-4xl font-bold">
                      {isYearly ? plan.priceYearly : plan.priceMonthly}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  {plan.name !== "Free" && isYearly && (
                    <div className="text-sm text-green-600 font-medium">
                      Yearly billing - Save 40%
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
                Pro and Ultra users can use generated images for business purposes, social media, marketing, and content creation
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
              Pro and Ultra users can use generated images for business purposes, social media, marketing, and content creation
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