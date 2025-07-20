import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Ruler, Palette, Wrench, GitCompare, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Buzz Cut Guides - Complete Hair Cutting Guide",
  description: "Complete guide to buzz cuts including guard lengths, styles, maintenance tips and comparisons.",
};

const guideCategories = [
  {
    title: "How to Use Buzz Cut Filter",
    description: "Step-by-step guide to using our AI buzz cut simulator",
    href: "/buzz-cut-guides/how-to-use-buzz-cut-filter",
    icon: HelpCircle,
    color: "text-blue-600"
  },
  {
    title: "Guard Lengths",
    description: "Understanding different clipper guard sizes and their effects",
    href: "/buzz-cut-guides/guard-lengths",
    icon: Ruler,
    color: "text-green-600"
  },
  {
    title: "Buzz Cut Styles",
    description: "Different buzz cut variations and styling options",
    href: "/buzz-cut-guides/styles",
    icon: Scissors,
    color: "text-purple-600"
  },
  {
    title: "Maintenance Tips",
    description: "How to maintain your buzz cut and keep it looking fresh",
    href: "/buzz-cut-guides/maintenance-tips",
    icon: Wrench,
    color: "text-orange-600"
  },
  {
    title: "Buzz Cut vs Crew Cut",
    description: "Compare different short hairstyles to find your perfect look",
    href: "/buzz-cut-guides/buzz-cut-vs-crew-cut",
    icon: GitCompare,
    color: "text-red-600"
  }
];

export default function BuzzCutGuidesPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-12 container px-4 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Buzz Cut Guides
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to know about buzz cuts - from choosing the right length to maintenance and styling tips.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guideCategories.map((category) => (
          <Card key={category.href} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <category.icon className={`w-8 h-8 ${category.color}`} />
                <div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>{category.description}</CardDescription>
              <Button asChild className="w-full">
                <Link href={category.href}>
                  Read Guide
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border rounded-xl p-6 md:p-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Ready to Try a Buzz Cut?</h2>
          <p className="text-muted-foreground">
            Use our AI simulator to see how you'd look before making the cut
          </p>
          <Button asChild size="lg">
            <Link href="/buzz-cut-simulator">
              Try Buzz Cut Simulator
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Why Choose a Buzz Cut?</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Low maintenance and time-saving</li>
            <li>• Cost-effective haircut option</li>
            <li>• Clean, professional appearance</li>
            <li>• Works well in hot weather</li>
            <li>• Highlights facial features</li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Popular Buzz Cut Lengths</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• <strong>Guard #1-3:</strong> Ultra short, military style</li>
            <li>• <strong>Guard #4-6:</strong> Classic buzz cut length</li>
            <li>• <strong>Guard #7-8:</strong> Longer buzz, easier transition</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 