const testimonials = [
  {
    companyLogo: 'HAIR TECH WEEKLY',
    quote: 'We are impressed by the AI and think it\'s the best buzz cut preview tool on the market.',
    authorImage: '/images/testimonial-1.jpg',
    authorName: 'Sarah Johnson',
    authorPosition: 'Content & Marketing Coordinator'
  },
  {
    companyLogo: 'MODERN BARBER CO',
    quote: 'BuzzCut AI is leaps and bounds ahead of the competition. A thousand times better. It simplified the whole process.',
    authorImage: '/images/testimonial-2.jpg',
    authorName: 'Mike Rodriguez',
    authorPosition: 'CEO'
  },
  {
    companyLogo: 'STYLE REVIEW',
    quote: 'We were impressed by its ability to account for different face shapes and hair textures without making the result look artificial.',
    authorImage: '/images/testimonial-3.jpg',
    authorName: 'Emma Chen',
    authorPosition: 'Senior Technology Editor'
  }
]

export default function Testimonials() {
  return (
    <div className="bg-yellow-400 py-12 md:py-24">
      {/* Title */}
      <div className="mx-auto w-full px-8 max-w-5xl">
        <h2 className="font-bold text-4xl md:text-5xl text-center text-gray-800 m-0">
          They love us. You will too.
        </h2>
      </div>

      {/* Testimonials Grid */}
      <div className="py-4 md:py-8">
        <div className="mx-auto w-full px-8 max-w-7xl snap-x md:snap-none snap-mandatory overflow-x-scroll md:overflow-auto px-8 scroll-pl-8 md:scroll-p-0 flex flex-nowrap gap-6 md:grid md:grid-cols-3 [&>*]:snap-start scrollbar-hide">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-3 transition ease-in-out duration-150 flex-shrink-0 w-5/6 md:w-auto md:flex-shrink-1 p-4 md:p-8 flex flex-col justify-between"
            >
              {/* Top section with logo and quote */}
              <div>
                {/* Company logo */}
                <figure className="m-0 w-36 h-16 mb-8 flex items-center">
                  <div className="w-full h-auto">
                    <div className="w-36 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-600 tracking-wider">
                        {testimonial.companyLogo}
                      </span>
                    </div>
                  </div>
                </figure>

                {/* Quote */}
                <p className="lg:text-xl font-bold text-gray-800 leading-7">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Bottom section with author info */}
              <div>
                {/* Author image */}
                <figure className="m-0 w-20 mt-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonial.authorName.split(' ').map(name => name[0]).join('')}
                    </span>
                  </div>
                </figure>

                {/* Author details */}
                <div className="flex flex-col mt-1">
                  <span className="font-bold text-gray-600">
                    {testimonial.authorName}
                  </span>
                  <span className="text-gray-600">
                    {testimonial.authorPosition}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom link */}
      <div className="flex flex-col items-center">
        <a 
          href="/about-us" 
          className="group flex items-center font-bold cursor-pointer transition ease-in-out no-underline text-gray-800 hover:text-gray-600 text-xl focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-primary-hover rounded"
        >
          Read Success Stories
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="ml-2 group-hover:translate-x-1 transition-transform"
          >
            <path 
              d="M11.3846 16.8L18.7692 12L11.3846 7.2" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            <path 
              d="M5.23077 12H17.5385" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </a>
      </div>
    </div>
  )
}