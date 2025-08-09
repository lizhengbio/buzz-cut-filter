"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HowToUse() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Upload Your Photo",
      description:
        'Simply click the "Upload your photo" button and choose a picture that you want to transform. We support jpg, png, webp, and jpeg to upload.',
      image: "/images/upload your photo.jpg",
      alt: "Upload photo interface showing drag and drop area",
    },
    {
      id: 2,
      title: "Choose Color",
      description:
        "Select your preferred hair color from our extensive palette of 31 options. From natural tones like black, brown, and blonde to vibrant colors like blue, purple, and rose gold - find the perfect shade that matches your style and vision.",
      image: "/images/choose color.jpg",
      alt: "Color selection dropdown showing various hair color options",
    },
    {
      id: 3,
      title: "Generate and Download",
      description:
        "Once you choose the color, click the \"Generate\" button. Our AI tool will transform your image, allowing you to see yourself with the perfect buzz cut. If you're satisfied with the result, simply click the download button and enjoy your new AI-generated image.",
      image: "/images/generate and download.jpg",
      alt: "Generated buzz cut result with download options",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto bg-gray-100 rounded-3xl p-6">
      <div className="flex flex-col lg:flex-row items-stretch gap-8">
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
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:w-3/5">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-full min-h-[400px] relative">
            <img
              src={steps.find((step) => step.id === activeStep)?.image}
              alt={steps.find((step) => step.id === activeStep)?.alt || "preview"}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-lg text-sm font-medium">
              Step {activeStep}: {steps.find((step) => step.id === activeStep)?.title}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <Button asChild size="lg" className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-xl">
          <Link href="/buzz-cut-simulator">Upload your picture</Link>
        </Button>
      </div>
    </div>
  );
}


