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
import { FiArrowLeft, FiArrowRight, FiBell, FiLogOut, FiMenu, FiStar, FiX } from "react-icons/fi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Sidebar = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const sidebarLinks = [
    {
      name: "Dashboard",
      icon: <LuLayoutDashboard className="w-5 h-5 md:w-6 md:h-6" />,
      path: "",
    },
    {
      name: "Profile",
      icon: <AiOutlineUser className="w-5 h-5 md:w-6 md:h-6 " />,
      path: "profile",
    },
    {
      name: "All Listings",
      icon: <AiOutlineAppstore className="w-5 h-5 md:w-6 md:h-6 " />,
      path: "all-listings",
    },
    {
      name: "Add Listing",
      icon: <AiOutlineAppstoreAdd className="w-5 h-5 md:w-6 md:h-6 " />,
      path: "add-listing",
    },
    {
      name: "Posts",
      icon: <MdOutlinePostAdd className="w-5 h-5 md:w-6 md:h-6 " />,
      path: "posts",
    },
    {
      name: "Reviews",
      icon: <FiStar className="w-5 h-5 md:w-6 md:h-6 " />,
      path: "reviews",
    },
    {
      name: "Leads",
      icon: <MdOutlineLeaderboard className="w-5 h-5 md:w-6 md:h-6 " />,
      path: "leads",
    },
    {
      name: "Subscriptions",
      icon: <BiDollar className="w-5 h-5 md:w-6 md:h-6 " />,
      path: "subscriptions",
    },
  ];

  const isActiveLink = (path) => {
    if (path === "") {
      return (
        location.pathname === `/dashboard/` ||
        location.pathname === `/dashboard`
      );
    }
    return location.pathname === `/dashboard/${path}`;
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const [dashboardMenuOpen, setDashboardMenuOpen] = useState(false);

  return (
    <div>
    <div
      className={`relative h-screen hidden md:flex  overflow-y-auto ${isSidebarCollapsed ? "p-2 pr-6" : "p-4 pr-8"} py-8 shadow-lg border-r flex justify-between items-start  `}
    >
      <div className={`h-full transition-all duration-[400ms]  flex flex-col justify-between overflow-y-auto ${isSidebarCollapsed ? " w-20 p-2" : " w-48"
        }`}>
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col items-center justify-start gap-6 w-full">





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
            {!isSidebarCollapsed && (
              <h2 className="text-2xl font-semibold">{user.name}</h2>
            )}
          </div>
        </div>

        <hr className="w-full border-gray-300" />

        <div className={` flex flex-col ${isSidebarCollapsed ? "items-center" : "items-start"} gap-4 w-full`}>
          {sidebarLinks.map(({ name, icon, path }, index) => (
            <Link to={path} key={index} className={`w-full rounded-md p-2 px-4 ${isSidebarCollapsed ? "px-0" : ""} ${isActiveLink(path) ? "bg-blue-500" : ""}`} >
              <div
                className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "justify-start"} w-full} cursor-pointer gap-3 ${isActiveLink(path) ? "text-white" : "text-gray-600"
                  }`}
              >
                {icon}
                { !isSidebarCollapsed &&
                <span className="text-base">{name}</span>
}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <hr className="w-full border-gray-300" />

      <div className="w-full">
          <button
            className={`w-full flex gap-3 items-center justify-center px-4 py-2 border text-white border-red-500 bg-red-500 rounded-lg ${isSidebarCollapsed && "border-0"}`}
            onClick={() => {
              localStorage.removeItem("token");
              dispatch(userLogout());
              navigate("/");
            }}
          >
            <FiLogOut className="w-6 h-6"/>
            { !isSidebarCollapsed &&
            <span>Logout</span> 
}
          </button>
      </div>

      </div>

      <div className="absolute -right-5 w-10 top-1/2 transform -translate-y-1/2 z-[20] flex items-center cursor-pointer gap-2">
            {!isSidebarCollapsed && (
              <div className=" p-1 rounded-2xl bg-gray-300 pr-2 flex items-center gap-1" onClick={toggleSidebar}>
                <FaAngleLeft className="w-4 h-4 text-gray-600" />
                {/* <span>Hide</span> */}
              </div>
            )}


            {isSidebarCollapsed && (
              <div className=" p-1 rounded-2xl bg-gray-300 pr-2 flex items-center gap-1" onClick={toggleSidebar}>
                {/* <span>Open</span> */}
                <FaAngleRight className="w-4 h-4 text-gray-600" />
              </div>
            )}
          </div>
    </div>



    <div className="w-full md:hidden bg-white shadow-md">

      <div className="flex justify-between items-center p-4">

        <div>
          <Link to="/" className="text-lg font-semibold text-blue-500">A.s</Link>
        </div>


        <div className="flex items-center gap-6">

<div className="relative">
          <FiBell className="w-5 h-5"/>
          <div className="absolute -top-2 text-white text-[10px] -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            4
          </div>
          </div>
        <div className="flex items-center gap-2">
          <img
            src={
              user.image
                ? user.image
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt=""
            className="rounded-full w-6 h-6 object-cover"
          />
          <h2 className="text-sm">{user.name}</h2>
        </div>

          <div className="flex items-center gap-4">
            <FiMenu className="w-6 h-6" onClick={() => setDashboardMenuOpen(!dashboardMenuOpen)}/>
          </div>
        </div>
      </div>

      {/* <hr className="w-full border-gray-300" /> */}
{ dashboardMenuOpen &&
<div className="fixed w-full flex flex-col px-5 gap-7 py-10 bg-white h-[100vh] z-[99] top-0">
  <div className="flex items-center justify-end">
    <FiX className="w-6 h-6" onClick={() => setDashboardMenuOpen(!dashboardMenuOpen)}/>
  </div>
      <div className="flex flex-col gap-4">
        {sidebarLinks.map(({ name, icon, path }, index) => (
          <Link to={path} key={index} className={`w-full rounded-md p-2 px-4 ${isActiveLink(path) ? "bg-blue-500 text-white" : ""}`} onClick={() => setDashboardMenuOpen(!dashboardMenuOpen)}>
            <div className="flex items-center justify-start w-full cursor-pointer gap-3">
              {icon}
              <span className="text-sm">{name}</span>
            </div>
          </Link>
        ))}
      </div>

      </div>

        }

    </div>


    </div>
    
  );
};

export default Sidebar;
