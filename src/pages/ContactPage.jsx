import PageHeader from "../components/PageHeader"
import categoryBg from "../assets/categorytab_wallpaper.avif"
import ContactForm from "../components/ContactForm"

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        title="Contact"
        subtitle="We look forward to serving you."
        backgroundImage={categoryBg}
      />

      <section className="w-full">
        <div className="max-w-6xl mx-auto lg-px-20 lg-py-5">
          <div className="p-8  mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_2fr_1fr] gap-8">
              <div className="place-items-center ">
                <h2 className="text-xl text-white font-bold mb-6">
                  HOURS OF OPERATION
                </h2>
                <ul className="text-md font-thin text-white leading-relaxed pb-5">
                  <li className="mb-2">Monday 5:00 PM - 10:00 PM</li>
                  <li className="mb-2">Tuesday 5:00 PM - 10:00 PM</li>
                  <li className="mb-2">Wednesday 5:00 PM - 10:00 PM</li>
                  <li className="mb-2">Thursday 5:00 PM - 10:00 PM</li>
                  <li className="mb-2">Friday 5:00 PM - 10:00 PM</li>
                  <li className="mb-2">Saturday 5:00 PM - 10:00 PM</li>
                  <li className="mb-2">Sunday 5:00 PM - 10:00 PM</li>
                </ul>
              </div>
              <div className="place-items-center">
                <h2 className="text-center text-xl text-white font-bold mb-6 ">
                  CONTACT
                </h2>
                <ContactForm/>
              </div>
              <div className="place-items-center">
                <h2 className="text-right text-xl text-white font-bold mb-6">
                  LOCATION
                </h2>
                <ul className="text-right text-md font-thin text-white leading-relaxed pb-5">
                  <li className="mb-2">123 Main St</li>
                  <li className="mb-2">Anytown, USA</li>
                  <li className="mb-2">Phone: 123-456-7890</li>
                  <li className="mb-2">Email: [EMAIL_ADDRESS]</li>
                  <li className="mb-2">Instagram: @kuro</li>
                  <li className="mb-2">Website: www.kuro.com</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>    
    </div>
  )
}