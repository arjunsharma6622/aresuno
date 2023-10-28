import React from "react";

const BusinessCard = ({ imageUrl, name, category, rating }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={imageUrl} alt="Business" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl">{name}</div>
        <p className="text-gray-700 text-base">{category}</p>
        <div className="flex items-center mb-2">
          <span className="text-xl">{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
