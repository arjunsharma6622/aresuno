import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import "./App.css";
import Register from "./Pages/SignUp/Register";
import VendorDashboard from "./Pages/Vendor/Dashboard/VendorDashboard";
import UserDashboard from "./Pages/User/Dashboard/UserDashboard";
import Login from "./Pages/Login/Login";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BusinessOnboarding from "./Pages/BusinessOnboarding/BusinessOnboarding";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import BusinessEdit from "./Pages/BusinessEdit/BusinessEdit";
import { useLayoutEffect } from "react";
import Services from "./Pages/Services/Services";
import BusinessRegister from "./Pages/BusinessRegister/BusinessRegister";
import Business from "./Pages/Business/Business";
import Home from "./Pages/Home/Home";
import { HelmetProvider } from "react-helmet-async";
import PrivacyPolicy from "./Pages/Privacy/Privacy";
import TermsAndConditions from "./Pages/Terms/Terms";
import NotFound from "./Pages/NotFound/NotFound";
import AboutUs from "./Pages/AboutUs/AboutUs";
import MapComponent from "./Pages/BusinessRegister/components/MapComponent";
import ForgetPassword from "./Components/ForgetPassword";
import Blog from "./Pages/Blog/Blog";
import BlogPage from "./Pages/BlogPage/BlogPage";
import BlogEdit from "./Pages/BlogEdit/BlogEdit";
import Doctor from "./Pages/Doctor/Doctor";
import Package from "./Pages/package/Package";

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
  const userRole = useSelector((state) => state.user.role);
  const isHomepage = location.pathname === "/";
  const isBusinessEditPage = location.pathname.match(/\/business\/edit/);
  const isDoctorsPage = location.pathname === "/doctors";

  const user = useSelector((state) => state.user);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {!isLoginPage &&
        !isSignpuPage &&
        !isDashboard &&
        !isOnboarding &&
        !isHomepage &&
        !isBusinessEditPage &&
        !isDoctorsPage &&
        !isAdminPage && <Header />}
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctor />} />
          <Route
            path="/login"
            element={
              user.name ? (
                user.role === "admin" ? (
                  <Navigate to={`/admin`} />
                ) : (
                  <Navigate to={`/dashboard`} />
                )
              ) : (
                <Login />
              )
            }
          />
          <Route path="/signup" element={<Register />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/package" element={<Package />} />
          <Route
            path="/dashboard/*"
            element={
              !user.name ? (
                <Navigate to={`/login`} />
              ) : userRole === "vendor" ? (
                <VendorDashboard />
              ) : (
                userRole === "user" && <UserDashboard />
              )
            }
          />
          <Route path="/vendor/onboarding/" element={<BusinessOnboarding />} />
          <Route path="*" element={<NotFound />} />
          <Route path={"/business/:businessName"} element={<Business />} />
          <Route path={"/business/edit/:id"} element={<BusinessEdit />} />
          <Route
            path={"/admin"}
            element={
              !user.name ? (
                <Navigate to={`/login`} />
              ) : userRole === "admin" ? (
                <AdminDashboard />
              ) : (
                <div>
                  <h1>You dont have correct previleges to access this page</h1>
                </div>
              )
            }
          />
          <Route path={"/:city/:categoryName"} element={<Services />} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/map" element={<MapComponent />} />
          <Route
            path="/blog/:categoryName"
            element={<Blog categoryBlogPage={true} />}
          />
          <Route path="/blog/" element={<Blog categoryBlogPage={false} />} />
          <Route
            path="/blog/:categoryName/:blogId"
            element={<BlogPage categoryBlogPage={false} />}
          />
          <Route path="/blog/edit/:blogId" element={<BlogEdit />} />
          <Route path="/business/register" element={<BusinessRegister />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
        </Routes>
      </div>
      {!isLoginPage &&
        !isSignpuPage &&
        !isDashboard &&
        !isBusinessEditPage &&
        !isOnboarding &&
        !isAdminPage && <Footer />}
    </>
  );
}

export default App;
