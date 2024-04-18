import { useEffect, useState } from "react";
import PackagePriceCard from "./PackagePriceCard";
import axios from "axios";
import { API_URL } from "../../../utils/util";
import DetailedComparison from "./DetailedComparison";

const Pricing = () => {
  const [selectedCategory, setSelectedCategory] = useState("service");
  const [packagesData, setPackagesData] = useState([]);

  const fetchPackagesData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/package/getpackages`);
      setPackagesData(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPackagesData();
  }, []);

  return (
    <div className="h-full w-full mt-12 bg-neutral-50">
      <div className="h-full bg-gradient-to-r rounded-t-[2rem] pt-2 lg:pb-8 from-primary-teal-500 to-primary-sky-500 w-full">
        {/* parent containing both text and category selector */}
        <div className="w-full lg:bg-neutral-50/40 lg:max-w-[50vw] lg:min-w-96 lg:mx-auto rounded-2xl py-6 mt-7">
          {/* who are you text */}
          <div className="w-full flex items-center mb-6 justify-center">
            <p className="font-bold text-2xl">Who are you?</p>
          </div>

          {/* category selector */}
          <div className="w-full flex items-center justify-center px-12">
            <div className="flex w-full lg:gap-4">
              <button
                onClick={() => setSelectedCategory("service")}
                className={`py-3 flex-grow basis-0 text-xs rounded-l-md lg:text-base text-center lg:rounded-md lg:font-semibold ${selectedCategory === "service" ? "bg-primary-light-blue-500 text-white" : "bg-white text-primary-light-blue-500 lg:border lg:border-primary-light-blue-500"}`}
              >
                Services
              </button>
              <button
                onClick={() => setSelectedCategory("doctor")}
                className={`py-1 flex-grow basis-0  text-xs lg:text-base lg:rounded-md  lg:font-semibold ${selectedCategory === "doctor" ? "bg-primary-light-blue-500 text-white" : "bg-white text-primary-light-blue-500 lg:border lg:border-primary-light-blue-500"}`}
              >
                Doctor
              </button>
              <button
                onClick={() => setSelectedCategory("manufacturer")}
                className={`py-1 flex-grow basis-0 text-xs rounded-r-md lg:text-base lg:rounded-md lg:font-semibold ${selectedCategory === "manufacturer" ? "bg-primary-light-blue-500 text-white" : "bg-white text-primary-light-blue-500 lg:border lg:border-primary-light-blue-500"}`}
              >
                Manufacturer
              </button>
            </div>
          </div>
        </div>

        {/* package cards */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex flex-col items-center mt-8 px-3 gap-6 lg:px-0 lg:w-[90vw] lg:grid lg:grid-cols-4">
            {packagesData
              .filter(
                (singlePackage) => singlePackage.category === selectedCategory,
              )
              .map((singlePackage) => (
                <PackagePriceCard
                  key={singlePackage._id}
                  singlePackage={singlePackage}
                  isTopPopular={singlePackage.name === "Professional"}
                />
              ))}
          </div>
        </div>
      </div>

      {/* detailed comparison */}
      <div className="w-full flex flex-col items-center mt-20 px-3 gap-6">
        {/* detailed comparison text */}
        <div className="mb-4">
          <p className="font-semibold tracking-normal text-lg lg:text-2xl">
            Detailed Comparison
          </p>
        </div>
        <DetailedComparison
          packagesData={packagesData.filter(
            (singlePackage) => singlePackage.category === selectedCategory,
          )}
        />
      </div>
    </div>
  );
};

export default Pricing;
