import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing - Buzz Cut AI Plans & Pricing",
  description: "Choose the perfect plan for your buzz cut preview needs. Free trial available with Pro upgrades.",
};

const plans = [
  {
    name: "Free",
    price: "Free",
    period: "",
    description: "Perfect for trying out our buzz cut simulator",
    features: [
      "Up to 3 generations daily",
      "720P JPG format",
      "Watermarked downloads",
      "Quick experience",
      "Social sharing friendly",
      "24-hour auto deletion"
    ],
    limitations: [
      "Daily usage limits",
      "Basic resolution only",
      "Includes watermark"
    ],
    cta: "Get Started Free",
    ctaHref: "/buzz-cut-simulator",
    popular: false
  },
  {
    name: "Pro",
    price: "$4.99",
    period: "/month",
    description: "For serious users who want the best quality",
    features: [
      "Up to 60 generations monthly",
      "4K high-definition output",
      "Watermark-free downloads",
      "JPG / PNG / WebP formats",
      "Auto-generate comparison GIFs",
      "Custom guard length control",
      "Instant regeneration chance",
      "Private mode",
      "Commercial usage rights",
      "Ad-free experience",
      "Priority processing queue",
      "Early access to 20+ hair filters"
    ],
    limitations: [],
    cta: "Upgrade to Pro",
    ctaHref: "/dashboard",
    popular: true
  }
];

export default function PricingPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-12 container px-4 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Choose Your Plan
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Start with a free trial, upgrade to Pro when you need more features. Flexible pricing plans for everyone's needs.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <p className="text-muted-foreground">{plan.description}</p>
            </CardHeader>
            
            <CardContent className="space-y-6">
                              <div className="space-y-3">
                  <h4 className="font-semibold text-green-600">Included Features</h4>
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

      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border rounded-xl p-6 md:p-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Save More with Annual Subscription</h2>
          <p className="text-muted-foreground">
            Choose annual Pro subscription for only <strong>$49</strong>, save over 15%
          </p>
          <Button asChild size="lg">
            <Link href="/dashboard">
              View Annual Plans
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-6 h-6" />
          </div>
          <h3 className="font-semibold">Risk-Free Trial</h3>
          <p className="text-sm text-muted-foreground">
            Start with free plan, no credit card required, upgrade anytime
          </p>
        </div>
        
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Star className="w-6 h-6" />
          </div>
          <h3 className="font-semibold">Cancel Anytime</h3>
          <p className="text-sm text-muted-foreground">
            Pro subscription can be cancelled anytime, benefits retained until current period ends
          </p>
        </div>
        
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-6 h-6" />
          </div>
          <h3 className="font-semibold">Security Guarantee</h3>
          <p className="text-sm text-muted-foreground">
            All images auto-deleted, face protection technology protects your privacy
          </p>
        </div>
      </div>
    </div>
  );
} 