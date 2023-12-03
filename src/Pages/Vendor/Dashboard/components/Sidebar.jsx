import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import { userLogout } from "../../../../state/slices/userSlice";
import { FiArrowLeft, FiHome } from "react-icons/fi";

const Sidebar = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()

  const sidebarLinks = [
    {
      name: "Dashboard",
      icon: <LuLayoutDashboard className="w-6 h-6" />,
      path: "",
    },
    {
      name: "Profile",
      icon: <AiOutlineUser className="w-6 h-6 " />,
      path: "profile",
    },
    {
      name: "All Listings",
      icon: <AiOutlineAppstore className="w-6 h-6 " />,
      path: "all-listings",
    },
    {
      name: "Add Listing",
      icon: <AiOutlineAppstoreAdd className="w-6 h-6 " />,
      path: "add-listing",
    },
    {
      name: "Posts",
      icon: <MdOutlinePostAdd className="w-6 h-6 " />,
      path: "posts",
    },
    {
      name: "Reviews",
      icon: <MdOutlineReviews className="w-6 h-6 " />,
      path: "reviews",
    },
    {
      name: "Leads",
      icon: <MdOutlineLeaderboard className="w-6 h-6 " />,
      path: "leads",
    },
    {
      name: "Subscriptions",
      icon: <BiDollar className="w-6 h-6 " />,
      path: "subscriptions",
    },
  ];

  const isActiveLink = (path) => {
    if (path === "") {
      return location.pathname === `/vendor/dashboard`;
    }
    return location.pathname === `/vendor/dashboard/${path}`;
  }

  return (
    <div className="flex-[2] overflow-y-auto border-r border-gray-300 p-10 flex flex-col justify-between items-start">
      <div className="flex flex-col gap-8 w-full">
        
        <div className="flex flex-col items-start justify-start gap-6 w-full">

      <Link to="/">
            <div className="flex items-center cursor-pointer gap-2">
              <FiArrowLeft className="w-5 h-5" />
              <span className="text-base">Home</span>
            </div>
          </Link>
        <div className="flex items-center gap-4">
          <img
            src={
              user.image
                ? user.image
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt=""
            className="rounded-full w-10 h-10 object-cover"
          />
          <h2 className="text-2xl font-semibold">{user.name}</h2>
        </div>

        </div>




        <hr className="w-full border-gray-300" />

        <div className="text-sm flex flex-col gap-8 w-full">


          {sidebarLinks.map(({ name, icon, path }, index) => (
            <Link to={path} key={index}>
              <div
                className={`flex items-center cursor-pointer gap-2 ${
                  isActiveLink(path) ? "text-blue-500" : "text-gray-700"
                }`}
              >
                {icon}
                <span className="">{name}</span>
              </div>
            </Link>
          ))}
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
