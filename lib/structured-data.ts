const baseUrl = process.env.BASE_URL
  ? `https://${process.env.BASE_URL}`
  : process.env.NODE_ENV === 'production' 
    ? "https://www.buzzcutfilter.app" 
    : "http://localhost:3000";

// Structured Data for the entire website
export function generateStructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Buzz Cut AI",
    "url": baseUrl,
    "logo": `${baseUrl}/images/BuzzCut AI Logo.png`,
    "description": "AI-powered buzz cut preview platform. See your transformation instantly with our advanced face-lock technology.",
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": `${baseUrl}/contact`,
    },
    "sameAs": [
      // Add social media links when available
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Buzz Cut AI",
    "url": baseUrl,
    "description": "Experience AI-powered buzz cut preview in 5 seconds with 1 click. Upload any photo and see your transformation instantly.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/buzz-cut-simulator?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Buzz Cut AI",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/images/BuzzCut AI Logo.png`
      }
    }
  };

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Buzz Cut AI Simulator",
    "url": `${baseUrl}/buzz-cut-simulator`,
    "description": "AI-powered virtual buzz cut simulator. Upload your photo and see realistic buzz cut previews instantly.",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "offers": [
      {
        "@type": "Offer",
        "name": "Free Trial",
        "price": "0",
        "priceCurrency": "USD",
        "description": "10 credits per day with watermarked images"
      },
      {
        "@type": "Offer", 
        "name": "Pro Plan",
        "price": "6",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "6",
          "priceCurrency": "USD",
          "billingDuration": "P1M"
        },
        "description": "300 credits per month, no watermarks, commercial rights"
      }
    ],
    "featureList": [
      "AI-powered buzz cut preview",
      "Face-lock technology", 
      "Multiple hair colors",
      "High-definition output",
      "Privacy protection",
      "Instant results"
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Buzz Cut Preview Service",
    "description": "Professional AI-powered buzz cut simulation service with face-lock technology",
    "provider": {
      "@type": "Organization",
      "name": "Buzz Cut AI"
    },
    "serviceType": "Virtual Hair Simulation",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Buzz Cut AI Plans",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Free Trial"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Pro Plan"
          }
        }
      ]
    }
  };

  return {
    organizationSchema,
    websiteSchema, 
    webApplicationSchema,
    serviceSchema
  };
}

export default generateStructuredData;