import Banner from "./components/Banner";
import ServiceCategories from "./components/ServiceCategories";
import Testimonials from "./components/Testimonials";
import AboutUs from "./components/AboutUs";
import MainCategories from "./components/MainCategories";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getBanner } from "../../state/slices/bannerSlice";
import { useEffect } from "react";
import { Swiper } from 'swiper/react';

import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { Helmet } from "react-helmet-async";
import { userLogout } from "../../state/slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/util";
import { setAllCategories } from "../../state/slices/categoriesSlice";
import { setAllCategoryTitle } from "../../state/slices/categoriestitleSlice";


const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const fetchBanner = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/banner`
      );
      dispatch(getBanner(res.data[0].image));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${API_URL}/api/userData`, {
        headers: { Authorization: `Bearer ${token}` },
        });

        console.log(res.data)
    }
    catch (err) {

      // console.log(err.response.data.message);
      toast.error(err.response.data.message);

      if(err.response.data.message === "Unauthorized"){
        localStorage.removeItem("token");
        dispatch(userLogout())
      }
    }
  }



  useEffect(() => {
    fetchUserData()
    fetchBanner();
  }, []);


  const fetchAllCategories = async () => {
    try {
      console.log('fetching........')
      const res = await axios.get(`${API_URL}/api/category/`);
      const resTitles = await axios.get(`${API_URL}/api/category-title/`);
      dispatch(setAllCategories(res.data));
      dispatch(setAllCategoryTitle(resTitles.data));
      console.log("Categories fetched:", res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };
  useEffect(() => {
    fetchAllCategories();
  }, []);




  return (
    <div className="bg-white flex flex-col gap-4">
      <Helmet>
        <title>Aresuno - Home</title>
        <meta name="description" content="Aresuno - Home" />
        <meta name="keywords" content="Aresuno - Home" />
        <meta name="author" content="Aresuno - Home" />
        <link rel="canonical" href="https://www.aresuno.com" />
      </Helmet>

      <Banner />
      <MainCategories />
      <ServiceCategories />
      <div className="bg-gray-300 h-[120px] md:h-[300px] w-full mt-5">
  </div>



    </div>
  );
};

export default Home;
