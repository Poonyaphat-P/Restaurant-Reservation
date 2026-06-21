import {useState, useEffect} from 'react';
import { Image as ImageIcon } from 'lucide-react'

export default function EditMenu() {

  const [categoryID, setCategoryID] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const [isRecommended, setIsRecommended] = useState(false)

  const[searchCategory, setSearchCategory] = useState('')
  const[searchText, setSearchText] = useState('')
  const[filteredItems, setFilteredItems] = useState([])
  const [items, setItems] = useState([])
  
  const [editingItem, setEditingItem] = useState(null)
  
  const handleRecommendToggle = async (id, value) => {
    try {
      await fetch(`/api/admin/menu/${id}/recommend`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_recommended: value ? 1 : 0 })
      })
      const res = await fetch('/api/admin/menu')
      const data = await res.json()
      setItems(data.data)
    } catch (err) {
      console.error('ERROR:', err)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)

    setCategoryID(item.category_id)
    setName(item.name)
    setDescription(item.description)
    setPrice(item.price)
    setImage(item.image)
    setIsRecommended(item.is_recommended ? true : false)
  }
  
  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append('id', editingItem.id)
      formData.append('categoryID', categoryID)
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('is_recommended', isRecommended ? '1' : '0')
      if (image instanceof File) formData.append('image', image)

      const response = await fetch('/api/admin/menu', {
        method: 'PUT',
        body: formData
      })
      const data = await response.json()
      console.log('Response:', data)

      setEditingItem(null)
      fetch('/api/admin/menu')
        .then(res => res.json())
        .then(d => setItems(d.data))
    } catch (err) {
      console.error('ERROR:', err)
    }
  }

  const toggleRecommend = async (id, current) => {
    try {
      await fetch(`/api/admin/menu/${id}/recommend`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_recommended: !current })
      });
      setItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, is_recommended: !current } : item
        )
      );
    } catch (err) {
      console.error('Toggle failed:', err);
    }
  };
    
  
  useEffect(() => {
    fetch('/api/admin/menu')
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
        {editingItem ? (
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Menu Item: {editingItem.name}</h2>
            
            {/* TODO: Add your edit form fields here */}
            <div className="flex flex-col gap-4">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 bg-gray-50 mb-3">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
                key={image ? 'loaded' : 'empty'}
              />

              {image ? (
                <img
                  src={typeof image === 'string' 
                  ? `/uploads/${image}`          // รูปเดิมจาก DB
                  : URL.createObjectURL(image)   // รูปที่เพิ่งเลือกใหม่
                  }
                  alt="preview"
                  className="h-40 w-40 object-contain rounded-lg"
                />
              ) : (
                <>
                  <ImageIcon size={40} className="text-gray-400 mb-2" />
                  <p className="text-sm text-gray-400">Click to upload image</p>
                </>
              )}
            </label>

            <div className="flex items-center gap-4">
              <label htmlFor="categoryID" className="w-22 text-left">Category ID</label>
              <select
                id="categoryID"
                value={categoryID}
                onChange={(e) => setCategoryID(e.target.value)}
                className="flex-1 border border-gray-300 bg-white px-3 py-1.5 rounded focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="">Select Category ID</option>
                <option value="1">Seasonal</option>
                <option value="2">Ramen</option>
                <option value="3">Rice Bowls</option>
                <option value="4">Dessert</option>
                <option value="5">Sides</option>
                <option value="6">Drink</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="name" className="w-22 text-left">Menu Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 border border-gray-300 px-3 py-1.5 rounded"
                placeholder="Fill in the Menu Name"
              />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="description" className="w-22 text-left">Description</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex-1 border border-gray-300 px-3 py-1.5 rounded"
                placeholder="Fill in the Description"
              />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="price" className="w-22 text-left">Price</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="flex-1 border border-gray-300 px-3 py-1.5 rounded"
                placeholder="Fill in the Price (nuber only)"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-22 text-left">Show on Homepage</label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isRecommended}
                  onChange={(e) => setIsRecommended(e.target.checked)}
                />
                <div className={`relative w-9 h-5 rounded-full transition-colors ${isRecommended ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  <div className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${isRecommended ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
                <span className="ml-2 text-sm text-gray-600">{isRecommended ? 'Featured' : 'Not featured'}</span>
              </label>
            </div>

            <button 
              onClick={() => {
                console.log("BUTTON CLICKED")
                handleSubmit()
              }}
              className="bg-blue-500 px-3 py-2 text-white rounded-md mt-4 hover:bg-blue-600 cursor-pointer"
            >Edit Menu</button>
            <button 
              type="button" 
              onClick={() => setEditingItem(null)}
              className="bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
              </button>
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
                  <div key={item.id} onClick={() => handleEdit(item)} className="border border-gray-200 rounded-lg p-4 gap-4 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
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
                        <div className="flex items-center gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={item.is_recommended ? true : false}
                              onChange={() => handleRecommendToggle(item.id, !item.is_recommended)}
                            />
                            <div className={`relative w-9 h-5 rounded-full transition-colors ${item.is_recommended ? 'bg-blue-600' : 'bg-gray-300'}`}>
                              <div className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${item.is_recommended ? 'translate-x-4' : 'translate-x-0'}`} />
                            </div>
                            <span className="ml-2 text-sm text-gray-600">{item.is_recommended ? 'Featured' : 'Not featured'}</span>
                          </label>
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