'use client'

import { sendContactEmailAction } from "@/app/actions";
import { FormMessage, type Message } from "@/components/form-message";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useRef } from "react";

function ContactForm() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const error = searchParams.get("error");
  const messageObj: Message | null = message
    ? { success: message }
    : error
    ? { error: error }
    : null;
  const formRef = useRef<HTMLFormElement>(null);

  function handleMailto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const firstName = (form.elements.namedItem("first-name") as HTMLInputElement)?.value || "";
    const lastName = (form.elements.namedItem("last-name") as HTMLInputElement)?.value || "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const company = (form.elements.namedItem("company") as HTMLInputElement)?.value || "";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";

    const subject = `Contact Form Submission from ${firstName} ${lastName}`;
    const body = `\nName: ${firstName} ${lastName}\nEmail: ${email}\n${company ? `Company: ${company}\n` : ""}Message:\n${message}\n\n---\nThis message was sent from the Buzz Cut AI contact form.`.trim();

    window.location.href = `mailto:support@buzzcutfilter.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div id="contact" className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={-64}
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-64} className="overflow-visible fill-gray-50">
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
      </svg>
      <div className="mx-auto max-w-xl lg:max-w-4xl">
        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-800 sm:text-5xl">
          Contact Our Team
        </h2>
        <p className="mt-2 text-lg/8 text-gray-600">
          Have questions about Buzz Cut AI Preview or need technical support? Our team is here to help you.
        </p>
        <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
          <form ref={formRef} onSubmit={handleMailto} className="lg:flex-auto">
            {messageObj && (
              <div className="mb-6">
                <FormMessage message={messageObj} />
              </div>
            )}
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-800">
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    required
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-800">
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    required
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-800">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="company" className="block text-sm/6 font-semibold text-gray-800">
                  Company (Optional)
                </label>
                <div className="mt-2.5">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-800">
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us about your questions or suggestions..."
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                    defaultValue={''}
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus:outline-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Message
              </button>
            </div>
            <p className="mt-4 text-sm/6 text-gray-600">
              By submitting this form, I agree to the{' '}
              <a href="/privacy" className="font-semibold text-blue-600">
                privacy&nbsp;policy
              </a>
              .
            </p>
          </form>
          <div className="lg:mt-6 lg:w-80 lg:flex-none">
            <div className="h-12 w-auto flex items-center">
              <span className="text-2xl font-bold text-blue-600">🔥 Buzz Cut AI</span>
            </div>
            <figure className="mt-10">
              <blockquote className="text-lg/8 font-semibold text-gray-800">
                <p>
                  "Buzz Cut AI Preview let me see the result before cutting! So practical! The generated effect is very realistic and gave me great confidence."
                </p>
              </blockquote>
              <figcaption className="mt-10 flex gap-x-6">
                <div className="size-12 flex-none rounded-full overflow-hidden">
                  <img 
                    src="/images/Satisfied Customer.jpg" 
                    alt="Satisfied Customer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-base font-semibold text-gray-800">John D.</div>
                  <div className="text-sm/6 text-gray-600">Satisfied Customer</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <Suspense fallback={<div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">Loading...</div>}>
      <ContactForm />
    </Suspense>
  );
} 