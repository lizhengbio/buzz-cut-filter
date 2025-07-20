import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download, Share2, RefreshCw, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Buzz Cut Results - Your AI Hair Preview",
  description: "View and download your buzz cut preview results. Share your new look with friends and family.",
};

export default function ResultsPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-12 container px-4 py-8">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/buzz-cut-simulator">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Simulator
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold">Your Buzz Cut Results</h1>
          <p className="text-muted-foreground">View, download, or share your AI-generated buzz cut preview</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border rounded-xl p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Results Loading...</h2>
        <p className="text-muted-foreground mb-6">
          This page will display your generated buzz cut results when accessed through the simulator workflow.
        </p>
        <Button asChild>
          <Link href="/buzz-cut-simulator/upload-photo">
            Start New Simulation
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-4 p-6 border rounded-xl">
          <Download className="w-8 h-8 text-primary" />
          <h3 className="font-semibold">Download Options</h3>
          <p className="text-sm text-muted-foreground">
            Save your results in multiple formats and resolutions
          </p>
          <ul className="text-sm space-y-1">
            <li>• JPG (720p with watermark - Free)</li>
            <li>• PNG (4K no watermark - Pro)</li>
            <li>• WebP (optimized for web - Pro)</li>
          </ul>
        </div>

        <div className="space-y-4 p-6 border rounded-xl">
          <Share2 className="w-8 h-8 text-primary" />
          <h3 className="font-semibold">Share Your Look</h3>
          <p className="text-sm text-muted-foreground">
            Share your buzz cut preview on social media
          </p>
          <ul className="text-sm space-y-1">
            <li>• Direct social media sharing</li>
            <li>• Copy shareable link</li>
            <li>• Generate comparison image</li>
          </ul>
        </div>

        <div className="space-y-4 p-6 border rounded-xl">
          <RefreshCw className="w-8 h-8 text-primary" />
          <h3 className="font-semibold">Try Again</h3>
          <p className="text-sm text-muted-foreground">
            Generate new variations with different settings
          </p>
          <ul className="text-sm space-y-1">
            <li>• Different hair colors</li>
            <li>• Adjust buzz cut length</li>
            <li>• Enhanced quality (Pro)</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 