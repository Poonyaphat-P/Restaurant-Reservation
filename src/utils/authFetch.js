export function clearToken() {
  localStorage.removeItem('token')
}

export default function authFetch(url, options = {}) {
  const token = localStorage.getItem('token')
  const headers = new Headers(options.headers || {})
  if (token) headers.set('Authorization', `Bearer ${token}`)

  return fetch(url, { ...options, headers }).then((res) => {
    if (res.status === 401 || res.status === 403) {
      clearToken()
      window.location.href = '/login'
    }
    return res
  })
}
