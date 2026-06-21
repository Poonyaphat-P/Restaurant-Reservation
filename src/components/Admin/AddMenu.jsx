import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

export default function AddProduct() {
  const [categoryID, setCategoryID] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const [isRecommended, setIsRecommended] = useState(false)

  const [notification, setNotification] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('categoryID', categoryID)
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('is_recommended', isRecommended ? '1' : '0')
    if (image) formData.append('image', image)

    try {
      const response = await fetch('/api/admin/menu', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (response.ok && !data.error) {
        setNotification({ type: 'success', message: data.message || 'Menu added successfully!' })
        setCategoryID('')
        setName('')
        setDescription('')
        setPrice('')
        setImage(null)
        setIsRecommended(false)
      } else {
        setNotification({ type: 'error', message: data.message || 'Failed to add menu.' })
      }
    } catch (err) {
      console.error('fetch error:', err)
      setNotification({ type: 'error', message: 'An error occurred. Please try again.' })
    }
  }



  return (
    <div>

      {notification && (
      <div className={`px-4 py-3 rounded mb-4 text-sm font-medium
        ${notification.type === 'success'
          ? 'bg-green-100 text-green-700 border border-green-300'
          : 'bg-red-100 text-red-700 border border-red-300'
        }`}>
        {notification.type === 'success' ? '✅' : '❌'} {notification.message}
      </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

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
            src={URL.createObjectURL(image)}
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
        <div className="flex items-center gap-6">
          <span className="w-22 text-left">Show on Homepage</span>
          <div className="flex items-center gap-4">
            <label className={`flex items-center gap-2 px-4 py-1.5 rounded border cursor-pointer transition-colors ${isRecommended ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>
              <input
                type="radio"
                name="isRecommended"
                checked={isRecommended === true}
                onChange={() => setIsRecommended(true)}
                className="hidden"
              />
              <span className="text-sm font-medium">Yes</span>
            </label>
            <label className={`flex items-center gap-2 px-4 py-1.5 rounded border cursor-pointer transition-colors ${!isRecommended ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>
              <input
                type="radio"
                name="isRecommended"
                checked={isRecommended === false}
                onChange={() => setIsRecommended(false)}
                className="hidden"
              />
              <span className="text-sm font-medium">No</span>
            </label>
          </div>
        </div>
        <button className="bg-blue-500 px-3 py-2 text-white rounded-md mt-4 hover:bg-blue-600 cursor-pointer"type="submit">Add Menu</button>
      </form>
    </div>
  )
}
