import { BuzzCutSimulator } from "@/components/product/buzz-cut-simulator";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Upload Photo Buzz Cut Simulator - AI Hair Preview",
  description: "Upload your photo to see how you'd look with a buzz cut. Advanced AI technology with face protection.",
};

export default function UploadPhotoPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-12 container px-4 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Upload Photo Simulator
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload your photo for the most accurate buzz cut preview. Get high-quality results with multiple color options.
        </p>
        
        <div className="flex justify-center">
          <Button asChild variant="outline">
            <Link href="/buzz-cut-simulator/live-camera">
              <Camera className="w-4 h-4 mr-2" />
              Try Live Camera Instead
            </Link>
          </Button>
        </div>
      </div>

      <BuzzCutSimulator />

      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border rounded-xl p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-4">Photo Tips for Best Results</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="space-y-2">
            <h3 className="font-medium">Photo Quality</h3>
            <p className="text-muted-foreground">Use a clear, high-resolution photo (recommended: 1024px or higher)</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Face Position</h3>
            <p className="text-muted-foreground">Face the camera directly with your head centered in the frame</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Lighting</h3>
            <p className="text-muted-foreground">Ensure good, even lighting without harsh shadows on your face</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Background</h3>
            <p className="text-muted-foreground">Simple, uncluttered background works best for accurate results</p>
          </div>
        </div>
      </div>
    </div>
  );
} 