import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import { BiDollar, BiSolidBusiness } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { MdOutlineLeaderboard, MdOutlineRateReview, MdOutlineReviews, MdRateReview, MdReviews } from "react-icons/md";
import BusinessEdit from "../../BusinessEdit";
import BusinessRegister from "../../BusinessRegister";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import { AiOutlineAppstore, AiOutlineAppstoreAdd, AiOutlineUser } from "react-icons/ai";

const VendorDashboard = () => {
  const [user, setUser] = useState({});
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const data = [
    {
      name: "Jan",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Apr",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Jun",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Jul",
      uv: 3490,
      pv: 4300,
      amt: 1900,
    },
    {
      name: "Aug",
      uv: 2490,
      pv: 4300,
      amt: 1700,
    },
    {
      name: "Sep",
      uv: 1490,
      pv: 1300,
      amt: 1000,
    },
    {
      name: "Oct",
      uv: 2490,
      pv: 4300,
      amt: 1700,
    },
    {
      name: "Nov",
      uv: 2790,
      pv: 4300,
      amt: 1700,
    },
    {
      name: "Dec",
      uv: 3490,
      pv: 4300,
      amt: 1700,
    },
  ];

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://aresuno-server.vercel.app/api/vendor/",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const user = res.data;

      const resBusinesses = await axios.get(
        "https://aresuno-server.vercel.app/api/vendor/businesses",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const businesses = resBusinesses.data;

      console.log(user);
      console.log(businesses);
      setUser(user);
      setBusinesses(businesses);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const [editMode, setEditMode] = useState(false);

  const [userEnquiries, setUserEnquiries] = useState([
    {
      id: 1,
      title: "Enquiry 1",
      description: "Description of Enquiry 1",
      // other fields for enquiries
    },
    // other enquiries
  ]);
  const [userReviews, setUserReviews] = useState([
    {
      id: 1,
      title: "Review 1",
      content: "Content of Review 1",
      // other fields for reviews
    },
    // other reviews
  ]);

  const handleEditProfile = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    // Send an API request to save the updated profile data
    // You can implement this part based on your backend
    setEditMode(false);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-[2] overflow-y-auto border-r border-gray-300 p-10 flex flex-col justify-between items-start">
        <div className="flex flex-col gap-10 w-full">
          <div className="flex items-center gap-4">
            <img
              src="https://picsum.photos/200"
              alt=""
              className="rounded-full w-10 h-10"
            />
            <h2 className="text-2xl font-semibold">{user.name}</h2>
          </div>

          <div className="text-sm flex flex-col gap-6 w-full">

            <div className="flex items-center gap-2">
              <AiOutlineUser className="w-6 h-6 text-gray-700" />
              <span className=" cursor-pointer">Profile</span>
            </div>
            <div className="flex items-center gap-2">
              <AiOutlineAppstore className="w-6 h-6 text-gray-700" />
              <span className=" cursor-pointer">All Listing</span>
            </div>
            <div className="flex items-center gap-2">
              <AiOutlineAppstoreAdd className="w-6 h-6 text-gray-700" />
              <span className=" cursor-pointer">Add New Listing</span>
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineReviews className="w-6 h-6 text-gray-700" />
              <span className=" cursor-pointer">Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineLeaderboard className="w-6 h-6 text-gray-700" />
              <span className=" cursor-pointer">Leads</span>
            </div>
            <div className="flex items-center gap-2">
              <BiDollar className="w-6 h-6 text-gray-700" />
              <span className=" cursor-pointer">Subscriptions</span>
            </div>


          </div>
        </div>
        <div className="w-full">
          <button className="w-full px-4 py-1 border text-red-500 border-red-500">
            Logout
          </button>
        </div>
      </div>
      <div className="flex-[10] bg-gray-100 p-10 overflow-y-scroll">
        <div className="flex flex-col w-full justify-center">
          <div className="">
            {loading ? (
              <div role="status" class="max-w-sm animate-pulse">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-32 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-32 mb-4"></div>
                <span className="sr-only">Loading...</span>
              </div>
            ) : businesses.length > 0 ? (
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
                    <LineChart data={data} className="text-sm font-light">
                      <Line type="monotone" dataKey="uv" stroke="#007bff" />
                      <CartesianGrid stroke="#ddd" strokeDasharray="5 5" />
                      {/* <XAxis dataKey="name" /> */}
                      <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />

                      <YAxis />
                      <Tooltip />
                      {/* <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" /> */}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-300 p-6 mb-6 min-h-screen">
                {/* <p>No businesses found.</p>
                                <Link to="/business/register" className="flex justify-start items-center gap-2 text-blue-500">
                                    <span className="text-blue-500">
                                        Create Your New Business Now
                                    </span>
                                    <FiExternalLink size={20} color="" className="text-blue-500" />
                                </Link> */}
                <BusinessRegister />
              </div>
            )}
          </div>

          {/* <div className="bg-white rounded-lg border border-gray-300 p-6">
                        <BusinessEdit />
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
