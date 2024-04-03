import React from "react";
import { BiRupee, BiSolidBusiness } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { MdOutlinePostAdd, MdReviews } from "react-icons/md";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSelector } from "react-redux";

const iconMapping = {
  businesses: BiSolidBusiness,
  reviews: MdReviews,
  posts: MdOutlinePostAdd,
  credits: BiRupee,
  leads: BsPeopleFill,
};

// import getcropppe from 'react-easy-crop/utils'

const Overview = ({ businesses, posts, ratings, callLeads }) => {
  const user = useSelector((state) => state.user);

  return (
    <div className="flex flex-col gap-10 md:gap-16 mt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg md:text-3xl font-normal md:font-semibold">
          Welcome{" "}
          <span className="font-semibold md:font-bold text-blue-600">
            {user.name}
          </span>{" "}
        </h1>
        <p className="text-sm">
          This is your dashboard, where you can view and manage your business.
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
                  {key === "posts"
                    ? posts.length
                    : key === "reviews"
                      ? ratings.length
                      : key === "businesses"
                        ? businesses.length
                        : "-"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="">
        <h2 className="text-lg md:text-2xl font-semibold md:mb-6 mb-3">
          Call Leads History
        </h2>
        <div className={"bg-white md:p-8 rounded-lg shadow-lg hidden md:block"}>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={callLeads} className="text-sm  font-light">
              <Line
                type="monotone"
                dataKey="Leads"
                stroke="#007bff"
                strokeWidth={1.5}
              />
              <CartesianGrid stroke="#ddd" strokeDasharray="5 5" />
              <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={"bg-white rounded-lg shadow-lg md:hidden"}>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={callLeads} className="text-xs  font-light">
              <Line
                type="monotone"
                dataKey="Leads"
                stroke="#007bff"
                strokeWidth={1}
                dot={false}
              />
              <CartesianGrid stroke="#ddd" strokeDasharray="2 2" />
              <XAxis dataKey="name" />
              <YAxis width={35} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Overview;
