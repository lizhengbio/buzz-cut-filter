'use client'

const stats = [
  { id: 1, name: 'Satisfied Users', value: '10,000+' },
  { id: 2, name: 'Preview Success Rate', value: '98.5%' },
  { id: 3, name: 'Average Processing Time', value: '2 mins' },
  { id: 4, name: 'Face Similarity Score', value: '95%+' },
]

export default function Stats() {
  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
              Trusted AI Hair Preview Platform
            </h2>
            <p className="mt-4 text-lg/8 text-muted-foreground">
              Based on advanced AI technology, providing safe and reliable buzz cut preview services to users worldwide
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-secondary/10 p-8">
                <dt className="text-sm/6 font-semibold text-muted-foreground">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-foreground">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
} 