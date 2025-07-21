"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { CREDITS_TIERS, SUBSCRIPTION_TIERS } from "@/config/subscriptions";
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

  const handleBuyCredits = async (
    productId: string,
    creditsAmount: number,
    discountCode?: string
  ) => {
    if (!user || !user.email) {
      toast({
        title: "Authentication required",
        description: "Please sign in to buy credits",
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
        "credits",
        creditsAmount,
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
    <section id="pricing" className="bg-white py-8 md:py-12 lg:py-24">
      <div className="container px-4 sm:px-6 lg:px-8 space-y-16 max-w-6xl">
        {/* Subscription Plans */}
        <div>
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-6xl leading-[1.1]">
              Subscription Plans
            </h2>
            <p className="max-w-[95%] sm:max-w-[85%] text-sm sm:text-lg leading-normal text-muted-foreground">
              Start with free trial and upgrade as needed. High-fidelity Face-Lock buzz cut previews 
              with commercial licensing options for all user types.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mt-8 md:mt-12">
            {SUBSCRIPTION_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative flex flex-col rounded-2xl border bg-background p-4 sm:p-6 shadow-lg ${
                  tier.featured
                    ? "border-primary shadow-primary/10"
                    : "border-border"
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold">{tier.name}</h3>
                  <div className="text-3xl sm:text-4xl font-bold">
                    {tier.priceMonthly}
                    {tier.priceMonthly !== "$0" && tier.priceMonthly !== "Custom" && (
                      <span className="text-base font-normal text-muted-foreground">
                        /month
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                </div>
                <div className="mt-6">
                  <ul className="space-y-3 text-sm">
                    {tier?.features?.map((feature: string) => (
                      <li key={feature} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  {tier.id === "tier-free" ? (
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => router.push("/buzz-cut-simulator")}
                    >
                      Get Started Free
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
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

        {/* Credits Packages */}
        <div>
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-6xl leading-[1.1]">
              Credit Packages
            </h2>
            <p className="max-w-[95%] sm:max-w-[85%] text-sm sm:text-lg leading-normal text-muted-foreground">
              Purchase credits on-demand for flexible buzz cut preview generation.
              Perfect for occasional users or those wanting premium quality without subscription.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mt-8 md:mt-12">
            {CREDITS_TIERS.map((tier) => (
              <div
                key={tier.id}
                className="relative flex flex-col rounded-2xl border bg-background p-4 sm:p-6 shadow-lg border-border"
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white">
                    Best Value
                  </div>
                )}
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold">{tier.name}</h3>
                  <div className="text-3xl sm:text-4xl font-bold">
                    {tier.priceMonthly}
                    <span className="text-base font-normal text-muted-foreground">
                      {` (${tier.creditAmount} credits)`}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                </div>
                <div className="mt-6">
                  <ul className="space-y-3 text-sm">
                    {tier?.features?.map((feature: string) => (
                      <li key={feature} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <Button
                    className="w-full"
                    variant={tier.featured ? "default" : "outline"}
                    onClick={() =>
                      handleBuyCredits(
                        tier.productId,
                        tier.creditAmount || 0,
                        tier.discountCode
                      )
                    }
                  >
                    Buy Credits
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Annual Savings Banner */}
        <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border rounded-xl p-6 md:p-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold">Save with Annual Plans</h3>
            <p className="text-muted-foreground">
              Pro Annual: <strong>$49/year</strong> (save $10) • Studio Annual: <strong>$99/year</strong> (save $20)
            </p>
            <Button asChild size="lg">
              <a href="/pricing">
                View All Plans
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
