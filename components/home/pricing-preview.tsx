import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SUBSCRIPTION_TIERS } from "@/config/subscriptions";

export default function PricingPreview() {
  return (
    <section id="pricing" className="bg-white py-16 md:py-20">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-6 text-center">
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl leading-tight text-gray-900">
            Pricing Overview
          </h2>
          <p className="max-w-[95%] sm:max-w-[85%] text-lg leading-relaxed text-gray-600">
            Start with a free trial, upgrade anytime. Visit full pricing for checkout and discounts.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          {SUBSCRIPTION_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col rounded-2xl border bg-white p-8 shadow-sm ${
                tier.featured ? "border-primary/30 ring-1 ring-primary/10" : "border-gray-200"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm">
                  Most Popular
                </div>
              )}
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{tier.name}</h3>
                <p className="text-gray-600 leading-relaxed">{tier.description}</p>
              </div>
              <div className="mt-8 pt-4">
                {tier.id === "tier-free" ? (
                  <Button asChild className="w-full h-12 text-base font-medium" variant="outline">
                    <Link href="/buzz-cut-simulator">Start Free Trial</Link>
                  </Button>
                ) : (
                  <Button asChild className="w-full h-12 text-base font-medium" variant={tier.featured ? "default" : "outline"}>
                    <Link href="/pricing">View Full Pricing</Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


