import { useState, useRef } from "react";

export default function ReservationForm() {
    const [guests, setGuests] = useState("1");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const dateInputRef = useRef(null);
    const timeInputRef = useRef(null);
    return (
        <div>
        <div className="grid grid-cols-3 bg-white mx-40 rounded-full">
            <label htmlFor="guests" className="relative bg-white flex items-center justify-center py-4 rounded-l-full cursor-pointer hover:bg-gray-200">
                <span className="text-black font-semibold">Guests : {guests}</span>
                <select 
                    id="guests" 
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </label>
            <label onClick={() => dateInputRef.current.showPicker()} htmlFor="date" className="relative bg-white flex items-center justify-center py-4 cursor-pointer hover:bg-gray-200 border-x border-gray-200">
                <span className="text-black font-semibold"> {date ? `Date: ${date}` : "Date"}</span>
                <input type="date" 
                    id="date" 
                    ref={dateInputRef}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </label>
            <label onClick={() => timeInputRef.current.showPicker()} htmlFor="time" className="relative bg-white flex items-center justify-center py-4 rounded-r-full cursor-pointer hover:bg-gray-200">
                <span className="text-black font-semibold"> {time ? `Time: ${time}` : "Time"}</span>
                <input type="time" 
                    id="time" 
                    ref={timeInputRef}
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-40 my-10">
            <div className="flex flex-col gap-4 bg-red-900 my-10">
                <form className="flex flex-col gap-4 py-4 px-4">
                    <label htmlFor="name" className='text-white'>Name</label>
                    <input type="text" 
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    />

                    <label htmlFor="phone" className="text-white">Phone</label>
                    <input type="text" 
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)} 
                    />

                    <label htmlFor="email" className="text-white">Email</label>
                    <input type="text" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    />

                    <label htmlFor="description" className="text-white">Description</label>
                    <input type="text" 
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} 
                    />
                </form>
            </div>
        <div>
            
        
        </div>
        </div>
        </div>
        
    )
}