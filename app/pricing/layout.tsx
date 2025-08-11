import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Plans - Buzz Cut AI Simulator",
  description: "Choose the perfect plan for your needs. Start with our free trial or upgrade to Pro/Ultra for unlimited high-quality buzz cut previews with commercial rights.",
  keywords: [
    'buzz cut pricing',
    'AI haircut simulator price', 
    'buzz cut generator cost',
    'virtual haircut subscription',
    'buzz cut filter pricing',
    'hair transformation plans',
    'AI buzz cut pro'
  ],
  openGraph: {
    title: 'Pricing Plans - Buzz Cut AI Simulator',
    description: 'Choose the perfect plan for your needs. Start with our free trial or upgrade to Pro/Ultra for unlimited high-quality buzz cut previews.',
    url: '/pricing',
    images: [
      {
        url: '/images/BuzzCut AI Logo.png',
        width: 1200,
        height: 630,
        alt: 'Buzz Cut AI Pricing Plans',
      },
    ],
  },
  twitter: {
    title: 'Pricing Plans - Buzz Cut AI Simulator',
    description: 'Choose the perfect plan for your needs. Start with our free trial or upgrade to Pro/Ultra for unlimited high-quality buzz cut previews.',
  },
  alternates: {
    canonical: '/pricing',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}