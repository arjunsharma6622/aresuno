import React, { useState } from 'react';

const CustomDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item) => {
    onChange(item);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm cursor-pointer"
      >
        {value || 'Select an option'}
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleItemClick(option.value)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
