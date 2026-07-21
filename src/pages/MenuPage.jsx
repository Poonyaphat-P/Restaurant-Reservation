import { useState, useEffect } from "react";
import CategoryTab from "../components/CategoryTab";
import DishCard from "../components/DishCard";
import PageHeader from "../components/PageHeader"
import categoryBg from "../assets/categorytab_wallpaper.avif"
function MenuPage() {

  const [activeCategory, setActiveCategory] = useState("Seasonal");
  const [items, setItems] = useState([]);

  const CATEGORY_MAP = {
  "Seasonal": 1,
  "Ramen": 2,
  "Rice Bowls": 3,
  "Dessert": 4,
  "Sides": 5,
  "Drink": 6
  }

  const filteredMenu = items.filter(
    (item) => item.category_id === CATEGORY_MAP[activeCategory]
  )

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        console.log("DATA =", data)
        setItems(data.data)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div>

      <PageHeader
        title="Menu"
        subtitle="Each dish is prepared to honor balance, texture, and flavor." 
        backgroundImage={categoryBg}
      />

      <CategoryTab
        activeCategory = {activeCategory}
        setActiveCategory = {setActiveCategory}
      />

      <div className="max-w-6xl mx-auto px-20 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMenu.map((item) => (
            <DishCard
              key={item.id}
              title={item.name}
              price={`฿${item.price}`}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MenuPage
