import React, { useState, useCallback } from "react";
import { BiImageAdd, BiRupee, BiSolidBusiness } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { MdReviews } from "react-icons/md";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { graphData } from "../../../../data";


const iconMapping = {
  businesses: BiSolidBusiness,
  reviews: MdReviews,
  credits: BiRupee,
  leads: BsPeopleFill,
};

// import getcropppe from 'react-easy-crop/utils'

const Overview = ({ businesses, posts }) => {
  return (
    <div className="flex flex-col gap-16 my-4">

      <div className="">
        <h2 className="text-2xl font-semibold mb-6">Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {Object.keys(iconMapping).map((key) => (
            <div
              key={key}
              className="bg-white flex justify-center gap-5 py-6 items-center rounded-lg"
            >
              <div>
                {React.createElement(iconMapping[key], {
                  className: "w-12 h-12 text-gray-400",
                })}
              </div>

              <div className="flex flex-col justify-center">
                <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                <span>{key === "credits" ? 359 : businesses.length}</span>
              </div>
            </div>
          ))}

        </div>
      </div>

      <div className="">
        <h2 className="text-2xl font-semibold mb-6">Leads History</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={graphData} className="text-sm font-light">
            <Line type="monotone" dataKey="Leads" stroke="#007bff" />
            <CartesianGrid stroke="#ddd" strokeDasharray="5 5" />
            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Overview;