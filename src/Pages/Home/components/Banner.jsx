import React, { useEffect } from "react";
import { FiCrosshair, FiHardDrive, FiNavigation } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
// import { getBanner } from "../../../bannerSlice";
// getBanner
import axios from "axios";
import { getBanner } from "../../../state/slices/bannerSlice";

const Banner = () => {
  const dispatch = useDispatch();
  const bannerUrl = useSelector((state) => state.banner.url);
  const categories = useSelector((state) => state.categories);

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
    <div className="relative flex-col overflow-hidden self-stretch flex min-h-[576px] w-full items-center px-5 py-12 max-md:max-w-full">
      <div className="gradient-overlay-top h-48 z[-1]"></div>
      <img
        loading="lazy"
        src={bannerUrl}
        className="absolute h-full w-full object-cover object-center inset-0"
      />
      <div className="relative z-[10] flex w-full max-w-[1195px] flex-col mt-12 mb-10 max-md:max-w-full max-md:my-10">
        <div className="text-white text-4xl font-bold leading-[60px] tracking-wider self-center whitespace-nowrap max-md:max-w-full">
          India’s Largest Service Provider
        </div>
        <div className="text-white text-2xl leading-9 tracking-wider self-center whitespace-nowrap mt-3.5">
          Search from 1000+ Services
        </div>
        <div className="bg-white self-stretch flex w-full items-center justify-between gap-5 mt-20 pl-11 pr-6 py-3 rounded-[60px] max-md:max-w-full max-md:flex-wrap max-md:mt-10 max-md:px-5">
          <div className="w-full flex px-5 py-3 rounded-full items-center gap-5">
            <FiHardDrive />
            <input
              className="text-stone-500 focus:outline-none text-base"
              placeholder="What are you looking for?
"
            />
          </div>
          <div className="w-full flex px-5 py-3 rounded-full items-center gap-5">
            <FiNavigation />
            <input
              className="text-stone-500 focus:outline-none text-base"
              placeholder="Your location
"
            />
            <FiCrosshair className="w-6 h-6 text-gray-500" />
          </div>

          <div className="flex items-center">
            <button className="text-base py-4 text-white rounded-full px-10 bg-blue-600">
              Search
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center flex-wrap gap-5 mt-10">
          {categories.map((category, index) => (
            <div
              key={index}
              className="text-white text-center text-base font-semibold bg-blue-600 px-5 py-2 rounded-full"
            >
              {category.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
