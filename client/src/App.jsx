import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './Components/User/Register/Register'
import VendorRegister from './Components/Vendor/Register/VendorRegister'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <div className='app'>
          {/* <Header /> */}
          <Routes>
            <Route path='/' element={<><a href="/user/register">User Register</a> <br /> <a href="/vendor/register">Vendor Register</a></>} />
            <Route path='/user/register' element={<Register />} />
            <Route path='/vendor/register' element={<VendorRegister />} />
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


