const ServiceCardSkeleton = () => {
  return (
    <div className="flex shadow-xl rounded-xl">
      <div className=" object-cover rounded-tl-xl w-[400px] rounded-bl-xl bg-gray-300 animate-pulse"></div>

      <div className="bg-white py-4 w-full rounded-tr-xl rounded-br-xl  flex flex-col gap-4">
        <div className="px-4">
          <div className="flex gap-3 items-center border-b-[1px] border-gray-200 pb-4">
            <div className="w-7 h-7 object-cover rounded-full animate-pulse bg-gray-300"></div>
            <div className=" pl-2 w-32 h-3 animate-pulse bg-gray-300 rounded-xl"></div>
          </div>
          <div className="w-full flex justify-between py-4">
            <div className="w-full">
              <div className=" pl-2 w-24 h-3 animate-pulse bg-gray-300 rounded-xl mt-4"></div>
              <div className=" pl-2 w-44 h-3 animate-pulse bg-gray-300 rounded-xl mt-4"></div>

              <div className="flex flex-col gap-3 mt-4">
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs h-6 w-24 py-1 bg-gray-200 rounded-full"></span>
                  <span className="text-xs h-6 w-24 py-1 bg-gray-200 rounded-full"></span>
                  <span className="text-xs h-6 w-24 py-1 bg-gray-200 rounded-full"></span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="rounded-full w-24 px-2 py-[10px] text-white bg-gray-200 flex items-center justify-center gap-4 h-6"></button>
            <button className="rounded-full w-24 px-2 py-[10px] text-white bg-gray-200 flex items-center justify-center gap-4 h-6"></button>
            <button className="rounded-full w-10 px-2 py-[10px] text-white bg-gray-200 flex items-center justify-center gap-4 h-6"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardSkeleton;
