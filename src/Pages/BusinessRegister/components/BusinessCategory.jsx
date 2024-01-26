import React, { useState } from 'react';
import { BiCategory } from 'react-icons/bi';
import { useSelector } from 'react-redux';

const BusinessCategory = ({ businessDetails, setBusinessDetails }) => {
    const categories = useSelector((state) => state.categories);

    const handleCategorySelection = (category) => {
        setBusinessDetails((prev) => ({
            ...prev,
            category: category._id,
        }));
        setSearchQuery(category.name);
        setShowDropdown(false);
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const handleCategorySearchQueryChange = (e) => {
        const searchQuery = e.target.value;
        setSearchQuery(searchQuery);
        setShowDropdown(true); // Show dropdown when input changes
    };

    return (
        <div className="md:mt-6 md:mb-6">
                      <div className="flex items-center gap-2">
                <BiCategory className="h-5 w-5 md:w-6 md:h-6" />
                <div className="flex items-center gap-4">
                    <h2 className="text-lg md:text-xl font-semibold">
                        Business Category
                    </h2>
                    <span className="text-gray-500 text-sm">* All fields are required</span>
                </div>
            </div>
            <div className="flex flex-col w-full mt-6">
                <label htmlFor="category">Category</label>
                <div className="relative md:w-1/2 mt-2 w-full">
                    <input
                        type="text"
                        id="category"
                        name="category"
                        className="relative appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 bg-white focus:border-indigo-500 focus:z-10 md:text-base text-sm"
                        onChange={handleCategorySearchQueryChange}
                        value={searchQuery}
                        onFocus={() => setShowDropdown(true)}
                    />
                    {searchQuery && showDropdown && (
                        <div className="absolute w-full bg-white flex flex-col gap-3 py-6 px-6 shadow-lg overflow-y-auto rounded-lg">
                            {categories
                                .filter((category) => category.businessType === businessDetails.type)
                                .filter((category) =>
                                    category.name.toLowerCase().includes(searchQuery.toLowerCase())
                                )
                                .map((category) => (
                                    <span
                                        key={category._id}
                                        onClick={() => handleCategorySelection(category)}
                                        className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
                                    >
                                        {category.name}
                                    </span>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BusinessCategory;
