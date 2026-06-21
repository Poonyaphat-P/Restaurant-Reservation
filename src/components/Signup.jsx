import { useState } from "react"
import loginpagebg from "../assets/loginpagebg.jpg"

export default function SignUp() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleNext = (e) => {
    e.preventDefault()
    setStep(2)
  }
  const handlePrev = () => {
    setStep(1)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-center bg-cover"
      style={{ backgroundImage: `url(${loginpagebg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
      <div className="relative z-10 w-full max-w-md bg-white/95 rounded-lg overflow-hidden">
        <h1 className="text-black text-xl font-bold text-center py-5 border-b border-gray-300">
          Sign up
        </h1>

        {/* overflow-hidden here so the slider clips at the padded edge */}
        <div className="p-5 overflow-hidden">

          {/* Slider — 200% wide so step1 + step2 sit side by side */}
          <div
            className={`w-[200%] flex transition-transform duration-500 ease-in-out ${
              step === 1 ? "translate-x-0" : "-translate-x-1/2"
            }`}
          >
            {/* ── STEP 1 : EMAIL ── */}
            <div className="w-1/2 ">
								<div className="px-5">
									<form onSubmit={handleNext}>
										<div className="mb-3">
											<label htmlFor="email">Email</label>
											<input
												type="email"
												id="email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												className="w-full border border-slate-300 bg-slate-50 px-4 py-1 text-slate-900"
												placeholder="Email Address"
											/>
										</div>
										<button className="w-full bg-black text-white mt-5 p-2">
											Continue
										</button>
									</form>
								</div>
            </div>

            {/* ── STEP 2 : PASSWORD (placeholder) ── */}
            <div className="w-1/2 ">
							<div className="px-5">
              <form onSubmit={(e) => { e.preventDefault(); console.log("Sign up:", email, password) }}>
                <div className="mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-slate-300 bg-slate-50 px-4 py-1 text-slate-900"
                    placeholder="Password"
                  />
                </div>
								<div className="text-slate-500 text-sm cursor-pointer underline mb-2" onClick={handlePrev}>back </div>
                <button type="submit"
                  className="w-full bg-black text-white p-2">
                  Sign up
                </button>
              </form>
							</div>
            </div>

          </div>{/* end slider */}

        </div>{/* end p-5 */}
      </div>
    </div>
  )
}