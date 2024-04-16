import { useState } from "react";
import PackagePriceCard from "./PackagePriceCard";

const Pricing = () => {
  const [selectedCategory, setSelectedCategory] = useState("service");

  return (
    <div className="h-full w-full mt-12">
      <div className="h-full bg-gradient-to-r rounded-t-[2rem] pt-2 from-primary-teal-500 to-primary-sky-500 w-full">
        {/* who are you text */}
        <div className="w-full flex items-center my-6 justify-center">
          <p className="font-bold text-2xl">Who are you?</p>
        </div>

        {/* category selector */}
        <div className="w-full flex items-center justify-center">
          <div className="grid grid-cols-3 rounded-4xl">
            <button
              onClick={() => setSelectedCategory("service")}
              className={`py-3 text-xs rounded-l-md ${selectedCategory === "service" ? "bg-primary-light-blue-500 text-white" : "bg-white text-primary-light-blue-500"}`}
            >
              Service
            </button>
            <button
              onClick={() => setSelectedCategory("doctor")}
              className={`py-1 text-xs ${selectedCategory === "doctor" ? "bg-primary-light-blue-500 text-white" : "bg-white text-primary-light-blue-500"}`}
            >
              Doctor
            </button>
            <button
              onClick={() => setSelectedCategory("manufacturer")}
              className={`py-1 px-2 text-xs rounded-r-md ${selectedCategory === "manufacturer" ? "bg-primary-light-blue-500 text-white" : "bg-white text-primary-light-blue-500"}`}
            >
              Manufacturer
            </button>
          </div>
        </div>

        {/* package cards */}
        <div className="w-full flex flex-col items-center mt-8 px-3">
          <PackagePriceCard
            name="Free"
            price={14999}
            prevPrice={19999}
            benefits={["Unlimited bandwidth", "SSL Certificate"]}
            isTopPopular={!false}
          />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
