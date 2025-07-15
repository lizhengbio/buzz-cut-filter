'use client'

import { Camera, Scissors, Download, Palette } from 'lucide-react'

const features = [
  {
    name: 'Real-time Preview',
    description:
      'See how you look with different buzz cut lengths instantly using your camera. No need to upload photos - get immediate feedback on your appearance.',
    icon: Camera,
  },
  {
    name: 'Precise Length Control',
    description:
      'Choose from 12 different guard lengths (1mm to 12mm) to find your perfect buzz cut. Each length is precisely calibrated for realistic results.',
    icon: Scissors,
  },
  {
    name: 'Color Variations',
    description:
      'Experiment with different hair colors including natural, black, brown, blonde, and gray. See how different colors complement your features.',
    icon: Palette,
  },
  {
    name: 'HD Downloads',
    description:
      'Download high-resolution images of your buzz cut preview. Share with friends or save for your barber visit - completely free with no watermarks.',
    icon: Download,
  },
]

export default function Features() {
  return (
    <div id="features" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-primary">AI-Powered Hair Simulation</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl lg:text-balance">
            Everything you need to try buzz cuts risk-free
          </p>
          <p className="mt-6 text-lg/8 text-muted-foreground">
            Our advanced AI technology helps you visualize how different buzz cut styles and colors 
            will look on you before making any permanent changes. Try unlimited combinations for free.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-foreground">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-primary">
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
