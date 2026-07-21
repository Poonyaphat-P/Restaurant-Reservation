import {useState, useEffect } from 'react'
import { Trash2 } from "lucide-react"
import authFetch from '../../utils/authFetch'

export default function Reservation () {
  const [reservations, setReservations] = useState([])
  
  const handleDelete = async (id) => {
    await authFetch(`/api/admin/reservations/${id}`, {
      method: 'DELETE',
    })
    setReservations(reservations.filter(reservation => reservation.id !== id))
  }

useEffect(() => {
  authFetch('/api/admin/reservations')
    .then(res => res.json())
    .then(data => setReservations(data.data))
    .catch(err => console.error(err))
}, [])
    
  return (
    <div className ="p-6 max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 gap-4">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="relative bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <button
                onClick={() => handleDelete(reservation.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                  <Trash2 size={18} />
              </button>
              
              <h2 className="text-xl font-bold mb-4 text-gray-800">Reservation #{reservation.id}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-left">
                  <p><span className="font-semibold">Name:</span> {reservation.f_name} {reservation.l_name}</p>
                  <p><span className="font-semibold">Guests:</span> {reservation.party_size}</p>
                  <p><span className="font-semibold">Date:</span> {reservation.reservation_date}</p>
                  <p><span className="font-semibold">Time:</span> {reservation.reservation_time}</p>
                </div>
                <div className="text-left">
                  <p><span className="font-semibold">Phone:</span> {reservation.phone}</p>
                  <p><span className="font-semibold">Email:</span> {reservation.email}</p>
                  <p><span className="font-semibold">Description:</span> {reservation.description}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}