import PageHeader from "../components/PageHeader"
import categoryBg from "../assets/categorytab_wallpaper.avif"
import ProfileCard from "../components/ProfileCard"
function AboutUsPage() {
  return (
    <div>
      <PageHeader
        title="Our Story"
        subtitle="Each dish is prepared to honor balance, texture, and flavor." 
        backgroundImage={categoryBg}
      />
      <section className="w-full">
        <div className="max-w-6xl mx-auto px-20 py-5">
          <div className="max-w-4xl p-8">
            <h2 className="text-xl text-white font-bold mb-6">
              About KURO
            </h2>
            <p className="text-md font-thin text-white leading-relaxed pb-5">
              Nestled between quiet streets and the rhythm of the city, the restaurant offers an atmosphere designed to
               slow time and invite conversation. Warm lighting reflects softly across polished surfaces while the aroma 
               of freshly prepared dishes drifts through the dining room. 
            </p>
            <p className="text-md font-thin text-white leading-relaxed pb-5">
              Every corner is arranged with intention, from the gentle music in the background to the subtle textures woven 
              nto the interior design. Guests often arrive expecting only a meal and leave remembering the experience itself 
              — the calm energy, the carefully crafted presentation, and the feeling of comfort that lingers long after the 
              evening ends. Throughout the day, the space transforms naturally with the movement of sunlight and the changing 
              pace of visitors. Afternoon gatherings bring a relaxed elegance, while evenings introduce a more intimate mood 
              filled with quiet laughter and glowing reflections. Seasonal ingredients inspire a constantly evolving selection 
              of dishes, each prepared with attention to detail and balance.
            </p>
            <p className="text-md font-thin text-white leading-relaxed">
              The restaurant embraces both simplicity and 
              sophistication, creating a setting where familiar flavors feel elevated and every visit feels slightly different 
              from the last.
            </p>
            <p className="text-xl text-white font-bold mt-5">
              Our Teams
            </p>
          </div>

          <div className="grid grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
            <ProfileCard 
              image=""
              name="Chef's Name"
              role="Executive Chef"
            />
            <ProfileCard 
              image=""
              name="Chef's Name"
              role="Executive Chef"
            />
            <ProfileCard 
              image=""
              name="Chef's Name"
              role="Executive Chef"
            />
            <ProfileCard 
              image=""
              name="Chef's Name"
              role="Executive Chef"
            />
            <ProfileCard 
              image=""
              name="Chef's Name"
              role="Executive Chef"
            />
            <ProfileCard 
              image=""
              name="Chef's Name"
              role="Executive Chef"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUsPage