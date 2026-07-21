import { useState, useRef } from "react";
import Carousel from "./Carousel.jsx";
import sample1 from "../assets/sample1.jpg";
import sample2 from "../assets/sample2.jpg";
import sample3 from "../assets/sample3.jpg";
import sample4 from "../assets/sample4.jpg";

export default function ReservationForm() {
  const images = [
    sample1,
    sample2,
    sample3,
    sample4
  ];
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [notification, setNotification] = useState(null);
  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const reservationForm = new FormData()
    
    reservationForm.append('partySize', parseInt(guests, 10))
    reservationForm.append('reservationDate', date)
    reservationForm.append('reservationTime', time.replace(' PM', ''))
    reservationForm.append('f_name', firstname)
    reservationForm.append('l_name', lastname)
    reservationForm.append('phone', phone)
    reservationForm.append('email', email)
    reservationForm.append('description', description)
    reservationForm.append('status', 'pending')

    try {
      const response = await fetch('/api/reservation', {
        method: 'POST',
        body: reservationForm,
      })

      const data = await response.json()

      if (response.ok && !data.error) {
        setNotification({ type: 'success', message: data.message || 'Message sent successfully!' })
        setGuests('')
        setDate('')
        setTime('')
        setFirstName('')
        setLastName('')
        setPhone('')
        setEmail('')
        setDescription('')
      } else {
        setNotification({ type: 'error', message: data.message || 'Failed to send message. Please try again.' })
      }
    } catch (err) {
      console.error('fetch error', err)
      setNotification({ type: 'error', message: 'An error occurred. Please try again.' })
    }
  }
  
  return (
    <div className="pb-12 px-2 sm:px-5 md:px-10 lg:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 bg-white rounded-2xl md:rounded-full mt-10 shadow-lg">
        <label htmlFor="guests" className="relative bg-white flex items-center justify-center py-4 rounded-t-2xl md:rounded-l-full cursor-pointer hover:bg-gray-200">
          <span className="text-black font-semibold">Guests : {guests}</span>
          <select 
            id="guests" 
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          >
            <option value="1 Guest">1 Guest</option>
            <option value="2 Guests">2 Guests</option>
            <option value="3 Guests">3 Guests</option>
            <option value="4 Guests">4 Guests</option>
            <option value="5 Guests">5 Guests</option>
            <option value="6 Guests">6 Guests</option>
            <option value="7 Guests">7 Guests</option>
            <option value="8 Guests">8 Guests</option>
            <option value="9 Guests">9 Guests</option>
            <option value="10 Guests">10 Guests</option>
          </select>
        </label>
        <label onClick={() => dateInputRef.current.showPicker()} htmlFor="date" className="relative bg-white flex items-center justify-center py-4 cursor-pointer hover:bg-gray-200 border-y md:border-y-0 md:border-x border-gray-200">
          <span className="text-black font-semibold"> {date ? `Date: ${date}` : "Date :"}</span>
          <input type="date" 
            id="date" 
            ref={dateInputRef}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </label>
         <label htmlFor="time" className="relative bg-white flex items-center justify-center py-4 rounded-b-2xl md:rounded-r-full cursor-pointer hover:bg-gray-200">
          <span className="text-black font-semibold">Time : {time}</span>
          <select 
            id="time" 
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          >
            <option value="13:00 PM">13:00 PM</option>
            <option value="14:00 PM">14:00 PM</option>
            <option value="15:00 PM">15:00 PM</option>
            <option value="16:00 PM">16:00 PM</option>
            <option value="17:00 PM">17:00 PM</option>
            <option value="18:00 PM">18:00 PM</option>
            <option value="19:00 PM">19:00 PM</option>
            <option value="20:00 PM">20:00 PM</option>
            <option value="21:00 PM">21:00 PM</option>
            <option value="22:00 PM">22:00 PM</option>
          </select>
        </label>
      </div>
      <div className ="my-10 border border-white/10 bg-black/20 backdrop-blur-sm rounded-3xl p-4 md:p-8">
        <div className="text-left text-white mt-4 mb-6">
          <h1 className="text-3xl md:text-5xl font-semibold font-serif">Fill in your reservation details</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border border-white/10">
          <div>
            <div className="flex flex-col gap-4">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4 px-4 ">
                <label htmlFor="firstName" className='text-white text-lg'>First name</label>
                  <input type="text" 
                    id="firstName"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)} 
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900
                      placeholder:text-slate-400 
                      hover:border-gray-500
                      focus:outline-none focus:border-gray-500"
                    placeholder="First Name"
                  />

                  <label htmlFor="lastName" className='text-white text-lg'>Last name</label>
                  <input type="text" 
                    id="lastName"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900
                      placeholder:text-slate-400 
                      hover:border-gray-500
                      focus:outline-none focus:border-gray-500"
                    placeholder="Last Name"
                  />

                  <label htmlFor="phone" className="text-white text-lg">Phone</label>
                  <input type="text" 
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)} 
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900
                      placeholder:text-slate-400 
                      hover:border-gray-500
                      focus:outline-none focus:border-gray-500"
                    placeholder="Phone Number"
                  />

                  <label htmlFor="email" className="text-white text-lg">Email</label>
                  <input type="text" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900
                      placeholder:text-slate-400 
                      hover:border-gray-500
                      focus:outline-none focus:border-gray-500"
                    placeholder="Email Address"
                  />

                  <label htmlFor="description" className="text-white text-lg">Description</label>
                  <input type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900
                      placeholder:text-slate-400 
                      hover:border-gray-500
                      focus:outline-none focus:border-gray-500"
                    placeholder="Add any special requests or preferences" 
                  />
                <button 
                  type="submit"
                  className="rounded-sm border border-slate-300 bg-slate-50 text-slate-900 hover:border-gray-500 focus:outline-none focus:border-gray-500 mx-auto w-32 mt-2 ">
                  Submit
                </button>
              </form>


              <div>
                <h1 className="text-white text-4xl font-serif px-3">A Dining Experience to Remember</h1>
                <p className="text-white text-md px-3 py-4 ">At our restaurant, every reservation is more than just a meal — 
                  it is an experience carefully crafted to bring people together through exceptional food, warm hospitality, 
                  and an unforgettable atmosphere. From the moment you arrive, our team is dedicated to making your visit 
                  comfortable, relaxing, and memorable. Each dish is prepared using high-quality ingredients and thoughtful 
                  presentation to create flavors that leave a lasting impression. Whether you are celebrating a special occasion, 
                  enjoying a romantic evening, or simply sharing time with friends and family, we strive to deliver an experience 
                  that feels both elegant and welcoming. We look forward to serving you and creating moments worth returning for.</p>
              </div>
            </div>
          </div>

            <div className="grid grid-rows-2 gap-1">
              
              <div className="flex justify-center items-start p-6 lg:p-6">
                <Carousel images={images} />
              </div>

              <div className="mx-6 flex flex-col rounded-xl shadow-md overflow-hidden">
                <div className="h-56">
                  <iframe 
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.613365833054!2d100.30865517532325!3d13.802165686594963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e293ae4612d80b%3A0x8f34af5a14567c77!2zS2F2ZSBTYWxheWEgKOC5gOC4hOC4nyDguKjguLLguKXguLLguKLguLIp!5e0!3m2!1sth!2sth!4v1779000950863!5m2!1sth!2sth"
                    style={{border: 0}} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                  </iframe>
                </div>
                <div className="bg-white p-4 flex flex-col gap-3 rounded-b-xl">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Kuro Japanese Restaurant</h3>
                    <p className="text-gray-500 text-sm">123 Your Street, Bangkok 10100</p>
                  </div>
                  <hr className="border-gray-200" />
                  <a href="https://maps.google.com" className="flex items-center gap-3 text-blue-600 hover:underline text-sm">
                    📍 Get Directions
                  </a>
                  <hr className="border-gray-200" />
                  <a href="tel:021234567" className="flex items-center gap-3 text-blue-600 hover:underline text-sm">
                    📞 02-123-4567
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
}