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
          {/* Left side - Hero Image with background shape */}
          <div className="relative order-2 lg:order-1">
            {/* Organic yellow background shape */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 140C100 100 140 60 180 60C220 60 240 40 280 60C320 80 340 120 340 160C340 200 360 240 340 280C320 320 280 340 240 340C200 340 160 360 120 340C80 320 60 280 60 240C60 200 40 160 60 120C80 80 100 100 100 140Z' fill='%23f6c63d' opacity='0.9'/%3E%3C/svg%3E")`,
                backgroundSize: '380px 380px',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                transform: 'translateX(-20px)'
              }}
            />

            {/* Main hero image placeholder */}
            <div className="relative z-10 max-w-sm mx-auto lg:mx-0">
              <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <SparklesIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">Buzz Cut Transformation</p>
                </div>
              </div>
            </div>

            {/* Additional decorative elements */}
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400/20 rounded-full -translate-x-16 translate-y-16"></div>
            <div className="absolute top-1/4 right-0 w-20 h-20 bg-yellow-400/30 rounded-full translate-x-10"></div>
          </div>

          {/* Right side - Text and Upload */}
          <div className="order-1 lg:order-2 lg:pl-8">
            <div className="space-y-8">
              {/* Title and badge */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  Try Buzz Cut
                  <br />
                  AI Preview
                </h1>

                <div className="flex items-center flex-wrap gap-3">
                  <span className="text-lg text-gray-600">100% Free and</span>
                  <span className="bg-yellow-400 text-gray-800 font-medium px-3 py-1 text-lg">
                    Instant
                  </span>
                </div>
              </div>

              {/* Upload area */}
              <div className="space-y-6">
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 bg-gray-50/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Button
                    size="lg"
                    className="bg-[#2563eb] hover:bg-blue-600 text-white px-8 py-3 text-lg rounded-full font-medium"
                    asChild
                  >
                    <a href="/buzz-cut-simulator">
                      Upload Photo
                    </a>
                  </Button>

                  <div className="mt-6 space-y-2">
                    <p className="text-gray-600">or drop a file,</p>
                    <p className="text-gray-600">
                      paste image or{' '}
                      <button className="text-[#2563eb] hover:underline">
                        use camera
                      </button>
                    </p>
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
      </div>
    </section>
  )
}
