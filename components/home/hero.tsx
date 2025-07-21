'use client'

import { ArrowRightIcon, SparklesIcon, CameraIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { Button } from '../ui/button'
import { useState } from 'react'

export default function Hero() {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const sampleImages = [
    '/images/sample-1.jpg',
    '/images/sample-2.jpg',
    '/images/sample-3.jpg',
    '/images/sample-4.jpg'
  ]

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Video and Title */}
          <div className="flex flex-col md:flex-row lg:flex-col items-center lg:items-start gap-6 md:gap-8 md:max-w-2xl lg:max-w-lg order-2 lg:order-1">
            {/* Video preview */}
            <div className="relative">
              <video
                preload="auto"
                className="w-full h-auto rounded-[32px] max-w-[320px] lg:max-w-[420px]"
                poster="/images/buzz-cut-preview-poster.jpg"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/buzz-cut-preview.mp4" type="video/mp4" />
                {/* Fallback image if video doesn't load */}
                <div className="w-full h-[280px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-[32px] flex items-center justify-center">
                  <div className="text-center">
                    <SparklesIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">Buzz Cut Transformation</p>
                  </div>
                </div>
              </video>
            </div>

            {/* Title and subtitle */}
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-gray-800 m-0 text-4xl md:text-5xl lg:text-6xl text-center md:!text-left leading-tight">
                Try Buzz Cut AI Preview
              </h1>
              <p className="text-gray-800 font-bold text-xl m-0 text-center md:!text-left">
                100% Automatically and{' '}
                <span 
                  className="py-1 px-4 bg-no-repeat bg-cover bg-center inline-block"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='40' viewBox='0 0 120 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 20C10 15 15 10 20 10L100 10C105 10 110 15 110 20C110 25 105 30 100 30L20 30C15 30 10 25 10 20Z' fill='%23f6c63d' stroke='%23f59e0b' stroke-width='2'/%3E%3C/svg%3E")`
                  }}
                >
                  Free
                </span>
              </p>
            </div>
          </div>

          {/* Right side - Upload Card */}
          <div className="order-1 lg:order-2 lg:pl-8">
            <div className="relative group flex flex-col gap-4 md:gap-8 max-w-md mt-8 md:mt-28 mx-auto lg:mx-0">
              {/* Main upload card - Remove.bg style */}
              <div 
                className={`w-full flex flex-col sm:justify-center sm:items-center sm:gap-8 sm:pt-36 sm:pb-16 rounded-[32px] bg-white shadow-2xl transition-all ${
                  dragActive ? 'shadow-3xl transform scale-[1.02]' : ''
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Button
                  size="lg"
                  className="rounded-full font-bold transition ease-in-out text-center inline-flex items-center justify-center focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-primary-hover px-6 py-3 text-2xl py-2.5 text-white bg-[#ff6b6b] hover:bg-[#ff5252] active:bg-[#ff4444]"
                  asChild
                >
                  <a href="/buzz-cut-simulator">
                    <span className="flex px-3">Upload Image</span>
                  </a>
                </Button>

                <div className="hidden sm:flex flex-col gap-1.5">
                  <p className="m-0 font-bold text-xl text-gray-600">or drop a file,</p>
                  <span className="text-xs text-gray-600 text-center">
                    paste image or{' '}
                    <button className="text-gray-600 underline hover:text-gray-800">
                      URL
                    </button>
                    {' '}​
                  </span>
                </div>
              </div>

              {/* Sample images section */}
              <div className="space-y-4">
                <p className="text-gray-600 text-center">
                  No image? Try one of these:
                </p>
                <div className="flex justify-center gap-3">
                  {[1, 2, 3, 4].map((index) => (
                    <button
                      key={index}
                      className="w-16 h-16 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all hover:scale-110 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
                    >
                      <span className="text-xs text-gray-500">Sample {index}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Terms text */}
              <p className="text-xs text-gray-500 text-center">
                By uploading an image you agree to our{' '}
                <a href="/terms" className="text-[#2563eb] hover:underline">Terms of Service</a>.
                To learn more about how we handle your personal data, check our{' '}
                <a href="/privacy" className="text-[#2563eb] hover:underline">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
