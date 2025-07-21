'use client'

import { SparklesIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline'
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

  return (
    <section className="relative bg-white min-h-[80vh] flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Buzz Cut Preview{' '}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                100% Automatically
              </span>{' '}
              and{' '}
              <span className="relative">
                Free
                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 120 12" fill="none">
                  <path
                    d="M2 10C20 4 40 2 60 6C80 2 100 4 118 10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="text-yellow-400"
                  />
                </svg>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Buzz cut preview: Fully automated in{' '}
              <span className="font-semibold text-primary">5 seconds</span> with{' '}
              <span className="font-semibold text-primary">1 click</span>
            </p>
            
            <p className="text-gray-500 max-w-2xl mx-auto">
              Thanks to our AI, you can see your buzz cut transformation instantly. 
              Upload any photo and watch the magic happen automatically.
            </p>
          </div>

          {/* Upload Section - Remove.bg Style */}
          <div className="max-w-lg mx-auto">
            <div 
              className={`relative p-16 border-2 border-dashed rounded-3xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-gray-50 to-white hover:from-blue-50 hover:to-white ${
                dragActive 
                  ? 'border-primary bg-primary/5 scale-105' 
                  : 'border-gray-300 hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="text-center space-y-6">
                <CloudArrowUpIcon className="w-16 h-16 text-gray-400 mx-auto" />
                
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 h-auto rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <a href="/buzz-cut-simulator">
                    Upload Image
                  </a>
                </Button>
                
                <div className="space-y-2">
                  <p className="text-gray-600 font-medium">or drop a file,</p>
                  <p className="text-sm text-gray-500">
                    paste image or{' '}
                    <button className="text-primary hover:underline font-medium">
                      URL
                    </button>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Sample Images */}
            <div className="mt-8 space-y-4">
              <p className="text-gray-600 text-center font-medium">
                No image? Try one of these:
              </p>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4].map((index) => (
                  <button
                    key={index}
                    className="w-16 h-16 rounded-xl overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all hover:scale-110 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm hover:shadow-md"
                  >
                    <span className="text-xs text-gray-500 font-medium">Sample {index}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-4 h-4" />
              <span>AI-Powered</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <span>No Registration Required</span>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <span>Instant Results</span>
          </div>

          {/* Privacy Notice */}
          <p className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
            By uploading an image you agree to our{' '}
            <a href="/terms" className="text-primary hover:underline">Terms of Service</a>.
            To learn more about how we handle your personal data, check our{' '}
            <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
