import { User } from "lucide-react"
export default function ProfileCard({ image, name, role }) {
  return (
    <div className="group relative overflow-hidden bg-white border border-white/10 rounded-2xl transition-all duration-300 hover:border-white/20 hover:-translate-y-1">
      {/* Image Container */}
      <div className="aspect-square w-full overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-200">
            <User className="w-16 h-16 text-gray-500" />
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-black tracking-tight">{name}</h3>
          <span className="text-yellow-500 font-bold">{role}</span>
        </div>
      </div>
    </div>
  )
}