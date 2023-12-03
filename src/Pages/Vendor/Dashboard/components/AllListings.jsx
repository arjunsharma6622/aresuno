import React, { useState } from "react";
import { FiEdit2, FiExternalLink, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import Modal from "./Modal";

const AllListings = ({ businesses }) => {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-6">All Listings</h1>
      <div className="mb-6">
        <span>Total Businesses : {businesses.length}</span>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {businesses.map((business) => (
          <div
            key={business._id}
            className="text-base flex flex-col gap-4 border-[1.5px] border-gray-400 p-6 py-3 rounded"
          >
            <span className="font-semibold text-xl underline">
              {business.name}
            </span>
            <div className="flex gap-2 flex-col text-sm">
              <span>Category : {business.mainCategory}</span>
              <span>Phone : {business.phone}</span>
              <span>
                Created on :{" "}
                {new Date(business.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>
                Last Update :{" "}
                {new Date(business.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <Link
                to={`/business/${business.name.split(" ").join("-").toLowerCase()}`}
                className="flex gap-2 items-center justify-start text-blue-500"
              >
                <span>View</span>
                <FiExternalLink className="w-4 h-4" />
              </Link>

              <Link
                to={`/business/edit/${business._id}`}
                className="flex gap-2 items-center justify-start text-gray-500"
              >
                <span>Edit</span>
                <FiEdit2 className="w-4 h-4" />
              </Link>

              <div
                className="flex gap-2 items-center text-red-600 cursor-pointer"
                onClick={() => setSelectedBusiness(business)}
              >
                <span>Delete</span>
                <FiTrash2 className="w-4 h-4" />
              </div>
            </div>

            {selectedBusiness && selectedBusiness._id === business._id && (
              <Modal
                business={selectedBusiness}
                onClose={() => setSelectedBusiness(null)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllListings;
