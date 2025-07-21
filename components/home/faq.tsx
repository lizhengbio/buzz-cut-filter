const faqs = [
  {
    id: 1,
    question: "What is Buzz Cut AI Preview? How safe is it?",
    answer:
      "Buzz Cut AI Preview is an advanced AI-powered hair transformation service. We use IP-Adapter FaceID technology and MediaPipe hair segmentation to ensure only hairstyles are changed while preserving your facial features. All processing occurs in secure server environments, and uploaded images are automatically deleted after 24 hours.",
  },
  {
    id: 2,
    question: "How realistic are the generated buzz cut results?",
    answer:
      "We utilize the Flux Kontext Pro model, one of the most advanced image generation technologies available. Combined with precise hair segmentation and face protection mechanisms, the generated results closely resemble actual post-haircut appearance. Most users report high similarity between generated results and real outcomes.",
  },
  {
    id: 3,
    question: "What are the limitations of the free version?",
    answer:
      "Free users can generate 3 buzz cut preview images per day at 720p resolution with watermarks. This is sufficient for experiencing our service and making hairstyle decisions. For unlimited usage and high-definition output, you can upgrade to the Pro version.",
  },
  {
    id: 4,
    question: "What image formats are supported? What photo requirements?",
    answer:
      "We support JPG, PNG, and WEBP formats with a maximum file size of 5MB per image. For best results, use clear front-facing photos with the face occupying the main portion of the image, good lighting, and no obstructions. Avoid overly blurry or side-angle photos.",
  },
  {
    id: 5,
    question: "How long does it take to generate one image?",
    answer:
      "Typically, the process from photo upload to completion takes 1-3 minutes. Processing time depends on server load and image complexity. We display real-time progress updates so you can stay informed of the current status.",
  },
  {
    id: 6,
    question: "Can I choose different hair colors?",
    answer:
      "Yes! We offer multiple hair color options including black, brown, blonde, gray, and more. You can try different colors to find the buzz cut style that suits you best. The Pro version will continue adding more personalization options.",
  },
]

export default function FAQ() {
  return (
    <div id="faq" className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-800 sm:text-5xl">Frequently Asked Questions</h2>
        <dl className="mt-20 divide-y divide-gray-200">
          {faqs.map((faq) => (
            <div key={faq.id} className="py-8 first:pt-0 last:pb-0 lg:grid lg:grid-cols-12 lg:gap-8">
              <dt className="text-base/7 font-semibold text-gray-800 lg:col-span-5">{faq.question}</dt>
              <dd className="mt-4 lg:col-span-7 lg:mt-0">
                <p className="text-base/7 text-gray-600">{faq.answer}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
} 