import { useState } from "react";
import CategoryTab from "../components/CategoryTab";
import { menuItems } from "../data/menuData";
import DishCard from "../components/DishCard";
import PageHeader from "../components/PageHeader"
import categoryBg from "../assets/categorytab_wallpaper.avif"
function MenuPage() {

  const [activeCategory, setActiveCategory] = useState("Seasonal");

  const filteredMenu = menuItems.filter(
    (item) => item.category === activeCategory
  );

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

      <div className="max-w-7xl mx-auto px-4 py-12">
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
