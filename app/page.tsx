import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import Stats from "@/components/home/stats";
import Pricing from "@/components/home/pricing";
import FAQ from "@/components/home/faq";
import Contact from "@/components/home/contact";
import LogoCloud from "@/components/home/logocloud";
import { BuzzCutSimulator } from "@/components/product/buzz-cut-simulator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, BookOpen, Palette } from "lucide-react";

const quickLinks = [
  {
    title: "Buzz Cut Simulator",
    description: "Experience AI buzz cut preview instantly",
    href: "/buzz-cut-simulator",
    icon: Palette,
    color: "bg-blue-500"
  },
  {
    title: "Live Camera",
    description: "Real-time preview with your camera",
    href: "/buzz-cut-simulator/live-camera",
    icon: Camera,
    color: "bg-green-500"
  },
  {
    title: "Photo Upload",
    description: "Upload photos for best results",
    href: "/buzz-cut-simulator/upload-photo",
    icon: Upload,
    color: "bg-purple-500"
  },
  {
    title: "User Guides",
    description: "Learn how to use our platform",
    href: "/buzz-cut-guides",
    icon: BookOpen,
    color: "bg-orange-500"
  }
];

export default async function Home() {
  return (
    <div className="flex flex-col gap-8 md:gap-12 lg:gap-24">
      <Hero /> 
      <LogoCloud />
      
      {/* Quick Access Section */}
      <section className="container px-4">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Quick Start</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the best way to experience AI buzz cut preview
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link) => (
            <Card key={link.href} className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href={link.href}>
                <CardHeader className="text-center">
                  <div className={`w-12 h-12 ${link.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <link.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{link.title}</CardTitle>
                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </section>
      

      <Features />
      <Stats />
      <Pricing />
      <FAQ />
      <Contact />
    </div>
  );
}
