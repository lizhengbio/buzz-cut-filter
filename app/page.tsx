"use client";

import { useState } from "react";
import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import Stats from "@/components/home/stats";
import Testimonials from "@/components/home/testimonials";
import Pricing from "@/components/home/pricing";
import FAQ from "@/components/home/faq";
import Contact from "@/components/home/contact";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// How to Use Interactive Component
function HowToUseSection() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Upload Your Photo",
      description: "Simply click the \"Upload your photo\" button and choose a picture that you want to transform. We support jpg, png, webp, and jpeg to upload.",
      image: "/images/upload your photo.jpg",
      alt: "Upload photo interface showing drag and drop area"
    },
    {
      id: 2,
      title: "Choose Color",
      description: "Select your preferred hair color from our extensive palette of 31 options. From natural tones like black, brown, and blonde to vibrant colors like blue, purple, and rose gold - find the perfect shade that matches your style and vision.",
      image: "/images/choose color.jpg",
      alt: "Color selection dropdown showing various hair color options"
    },
    {
      id: 3,
      title: "Generate and Download",
      description: "Once you choose the color, click the \"Generate\" button. Our AI tool will transform your image, allowing you to see yourself with the perfect buzz cut. If you're satisfied with the result, simply click the download button and enjoy your new AI-generated image.",
      image: "/images/generate and download.jpg",
      alt: "Generated buzz cut result with download options"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto bg-gray-100 rounded-3xl p-6">
      <div className="flex flex-col lg:flex-row items-stretch gap-8">
        {/* Steps List */}
        <div className="flex flex-col space-y-4 lg:w-2/5">
          {steps.map((step) => (
            <div
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                activeStep === step.id
                  ? "bg-white shadow-lg border-2 border-teal-200"
                  : "bg-gray-50 hover:bg-white hover:shadow-md"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                    activeStep === step.id
                      ? "bg-teal-500 text-white"
                      : "bg-teal-100 text-teal-600"
                  }`}
                >
                  {step.id}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Preview Image */}
        <div className="lg:w-3/5">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-full min-h-[400px] relative">
            <img
              src={steps.find(step => step.id === activeStep)?.image}
              alt={steps.find(step => step.id === activeStep)?.alt}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            {/* Step indicator overlay */}
            <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-lg text-sm font-medium">
              Step {activeStep}: {steps.find(step => step.id === activeStep)?.title}
            </div>
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
  );
}

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />

      {/* Quick Access Section (now "How to Use") */}
      <section className="bg-gray-50/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How to Use the Buzz Cut Filter Online?</h2>
          </div>

          {/* Interactive How to Use Steps */}
          <HowToUseSection />
        </div>
      </section>

      {/* Try on Buzz Cut Filter in a Snap Section (replicated from aiease.ai) */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
            {/* Left Column - Image */}
            <div className="lg:w-1/2">
              <img
                src="/images/female-before.jpg"
                alt="turn female short hair portrait into buzz cut"
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
            {/* Right Column - Content */}
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Try on Buzz Cut Filter in a Snap
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Have you ever wondered what you'd look like with a{' '}
                <span className="text-yellow-500 font-medium">buzzcut</span>{' '}
                but were too nervous to take the plunge? Now, you can easily try this bold look without committing to the clippers! Our{' '}
                <span className="text-yellow-500 font-medium">free buzz cut filter</span>{' '}
                lets you effortlessly preview a buzzcut style directly on your photos. In just a snap, you can see yourself with a clean, sharp buzzcut and decide if it's the right look for you.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
              >
                <Link href="/buzz-cut-simulator">Try Buzz Cut</Link>
              </Button>
            </div>
          </div>
        </div>
              </section>

        {/* Effortlessly Give Yourself a Buzzcut Look Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
              {/* Left Column - Content */}
              <div className="lg:w-1/2 space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  Effortlessly Give Yourself a Buzzcut Look
                </h2>
                
                <p className="text-gray-600 text-lg leading-relaxed">
                  Changing your hairstyle has always been challenging. With the{' '}
                  <span className="text-red-500 font-medium">buzz cut filter</span>
                  , you can skip the hassle and cost of a salon visit and transform your look in seconds. Whether you're curious about how you'd look with a fresh buzz or want to experiment with different styles, this filter makes it simple. No need to pick up the clippers—use this online tool, and within moments, you'll see yourself rocking a buzzcut.
                </p>

                <Button 
                  asChild 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                >
                  <Link href="/buzz-cut-simulator">Try Buzz Cut</Link>
                </Button>
              </div>

              {/* Right Column - Image */}
              <div className="lg:w-1/2">
                <img 
                  src="/images/male-after.png" 
                  alt="generate buzz cut looks of both man and woman" 
                  className="w-full rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Create Scroll-Stopping Posts Section (replicated from aiease.ai) */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
            {/* Left Column - Image */}
            <div className="lg:w-1/2">
              <img
                src="/images/male-before.jpg"
                alt="post buzz cut portrait on instagram"
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
            {/* Right Column - Content */}
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Create Scroll-Stopping Posts with Buzz Cut
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                A bold new look is sure to make your posts stand out. The{' '}
                <span className="text-yellow-500 font-medium">buzzcut filter</span>{' '}
                gives your photos a powerful, edgy vibe, perfect for capturing attention in a scroll-heavy world. Share your{' '}
                <span className="text-yellow-500 font-medium">buzzcut</span>{' '}
                look to surprise your followers, or use it as a fun style experiment to mix up your feed. With this filter, you can create eye-catching content that will have everyone stopping and double-tapping to get a closer look at your fresh new look.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
              >
                <Link href="/buzz-cut-simulator">Try Buzz Cut</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trick Friends With Realistic Buzzcut Portraits Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
            {/* Left Column - Content */}
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Trick Friends With Realistic Buzzcut Portraits
              </h2>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                Want to surprise your friends? The{' '}
                <span className="text-red-500 font-medium">buzz cut filter</span>{' '}
                creates a highly realistic look, allowing you to prank friends with a portrait they'll believe is real. Imagine their reactions when they see your new "haircut" in their feed or message box. It's a fun, risk-free way to try a dramatic look that's bound to get people talking and sharing your post.
              </p>

              <Button 
                asChild 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
              >
                <Link href="/buzz-cut-simulator">Try Buzz Cut</Link>
              </Button>
            </div>

            {/* Right Column - Image */}
            <div className="lg:w-1/2">
              <img 
                src="/images/sample1.png" 
                alt="send buzz cut portrait in whatsapp messaging box and share with friends" 
                className="w-full rounded-2xl shadow-lg"
              />
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
