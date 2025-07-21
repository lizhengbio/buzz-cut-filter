import { Card, CardContent } from '../ui/card'

const testimonials = [
  {
    logo: 'STYLIST WEEKLY',
    quote: 'We are impressed by the AI and think it\'s the best buzz cut preview tool on the market.',
    author: 'Sarah Johnson',
    position: 'Senior Hair Stylist'
  },
  {
    logo: 'MODERN BARBER',
    quote: 'BuzzCut AI is leaps and bounds ahead of the competition. A thousand times better. It simplified the whole consultation process.',
    author: 'Mike Rodriguez',
    position: 'Master Barber'
  },
  {
    logo: 'HAIR TECH REVIEW',
    quote: 'We were impressed by its ability to account for different face shapes and hair textures without making the result look artificial.',
    author: 'Emma Chen',
    position: 'Technology Editor'
  }
]

export default function Testimonials() {
  return (
    <section className="bg-yellow-400 py-16 lg:py-24 relative overflow-hidden">
      {/* Background decorative stars */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 text-2xl">✨</div>
        <div className="absolute top-20 right-20 text-xl">⭐</div>
        <div className="absolute bottom-20 left-20 text-lg">✨</div>
        <div className="absolute bottom-10 right-10 text-2xl">⭐</div>
        <div className="absolute top-1/2 left-1/4 text-sm">✨</div>
        <div className="absolute top-1/3 right-1/3 text-sm">⭐</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">
            They love us. You will too.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Company logo placeholder */}
                  <div className="font-bold text-sm text-gray-600 tracking-wider">
                    {testimonial.logo}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-800 text-sm leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="font-semibold text-gray-800 text-sm">
                      {testimonial.author}
                    </div>
                    <div className="text-gray-600 text-xs">
                      {testimonial.position}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#"
            className="inline-flex items-center text-gray-800 hover:text-gray-600 font-medium"
          >
            Read Success Stories
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}