"use client";

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
                  <div className="text-4xl sm:text-5xl font-bold text-gray-900">
                    {tier.priceMonthly}
                    {tier.priceMonthly !== "$0" && tier.priceMonthly !== "Custom" && (
                      <span className="text-lg font-normal text-gray-500">
                        /month
                      </span>
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
                        <Check className="mr-3 h-5 w-5 text-success flex-shrink-0 mt-0.5" />
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
                      Get Started Free
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
