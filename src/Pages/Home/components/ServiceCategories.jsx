import React from "react";
import { FiHardDrive, FiNavigation } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ServiceCategories = () => {
  const categories = useSelector((state) => state.categories);

  return (
    <div className="self-center w-full max-w-[1314px] mt-16 max-md:max-w-full max-md:mt-10">
      <div className="text-black text-center text-4xl font-bold leading-10 self-center whitespace-nowrap mt-8 max-md:max-w-full">
        All the Categories of Services
      </div>
      {/* <div className="text-neutral-500 text-center text-base leading-6 self-center whitespace-nowrap mt-5 max-md:max-w-full">
        Elevating Your Service Experience with Increased Flexibility and a Wide
        Array of Options.
      </div> */}
      <div className="w-full mt-8">
        <div className="w-full grid grid-cols-2 gap-6">
          { categories.map((category, index) => (

            category.subcategories?.length > 0 && (
            <div
              key={index}
              className="w-full flex flex-col items-stretch max-md:w-full max-md:ml-0"
            >
              <div className="justify-center items-center flex grow flex-col w-full mx-auto px-9 py-8 rounded-xl border-solid border-zinc-300 max-md:max-w-full max-md:mt-10 max-md:px-5">
                <div className="text-black text-xl font-semibold">
                  {category.title}
                </div>
                <div className="w-full self-stretch mt-4 max-md:max-w-full">
                  <div className="grid grid-cols-2 w-full gap-4 gap-y-7">
                    {category.subcategories?.map((subCategory, index) => (
                      <Link
                        to={`/${subCategory.name
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                        key={index}
                        className="w-full flex flex-col items-stretch max-md:w-full max-md:ml-0"
                      >
                        <div
                          key={index}
                          className="w-full flex flex-col items-stretch max-md:w-full max-md:ml-0"
                        >
                          <div className="justify-center items-stretch flex grow flex-col max-md:mt-10">
                            <div className="flex-col relative shadow-sm overflow-hidden flex aspect-[1.5235294117647058] w-full items-stretch rounded-lg">
                              <img
                                loading="lazy"
                                src={subCategory.image.url}
                                alt={subCategory.image.altTag}
                                className="w-full h-full object-cover"
                              />
                              <div className="text-neutral-700 bottom-2 left-3 absolute text-xs font-medium justify-center bg-neutral-200 bg-opacity-80 px-[10px] py-[6px] rounded-md">
                                {subCategory.businesses?.length} Services
                              </div>
                            </div>
                            <div className="text-black text-sm leading-5 tracking-wide self-center whitespace-nowrap mt-3">
                              {subCategory.name}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>


          )



                        ))}
        </div>
      </div>{" "}
    </div>
  );
};

export default ServiceCategories;
