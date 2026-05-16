import heroBg from '../assets/Homepage Background.jpg'

export default function Hero() {
  return (
    <div className="relative bg-black min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Restaurant Background" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black" />
      </div>

      <div className="relative isolate px-6 pt-14 lg:px-8 z-10 w-full">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
              KURO | Japanese Cuisine | 2026
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
              Where Tradition Meets Precision
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
              Indulge in a culinary journey crafted by world-class chefs. From fresh ingredients to an elegant atmosphere, we bring you the ultimate dining experience.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black shadow-xs hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Book a Table
              </a>
              <a href="#" className="text-sm/6 font-semibold text-white">
                View Menu <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
