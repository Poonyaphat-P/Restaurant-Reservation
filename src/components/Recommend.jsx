import DishCard from './DishCard'
import Review from './Review'

export default function Recommend() {
  return (
    <div className="py-24 bg-black"> {/* add container */}
      <p className="text-white text-left text-5xl px-16 font-semibold"> {/* add container */}
        Recommended Dishes
      </p>
      <p className="text-white text-left text-xl px-16 mt-2 font-medium">
        Signature Flavors of KURO
      </p>
      {/* 1. Create a wrapper for the cards */}
      <div className="mt-10 px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  
        <DishCard 
          title="Premium Sashimi Set" 
          price="฿850" 
          image=""
          description="Selection of the freshest seasonal fish from Toyosu Market."
        />
        <DishCard 
          title="Wagyu A5 Steak" 
          price="฿1,200" 
          image=""
        />
        <DishCard 
          title="Wagyu A5 Steak" 
          price="฿1,200" 
          image=""
        />
        <DishCard 
          title="Wagyu A5 Steak" 
          price="฿1,200" 
          image=""
        />
      </div>

      <p className="text-white text-left text-5xl px-16 mt-10 font-semibold">
        Review from our customers
      </p>
      <p className="text-white text-left text-xl px-16 mt-2 font-medium">
        Crafted moments, shared by our guests.
      </p>
      <div className="px-16 mt-10">
        <Review 
          stars={5} 
          review="Absolutely world-class!" 
          name="Kuro Fan" 
        />
      </div>


    </div>
  )
}