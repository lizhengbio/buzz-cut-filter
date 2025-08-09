'use client'

import Image from 'next/image'

import { useState } from 'react'

const categories = [
  { id: 'male', label: 'Male', active: true },
  { id: 'female', label: 'Female', active: false }
]

export default function StunningQuality() {
  const [activeCategory, setActiveCategory] = useState('male')
  const [sliderValue, setSliderValue] = useState(50)

  return (
    <section className="bg-white py-12 md:py-24 overflow-x-clip">
      {/* Title */}
      <div className="mx-auto w-full px-8 max-w-5xl">
        <div className="py-4 md:py-8">
          <h2 className="font-bold text-4xl md:text-5xl text-center text-gray-800">
            Stunning quality
          </h2>
        </div>
      </div>

      {/* Category tabs */}
      <div 
        role="tablist" 
        aria-orientation="horizontal" 
        className="hide-scrollbars flex space-x-2 -my-2 py-2 justify-start md:justify-center overflow-x-scroll md:overflow-auto px-8 scroll-pl-8 md:scroll-p-0"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            role="tab"
            type="button"
            className={`border border-transparent rounded-full font-bold transition ease-in-out text-center inline-flex items-center justify-center text-sm sm:text-base px-4 h-11 whitespace-nowrap focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-primary-hover ${
              category.id === activeCategory
                ? 'text-gray-800 bg-gray-200 active:scale-[0.98]'
                : 'text-gray-600 bg-white hover:text-gray-800'
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Image comparison container */}
      <div className="mx-auto w-full px-8 max-w-5xl">
        <div className="relative group">
          <div className="py-4 md:py-8">
            {/* Decorative elements */}
            <svg 
              width="43" 
              height="65" 
              viewBox="0 0 43 65" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="text-yellow-400 absolute hidden sm:block -right-16 -top-6 transition ease-in-out group-hover:rotate-[15deg] group-hover:-translate-x-2 transform-gpu"
            >
              <path 
                d="M21.0587 0.665485C20.2061 1.06429 19.5222 1.75276 19.1288 2.60832C18.7354 3.46388 18.6581 4.43098 18.9106 5.3375C19.163 6.24402 19.7289 7.03108 20.5075 7.55859C21.2861 8.0861 22.2269 8.31987 23.1623 8.21817C26.1246 7.88413 29.4727 9.31912 31.901 11.9617C33.9252 14.1653 34.9275 16.8268 34.5169 18.9012C34.245 20.2502 31.529 21.3937 28.913 22.4775C24.2168 24.4488 17.7873 27.1491 16.6081 34.6729C15.453 42.0509 22.0398 46.408 26.841 49.604C28.6648 50.8109 32.0537 53.0537 32.2504 54.0687C32.2038 54.2293 32.134 54.3822 32.0432 54.5226C30.0099 57.923 19.5468 58.364 5.55068 53.2186C4.56437 52.8614 3.47632 52.9097 2.52464 53.3531C1.57295 53.7964 0.835074 54.5987 0.472344 55.5843C0.109613 56.5699 0.151653 57.6588 0.589149 58.6126C1.02665 59.5664 1.82398 60.3075 2.80688 60.6739C7.57113 62.4276 31.7081 70.5563 38.8569 58.5899C40.8894 55.1837 40.5923 51.5819 38.0269 48.444C36.303 46.3378 33.7197 44.631 31.2262 42.9788C27.0248 40.2158 24.0982 38.0804 24.4407 35.9101C24.8872 33.0721 27.1858 31.8245 31.9664 29.8132C36.0881 28.0875 41.2088 25.9337 42.2993 20.4391C43.2352 15.8595 41.5127 10.6778 37.7647 6.59133C33.5962 2.05294 27.8209 -0.28627 22.3147 0.321921C21.8801 0.366349 21.4557 0.482462 21.0587 0.665485Z" 
                fill="currentColor" 
              />
            </svg>
            
            <span className="bg-white border-yellow-400 border-8 w-8 h-8 rounded-full absolute hidden sm:block -left-12 -bottom-4 transition ease-in-out group-hover:translate-x-8 group-hover:-translate-y-2 transform-gpu group-hover:scale-110"></span>
            
            {/* Main comparison container */}
            <div className="relative overflow-hidden h-max border border-gray-200 select-none transition-all duration-300 rounded-2xl md:rounded-3xl">
              {/* Checkered background */}
              <div className="bg-white checkerboard w-full h-full absolute top-0 left-0 -z-10"></div>
              
              {/* Image container */}
              <div className="relative">
                <div className="relative overflow-hidden">
                  {/* After image (base layer - always visible) */}
                  <div className="w-full">
                    {activeCategory === 'male' ? (
                      <div className="relative w-full">
                        <Image 
                          src="/images/male-after.png" 
                          alt="AI Buzz Cut Result" 
                          width={1280}
                          height={720}
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4ICAAAADwAQCdASoQAAkAAUAmJQBOgB0AAABAAADAAAA"
                          sizes="(min-width: 1024px) 960px, 100vw"
                          className="w-full aspect-video object-cover h-auto"
                        />
                        <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm font-medium">
                          After
                        </div>
                      </div>
                    ) : activeCategory === 'female' ? (
                      <div className="relative w-full">
                        <Image 
                          src="/images/female-after.png" 
                          alt="AI Buzz Cut Result" 
                          width={1280}
                          height={720}
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4ICAAAADwAQCdASoQAAkAAUAmJQBOgB0AAABAAADAAAA"
                          sizes="(min-width: 1024px) 960px, 100vw"
                          className="w-full aspect-video object-cover h-auto"
                        />
                        <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm font-medium">
                          After
                        </div>
                      </div>
                    ) : (
                      <div className="w-full aspect-video bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">After</span>
                          </div>
                          <p className="text-green-700 font-medium">AI Buzz Cut Result</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Before image overlay with clip path */}
                  <div 
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                      clipPath: `inset(0 ${100 - sliderValue}% 0 0)`
                    }}
                  >
                    {activeCategory === 'male' ? (
                      <div className="relative w-full h-full">
                        <Image 
                          src="/images/male-before.jpg" 
                          alt="Original Photo with Hair" 
                          width={1280}
                          height={720}
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4ICAAAADwAQCdASoQAAkAAUAmJQBOgB0AAABAAADAAAA"
                          sizes="(min-width: 1024px) 960px, 100vw"
                          className="w-full aspect-video object-cover h-auto"
                        />
                        <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm font-medium">
                          Before
                        </div>
                      </div>
                    ) : activeCategory === 'female' ? (
                      <div className="relative w-full h-full">
                        <Image 
                          src="/images/female-before.jpg" 
                          alt="Original Photo with Hair" 
                          width={1280}
                          height={720}
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4ICAAAADwAQCdASoQAAkAAUAmJQBOgB0AAABAAADAAAA"
                          sizes="(min-width: 1024px) 960px, 100vw"
                          className="w-full aspect-video object-cover h-auto"
                        />
                        <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm font-medium">
                          Before
                        </div>
                      </div>
                    ) : (
                      <div className="w-full aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">Before</span>
                          </div>
                          <p className="text-blue-700 font-medium">Original Photo with Hair</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Slider overlay */}
                  <div className="absolute top-0 left-0 w-full h-full">
                    <label className="block h-full w-full" htmlFor="ImageSlider">
                      <input
                        id="ImageSlider"
                        className="bg-transparent appearance-none h-full cursor-pointer focus:outline-none w-full"
                        name="ImageSlider"
                        type="range"
                        step="0.01"
                        min="0"
                        max="100"
                        value={sliderValue}
                        onChange={(e) => setSliderValue(Number(e.target.value))}
                        style={{
                          background: 'transparent',
                          margin: '0 -24px',
                          width: 'calc(100% + 48px)'
                        }}
                      />
                    </label>
                  </div>
                  
                  {/* Slider line indicator */}
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
                    style={{
                      left: `${sliderValue}%`,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-200 flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Link to more samples */}
      <div className="flex justify-center px-8 text-center">
        <a 
          href="/buzz-cut-guides" 
          className="group flex items-center font-bold cursor-pointer transition ease-in-out no-underline text-blue-600 hover:text-blue-700 text-xl focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-primary-hover rounded"
        >
          See more samples
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

      <style jsx>{`
        .checkerboard {
          background: 
            linear-gradient(45deg, #f8f9f9 25%, transparent 25%) 0 0 / 20px 20px,
            linear-gradient(-45deg, #f8f9f9 25%, transparent 25%) 0 10px / 20px 20px,
            linear-gradient(45deg, transparent 75%, #f8f9f9 75%) 10px -10px / 20px 20px,
            linear-gradient(-45deg, transparent 75%, #f8f9f9 75%) -10px 0 / 20px 20px,
            white;
        }
        
        .hide-scrollbars {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .hide-scrollbars::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
