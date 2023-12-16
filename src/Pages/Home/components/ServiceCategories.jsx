import React from "react";
import { FiChevronLeft, FiChevronRight, FiHardDrive, FiNavigation } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import 'swiper/css/navigation';
import CategoriesSlider from "./CategoriesSlider";
// import "swiper/swiper.scss";
// import "swiper/components/navigation/navigation.scss";
// import "swiper/components/pagination/pagination.scss";


const ServiceCategories = () => {
  const categories = useSelector((state) => state.categories);
  const swiper = useSwiper()

  console.log(swiper)

  return (
    <div className="self-center w-full max-w-[1314px] mt-16 max-md:max-w-full max-md:mt-10 px-8">
      {/* <div className="text-black text-start text-2xl font-bold max-md:max-w-full">
        Browse from all the categories
      </div> */}
      <div className="w-full">
        <div className="w-full flex flex-col gap-10">

          {categories.map(
            (category, index) =>
              category.subcategories?.length > 0 && (

                <div
                  key={index}
                  className="w-full flex flex-col items-stretch max-md:w-full max-md:ml-0"
                >
                  <div className="justify-start items-start flex grow flex-col w-full mx-auto  rounded-xl border-solid border-zinc-300 max-md:max-w-full max-md:mt-10 max-md:px-5">
                    <div className="text-black text-2xl font-semibold">
                      Browser from all {category.title}
                    </div>
                    <div className="w-full max-md:max-w-full mt-3">
                    <CategoriesSlider category={category}/>
                    </div>
                  </div>
                </div>
              )
          )}

        </div>
      </div>{" "}
    </div>
  );
};

export default ServiceCategories;



