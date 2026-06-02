import { useState } from "react";

export default function ContactForm() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  return (
    <div className="flex flex-col gap-4 ">
      <form className="flex flex-col gap-2">
        <label htmlFor="name" className='text-white text-md font-thin'>Name</label>
        <input type="text" 
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)} 
          className="w-full border border-slate-300 bg-slate-50 px-4 py-1 text-slate-900
                      placeholder:text-slate-400 
                      hover:border-gray-500
                      focus:outline-none focus:border-gray-500"
          placeholder="Name"
        />

        <label htmlFor="email" className='text-white text-md font-thin'>Email</label>
        <input type="text" 
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-slate-300 bg-slate-50 px-4 py-1 text-slate-900
            placeholder:text-slate-400 
            hover:border-gray-500
            focus:outline-none focus:border-gray-500"
          placeholder="Email Address"
        />

        <label htmlFor="phone" className="text-white text-md font-thin">Phone</label>
        <input type="text" 
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)} 
          className="w-full border border-slate-300 bg-slate-50 px-4 py-1 text-slate-900
                      placeholder:text-slate-400 
                      hover:border-gray-500
                      focus:outline-none focus:border-gray-500"
          placeholder="Phone Number"
        />

        <label htmlFor="message" className="text-white text-md font-thin">Message</label>
        <input type="text" 
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)} 
          className="w-full border border-slate-300 bg-slate-50 px-4 py-1 text-slate-900
                      placeholder:text-slate-400 
                      hover:border-gray-500
                      focus:outline-none focus:border-gray-500"
          placeholder="Message"
        />

        <button className=" border border-slate-300 bg-slate-50 text-slate-500 hover:border-gray-500 focus:outline-none focus:border-gray-500 w-20 mt-2 mx-auto ">
          Submit
        </button>
      </form>
    </div>
  )
}