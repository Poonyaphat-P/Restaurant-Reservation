import { Navigate } from 'react-router-dom'

function decodeToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (payload.exp && payload.exp * 1000 < Date.now()) return null
    return payload
  } catch {
    return null
  }
}

export default function RequireAdmin({ children }) {
  const token = localStorage.getItem('token')
  const payload = token && decodeToken(token)

  if (!payload || payload.role !== 'admin') {
    return <Navigate to="/login" replace />
  }

  return children
}
