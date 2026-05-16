export default function DishCard({ image, title, price, description }) {
  return (
    <div className="group relative overflow-hidden bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl transition-all duration-300 hover:bg-neutral-800 hover:border-white/20 hover:-translate-y-1">
      {/* Image Container */}
      <div className="aspect-square w-full overflow-hidden">
        <img 
          src={image || "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop"} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-white tracking-tight">{title || "Dish Name"}</h3>
          <span className="text-yellow-500 font-bold">{price || "฿0"}</span>
        </div>
        <p className="mt-2 text-xs text-gray-400 leading-relaxed line-clamp-2">
          {description || "Experience the authentic taste of KURO with our chef's selection."}
        </p>
      </div>
    </div>
  )
}
