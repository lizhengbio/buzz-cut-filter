import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Palette, Download, Shield, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Use Buzz Cut Filter - Step by Step Guide",
  description: "Learn how to use our AI buzz cut simulator with this comprehensive step-by-step guide.",
};

const steps = [
  {
    step: 1,
    title: "Upload Your Photo",
    description: "Choose a clear, front-facing photo for best results",
    icon: Upload,
    details: [
      "Use a high-resolution photo (1024px or higher recommended)",
      "Face the camera directly with your head centered",
      "Ensure good lighting without harsh shadows",
      "Choose a simple, uncluttered background"
    ]
  },
  {
    step: 2,
    title: "Select Hair Color",
    description: "Choose from available color options",
    icon: Palette,
    details: [
      "Black - Natural dark hair color",
      "Brown - Medium to dark brown shades",
      "Blonde - Light to medium blonde tones",
      "Gray - Silver and gray color options"
    ]
  },
  {
    step: 3,
    title: "Generate Preview",
    description: "Our AI processes your image with face protection",
    icon: Shield,
    details: [
      "AI analyzes and segments hair regions only",
      "Face protection technology preserves your identity",
      "Processing typically takes 1-3 minutes",
      "Real-time status updates during generation"
    ]
  },
  {
    step: 4,
    title: "Download & Share",
    description: "Save your results or share on social media",
    icon: Download,
    details: [
      "Free: 720p JPG with watermark",
      "Pro: 4K PNG/WebP without watermark",
      "Direct social media sharing options",
      "Compare side-by-side with original"
    ]
  }
];

export default function HowToUsePage() {
  return (
    <div className="flex flex-col gap-8 md:gap-12 container px-4 py-8">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/buzz-cut-guides">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Guides
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold">How to Use Buzz Cut Filter</h1>
          <p className="text-muted-foreground">Complete step-by-step guide to using our AI buzz cut simulator</p>
        </div>
      </div>

      <div className="space-y-8">
        {steps.map((stepData) => (
          <Card key={stepData.step} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold">
                  {stepData.step}
                </div>
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-3">
                    <stepData.icon className="w-6 h-6" />
                    {stepData.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {stepData.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                {stepData.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{detail}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border rounded-xl p-6 md:p-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Ready to Get Started?</h2>
          <p className="text-muted-foreground">
            Try our buzz cut simulator now and see how you'd look with a fresh new style
          </p>
          <Button asChild size="lg">
            <Link href="/buzz-cut-simulator/upload-photo">
              Start Using Filter
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Tips for Best Results</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-primary">✓</span>
              <span>Use photos taken in natural lighting</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary">✓</span>
              <span>Keep your hair visible and not covered by hats</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary">✓</span>
              <span>Choose photos where you're looking straight ahead</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary">✓</span>
              <span>Avoid photos with heavy filters or effects</span>
            </li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Common Questions</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium">How long does processing take?</h4>
              <p className="text-sm text-muted-foreground">Typically 1-3 minutes depending on image complexity</p>
            </div>
            <div>
              <h4 className="font-medium">Is my photo stored permanently?</h4>
              <p className="text-sm text-muted-foreground">No, all photos are automatically deleted after 24 hours</p>
            </div>
            <div>
              <h4 className="font-medium">Can I try multiple colors?</h4>
              <p className="text-sm text-muted-foreground">Yes! Generate different versions with various hair colors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 