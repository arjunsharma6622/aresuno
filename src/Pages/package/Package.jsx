import React from "react";
import Pricing from "./components/Pricing";
import PackageHead from "./components/PackageHead";

const PackageSection = () => {
  return (
    <div className="bg-white flex items-center justify-center">
      <div className="w-[90%] mx-auto flex flex-col gap-32 mt-20">
        <PackageHead />
        <Pricing />
      </div>
    </div>
  );
};

export default PackageSection;
