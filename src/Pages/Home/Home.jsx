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

const Home = () => {

  const bannerUrl = useSelector((state) => state.banner.url);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch()

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

    fetchBanner();
  }, [dispatch]);

  return (
    <div className="bg-white flex flex-col gap-4">
      <Banner />

      {/* <img src={bannerUrl} className="w-full h-[40vh] object-cover" /> */}

<div className="mt-24 md:mt-20 w-[95%] m-auto flex flex-col gap-4">
{/* <div className="bg-gray-500 h-[80px] w-full rounded-2xl">
  </div> */}
      <Swiper
        // slidesPerView={3}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        spaceBetween={20}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        <SwiperSlide className="bg-red-500 h-44 md:h-56 rounded-3xl"></SwiperSlide>
        <SwiperSlide className="bg-blue-500 h-44 md:h-56 rounded-3xl"></SwiperSlide>
        <SwiperSlide className="bg-green-500 h-44 md:h-56 rounded-3xl"></SwiperSlide>
        <SwiperSlide className="bg-pink-500 h-44 md:h-56 rounded-3xl"></SwiperSlide>
        <SwiperSlide className="bg-purple-500 h-44 md:h-56 rounded-3xl"></SwiperSlide>
        <SwiperSlide className="bg-indigo-500 h-44 md:h-56 rounded-3xl"></SwiperSlide>
        <SwiperSlide className="bg-gray-500 h-44 md:h-56 rounded-3xl"></SwiperSlide>
        <SwiperSlide className="bg-orange-500 h-44 md:h-56 rounded-3xl"></SwiperSlide>
        <SwiperSlide className="bg-teal-500 h-44 md:h-56 rounded-3xl"></SwiperSlide>
      </Swiper>

      </div>

      <MainCategories />

      <ServiceCategories />



      <div className="bg-gray-300 h-[120px] md:h-[300px] w-full mt-5">
  </div>



    </div>
  );
};

export default Home;
