import React from "react";
import { MdReviews } from "react-icons/md";
import { BiSolidBusiness } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Overview = ({ user, Enquiries, Reviews }) => {
  const iconMapping = {
    Enquiries: BiSolidBusiness,
    Reviews: MdReviews,
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-10 md:gap-16 mt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg md:text-3xl font-normal md:font-semibold">
          Welcome{" "}
          <span className="font-semibold md:font-bold text-blue-600">
            {user?.name}
          </span>{" "}
        </h1>
        <p className="text-sm">
          This is your dashboard, where you can view and manage your profile.
        </p>
      </div>

      <div className="">
        <h2 className="text-lg md:text-2xl font-semibold md:mb-6 mb-3">
          Overview
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
          {Object.keys(iconMapping).map((key) => (
            <div
              key={key}
              className="bg-white border shadow-lg flex justify-normal pl-5 md:justify-center gap-4 py-4 md:gap-5 md:py-6 items-center rounded-lg"
            >
              <div>
                {React.createElement(iconMapping[key], {
                  className: "w-6 h-6 md:w-10 md:h-10 text-gray-400",
                })}
              </div>

              <div className="flex flex-col justify-center text-sm md:text-base">
                <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                <span>
                  {key === "Enquiries"
                    ? Enquiries.length
                    : key === "Reviews"
                      ? Reviews.length
                      : "-"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg md:text-2xl font-semibold md:mb-6 mb-3">
          Past Inquiries
        </h2>
        <div className="bg-white rounded-xl overflow-auto">
          <table className="md:w-full ">
            <thead className="">
              <tr className="bg-blue-500">
                <th className="px-6 py-3 text-left text-xs font-medium text-white">
                  S.no
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white">
                  name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white">
                  phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white">
                  message
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-xs md:text-sm">
              {Enquiries.slice(0, 5).map((enquiry, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{enquiry.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {enquiry.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {enquiry.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2 items-center">
                      {enquiry.message}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center">
          <button
            className=" text-white font-medium bg-blue-500 p-2 px-5 rounded-lg mt-4"
            onClick={() => {
              navigate("/dashboard/inquiries");
            }}
          >
            View all
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-lg md:text-2xl font-semibold md:mb-6 mb-3">
          Past Reviews
        </h2>
        <div className="bg-white rounded-xl overflow-auto">
          <table className="md:w-full ">
            <thead className="">
              <tr className="bg-blue-500">
                <th className="px-6 py-3 text-left text-xs font-medium text-white">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white">
                  Ratings
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-xs md:text-sm">
              {Reviews.slice(0, 5).map((review, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {review.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2 items-center">
                      {review.content}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-1">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <BsStarFill key={i} className="text-gray-500" />
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center">
          <button
            className=" text-white font-medium bg-blue-500 p-2 px-5 rounded-lg mt-4"
            onClick={() => {
              navigate("/dashboard/reviews");
            }}
          >
            View all
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
