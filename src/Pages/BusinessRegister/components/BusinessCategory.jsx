import React from 'react'
import { BiCategory } from 'react-icons/bi'
import { FiChevronDown } from 'react-icons/fi'
import { useSelector } from 'react-redux';

const BusinessCategory = ({ businessDetails, setBusinessDetails }) => {
    const categories = useSelector((state) => state.categories);

    const handleBusinessDetailsChange = (e) => {
        const { name, value } = e.target;
        setBusinessDetails((prev) => ({ ...prev, [name]: value }));
      };


    const mainCategories = categories.map((category) => {
        const mainCategory = {
            _id: category._id,
            name: category.title,
        };
        return mainCategory;
    });
    console.log("main categories", mainCategories);

    const subCategories = {};

    categories.forEach((category) => {
        subCategories[category.title] = category.subcategories.map(
            (subCategory) => ({
                _id: subCategory._id,
                name: subCategory.name,
            })
        );
    });
    return (
        <div className="mt-6 mb-6">
            <div className="flex items-center gap-2">
                <BiCategory className="w-6 h-6" />
                <h2 className="text-xl font-semibold">
                    Select you business category
                </h2>
            </div>
            <div className="flex gap-4 mt-6 w-full">
                {/* CATEGORY */}
                <div className="flex flex-col w-full">
                    <label htmlFor="">Category</label>

                    <div className="relative mt-2">
                        <select
                            name="mainCategory"
                            value={businessDetails.mainCategory}
                            onChange={handleBusinessDetailsChange}
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border  border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 bg-white focus:border-indigo-500 focus:z-10 sm:text-sm"
                        >
                            <option value="" disabled className="text-red">
                                -
                            </option>
                            {mainCategories.map((category) => (
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

                {/* SUB CATEGORY */}
                <div className="flex flex-col w-full">
                    <label htmlFor="">Sub Category</label>

                    <div className="relative mt-2">
                        <select
                            name="subCategory"
                            value={businessDetails.subCategory}
                            onChange={handleBusinessDetailsChange}
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 bg-white focus:border-indigo-500 focus:z-10 sm:text-sm"
                        >
                            <option value="" disabled defaultChecked>
                                -
                            </option>
                            {businessDetails.mainCategory &&
                                subCategories[mainCategories.find(category => category._id === businessDetails.mainCategory)?.name].map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>

                        <div>
                            <FiChevronDown className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm text-gray-500 w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default BusinessCategory