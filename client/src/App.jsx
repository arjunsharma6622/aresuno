import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './Components/User/Register/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <div className='app'>
          {/* <Header /> */}
          <Routes>
            <Route path='/' element={<Register />} />
            <Route path='/about' element={<h1>About</h1>} />
            <Route path='/contact' element={<h1>Contact</h1>} />
          </Routes>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>

    </>
  )
}

export default App


