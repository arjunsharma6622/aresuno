// import React, { useState } from 'react';
// import { BiCategory } from 'react-icons/bi';
// import { useSelector } from 'react-redux';

// const BusinessCategory = ({ businessDetails, setBusinessDetails }) => {
//     const categories = useSelector((state) => state.categories);

//     const handleCategorySelection = (category) => {
//         setBusinessDetails((prev) => ({
//             ...prev,
//             category: category._id,
//         }));
//         setSearchQuery(category.name);
//         setShowDropdown(false);
//     };

//     return (
//         <div className="md:mt-6 md:mb-6">
//                       <div className="flex items-center gap-2">
//                 <BiCategory className="h-5 w-5 md:w-6 md:h-6" />
//                 <div className="flex items-center gap-4">
//                     <h2 className="text-lg md:text-xl font-semibold">
//                         Business Category
//                     </h2>
//                     <span className="text-gray-500 text-sm">* All fields are required</span>
//                 </div>
//             </div>
//             <div className="flex flex-col w-full mt-6">
//                 <label htmlFor="category">Category</label>
//                 <div className="relative md:w-1/2 mt-2 w-full">
//                     <select className='w-full p-2 border' name="category" id="" value={businessDetails.category}>
//                         <option value="" disabled>-</option>
//                         {categories.map((category) => (
//                             <option key={category._id} value={category._id} selected={businessDetails.category === category._id}>
//                                 {category.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BusinessCategory;

import { useState } from "react";
import { BiCategory } from "react-icons/bi";
import { useSelector } from "react-redux";

const BusinessCategory = ({ businessDetails, setBusinessDetails }) => {
  const categories = useSelector((state) => state.categories);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCategorySelection = (category) => {
    setBusinessDetails((prev) => ({
      ...prev,
      category: category._id,
    }));
    setSearchQuery(category.name);
    setShowDropdown(false);
  };

  return (
    <div className="md:mt-6 md:mb-6">
      <div className="flex items-center gap-2">
        <BiCategory className="h-5 w-5 md:w-6 md:h-6" />
        <div className="flex items-center gap-4">
          <h2 className="text-lg md:text-xl font-semibold">
            Business Category
          </h2>
          <span className="text-gray-500 text-sm">
            * All fields are required
          </span>
        </div>
      </div>
      <div className="flex flex-col w-full mt-6">
        <label htmlFor="category">Category</label>
        <div className="relative md:w-1/2 mt-2 w-full">
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            name="category"
            id="category"
            value={businessDetails.category}
            onChange={(e) =>
              setBusinessDetails((prev) => ({
                ...prev,
                category: e.target.value,
              }))
            }
          >
            <option value="" disabled>
              -
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default BusinessCategory;
