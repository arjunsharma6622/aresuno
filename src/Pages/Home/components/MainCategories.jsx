import React from "react";
import { FiHardDrive, FiNavigation } from "react-icons/fi";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MainCategories = () => {
  const categories = useSelector((state) => state.categories);

  return (
    <div className="self-center w-full max-w-[1314px] mt-16 max-md:max-w-full max-md:mt-10">
      <div className="text-bold text-center text-4xl font-bold leading-10 self-center whitespace-nowrap mt-8 max-md:max-w-full">
        Explore all the categoriess
      </div>
      <div className="m-auto self-center w-full  max-w-[1100px] mt-12 max-md:max-w-full max-md:mt-10">
        <div className="flex flex-wrap gap-10 justify-center items-center">
          {categories.map((category, index) => (
            <Link to={`/category/${category.title}`}>
            <div
              key={index}
              className="flex shadow-md flex-col gap-3 items-center p-4 px-0 w-28 bg-gray-50 rounded-[30px]"
            >
              {/* <MdOutlineBusinessCenter className="text-3xl"/> */}
              <img src={`./assets/images/${category.title.split(" ")[0].toLowerCase()}-icon.png`} alt="" className="w-10 h-10"/>
              <span className="text-sm">
              {category.title.split(" ")[0]}
              </span>
            </div>
            </Link>
          ))}
        </div>
      </div>{" "}
    </div>
  );
};

export default MainCategories;
