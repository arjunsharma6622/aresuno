import { useState } from "react";
import PackageCard from "./PackageCard";

const Packages = ({ packagesData }) => {
  const [selectedCategory, setSelectedCategory] = useState("service");
  return (
    <div className="w-full h-screen">
      {/* Rendering checkbox buttons */}

      <div className="flex gap-4">
        <div onChange={() => setSelectedCategory("service")}>
          <input
            type="radio"
            id="service"
            value={"service"}
            checked={selectedCategory === "service"}
          />
          <label htmlFor="service" className="ml-2">
            Service
          </label>
        </div>
        <div onChange={() => setSelectedCategory("doctor")}>
          <input
            type="radio"
            id="doctor"
            value={"doctor"}
            checked={selectedCategory === "doctor"}
          />
          <label htmlFor="doctor" className="ml-2">
            Doctor
          </label>
        </div>
        <div onChange={() => setSelectedCategory("manufacturer")}>
          <input
            type="radio"
            id="manufacturer"
            value={"manufacturer"}
            checked={selectedCategory === "manufacturer"}
          />
          <label htmlFor="manufacturer" className="ml-2">
            Manufacturer
          </label>
        </div>
      </div>

      <div className="grid grid-cols-auto-150 w-full py-4 gap-4">
        {/* Rendering cards. */}
        {packagesData
          .filter((pkg) => pkg.category === selectedCategory)
          .map((pkg) => {
            return <PackageCard key={pkg._id} pkg={pkg}></PackageCard>;
          })}
      </div>
    </div>
  );
};

export default Packages;
