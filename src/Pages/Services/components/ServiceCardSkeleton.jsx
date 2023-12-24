import React from "react";

const ServiceCardSkeleton = () => {
  return (
    <div className="">
      <div className="w-full aspect-[2/1] object-cover rounded-xl bg-gray-300 animate-pulse">
        {/* <img loading='lazy' src={business.photosGallery[0] ? business.photosGallery[0] : "https://cdn.pixabay.com/photo/2018/05/18/15/30/web-design-3411373_1280.jpg"} alt="" className='w-full aspect-[2/1] object-cover rounded-xl' /> */}
      </div>

      <div className="bg-white py-4 pb-0 w-full rounded-xl shadow-xl flex flex-col gap-4">
        <div className="px-4">
          <div className="flex gap-3 items-center border-b-[1px] border-gray-200 pb-4">
            <div className="w-7 h-7 object-cover rounded-full animate-pulse bg-gray-300"></div>
            <div className=" pl-2 w-32 h-3 animate-pulse bg-gray-300 rounded-xl"></div>
          </div>

          <div className=" pl-2 w-44 h-3 animate-pulse bg-gray-300 rounded-xl mt-4"></div>

          <div className="flex flex-col gap-3 mt-4">
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs h-6 w-24 py-1 bg-gray-200 rounded-full"></span>
              <span className="text-xs h-6 w-24 py-1 bg-gray-200 rounded-full"></span>
              <span className="text-xs h-6 w-24 py-1 bg-gray-200 rounded-full"></span>
            </div>
          </div>
        </div>

        <div className="flex w-full rounded-b-xl">
          <button className="rounded-b-xl w-full px-2 py-[10px] text-white bg-gray-200 flex items-center justify-center gap-4 h-8"></button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardSkeleton;
