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
    <div id="features" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-primary">Core Technology Advantages</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl lg:text-balance">
            Safe, Smart, High-Quality Buzz Cut Preview Experience
          </p>
          <p className="mt-6 text-lg/8 text-muted-foreground">
            Combining cutting-edge AI technology with face protection mechanisms to provide you with reliable buzz cut hair previews.
            See your final look before cutting and make the smartest hairstyle choice.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-foreground">
                  <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon aria-hidden="true" className="size-6 text-primary-foreground" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-muted-foreground">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
