import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"

const STATUS_OPTIONS = ["new", "in_progress", "resolved"]
const STATUS_STYLE = {
  new: "bg-green-300",
  in_progress: "bg-yellow-200",
  resolved: "bg-red-200"
}

function FormCard({ form, onStatusChange, onDelete }) {
  const [selected, setSelected] = useState(form.status)
  const [changed, setChanged] = useState(false)

  const handleChange = (e) => {
    setSelected(e.target.value)
    setChanged(e.target.value !== form.status)
  }

  const handleSave = () => {
    onStatusChange(form.id, selected)
    setChanged(false)
  }

  return (
    <div className={`relative p-4 border rounded-lg ${STATUS_STYLE[form.status]}`}>
      <button
        onClick={() => onDelete(form.id)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      >
        <Trash2 size={18} />
      </button>
      <h2>Name: {form.name}</h2>
      <p>Email: {form.email}</p>
      <p>Phone: {form.phone}</p>
      <p>Message: {form.message}</p>
      <p>Time: {form.created_at}</p>
      <div className="flex items-center gap-2 mt-2">
        <select value={selected} onChange={handleChange} className="border rounded px-2 py-1 text-sm">
          {STATUS_OPTIONS.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {changed && (
          <button onClick={handleSave} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
            Save
          </button>
        )}
      </div>
    </div>
  )
}

export default function ReadForm() {
  const [forms, setForms] = useState([])

  useEffect(() => {
    fetch('/api/admin/contact')
      .then(res => res.json())
      .then(data => { if (!data.error) setForms(data.data) })
      .catch(err => console.error(err))
  }, [])

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/admin/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setForms(prev => prev.map(f => f.id === id ? { ...f, status: newStatus } : f))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    await fetch(`/api/admin/contact/${id}`, { method: "DELETE" })
    setForms(prev => prev.filter(f => f.id !== id))
  }

  const sections = [
    { label: "NEW MESSAGE", status: "new" },
    { label: "In Progress", status: "in_progress" },
    { label: "Closed", status: "resolved" },
  ]

  return (
    <div>
      {sections.map(({ label, status }) => (
        <div key={status}>
          <div className="text-center font-bold">{label}</div>
          <div className="p-6 max-w-4xl mx-auto space-y-6 text-left">
            {forms.filter(f => f.status === status).map(form => (
              <FormCard
                key={form.id}
                form={form}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}