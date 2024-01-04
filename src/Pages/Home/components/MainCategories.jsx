import React from "react";
import { FiHardDrive, FiNavigation } from "react-icons/fi";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MainCategories = () => {
  const categories = useSelector((state) => state.categories);
  const userLocationName = useSelector((state) => state.user.locationName);


  return (
    <div className="self-center w-full max-w-[1314px] mt-6 md:mt-16">
      <div className="text-bold text-center font-bold text-xl md:text-2xl lg:text-3xl leading-10 self-center whitespace-nowrap max-md:max-w-full">
        Explore all the categories
      </div>
      <div className="m-auto self-center w-full  max-w-[1100px] mt-12 max-md:max-w-full max-md:mt-10">
        <div className="flex flex-wrap gap-4 md:gap-10 justify-center items-start">
          {categories.slice(0,2).map((category, index) => (
            category.subcategories.slice(0, 6).map((subCategory, index) => (
              <Link key={index} to={`${userLocationName?.toLowerCase()}/${subCategory.name.split(" ").join("-").toLowerCase()}`} className="">
              <div
                key={index}
                className="flex flex-col gap-3 items-center justify-center w-24 md:w-32 h-full"
              >
                <div className="">
                  <img loading="lazy" src={subCategory.icon} alt="" className="bg-gray-100 p-4 rounded-xl w-20 md:w-24"/>
                </div>
                <span className="text-xs md:text-sm text-center leading-4 ">
                {subCategory.name}
                </span>
              </div>
              </Link>
            ))
            

          ))}
        </div>
      </div>{" "}
    </div>
  );
};

export default MainCategories;
