import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { userLogout } from "../../state/slices/userSlice";
import { FiDollarSign, FiLogOut, FiMapPin, FiUser } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { LuLayoutDashboard } from "react-icons/lu";

const Header = ({homePage}) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className={`w-[100%] h-16  flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-md ${homePage && "shadow-none text-white"} text-black`} >
      <div className={` text-2xl font-semibold`}>
        <Link to="/">Aresuno</Link>
      </div>

      {user.name ? (
        <div className="flex gap-6 items-center">

            <div className="flex items-center gap-2">
                <FiMapPin className="w-5 h-5" />
                Delhi
            </div>



            <button className={` border ${homePage && "border-white"} border-black px-3 py-1 rounded-lg`}>
            <Link className="">List your business</Link>
          </button>


          <div
            className=" relative px-2 py-1 text-base"
            onMouseEnter={() => setProfileOpen(true)}
            onMouseLeave={() => setProfileOpen(false)}
          >
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src={
                  user.image ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              {user.name}
            </div>

            {profileOpen && (
              <div className="z-[999] shadow-md border border-gray-600 absolute top-10 right-0 rounded-xl bg-white  text-black w-[200px] py-5">
                <div className="flex flex-col gap-2 items-start text-[14px]">
                  <div className="px-4 w-full py-3 hover:bg-gray-100">
                    <Link
                      to={`${user.userType}/dashboard`}
                      className="flex items-center gap-4"
                    >
                      <FiUser className="w-5 h-5" />
                      <span>Manage Profile</span>
                    </Link>
                  </div>

                  <div className="px-4 w-full py-3 hover:bg-gray-100">
                    <Link
                      to={`${user.userType}/dashboard`}
                      className="flex items-center gap-4"
                    >
                      <LuLayoutDashboard className="w-5 h-5" />
                      <span>Dashboard</span>
                    </Link>
                  </div>

                  <div className="px-4 w-full py-3 hover:bg-gray-100">
                    <Link
                      to={`${user.userType}/dashboard/`}
                      className="flex items-center gap-4"
                    >
                      <FiDollarSign className="w-5 h-5" />
                      <span>Subscriptions</span>
                    </Link>
                  </div>

                  <div className="px-4 w-full py-3 hover:bg-gray-100">
                    <div
                      className=" text-red-600 cursor-pointer flex gap-4 items-center"
                      onClick={async () => {
                        localStorage.removeItem("token");
                        dispatch(userLogout());
                        navigate("/");
                      }}
                    >
                      <FiLogOut className="w-5 h-5" />
                      <span>Logout</span>{" "}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>


        </div>
      ) : (
        <div className="flex gap-6 items-center">
          <button className={`border border-black ${homePage && "border-white"} px-3 py-1 rounded-lg`}>
            <Link className="">List your business</Link>
          </button>
          <button className="bg-white text-base border  text-blue-700 px-3 py-1 rounded-lg">
            <Link to="/login">Login</Link>
          </button>
          <button className="bg-white text-base border  text-blue-700 px-3 py-1 rounded-lg">
            <Link to="/signup">Signup</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
