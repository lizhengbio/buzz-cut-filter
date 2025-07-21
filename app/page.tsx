import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import Stats from "@/components/home/stats";
import Pricing from "@/components/home/pricing";
import FAQ from "@/components/home/faq";
import Contact from "@/components/home/contact";
import StunningQuality from "@/components/home/logocloud";
import Testimonials from "@/components/home/testimonials";
import { BuzzCutSimulator } from "@/components/product/buzz-cut-simulator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, BookOpen, Palette, ArrowRight } from "lucide-react";

const quickLinks = [
  {
    title: "Buzz Cut Simulator",
    description: "Experience AI buzz cut preview instantly",
    href: "/buzz-cut-simulator",
    icon: Palette,
  },
  {
    title: "Live Camera",
    description: "Real-time preview with your camera",
    href: "/buzz-cut-simulator/live-camera",
    icon: Camera,
  },
  {
    title: "Photo Upload",
    description: "Upload photos for best results",
    href: "/buzz-cut-simulator/upload-photo",
    icon: Upload,
  },
  {
    title: "User Guides",
    description: "Learn how to use our platform",
    href: "/buzz-cut-guides",
    icon: BookOpen,
  }
];

export default async function Home() {
  return (
    <div className="flex flex-col">
      <Hero /> 
      <StunningQuality />
      
      {/* Quick Access Section */}
      <section className="bg-gray-50/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Quick Start</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Choose the best way to experience AI buzz cut preview
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {quickLinks.map((link) => (
              <Card key={link.href} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white hover:bg-white/80 relative overflow-hidden">
                <Link href={link.href}>
                  <CardHeader className="text-center p-8">
                    <div className="w-14 h-14 bg-gray-100 group-hover:bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors">
                      <link.icon className="w-7 h-7 text-gray-600 group-hover:text-primary transition-colors" />
                    </div>
                    <CardTitle className="text-lg text-gray-900 group-hover:text-gray-900">{link.title}</CardTitle>
                    <CardDescription className="text-gray-600 text-sm leading-relaxed">{link.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-8 px-8">
                    <div className="flex items-center justify-center text-sm text-gray-500 group-hover:text-primary transition-colors">
                      <span className="mr-2">Get Started</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <Features />
      <Stats />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
    </div>
  );
}
