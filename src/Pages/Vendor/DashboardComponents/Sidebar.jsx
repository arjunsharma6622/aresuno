import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineAppstore,
  AiOutlineAppstoreAdd,
  AiOutlineUser,
} from "react-icons/ai";
import { BiDollar } from "react-icons/bi";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  MdOutlineLeaderboard,
  MdOutlinePostAdd,
  MdOutlineReviews,
} from "react-icons/md";
import { userLogout } from "../../../userSlice";
import { useDispatch } from "react-redux";

const Sidebar = ({ user, handleSelectedField, selectedField }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="flex-[2] overflow-y-auto border-r border-gray-300 p-10 flex flex-col justify-between items-start">
      <div className="flex flex-col gap-10 w-full">
        <div className="flex items-center gap-4">
          <img
            src={user.image ? user.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
            alt=""
            className="rounded-full w-10 h-10"
          />
          <h2 className="text-2xl font-semibold">{user.name}</h2>
        </div>

        <div className="text-sm flex flex-col gap-6 w-full">
          <div
            className={`flex items-center cursor-pointer gap-2 ${
              selectedField === "dashboard" ? "text-blue-500" : "text-gray-700"
            }`}
            onClick={() => handleSelectedField("dashboard")}
          >
            <LuLayoutDashboard className="w-6 h-6" />
            <span className="">Dashboard</span>
          </div>

          <div
            className={`flex items-center cursor-pointer gap-2 ${
              selectedField === "profile" ? "text-blue-500" : "text-gray-700"
            }`}
            onClick={() => handleSelectedField("profile")}
          >
            <AiOutlineUser className="w-6 h-6 " />
            <span className="">Profile</span>
          </div>

          <div
            className={`flex items-center cursor-pointer gap-2 ${
              selectedField === "allListings"
                ? "text-blue-500"
                : "text-gray-700"
            }`}
            onClick={() => handleSelectedField("allListings")}
          >
            <AiOutlineAppstore className="w-6 h-6 " />
            <span className="">All Listing</span>
          </div>
          <div
            className={`flex items-center cursor-pointer gap-2 ${
              selectedField === "addListing" ? "text-blue-500" : "text-gray-700"
            }`}
            onClick={() => handleSelectedField("addListing")}
          >
            <AiOutlineAppstoreAdd className="w-6 h-6 " />
            <span className="">Add New Listing</span>
          </div>
          <div
            className={`flex items-center cursor-pointer gap-2 ${
              selectedField === "posts" ? "text-blue-500" : "text-gray-700"
            }`}
            onClick={() => handleSelectedField("posts")}
          >
            <MdOutlinePostAdd className="w-6 h-6 " />
            <span className="">Posts</span>
          </div>
          <div
            className={`flex items-center cursor-pointer gap-2 ${
              selectedField === "reviews" ? "text-blue-500" : "text-gray-700"
            }`}
            onClick={() => handleSelectedField("reviews")}
          >
            <MdOutlineReviews className="w-6 h-6 " />
            <span className="">Reviews</span>
          </div>
          <div
            className={`flex items-center cursor-pointer gap-2 ${
              selectedField === "leads" ? "text-blue-500" : "text-gray-700"
            }`}
            onClick={() => handleSelectedField("leads")}
          >
            <MdOutlineLeaderboard className="w-6 h-6 " />
            <span className="">Leads</span>
          </div>
          <div
            className={`flex items-center cursor-pointer gap-2 ${
              selectedField === "subscriptions"
                ? "text-blue-500"
                : "text-gray-700"
            }`}
            onClick={() => handleSelectedField("subscriptions")}
          >
            <BiDollar className="w-6 h-6 text-gray-700" />
            <span className="">Subscriptions</span>
          </div>
        </div>
      </div>

      <div className="w-full">
        <button
          className="w-full px-4 py-1 border text-red-500 border-red-500"
          onClick={() => {
            localStorage.removeItem("token");
            dispatch(userLogout());
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
