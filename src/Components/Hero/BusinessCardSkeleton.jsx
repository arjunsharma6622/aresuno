import React from "react";

const BusinessCardSkeleton = () => {


  return (
    <div className="businessCardSkeleton">
      <div
        className=" bg-gray-200 rounded-xl dark:bg-gray-300 w-full h-[150px] animate-pulse"
      ></div>
      <div className="px-6 py-4">
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-24 mb-3"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-32 mb-3"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-12 mb-3"></div>
      <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default BusinessCardSkeleton;
