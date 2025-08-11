import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { generateStructuredData } from "@/lib/structured-data";

import "./globals.css";

const baseUrl = process.env.BASE_URL
  ? `https://${process.env.BASE_URL}`
  : process.env.NODE_ENV === 'production' 
    ? "https://www.buzzcutfilter.app" 
    : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Buzz Cut AI Preview - 100% Automatic, Free Trial",
    template: "%s | Buzz Cut AI"
  },
  description: "Experience AI-powered buzz cut preview in 5 seconds with 1 click. Upload any photo and see your transformation instantly with Face-Lock technology.",
  keywords: [
    'buzz cut simulator',
    'AI haircut preview', 
    'virtual buzz cut',
    'hair transformation',
    'buzz cut filter',
    'haircut simulator',
    'AI buzz cut',
    'hair makeover',
    'buzz cut generator'
  ],
  authors: [{ name: 'Buzz Cut AI' }],
  creator: 'Buzz Cut AI',
  publisher: 'Buzz Cut AI',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Buzz Cut AI',
    title: 'Buzz Cut AI Preview - 100% Automatic, Free Trial',
    description: 'Experience AI-powered buzz cut preview in 5 seconds with 1 click. Upload any photo and see your transformation instantly.',
    url: baseUrl,
    images: [
      {
        url: '/images/BuzzCut AI Logo.png',
        width: 1200,
        height: 630,
        alt: 'Buzz Cut AI - Virtual Haircut Simulator',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@BuzzCutAI',
    creator: '@BuzzCutAI',
    title: 'Buzz Cut AI Preview - 100% Automatic, Free Trial',
    description: 'Experience AI-powered buzz cut preview in 5 seconds with 1 click. Try our free virtual buzz cut simulator.',
    images: ['/images/BuzzCut AI Logo.png'],
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
    other: {
      'msvalidate.01': process.env.BING_VERIFICATION,
    },
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      'en-US': baseUrl,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ML2BZ0RNRG"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ML2BZ0RNRG');
            `,
          }}
        />
        {/* Microsoft Clarity */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "st33hcj907");
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.buzzcutfilter.app" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative min-h-screen bg-white">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
