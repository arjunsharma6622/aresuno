import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Hero from './Components/Hero/Hero'
import './App.css'
import Register from './Pages/User/Register'
import VendorRegister from './Pages/Vendor/VendorRegister'
import VendorDashboard from './Pages/Vendor/Dashboard/VendorDashboard'
import UserDashboard from './Pages/User/Dashboard/UserDashboard'
import Login from './Pages/Login/Login'
import LoginX from './Pages/Login/LoginX'
import BusinessRegister from './Pages/Business'


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className='app'>
          <Routes>
            <Route path='/' element={<Hero />} />
            <Route path='/login' element={<Login />} />
            {/* <Route path='/loginx' element={<LoginX />} /> */}
            <Route path='/user/register' element={<Register />} />
            <Route path='/vendor/register' element={<VendorRegister />} />
            <Route path='/user/dashboard' element={<UserDashboard />} />
            <Route path='/vendor/dashboard' element={<VendorDashboard />} />
            <Route path='/contact' element={<h1>Contact</h1>} />
            <Route path='/business/register' element={<BusinessRegister />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App