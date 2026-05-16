import { StarIcon } from '@heroicons/react/20/solid'

export default function Review({ review, stars, name }) {
  return (
    
    <div className="group relative bg-neutral-900 border border-white/5 transition-all">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-5 w-5 ${i < stars ? 'text-yellow-500' : 'text-neutral-700'}`} 
          />
        ))}
      </div>
    </div>
  )
}