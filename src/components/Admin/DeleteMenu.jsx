import { useState, useEffect } from "react"
import authFetch from '../../utils/authFetch'

export default function DeleteMenu() {

  const [searchCategory, setSearchCategory] = useState('')
  const[searchText, setSearchText] = useState('')
  const[filteredItems, setFilteredItems] = useState([])
  const [items, setItems] = useState([])

  const [deletingItem, setDeletingItem] = useState(null)

  const handleDelete = async (id) => {
  try {
    const response = await authFetch(`/api/admin/menu/${id}`, {
      method: 'DELETE'
    })
    const data = await response.json()
    console.log('Response:', data)

    setDeletingItem(null)

    // โหลดรายการใหม่หลังลบสำเร็จ
    authFetch('/api/admin/menu')
      .then(res => res.json())
      .then(d => setItems(d.data))
  } catch (err) {
    console.error('ERROR:', err)
  }
}

  useEffect(() => {
    authFetch('/api/admin/menu')
      .then(res => res.json())
      .then(data => {
        console.log("DATA =", data)
        setItems(data.data)
      })
      .catch(err => console.error(err))
  }, [])
  
  useEffect(() => {
    if (!Array.isArray(items)) {
      console.log("items is not array:", items)
      return
    }

     const filtered = items.filter(item => {
    //การกรองประเภทอาหาร
    const matchCategory =
      searchCategory === '' ||
      String(item.category_id) === String(searchCategory)

    //การกรองชื่ออาหาร
    const matchName =
      item.name.toLowerCase().includes(
        searchText.toLowerCase()
      )

    //แสดงรายการอาหารที่กรองแล้ว
    return matchCategory && matchName // Return TRUE OR FALSE
  })

  setFilteredItems(filtered)
  }, [searchCategory, searchText, items])

  return (
    <div className ="p-6 max-w-4xl mx-auto space-y-6">
        {deletingItem ? (
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex-col gap-4">
              <h3 className="text-lg font-bold text-gray-800">Confirm Deletion</h3>
              <p className="text-gray-600">
                Are you sure you want to delete <span className="font-bold">{deletingItem.name}</span> ?
              </p>

              <div className="mt-3 flex justify-center gap-10">
                <button onClick={() => setDeletingItem(null)} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition">
                  Cancel
                </button>
                <button onClick={() => handleDelete(deletingItem.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className = "flex -space-x-px">
              <select id="searchCategory" 
                value={searchCategory} 
                onChange={(e) => setSearchCategory(e.target.value)} 
                className="flex border border-gray-300 px-3 py-1.5 rounded-l-md"
              >
                <option value="">All Categories</option>
                <option value="1">Seasonal</option>
                <option value="2">Ramen</option>
                <option value="3">Rice Bowls</option>
                <option value="4">Dessert</option>
                <option value="5">Sides</option>
                <option value="6">Drink</option>
              </select>
              
              <input
                type='text'
                placeholder='Search Product'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="flex-1 border border-gray-300 px-3 py-2 focus:z-10"  
              />
            </div>
            
            {/* Show list of all the products */}
            <div className="grid grid-cols-1 gap-4">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div key={item.id} onClick={() => setDeletingItem(item)} className="border border-gray-200 rounded-lg p-4 gap-4 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="grid grid-cols-[1fr_2fr]">
                      <div>
                        <img 
                          src={item.image ? `/uploads/${item.image}` : "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop"} 
                          alt={item.name} 
                          className="w-24 h-24 object-cover rounded-md"
                        />
                      </div>
                      <div className ="text-left">
                        <h3 className="font-semibold text-lg text-gray-800">Name : {item.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">Category ID : {item.category_id}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">Description : {item.description}</p>
                        <div className="mt-2 text-blue-600 font-bold">
                          Price : ${parseFloat(item.price).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-2 text-center py-4">No items found matching your filters.</p>
              )}
            </div>
          </>
        )}
      </div>
    )
}