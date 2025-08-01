import { BuzzCutSimulator } from "@/components/product/buzz-cut-simulator";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Buzz Cut Simulator - Try Virtual Buzz Cut AI",
  description: "Experience your buzz cut look before cutting with our advanced AI technology. Upload your photo and see instant results with multiple hair colors.",
  keywords: ["buzz cut simulator", "virtual haircut", "AI hair preview", "buzz cut filter", "haircut simulator"],
};

export default function BuzzCutSimulatorPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-12 container px-4 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          AI Buzz Cut Filter Online for Free
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          See how you'd look with a buzz cut before making the commitment. Our AI technology provides realistic previews with face protection technology.
        </p>
      </div>
      
      <Suspense fallback={<div className="flex justify-center py-8">Loading...</div>}>
        <BuzzCutSimulator />
      </Suspense>
      
      <div className="bg-muted/50 rounded-xl p-6 md:p-8 space-y-4">
        <h2 className="text-xl font-semibold">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
            <h3 className="font-medium">Upload Photo</h3>
            <p className="text-muted-foreground">Upload a clear front-facing photo for best results</p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
            <h3 className="font-medium">Choose Color</h3>
            <p className="text-muted-foreground">Select your preferred hair color option</p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
            <h3 className="font-medium">Get Results</h3>
            <p className="text-muted-foreground">Download your high-quality buzz cut preview</p>
          </div>
        </div>
      </div>
    </div>
  );
} 