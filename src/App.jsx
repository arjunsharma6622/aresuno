import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import "./App.css";
import Register from "./Pages/User/Register";
import VendorDashboard from "./Pages/Vendor/Dashboard/VendorDashboard";
import UserDashboard from "./Pages/User/Dashboard/UserDashboard";
import Login from "./Pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BusinessOnboarding from "./Pages/BusinessOnboarding/BusinessOnboarding";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import BusinessEdit from "./Pages/BusinessEdit/BusinessEdit";
import axios from "axios";
import { useEffect, useLayoutEffect } from "react";
import Services from "./Pages/Services/Services";
import BusinessRegister from "./Pages/BusinessRegister/BusinessRegister";
import Business from "./Pages/Business/Business";
import Home from "./Pages/Home/Home";
import { setAllCategories } from "./state/slices/categoriesSlice";
import {HelmetProvider} from "react-helmet-async"
import PrivacyPolicy from "./Pages/Privacy/Privacy";
import TermsAndConditions from "./Pages/Terms/Terms";
import NotFound from "./Pages/NotFound/NotFound";
import AboutUs from "./Pages/AboutUs/AboutUs";

function App() {

  return (
    <HelmetProvider>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
    </HelmetProvider>
  );
}

function Main() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSignpuPage = location.pathname === "/signup";
  const isDashboard = location.pathname.match(/\/dashboard/);
  const isOnboarding = location.pathname.match(/\/vendor\/onboarding/);
  const isAdminPage = location.pathname.match(/\/admin/);
  const userType = useSelector((state) => state.user.userType);
  const isHomepage = location.pathname === "/";

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

useLayoutEffect(() => {
  window.scrollTo(0, 0);
}, [location.pathname]);


  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get(
          "https://aresuno-server.vercel.app/api/category/"
        );
        dispatch(setAllCategories(res.data));
        console.log("Categories fetched:", res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchAllCategories();
  }, []);

  return (
    <>
      {!isLoginPage &&
        !isSignpuPage &&
        !isDashboard &&
        !isOnboarding &&
        !isHomepage &&
        !isAdminPage && <Header />}
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={user.name ? <Navigate to={`/`}/> : <Login />} />

          <Route path="/signup" element={user.name ? <Navigate to={`/`}/> : <Register />} />


          <Route path="/privacy" element={<PrivacyPolicy />}/>

          <Route path="/terms" element={<TermsAndConditions />} />

          <Route path="/dashboard/*" element={!user.name ? <Navigate to={`/login`} /> : userType === "vendor" ? <VendorDashboard /> : <UserDashboard />} />

          {/* {userType === "user" && (
            <Route path="/user/dashboard/" element={<UserDashboard />} />
          )} */}


          <Route path="/vendor/onboarding/" element={<BusinessOnboarding />} />
          <Route path="*" element={<NotFound />} />

          <Route path={"/business/:businessName"} element={<Business />} />
          <Route path={"/business/edit/:id"} element={<BusinessEdit />} />
          <Route path={"/admin"} element={<AdminDashboard />} />
          <Route path={"/:subCategoryName"} element={<Services />} />

          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/about" element={<AboutUs />} />

          <Route path="/business/register" element={<BusinessRegister />} />
        </Routes>
      </div>
      {!isLoginPage &&
        !isSignpuPage &&
        !isDashboard &&
        !isOnboarding &&
        !isAdminPage && <Footer />}
    </>
  );
}

export default App;
