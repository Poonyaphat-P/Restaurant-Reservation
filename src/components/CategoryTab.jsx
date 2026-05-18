import categoryBg from '../assets/categorytab_wallpaper.avif'

export default function CategoryTab({activeCategory, setActiveCategory}) {
  return (
    <>
      <div className="bg-neutral-950/95 backdrop-blur-md py-2 border-b border-white/10 sticky top-0 z-20 ">
        <div className="flex gap-6 md:gap-12 lg:gap-22 justify-center font-medium text-white/80 overflow-x-auto no-scrollbar py-2">

          {["Seasonal", "Ramen", "Rice Bowls", "Dessert", "Sides", "Drink"].map((category)=> (
            <h1 key={category}
            onClick={() => setActiveCategory(category)}
            className={`cursor-pointer transition-all whitespace-nowrap px-2 py-1 ${
                activeCategory === category 
                  ? "text-yellow-500 border-b-2 border-yellow-500" 
                  : "text-white/80 hover:text-yellow-500"
              }`}
            >
              {category}
            </h1>
          ))}
          
        </div>
      </div>
    </>
  )
}