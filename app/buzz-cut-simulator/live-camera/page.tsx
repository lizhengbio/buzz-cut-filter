import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";

export const metadata: Metadata = {
  title: "Live Camera Buzz Cut Simulator - Real-time Preview",
  description: "Use your device camera for real-time buzz cut preview with our AI technology.",
};

export default function LiveCameraPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-12 container px-4 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Live Camera Preview
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get instant buzz cut previews using your device camera. Perfect for quick trials and social sharing.
        </p>
      </div>

      <div className="bg-muted/50 rounded-xl p-8 text-center space-y-6">
        <Camera className="w-16 h-16 mx-auto text-muted-foreground" />
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Coming Soon</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Real-time camera preview feature is currently in development. 
            Try our photo upload simulator for the best experience.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/buzz-cut-simulator/upload-photo">
              <Upload className="w-4 h-4 mr-2" />
              Try Photo Upload
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/buzz-cut-simulator">
              Back to Simulator
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">What to Expect</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Real-time hair segmentation</li>
            <li>• Instant buzz cut overlay</li>
            <li>• Multiple hair color options</li>
            <li>• Face protection technology</li>
            <li>• Social sharing capabilities</li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">System Requirements</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Modern web browser with camera access</li>
            <li>• Good lighting conditions</li>
            <li>• Stable internet connection</li>
            <li>• Front-facing camera</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 