import dynamic from "next/dynamic";
import Image from "next/image";
import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import FAQ from "@/components/home/faq";
import Contact from "@/components/home/contact";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { generateStructuredData } from "@/lib/structured-data";

const HowToUse = dynamic(() => import("@/components/home/how-to-use"));
const Pricing = dynamic(() => import("@/components/home/pricing"));

// How to Use Interactive Component
export default function Home() {
  const schemas = generateStructuredData();
  
  return (
    <div className="flex flex-col">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            schemas.organizationSchema,
            schemas.websiteSchema,
            schemas.webApplicationSchema,
            schemas.serviceSchema
          ])
        }}
      />
      <Hero />

      <Features />

      {/* Try on Buzz Cut Filter in a Snap Section (replicated from aiease.ai) */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
            {/* Left Column - Image */}
            <div className="lg:w-1/2">
              <Image
                src="/images/optimized/Try on Buzz Cut Filter in a Snap.webp"
                alt="turn female short hair portrait into buzz cut"
                width={1024}
                height={768}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4ICAAAADwAQCdASoQAAkAAUAmJQBOgB0AAABAAADAAAA"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full rounded-2xl shadow-lg h-auto"
              />
            </div>
            {/* Right Column - Content */}
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Try on Buzz Cut Filter in a Snap
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Have you ever wondered what you'd look like with a{' '}
                <span className="text-yellow-500 font-medium">buzzcut</span>{' '}
                but were too nervous to take the plunge? Now, you can easily try this bold look without committing to the clippers! Start a{' '}
                <span className="text-yellow-500 font-medium">free trial</span>{' '}
                to preview a buzzcut style directly on your photos. In just a snap, you can see yourself with a clean, sharp buzzcut and decide if it's the right look for you.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
              >
                <Link href="/buzz-cut-simulator">Try Buzz Cut</Link>
              </Button>
            </div>
          </div>
        </div>
              </section>

        {/* Effortlessly Give Yourself a Buzzcut Look Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
              {/* Left Column - Content */}
              <div className="lg:w-1/2 space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  Effortlessly Give Yourself a Buzzcut Look
                </h2>
                
                <p className="text-gray-600 text-lg leading-relaxed">
                  Changing your hairstyle has always been challenging. With the{' '}
                  <span className="text-red-500 font-medium">buzz cut filter</span>
                  , you can skip the hassle and cost of a salon visit and transform your look in seconds. Whether you're curious about how you'd look with a fresh buzz or want to experiment with different styles, this filter makes it simple. No need to pick up the clippers—use this online tool, and within moments, you'll see yourself rocking a buzzcut.
                </p>

                <Button 
                  asChild 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                >
                  <Link href="/buzz-cut-simulator">Try Buzz Cut</Link>
                </Button>
              </div>

              {/* Right Column - Image */}
              <div className="lg:w-1/2">
                <Image
                  src="/images/optimized/Effortlessly Give Yourself a Buzzcut Look.webp"
                  alt="generate buzz cut looks of both man and woman"
                  width={1024}
                  height={768}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4ICAAAADwAQCdASoQAAkAAUAmJQBOgB0AAABAAADAAAA"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="w-full rounded-2xl shadow-lg h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Create Scroll-Stopping Posts Section (replicated from aiease.ai) */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
            {/* Left Column - Image */}
            <div className="lg:w-1/2">
              <Image
                src="/images/optimized/Create Scroll-Stopping Posts with Buzz Cut.webp"
                alt="post buzz cut portrait on instagram"
                width={1024}
                height={768}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4ICAAAADwAQCdASoQAAkAAUAmJQBOgB0AAABAAADAAAA"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full rounded-2xl shadow-lg h-auto"
              />
            </div>
            {/* Right Column - Content */}
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Create Scroll-Stopping Posts with Buzz Cut
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                A bold new look is sure to make your posts stand out. The{' '}
                <span className="text-yellow-500 font-medium">buzzcut filter</span>{' '}
                gives your photos a powerful, edgy vibe, perfect for capturing attention in a scroll-heavy world. Share your{' '}
                <span className="text-yellow-500 font-medium">buzzcut</span>{' '}
                look to surprise your followers, or use it as a fun style experiment to mix up your feed. With this filter, you can create eye-catching content that will have everyone stopping and double-tapping to get a closer look at your fresh new look.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
              >
                <Link href="/buzz-cut-simulator">Try Buzz Cut</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trick Friends With Realistic Buzzcut Portraits Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
            {/* Left Column - Content */}
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Trick Friends With Realistic Buzzcut Portraits
              </h2>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                Want to surprise your friends? The{' '}
                <span className="text-red-500 font-medium">buzz cut filter</span>{' '}
                creates a highly realistic look, allowing you to prank friends with a portrait they'll believe is real. Imagine their reactions when they see your new "haircut" in their feed or message box. It's a fun, risk-free way to try a dramatic look that's bound to get people talking and sharing your post.
              </p>

              <Button 
                asChild 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
              >
                <Link href="/buzz-cut-simulator">Try Buzz Cut</Link>
              </Button>
            </div>

            {/* Right Column - Image */}
            <div className="lg:w-1/2">
              <Image
                src="/images/optimized/Trick Friends With Realistic Buzzcut Portraits.webp"
                alt="send buzz cut portrait in whatsapp messaging box and share with friends"
                width={1024}
                height={768}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4ICAAAADwAQCdASoQAAkAAUAmJQBOgB0AAABAAADAAAA"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full rounded-2xl shadow-lg h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section - moved after Trick Friends section */}
      <section className="bg-gray-50/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How to Use the Buzz Cut Filter Online?</h2>
          </div>

          {/* Interactive How to Use Steps (client-only, deferred) */}
          <HowToUse />
        </div>
      </section>
      
      <Pricing />
      <FAQ />
      <Contact />
    </div>
  );
}
