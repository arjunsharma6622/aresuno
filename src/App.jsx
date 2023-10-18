import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import UserDashboard from './Components/User/Dashboard/UserDashboard'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Login from './Components/Login/Login'
import Register from './Components/User/Register'
import VendorRegister from './Components/Vendor/VendorRegister'
import VendorDashboard from './Components/Vendor/Dashboard/VendorDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Header />
        <div className='app'>
          {/* <Header /> */}
          <Routes>
            <Route
              path='/'
              element={
                <div className='h-[100vh] flex flex-col items-center justify-center text-blue-600 text-3xl'> 
                  <h1>Welcome to Aresuno</h1>
                </div>
              }
            />
            <Route path='/login' element={<Login />} />
            {/* <Route path='/vendor/register' element={<SlidingVendorLoginRegister />} /> */}
            <Route path='/user/register' element={<Register />} />
            <Route path='/vendor/register' element={<VendorRegister />} />
            <Route path='/user/dashboard' element={<UserDashboard />} />
            <Route path='/vendor/dashboard' element={<VendorDashboard />} />
            <Route path='/contact' element={<h1>Contact</h1>} />
          </Routes>
          {/* <Footer /> */}
        </div>
        {/* <Footer /> */}
      </BrowserRouter>

    </>
  )
}

export default App