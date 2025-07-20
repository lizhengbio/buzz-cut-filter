'use client'

import { ArrowRightIcon, SparklesIcon, CameraIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-blue-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* Announcement Badge */}
          <div className="mb-8 inline-flex items-center gap-x-2 rounded-full border border-border bg-background/50 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            <SparklesIcon className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">AI-Powered Hair Transformation</span>
            <ArrowRightIcon className="h-4 w-4 text-primary" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Try a Buzz Cut
            </span>
            <br />
            Risk-Free Preview
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            Thinking about going short? See exactly how you'll look with a buzz cut before making the cut. 
            <span className="font-semibold text-primary"> Preview first, decide with confidence!</span>
          </p>

          {/* Feature Highlights */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span>Face Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              <span>Multiple Styles</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-orange-500"></div>
              <span>HD Quality</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#buzz-cut-simulator"
              className="group relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 transform hover:scale-105"
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/80 to-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CameraIcon className="h-6 w-6 relative z-10" />
              <span className="relative z-10">See My Look</span>
              <ArrowRightIcon className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 text-base font-semibold leading-6 text-foreground hover:text-primary transition-colors"
            >
              See Examples <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>No Sign-up Required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Privacy Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Instant Results</span>
            </div>
          </div>

          {/* Demo Images */}
          <div className="mt-16">
            <div className="mx-auto max-w-5xl">
                            <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground mb-8">
                  ✨ Real User Transformations
                </p>
              </div>
              
              {/* Before/After Showcase */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Comparison Set 1 */}
                <div className="bg-background/50 backdrop-blur-sm border border-border rounded-2xl p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="aspect-square rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center mb-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                        <span className="text-muted-foreground text-sm relative z-10">Original Photo</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Before</p>
                    </div>
                    <div className="text-center">
                      <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-blue-600/20 flex items-center justify-center mb-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-blue-600/30"></div>
                        <span className="text-primary text-sm font-medium relative z-10">Buzz Cut Result</span>
                      </div>
                      <p className="text-xs text-muted-foreground">After AI</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Face Match: 98%
                    </span>
                  </div>
                </div>

                {/* Comparison Set 2 */}
                <div className="bg-background/50 backdrop-blur-sm border border-border rounded-2xl p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="aspect-square rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center mb-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20"></div>
                        <span className="text-muted-foreground text-sm relative z-10">Original Photo</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Before</p>
                    </div>
                    <div className="text-center">
                      <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-blue-600/20 flex items-center justify-center mb-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-blue-600/30"></div>
                        <span className="text-primary text-sm font-medium relative z-10">Buzz Cut Result</span>
                      </div>
                      <p className="text-xs text-muted-foreground">After AI</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Face Match: 96%
                    </span>
                  </div>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-background/30 backdrop-blur-sm border border-border rounded-xl">
                  <div className="text-2xl mb-2">🎯</div>
                  <h4 className="font-semibold text-foreground mb-1">Precise Recognition</h4>
                  <p className="text-xs text-muted-foreground">AI accurately identifies facial features while preserving your natural look</p>
                </div>
                <div className="text-center p-4 bg-background/30 backdrop-blur-sm border border-border rounded-xl">
                  <div className="text-2xl mb-2">🚀</div>
                  <h4 className="font-semibold text-foreground mb-1">Lightning Fast</h4>
                  <p className="text-xs text-muted-foreground">Get your buzz cut preview in 3-5 seconds</p>
                </div>
                <div className="text-center p-4 bg-background/30 backdrop-blur-sm border border-border rounded-xl">
                  <div className="text-2xl mb-2">🎨</div>
                  <h4 className="font-semibold text-foreground mb-1">Multiple Options</h4>
                  <p className="text-xs text-muted-foreground">Choose from different buzz cut lengths and hair colors</p>
                </div>
              </div>

              {/* Secondary CTA */}
              <div className="text-center">
                                  <a
                    href="#buzz-cut-simulator"
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg font-semibold transition-all duration-300"
                  >
                    <span className="text-lg">✂️</span>
                    Get My Preview
                  </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-blue-600 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  )
}
