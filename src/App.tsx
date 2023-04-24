import { Routes, Route } from 'react-router-dom'
import { Products } from './pages/Products'
import { Checkout } from './pages/Checkout'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
