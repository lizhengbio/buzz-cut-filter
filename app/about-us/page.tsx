import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Users, Target, Award, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - Buzz Cut AI Team & Mission",
  description: "Learn about Buzz Cut AI's mission to revolutionize hair preview technology with safe AI solutions.",
};

const values = [
  {
    icon: Shield,
    title: "Privacy Protection",
    description: "We always put user privacy first, using the most advanced face protection technology to ensure your identity is secure."
  },
  {
    icon: Zap,
    title: "Technical Innovation",
    description: "Continuously investing in AI technology research and development to provide users with the most realistic and fastest hairstyle preview experience."
  },
  {
    icon: Users,
    title: "User-Centric",
    description: "Focusing on user needs as our core, continuously optimizing product experience so everyone can easily try new hairstyles."
  },
  {
    icon: Target,
    title: "Professional Focus",
    description: "Specializing in the hairstyle preview field, dedicating ourselves to providing the most professional buzz cut simulation solutions."
  }
];

const milestones = [
  {
    year: "2024",
    title: "Buzz Cut AI Born",
    description: "Created the first professional buzz cut preview platform based on the latest AI technology"
  },
  {
    year: "2024",
    title: "Face Protection Technology",
    description: "Integrated IP-Adapter FaceID technology to ensure user facial identity security"
  },
  {
    year: "2024",
    title: "High-Definition Output",
    description: "Support for 4K high-definition output, providing users with the best visual experience"
  },
  {
    year: "Future",
    title: "More Hairstyle Options",
    description: "Planning to launch 20+ different hairstyle filters to meet diverse user needs"
  }
];

export default function AboutUsPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-12 container px-4 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          About Buzz Cut AI
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We're committed to changing how people preview hairstyles with AI technology, allowing everyone to see real results before cutting their hair.
        </p>
      </div>

      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border rounded-xl p-6 md:p-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Buzz Cut AI was born from a simple idea: before cutting their hair, everyone should be able to see what their new look will be like.
            We use the most advanced artificial intelligence technology, combined with strict privacy protection measures, to provide users with a safe, realistic, and fast hairstyle preview experience.
          </p>
          <p className="text-muted-foreground">
            We believe technology should make life better, allowing everyone to make decisions about changing their appearance with more confidence.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These core values guide every decision we make and every product we develop.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <Card key={value.title} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From concept to reality, we've been pushing the boundaries of AI hairstyle preview technology.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {milestones.map((milestone, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    {milestone.year === "Future" ? "🚀" : milestone.year}
                  </div>
                  <CardTitle>{milestone.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{milestone.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              Technical Advantages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Latest Flux Kontext Pro AI model</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>IP-Adapter FaceID face protection</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>MediaPipe precise hair segmentation</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>1-3 minute fast generation</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-green-600" />
              User Commitment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-green-600">•</span>
                <span>24-hour automatic photo deletion</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600">•</span>
                <span>Never alter facial features</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600">•</span>
                <span>Fully GDPR compliant</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600">•</span>
                <span>7-day satisfaction guarantee</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border rounded-xl p-6 md:p-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Join Our Journey</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Experience the future of hairstyle preview technology and see if a buzz cut is right for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/buzz-cut-simulator">
                Start Free Trial
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 