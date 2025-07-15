const faqs = [
  {
    id: 1,
    question: "How accurate is the buzz cut preview?",
    answer:
      "Our AI-powered technology provides highly accurate previews with a 95% accuracy rate. The system uses advanced hair simulation algorithms to show realistic results for different guard lengths and colors, helping you make confident decisions about your hairstyle.",
  },
  {
    id: 2,
    question: "Is BuzzCut AI free to use?",
    answer:
      "Yes! BuzzCut AI is completely free to use. You can try unlimited buzz cut variations, use the camera preview, upload photos, and download high-resolution results without any cost or registration required.",
  },
  {
    id: 3,
    question: "What guard lengths are available?",
    answer:
      "We offer 12 different guard lengths ranging from 1mm to 12mm. Each length is precisely calibrated to show realistic results: 1mm (nearly bald), 3mm (very short), 6mm (short), 9mm (medium), and 12mm (longer buzz cut).",
  },
  {
    id: 4,
    question: "Can I try different hair colors?",
    answer:
      "Absolutely! You can experiment with various hair colors including natural brown, black, blonde, gray, and others. This helps you see how different colors complement your features and skin tone.",
  },
  {
    id: 5,
    question: "How do I get the best results?",
    answer:
      "For best results, use a well-lit photo with your face clearly visible and hair not covered by hats or accessories. The AI works best with front-facing photos where your hairline is visible. Both camera and uploaded photos work great.",
  },
  {
    id: 6,
    question: "Is my photo data secure?",
    answer:
      "Yes, your privacy is our priority. Uploaded photos are automatically deleted after 24 hours, and we never store or share your personal images. All processing is done securely and your data remains completely private.",
  },
]

export default function FAQ() {
  return (
    <div id="faq" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Frequently asked questions</h2>
        <dl className="mt-20 divide-y divide-foreground/10">
          {faqs.map((faq) => (
            <div key={faq.id} className="py-8 first:pt-0 last:pb-0 lg:grid lg:grid-cols-12 lg:gap-8">
              <dt className="text-base/7 font-semibold text-foreground lg:col-span-5">{faq.question}</dt>
              <dd className="mt-4 lg:col-span-7 lg:mt-0">
                <p className="text-base/7 text-muted-foreground">{faq.answer}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
} 