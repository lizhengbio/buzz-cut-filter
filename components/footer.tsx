"use client";

import { Logo } from "./logo";
import Link from "next/link";
import { Github } from "lucide-react";
import { usePathname } from "next/navigation";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Buzz Cut Simulator", href: "/buzz-cut-simulator" },
      { label: "Live Camera", href: "/buzz-cut-simulator/live-camera" },
      { label: "Photo Upload", href: "/buzz-cut-simulator/upload-photo" },
      { label: "Pricing Plans", href: "/pricing" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Guides",
    links: [
      { label: "How to Use", href: "/buzz-cut-guides/how-to-use-buzz-cut-filter" },
      { label: "Guard Lengths", href: "/buzz-cut-guides/guard-lengths" },
      { label: "Hair Styles", href: "/buzz-cut-guides/styles" },
      { label: "Maintenance Tips", href: "/buzz-cut-guides/maintenance-tips" },
      { label: "Style Comparison", href: "/buzz-cut-guides/buzz-cut-vs-crew-cut" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Contact Us", href: "/contact" },
      { label: "Blog", href: "/blog" },
      { label: "Inspiration", href: "/inspiration" },
      { label: "API Docs", href: "/api" },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) {
    return (
      <footer className="border-t border-gray-200 bg-white py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-gray-600 md:text-left">
              Built by{" "}
              <Link
                href="https://buzzcut.ai"
                className="font-medium text-primary hover:underline underline-offset-4"
              >
                Buzz Cut AI
              </Link>
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
          <div className="col-span-full lg:col-span-2">
            <Logo />
            <p className="mt-6 text-gray-600 leading-relaxed max-w-md">
              AI-powered buzz cut preview platform. See your transformation instantly with our advanced face-lock technology. 
              Safe, fast, and completely free to try.
            </p>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-4">
            {footerLinks.map((group) => (
              <div key={group.title} className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-gray-900">{group.title}</h3>
                <nav className="flex flex-col gap-3">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 md:flex-row">
          <p className="text-center text-sm text-gray-600 md:text-left">
            © 2024{" "}
            <Link href="/about-us" className="font-medium text-gray-900 hover:text-primary transition-colors">
              Buzz Cut AI
            </Link>
            . All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
