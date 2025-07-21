'use client'

import { 
  ShieldCheckIcon, 
  SparklesIcon, 
  CameraIcon, 
  SwatchIcon,
  CloudArrowDownIcon,
  BoltIcon 
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Face Protection Technology',
    description:
      'Advanced IP-Adapter FaceID technology ensures generated results maintain original facial features, changing only the hairstyle without altering identity. Safe and reliable AI processing.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Smart Hair Transformation',
    description:
      'Based on Flux Kontext Pro model combined with MediaPipe hair segmentation technology, precisely identifies hair regions to generate realistic buzz cut effects while maintaining original photo style.',
    icon: SparklesIcon,
  },
  {
    name: 'Instant Upload & Use',
    description:
      'Support direct photo upload or camera capture with simple, intuitive interface design. No registration required for trial, see buzz cut preview in seconds.',
    icon: CameraIcon,
  },
  {
    name: 'Multiple Hair Colors',
    description:
      'Offers black, brown, blonde, gray and other color options to meet different users\' personalization needs. Find the buzz cut style that suits you best.',
    icon: SwatchIcon,
  },
  {
    name: 'High-Definition Output',
    description:
      'Generate 1024x1024 high-resolution images, Pro version supports 4K output. One-click download feature for easy saving and sharing of your buzz cut preview.',
    icon: CloudArrowDownIcon,
  },
  {
    name: 'Fast Processing',
    description:
      'Optimized AI processing workflow with average generation time of just 1-3 minutes. Real-time status updates keep you informed of progress for a smooth experience.',
    icon: BoltIcon,
  },
]

export default function Features() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
              AI-powered buzz cut preview: Fully automated in 5 seconds with 1 click
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              Thanks to our advanced AI technology, you can see your buzz cut look instantly - and have more confidence!
            </p>

            <p className="text-gray-600 leading-relaxed">
              No matter if you want to see how a buzz cut looks, try different hair colors,
              or get the perfect preview - you can do all this and more with our AI buzz cut simulator,
              the intelligent preview tool for confident decisions.
            </p>
          </div>

          {/* Right side - Illustration with decorative elements */}
          <div className="relative">
            {/* Background decorative elements */}
            <div className="absolute inset-0">
              <div className="absolute top-10 right-10 w-16 h-16 bg-yellow-400 rounded-full opacity-60"></div>
              <div className="absolute bottom-16 left-8 w-12 h-12 bg-blue-200 rounded-full"></div>
              <div className="absolute top-20 left-16 w-8 h-8 bg-green-200 rounded-full"></div>
              <div className="absolute bottom-8 right-20 w-6 h-6 bg-orange-200 rounded-full"></div>

              {/* Geometric shapes */}
              <div className="absolute top-16 left-4 w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-yellow-400 opacity-60"></div>
              <div className="absolute bottom-20 right-4 w-12 h-12 bg-green-200 transform rotate-45 rounded-sm"></div>

              {/* Decorative lines */}
              <div className="absolute top-32 right-16">
                <div className="space-y-1">
                  <div className="w-8 h-0.5 bg-gray-400 transform rotate-12"></div>
                  <div className="w-6 h-0.5 bg-gray-400 transform rotate-12"></div>
                  <div className="w-10 h-0.5 bg-gray-400 transform rotate-12"></div>
                </div>
              </div>
            </div>

            {/* Main illustration placeholder */}
            <div className="relative z-10 max-w-md mx-auto">
              <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <SparklesIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">AI buzz cut preview illustration</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.slice(0, 6).map((feature) => (
              <div key={feature.name} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-blue-600">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-gray-800">{feature.name}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
