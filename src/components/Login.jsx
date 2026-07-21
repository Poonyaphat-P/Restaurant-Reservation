import { useState } from "react"
import { useNavigate } from "react-router-dom"
import loginpagebg from "../assets/loginpagebg.jpg"
import { apiUrl } from "../utils/apiBase"
export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const res = await fetch(apiUrl("/api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || "Login failed")
        return
      }
      localStorage.setItem("token", data.token)
      navigate("/admin")
    } catch (err) {
      setError("Server error, please try again")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-center bg-cover" style={{ backgroundImage: `url(${loginpagebg})` }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
      <div className="relative z-10 w-full max-w-md bg-white/95 rounded-lg">
        <h1 className="text-black text-xl font-bold text-center py-5 border-b border-gray-300">Login</h1>
        <div className="p-5">
          <form onSubmit={handleSubmit}>
            <legend className="text-black/75 text-md font-medium mb-5">Welcome back, enter your details</legend>
            {error && (
              <div className="mb-3 text-red-600 text-sm">{error}</div>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-300 bg-slate-50 px-4 py-1 text-slate-900"
                placeholder="Email Address"
              />
            </div>
            <div>
              <label htmlFor="password" className="">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-300 bg-slate-50 px-4 py-1 text-slate-900"
                placeholder="Password"
              />
            </div>
            <button className="w-full bg-black text-white hover:border-gray-500 focus:outline-none focus:border-gray-500 mt-5 mx-aut p-2">Sign in</button>
          </form>
        </div>
      </div>
    </div>
    )
}