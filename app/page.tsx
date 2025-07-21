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
    <div className="flex flex-col">
      <Hero /> 
      <StunningQuality />
      
      {/* Quick Access Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Quick Start</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Choose the best way to experience AI buzz cut preview
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link) => (
              <Card key={link.href} className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white">
                <Link href={link.href}>
                  <CardHeader className="text-center p-6">
                    <div className={`w-12 h-12 ${link.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <link.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-gray-800">{link.title}</CardTitle>
                    <CardDescription className="text-gray-600">{link.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-6">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" variant="default">
                      Get Started
                    </Button>
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
