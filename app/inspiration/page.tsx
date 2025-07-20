import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Camera, Users, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Inspiration - Buzz Cut Styles Gallery",
  description: "Get inspired by our buzz cut gallery and join the buzzcut challenge community.",
};

export default function InspirationPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-12 container px-4 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Buzz Cut Inspiration
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore various buzz cut styles, get inspired, and join our buzz cut challenge community.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Camera className="w-6 h-6 text-primary" />
              Style Gallery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Browse our carefully curated buzz cut style gallery and discover the perfect look for you.
            </p>
            <div className="space-y-2">
              <div className="text-sm font-medium">What's included:</div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Classic buzz cut styles</li>
                <li>• Modern fade buzz cuts</li>
                <li>• Different length comparisons</li>
                <li>• Various face shape adaptations</li>
              </ul>
            </div>
            <Button asChild className="w-full">
              <Link href="/inspiration/gallery">
                Browse Gallery
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-primary" />
              Buzz Cut Challenge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Join the global buzz cut challenge, share your transformation, and inspire others to take the first step toward change.
            </p>
            <div className="space-y-2">
              <div className="text-sm font-medium">Challenge activities:</div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 30-day buzz cut experience</li>
                <li>• Before & after sharing</li>
                <li>• Community support & interaction</li>
                <li>• Monthly best transformation award</li>
              </ul>
            </div>
            <Button asChild className="w-full" variant="outline">
              <Link href="/inspiration/buzzcut-challenge">
                Join Challenge
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border rounded-xl p-6 md:p-8 text-center">
        <Users className="w-12 h-12 mx-auto text-primary mb-4" />
        <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          We're building a vibrant buzz cut community where users can share experiences, get advice, and motivate each other.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/buzz-cut-simulator">
              Try Simulator First
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">
              Subscribe for Updates
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Community Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Check out the best transformation stories and experiences shared by community members.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Hot Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Discover the most popular buzz cut styles and color trends right now.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Camera className="w-5 h-5 text-blue-500" />
              Photography Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Learn how to take the best buzz cut photos to showcase your new look.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 