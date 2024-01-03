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

const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get(
          "https://aresuno-server.vercel.app/api/banner"
        );
        dispatch(getBanner(res.data[0].image));
      } catch (err) {
        console.log(err);
      }
    };

    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("https://aresuno-server.vercel.app/api/userData", {
          headers: { Authorization: `Bearer ${token}` },
          });

          console.log(res.data)
      }
      catch (err) {

        console.log(err.response.data.message);

        if(err.response.data.message === "Unauthorized"){
          localStorage.removeItem("token");
          dispatch(userLogout())
        }
      }
    }


    fetchUserData()

    fetchBanner();
  }, [dispatch]);

  return (
    <div className="bg-white flex flex-col gap-4">
      <Helmet>
        <title>Aresuno - Home</title>
        <meta name="description" content="Aresuno - Home" />
        <meta name="keywords" content="Aresuno - Home" />
        <meta name="author" content="Aresuno - Home" />
        
      </Helmet>
      <Banner />

      {/* <img src={bannerUrl} className="w-full h-[40vh] object-cover" /> */}



      <MainCategories />

      <ServiceCategories />



      <div className="bg-gray-300 h-[120px] md:h-[300px] w-full mt-5">

  </div>



    </div>
  );
};

export default Home;
