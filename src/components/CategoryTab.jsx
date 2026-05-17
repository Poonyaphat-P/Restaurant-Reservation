import categoryBg from '../assets/categorytab_wallpaper.avif'

export default function CategoryTab() {
  return (
    <>
      {/* ส่วนที่ 1: แบนเนอร์รูปภาพ + ฟิล์มดำ */}
      <div 
        className="relative bg-cover bg-center pt-28 py-8 px-4" 
        style={{ backgroundImage: `url(${categoryBg})` }}
      >
        <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="text-7xl text-white font-serif tracking-wide">Menu</div>
          <div className="text-2xl pt-2 font-serif text-white tracking-wider">
            Each dish is prepared to honor balance, texture, and flavor.
          </div>
        </div>
      </div>

      {/* ส่วนที่ 2: แถบหมวดหมู่สีดำหรูหรา แยกออกมาต่างหาก */}
      <div className="bg-neutral-950/95 backdrop-blur-md py-2 border-b border-white/10 sticky top-20 z-20">
        <div className="flex gap-22 justify-center font-medium text-white/80 overflow-x-auto no-scrollbar py-2">
          <h1 className="cursor-pointer hover:text-yellow-500 transition-colors whitespace-nowrap">Seasonal</h1>
          <h1 className="cursor-pointer hover:text-yellow-500 transition-colors whitespace-nowrap">Ramen</h1>
          <h1 className="cursor-pointer hover:text-yellow-500 transition-colors whitespace-nowrap">Rice Bowls</h1>
          <h1 className="cursor-pointer hover:text-yellow-500 transition-colors whitespace-nowrap">Sashimi</h1>
          <h1 className="cursor-pointer hover:text-yellow-500 transition-colors whitespace-nowrap">Sides</h1>
          <h1 className="cursor-pointer hover:text-yellow-500 transition-colors whitespace-nowrap">Dessert</h1>
          <h1 className="cursor-pointer hover:text-yellow-500 transition-colors whitespace-nowrap">Drinks</h1>
        </div>
      </div>
    </>
  )
}