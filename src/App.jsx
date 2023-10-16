import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Register from './Components/User/Register/Register'
import VendorRegister from './Components/Vendor/Register/VendorRegister'
import SlidingLoginRegister from './Components/User/SlidingLoginRegister'
import SlidingVendorLoginRegister from './Components/Vendor/SlidingVendorLoginRegister'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <div className='app'>
          {/* <Header /> */}
          <Routes>
            <Route
              path='/'
              element={
                <div className='h-[100vh] flex flex-col items-center justify-center underline text-blue-600 text-lg'> 
                  <Link to="/user/register">User Register</Link>
                  <br />
                  <Link to="/vendor/register">Vendor Register</Link>
                </div>
              }
            />
            <Route path='/user/register' element={<SlidingLoginRegister />} />
            <Route path='/vendor/register' element={<SlidingVendorLoginRegister />} />
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
