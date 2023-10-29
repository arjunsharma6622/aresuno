import React from "react";
import { useNavigate } from "react-router-dom";

const BusinessCard = ({ imageUrl, name, category, rating, id }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg" onClick={() => navigate(`/business/${id}`)}>
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
