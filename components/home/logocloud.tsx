export default function LogoCloud() {
  return (
    <div className="-my-4 md:-my-6 lg:-my-12">
      <div className="bg-card py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Built with Advanced Technology Stack
            </h2>
            <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
              Integrating industry-leading AI models and modern web technologies to provide you with exceptional buzz cut preview experience
            </p>
            <div className="mx-auto mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:grid-cols-6">
              {/* Flux AI Logo */}
              <div className="flex flex-col items-center gap-3">
                <div className="max-h-12 w-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-sm font-medium">Flux AI</span>
              </div>

              {/* Next.js Logo */}
              <div className="flex flex-col items-center gap-3">
                <img
                  alt="Next.js"
                  src="https://cdn.worldvectorlogo.com/logos/nextjs-2.svg"
                  width={80}
                  height={48}
                  className="max-h-12 w-auto object-contain filter dark:invert"
                />
                <span className="text-sm font-medium">Next.js</span>
              </div>

              {/* Supabase Logo */}
              <div className="flex flex-col items-center gap-3">
                <img
                  alt="Supabase"
                  src="https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png"
                  width={80}
                  height={48}
                  className="max-h-12 w-auto object-contain"
                />
                <span className="text-sm font-medium">Supabase</span>
              </div>

              {/* MediaPipe Logo */}
              <div className="flex flex-col items-center gap-3">
                <div className="max-h-12 w-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">MP</span>
                </div>
                <span className="text-sm font-medium">MediaPipe</span>
              </div>

              {/* TailwindCSS Logo */}
              <div className="flex flex-col items-center gap-3">
                <img
                  alt="TailwindCSS"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png"
                  width={80}
                  height={48}
                  className="max-h-12 w-auto object-contain"
                />
                <span className="text-sm font-medium">TailwindCSS</span>
              </div>

              {/* TypeScript Logo */}
              <div className="flex flex-col items-center gap-3">
                <img
                  alt="TypeScript"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png"
                  width={80}
                  height={48}
                  className="max-h-12 w-auto object-contain"
                />
                <span className="text-sm font-medium">TypeScript</span>
              </div>
            </div>
            
            {/* Additional tech badges */}
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                IP-Adapter FaceID
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                ControlNet
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Face Protection Tech
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                HD Rendering
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
