import { useState } from "react"
import AddMenu from "./Admin/AddMenu"
import EditMenu from "./Admin/EditMenu"
import DeleteMenu from "./Admin/DeleteMenu"
import ReadForm from "./Admin/ReadForm"
import Reservation from "./Admin/Reservation"
import Navbar from "../components/Navbar"

export default function AdminForm() {
  const [tab, setTab] = useState("add")
  const getTabClass = (currentTab) => {
    const baseClass = "w-full inline-block py-4 border-b-2 rounded-t-base text-body transition-colors"
    const activeClass = "text-fg-brand border-brand font-bold"
    const inactiveClass = "border-transparent hover:text-fg-brand hover:border-brand"
    return `${baseClass} ${tab === currentTab ? activeClass : inactiveClass}`
  }
  return (
    <div>
      <Navbar />
      <div className="text-sm font-medium text-center">
        <ul className="flex -mb-px">          
          <li className="flex-1 text-center">
            <button type="button" className={getTabClass("add")} onClick={() => setTab("add")}>
              Add Product
            </button>
          </li>
          <li className="flex-1 text-center">
            <button type="button" className={getTabClass("edit")} onClick={() => setTab("edit")}>
              Edit Product
            </button>
          </li>
          <li className="flex-1 text-center">
            <button type="button" className={getTabClass("delete")} onClick={() => setTab("delete")}>
              Delete Product
            </button>
          </li>
          <li className="flex-1 text-center">
            <button type="button" className={getTabClass("read")} onClick={() => setTab("read")}>
              Read User Form
            </button>
          </li>
          <li className="flex-1 text-center">
            <button type="button" className={getTabClass("reservation")} onClick={() => setTab("reservation")}>
              Reservation
            </button>
          </li>
        </ul>

        <div className="p-2">
          {tab === "add" && <AddMenu/>}
          {tab === "edit" && <EditMenu/>}
          {tab === "delete" && <DeleteMenu/>}
          {tab === "read" && <ReadForm/>}
          {tab === "reservation" && <Reservation/>}
        </div>
      </div>
    </div>
  )
}