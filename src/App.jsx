import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Hero from './Components/Hero/Hero';
import './App.css';
import Register from './Pages/User/Register';
import VendorRegister from './Pages/Vendor/VendorRegister';
import VendorDashboard from './Pages/Vendor/Dashboard/VendorDashboard';
import UserDashboard from './Pages/User/Dashboard/UserDashboard';
import Login from './Pages/Login/Login';
import BusinessRegister from './Pages/BusinessRegister';
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import Business from './Pages/Business';

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

function Main() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isSignpuPage = location.pathname === '/signup';
  const userType = useSelector((state) => state.user.userType);
  const navigate = useNavigate()


  return (
    <>
      {!isLoginPage && !isSignpuPage && <Header />}
      <div className='app'>
        <Routes>
          <Route path='/' element={<Hero />} />

          <Route path='/login' element={<Login />} />

          <Route path='/signup' element={<Register />} />

          {userType === "vendor" && (
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          )}

          {userType === "user" && (
            <Route path="/user/dashboard" element={<UserDashboard />} />
          )}



          <Route path='/' element={<Business />} />

          <Route path='/contact' element={<h1>Contact</h1>} />

          <Route path='/business/register' element={<BusinessRegister />} />
        </Routes>
      </div>
      {!isLoginPage && !isSignpuPage && <Footer />}
    </>
  );
}

export default App;
