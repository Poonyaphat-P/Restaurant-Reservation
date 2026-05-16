import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Recommend from './components/Recommend'
import Location from './components/Location'

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Recommend />
      <Location />
    </div>
  )
}

export default App
