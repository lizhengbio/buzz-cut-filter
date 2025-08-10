import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | Buzz Cut AI",
  description: "Find answers to common questions about our AI buzz cut simulator, pricing, and features.",
};

const faqCategories = [
  {
    title: "How to Use",
    questions: [
      {
        question: "How do I use Buzz Cut AI?",
        answer: "It's simple! Just upload a clear front-facing photo, choose your preferred hair color, then wait for our AI to generate your buzz cut preview. The process typically takes 1-3 minutes."
      },
      {
        question: "What are the photo requirements?",
        answer: "For best results, use: 1) Clear front-facing photo; 2) Good lighting conditions; 3) Simple background; 4) Hair clearly visible; 5) 1024px or higher resolution image."
      },
      {
        question: "What image formats are supported?",
        answer: "We support JPG, PNG, and WebP formats, with a file size limit of 5MB. We recommend using high-resolution images for better results."
      },
      {
        question: "How long does processing take?",
        answer: "Usually 1-3 minutes, depending on image complexity and current queue length. Pro users enjoy priority processing."
      }
    ]
  },
  {
    title: "AI Technology",
    questions: [
      {
        question: "How does AI protect my facial features?",
        answer: "We use IP-Adapter FaceID technology to lock your facial identity, ensuring the generated image maintains your original facial features. AI only modifies the hair region and won't change your face."
      },
      {
        question: "How realistic are the generated results?",
        answer: "We use advanced Flux Kontext Pro model combined with MediaPipe hair segmentation technology to generate very realistic buzz cut effects while maintaining the original photo's lighting and style."
      },
      {
        question: "Why do generations sometimes fail?",
        answer: "If generation fails repeatedly, it may be due to: 1) Photo quality not clear enough; 2) Poor lighting conditions; 3) Hair being obscured. We recommend uploading clearer front-facing photos."
      },
      {
        question: "Can AI recognize different hair types?",
        answer: "Yes, our AI can identify and process different hair types, textures, and colors, adjusting the buzz cut effect accordingly for the most natural results."
      }
    ]
  },
  {
    title: "Subscription & Pricing",
    questions: [
      {
        question: "What are the limitations of the free version?",
        answer: "Free users get 3 generations per day at 720p with watermark, Face-Lock Lite technology, basic color options, and 24-hour automatic image deletion. Perfect for trying our Face-Lock buzz cut simulator."
      },
      {
        question: "What are the advantages of Pro version?",
        answer: "Pro users enjoy unlimited generations, 4K JPG/PNG/WebP formats, watermark-free downloads, ad-free experience, commercial usage rights, 2x faster processing queue, all color adjustment options, and Face-Lock Pro technology."
      },
      {
        question: "What's included in the Studio plan?",
        answer: "Studio includes everything in Pro plus API access, 500 generations per month, batch processing, GDPR compliance contract, SLA, commercial licensing, and dedicated account manager."
      },
      {
        question: "How do credit packages work?",
        answer: "Credit packages are pay-as-you-go options: Starter Pack ($1.99 for 5 credits), Value Pack ($5.99 for 25 credits), and Creator Pack ($14.99 for 100 credits). Credits never expire and include 4K quality output."
      },
      {
        question: "How do I cancel my subscription?",
        answer: "You can cancel your subscription anytime in the Creem subscription management page. After cancellation, your Pro or Studio benefits will be retained until the current billing period ends."
      },
      {
        question: "Do you offer annual discounts?",
        answer: "Yes! Pro Annual is $49/year (save $10) and Studio Annual is $99/year (save $20). Annual plans include all the same features as monthly plans."
      }
    ]
  },
  {
    title: "Privacy & Security",
    questions: [
      {
        question: "How long are my photos stored?",
        answer: "All uploaded photos are automatically deleted after 24 hours. We do not permanently store your personal photos."
      },
      {
        question: "Will my photos be used for other purposes?",
        answer: "Absolutely not. Your photos are only used for generating buzz cut previews and will not be used for any other purposes or shared with third parties."
      },
      {
        question: "Will AI change my facial features?",
        answer: "No. We use specialized face protection technology to ensure AI only modifies the hair region and never changes your facial features or identity."
      },
      {
        question: "Is it GDPR compliant?",
        answer: "Yes, we fully comply with GDPR and other privacy regulations, providing users with complete data control and transparent processing procedures."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-12 container px-4 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Common questions about Buzz Cut AI. If you don't find the answer you're looking for, feel free to contact us.
        </p>
      </div>

      <div className="space-y-8">
        {faqCategories.map((category) => (
          <div key={category.title} className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2">{category.title}</h2>
            <div className="grid gap-4">
              {category.questions.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border rounded-xl p-6 md:p-8">
        <div className="text-center space-y-4">
          <MessageCircle className="w-12 h-12 mx-auto text-primary" />
          <h2 className="text-2xl font-semibold">Have More Questions?</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            If you haven't found the answer you're looking for, our team is ready to help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/buzz-cut-simulator">
                Start Free Trial
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 text-center">
        <div className="space-y-3">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="font-semibold">User Guide</h3>
          <p className="text-sm text-muted-foreground">
            Check out our detailed user guide
          </p>
          <Button asChild variant="outline" size="sm">
            <Link href="/buzz-cut-guides/how-to-use-buzz-cut-filter">
              View Guide
            </Link>
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="font-semibold">Technical Support</h3>
          <p className="text-sm text-muted-foreground">
            Get professional technical support
          </p>
          <Button asChild variant="outline" size="sm">
            <Link href="/contact">
              Contact Support
            </Link>
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="font-semibold">More Guides</h3>
          <p className="text-sm text-muted-foreground">
            Explore complete buzz cut guides
          </p>
          <Button asChild variant="outline" size="sm">
            <Link href="/buzz-cut-guides">
              Browse Guides
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 