import { useState } from "react";
import { BiCategory } from "react-icons/bi";
import { FiChevronDown, FiEdit2, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";

const BusinessCategory = ({ businessDetails, handleBusinessDetailsChange }) => {
  const [businessCategoryUpdate, setBusinessCategoryUpdate] = useState(true);

  const categories = useSelector((state) => state.categories);

  return (
    <div className="mt-6 mb-6">
      <div className="flex justify-start gap-8 items-center">
        <div className="flex items-center gap-2">
          <BiCategory className="w-6 h-6" />
          <h2 className="text-xl font-semibold">
            Select you business category
          </h2>
        </div>
        {businessCategoryUpdate ? (
          <FiEdit2
            className="cursor-pointer w-5 h-5"
            onClick={() => setBusinessCategoryUpdate(false)}
          />
        ) : (
          <FiX
            className="cursor-pointer w-5 h-5 text-red-500"
            onClick={() => setBusinessCategoryUpdate(true)}
          />
        )}
      </div>

      <div className="flex gap-4 mt-6 w-full">
        {/* CATEGORY */}
        <div className="flex flex-col w-full">
          <label htmlFor="">Category</label>

          <div className="relative mt-2">
            <select
              name="category"
              value={businessDetails.category._id}
              onChange={handleBusinessDetailsChange}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 bg-white focus:border-indigo-500 focus:z-10 sm:text-sm"
              disabled={businessCategoryUpdate}
            >
              <option value="" disabled defaultChecked>
                -
              </option>
              {businessDetails.category &&
                categories.map((category) => (
                  <option key={category.name} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>

            <div>
              <FiChevronDown className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm text-gray-500 w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCategory;
