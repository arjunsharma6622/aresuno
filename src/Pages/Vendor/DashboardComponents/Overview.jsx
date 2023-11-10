import React from "react";
import { BiSolidBusiness } from "react-icons/bi";
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
import { graphData } from "../../../data";

const Overview = ({ businesses }) => {
  return (
    <div className="flex flex-col gap-12 my-4">
      <div className="">
        <h2 className="text-2xl font-semibold mb-6">Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          <div className="bg-white flex justify-center gap-4 items-center border rounded-xl py-8 p-6">
            <div>
              <BiSolidBusiness className="w-12 h-12 text-gray-400" />
            </div>

            <div className="flex flex-col justify-center">
              <span>Businesses</span>
              <span>{businesses.length}</span>
            </div>
          </div>
          <div className="bg-white flex justify-center gap-4 items-center border rounded-xl py-8 p-6">
            <div>
              <MdReviews className="w-12 h-12 text-gray-400" />
            </div>

            <div className="flex flex-col justify-center">
              <span>Reviews</span>
              <span>{businesses.length}</span>
            </div>
          </div>
          <div className="bg-white flex justify-center gap-4 items-center border rounded-xl py-8 p-6">
            <div>
              <BsPeopleFill className="w-12 h-12 text-gray-400" />
            </div>

            <div className="flex flex-col justify-center">
              <span>Leads</span>
              <span>{businesses.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="text-2xl font-semibold mb-6">Leads History</h2>
        <ResponsiveContainer width="100%" aspect={4 / 1}>
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
