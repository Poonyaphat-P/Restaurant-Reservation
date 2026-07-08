import DishCard from './DishCard'
import Review from './Review'
import { useState, useEffect } from 'react'

export default function Recommend() {
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        setMenuItems(data.data)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="py-24 bg-black"> {/* add container */}
      <p className="text-white text-left text-5xl px-16 font-semibold"> {/* add container */}
        Recommended Dishes
      </p>
      <p className="text-white text-left text-xl px-16 mt-2 font-medium">
        Signature Flavors of KURO
      </p>

      {/* 1. Create a wrapper for the cards */}
      <div className="mx-15 mt-10 px-16 flex overflow-x-auto gap-8 pb-8 snap-x" style={{ scrollbarWidth: 'none' }}>
        
        {/* 2. Map over menuItems state */}
        {menuItems.filter(item => item.is_recommended).map((item) => (
          <div key={item.id} className="w-[220px] sm:w-[280px] flex-shrink-0 snap-start">
            <DishCard 
              title={item.name}
              price={`฿${item.price}`}
              image={item.image}
              description={item.description}
            />
          </div>
        ))}

        {menuItems.filter(item => item.is_recommended).length === 0 && (
          <div className="w-full text-center text-gray-500 py-10">
            No recommended dishes yet. Mark items as "Show on Homepage" in the admin panel.
          </div>
        )}

      </div>

      <p className="text-white text-left text-5xl px-16 mt-10 font-semibold">
        Review from our customers
      </p>
      <p className="text-white text-left text-xl px-16 mt-2 font-medium">
        Crafted moments, shared by our guests.
      </p>
      <div className="px-16 mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        <Review 
          stars={5} 
          review="An absolute masterclass in Japanese cuisine. The Omakase was a revelation." 
          name="Alexander M."
        />
        <Review 
          stars={5} 
          review="The Wagyu A5 Steak melts in your mouth. Exceptional service and atmosphere." 
          name="Sarah Jenkins"
        />
        <Review 
          stars={5} 
          review="Minimalist, serene, and authentic. The Uni was incredibly creamy and fresh." 
          name="David Chen"
        />
        <Review 
          stars={5} 
          review="Authentic flavors that remind me of Tokyo. The chef's precision is amazing." 
          name="Yuki Sato"
        />
        <Review 
          stars={4} 
          review="Worth the wait for a reservation. The Otoro was the best I've ever had." 
          name="Michael P."
        />
      </div>


    </div>
  )
}