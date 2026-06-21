import AdminForm from "../components/AdminForm";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-black py-20">
      <div className="bg-white mx-auto max-w-[580px] px-2 rounded-lg">
        <AdminForm />
      </div>
    </div>
  )
}