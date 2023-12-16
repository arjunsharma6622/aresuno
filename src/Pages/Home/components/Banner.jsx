import React, { useEffect, useState } from "react";
import { FiCrosshair, FiHardDrive, FiNavigation } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
// import { getBanner } from "../../../bannerSlice";
// getBanner
import axios from "axios";
import { getBanner } from "../../../state/slices/bannerSlice";
import Header from "../../../Components/Header/Header";

const Banner = () => {
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
    <div className="relative flex-col self-stretch flex w-full items-center max-md:max-w-full  h-[45vh] bg-gradient-to-b from-blue-800 to-blue-900">
      {/* style={{backgroundImage: "linear-gradient(to right, #0f2027, #203a43, #2c5364)"}} */}
      <div className=" z-[999] w-full">
      <Header homePage={true}/>
      </div>
      <div className="gradient-overlay-top-banner h-[100%] z[-1]"></div>
      <img
        loading="lazy"
        src={bannerUrl}
        className="absolute h-full w-full object-cover object-center inset-0"
      />
      <div className="absolute -bottom-8 z-[10] m-auto  max-w-[1100px] flex w-full flex-col max-md:max-w-full max-md:my-10 gap-10 items-start justify-start">
        <div className="text-white   max-md:max-w-full flex flex-col gap-2">
          {/* <p className="text-5xl font-bold">Welcome to Aresuno</p> */}
          <p className="text-4xl font-bold">Find your next service</p>
          <p className="text-xl ">at most affordable prices, from over 1000+ services</p>
        </div>
        <div className="bg-white shadow-lg  self-stretch flex w-full items-center justify-between gap-[6px] px-[6px] py-[6px] rounded-2xl">
          <div className="border-r-2 border-black rounded-tr-none rounded-br-none w-full h-full flex px-5 py-2 rounded-xl items-center gap-3 bg-white">
            <FiHardDrive className="w-6 h-6"/>
            <input
              className="text-stone-500 py-1 focus:outline-none text-base w-full h-full"
              placeholder="What are you looking for?"
            />
          </div>

          <div className=" w-full h-full flex px-5 py-2 rounded-xl items-center gap-3 bg-white">
            <FiNavigation className="w-6 h-6"/>
            <input
              className="text-stone-500 py-1 focus:outline-none text-base w-full h-full"
              placeholder="Your location"
            />
            <FiCrosshair className="w-6 h-6 text-gray-500" />
          </div>

          <div className="flex items-center h-full bg-blue-600 rounded-xl">
            <button className="text-base py-4 text-white rounded-2xl h-full px-10 bg-blue-600">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
