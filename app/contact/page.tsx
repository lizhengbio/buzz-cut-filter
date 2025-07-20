import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, MessageCircle, Clock, MapPin, Phone, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch with Buzz Cut AI",
  description: "Contact our team for support, questions, or feedback about our AI buzz cut simulator.",
};

const contactMethods = [
  {
    icon: Mail,
    title: "Email Contact",
    description: "Send an email for technical support",
    contact: "support@buzzcut.ai",
    action: "Send Email"
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Instant online chat support",
    contact: "24/7 Online Support",
    action: "Start Chat"
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Business hours phone consultation",
    contact: "+1 (555) 123-4567",
    action: "Call Now"
  }
];

const supportHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM PST" },
  { day: "Saturday", hours: "10:00 AM - 4:00 PM PST" },
  { day: "Sunday", hours: "Closed" }
];

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-12 container px-4 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions or need help? Our team is ready to provide support.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Send Message
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter your last name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Enter message subject" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Please describe your question or suggestion in detail..."
                />
              </div>
              <Button type="submit" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Contact Methods</h2>
            <p className="text-muted-foreground">
              Choose the contact method that works best for you, and we'll respond as soon as possible.
            </p>
          </div>

          <div className="space-y-4">
            {contactMethods.map((method) => (
              <Card key={method.title}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <method.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium">{method.title}</h3>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                      <p className="text-sm font-medium">{method.contact}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      {method.action}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Support Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {supportHours.map((schedule) => (
                <div key={schedule.day} className="flex justify-between">
                  <span className="text-sm font-medium">{schedule.day}</span>
                  <span className="text-sm text-muted-foreground">{schedule.hours}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Company Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="font-medium">Buzz Cut AI Headquarters</p>
                <p className="text-muted-foreground">
                  123 Innovation Street<br />
                  Tech Valley, CA 94000<br />
                  United States
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border rounded-xl p-6 md:p-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Before contacting us, you might want to check our frequently asked questions first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/faq">
                View FAQ
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/buzz-cut-guides">
                User Guides
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 