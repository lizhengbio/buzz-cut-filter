"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { SUBSCRIPTION_TIERS } from "@/config/subscriptions";
import { createCheckoutSession } from "@/app/actions";
import { useUser } from "@/hooks/use-user";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function Pricing() {
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const [isYearly, setIsYearly] = useState(false);

  const handleSubscribe = async (productId: string, discountCode?: string) => {
    if (!user || !user.email) {
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe to a plan",
        variant: "destructive",
      });
      router.push("/sign-in");
      return;
    }

    try {
      const checkoutUrl = await createCheckoutSession(
        productId,
        user.email,
        user.id,
        "subscription",
        0,
        discountCode
      );

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast({
        title: "Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="pricing" className="bg-white py-20 md:py-24">
      <div className="container px-4 sm:px-6 lg:px-8 space-y-20 max-w-6xl">
        {/* Subscription Plans */}
        <div>
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-6 text-center">
            <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl leading-tight text-gray-900">
              Subscription Plans
            </h2>
            <p className="max-w-[95%] sm:max-w-[85%] text-lg leading-relaxed text-gray-600">
              Start with free trial and upgrade as needed. High-fidelity Face-Lock buzz cut previews 
              with commercial licensing options for all user types.
            </p>
            
            {/* Monthly/Yearly Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-sm font-medium ${!isYearly ? 'text-primary' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isYearly ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isYearly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${isYearly ? 'text-primary' : 'text-gray-500'}`}>
                Yearly
              </span>
              {isYearly && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Save 40%
                </span>
              )}
            </div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mt-16">
            {SUBSCRIPTION_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative flex flex-col rounded-2xl border bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 ${
                  tier.featured
                    ? "border-primary/30 shadow-primary/5 ring-1 ring-primary/10"
                    : "border-gray-200"
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm">
                    Most Popular
                  </div>
                )}
                <div className="space-y-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{tier.name}</h3>
                  <div className="flex flex-col items-start">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-bold text-gray-900">
                        {isYearly && tier.priceYearly ? tier.priceYearly : tier.priceMonthly}
                      </span>
                      {tier.priceMonthly !== "$0" && (
                        <span className="text-lg font-normal text-gray-500">
                          /month
                        </span>
                      )}
                    </div>
                    {tier.name !== "Free" && isYearly && (
                      <div className="text-sm text-green-600 font-medium mt-1">
                        Yearly billing - Save 40%
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {tier.description}
                  </p>
                </div>
                <div className="mt-8">
                  <ul className="space-y-4 text-sm">
                    {tier?.features?.map((feature: string) => (
                      <li key={feature} className="flex items-start">
                        <Check className="mr-3 h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-4">
                  {tier.id === "tier-free" ? (
                    <Button
                      className="w-full h-12 text-base font-medium"
                      variant="outline"
                      onClick={() => router.push("/buzz-cut-simulator")}
                    >
                      Start Free Trial
                    </Button>
                  ) : (
                    <Button
                      className="w-full h-12 text-base font-medium"
                      variant={tier.featured ? "default" : "outline"}
                      onClick={() =>
                        handleSubscribe(tier.productId, tier.discountCode)
                      }
                    >
                      Upgrade to {tier.name}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
