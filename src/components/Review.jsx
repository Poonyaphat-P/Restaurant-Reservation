import { StarIcon } from '@heroicons/react/20/solid'

export default function Review({ review = "", stars = 5, name = "" }) {
  const initials = typeof name === 'string' && name.trim()
    ? name.split(' ').filter(Boolean).map(n => n[0]).join('')
    : '';

  return (
    <div className="group relative bg-neutral-900/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl transition-all duration-300 hover:bg-neutral-800 hover:border-white/20 hover:-translate-y-1">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-4 w-4 ${i < stars ? 'text-yellow-500' : 'text-neutral-800'}`} 
          />
        ))}
      </div>
      <blockquote className="text-white/90 text-sm leading-relaxed mb-6 italic">
        "{review}"
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-neutral-700 to-neutral-600 flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-wider">
          {initials}
        </div>
        <p className="text-gray-400 text-xs font-medium tracking-wide uppercase">{name}</p>
      </div>
    </div>
  )
}