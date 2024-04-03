import { useState } from "react";
import { FiEdit2, FiExternalLink, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import Modal from "./Modal";

const AdminListings = ({ businesses }) => {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  return (
    <div className="mt-6">
      <h1 className="text-lg md:text-2xl font-semibold mb-2 md:mb-6">
        All Listings
      </h1>
      <div className="md:mb-6 mb-4">
        <span>Total Businesses : {businesses.length}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 md:mb-0">
        {businesses.map((business) => (
          <div
            key={business._id}
            className="text-base flex flex-col gap-3 md:gap-6 bg-white border md:border-none md:shadow-lg rounded-xl px-5 py-3 md:px-8 md:py-6"
          >
            <span className="font-semibold text-xl underline">
              {business.name}
            </span>
            <div className="flex gap-2 flex-col text-xs md:text-sm">
              <span>
                <span className="font-semibold">Category : </span>{" "}
                {business.category.name}
              </span>
              <span>
                <span className="font-semibold"> Phone : </span>{" "}
                {business.phone}
              </span>
              <span>
                <span className="font-semibold">Created on : </span>

                {new Date(business.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>
                <span className="font-semibold">Last Update : </span>

                {new Date(business.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm md:text-base">
              <Link
                to={`/business/${business.name
                  .split(" ")
                  .join("-")
                  .toLowerCase()}`}
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

export default AdminListings;
