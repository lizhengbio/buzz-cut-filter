import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import Stats from "@/components/home/stats";
import Pricing from "@/components/home/pricing";
import FAQ from "@/components/home/faq";
import Contact from "@/components/home/contact";

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
      
      {/* Quick Access Section */}
      <section className="bg-gray-50/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How to Use the Buzz Cut Filter Online?</h2>
          </div>
          
          {/* How to Use Steps */}
          <div className="max-w-6xl mx-auto bg-gray-100 rounded-3xl p-6">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Steps List */}
              <div className="flex flex-col space-y-6 lg:w-2/5">
                {/* Step 1 */}
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Your Photo</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Simply click the "Upload your photo" button and choose a picture that you want to transform. We support jpg, png, webp, and jpeg to upload.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-gray-100 p-6 rounded-xl cursor-pointer hover:bg-white hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Select the Buzz Cut Filter</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Here, you can explore different hairstyles and try them out on your photo. Simply select "Buzz Cut" from the filters list to give yourself a buzz cut look.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-gray-100 p-6 rounded-xl cursor-pointer hover:bg-white hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Generate and Download</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Once you choose the filter, click the "Generate" button. Our AI tool will transform your image, allowing you to see yourself with the perfect buzz cut. If you're satisfied with the result, simply click the download button and enjoy your new AI-generated image.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Image */}
              <div className="lg:w-3/5">
                <div className="bg-gray-200 rounded-2xl overflow-hidden aspect-[3/2]">
                  <img 
                    src="/images/male-before.jpg" 
                    alt="Buzz Cut Filter Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="text-center mt-8">
              <Button asChild size="lg" className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-xl">
                <Link href="/buzz-cut-simulator">Upload your picture</Link>
              </Button>
            </div>
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
