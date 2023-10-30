import axios from "axios";
import React, { useState, useEffect } from "react";
import { BiDollar, BiSolidBusiness } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  MdOutlineLeaderboard,
  MdOutlineReviews,
  MdReviews,
} from "react-icons/md";
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
import {
  AiOutlineAppstore,
  AiOutlineAppstoreAdd,
  AiOutlineUser,
} from "react-icons/ai";

const Overview = ({ businesses, data }) => {
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
          <LineChart data={data} className="text-sm font-light">
            <Line type="monotone" dataKey="Leads" stroke="#007bff" />
            <CartesianGrid stroke="#ddd" strokeDasharray="5 5" />
            {/* <XAxis dataKey="name" /> */}
            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />

            <YAxis />
            <Tooltip />
            {/* <Area type="monotone" dataKey="Leads" stroke="#8884d8" fill="#8884d8" /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};

const Reviews = () => {
  return (
    <div>
      <h1>Reviews</h1>
    </div>
  );
};

const Leads = () => {
  return (
    <div>
      <h1>Leads</h1>
    </div>
  );
};

const Subscriptions = () => {
  return (
    <div>
      <h1>Subscriptions</h1>
    </div>
  );
};

const AllListings = () => {
  return (
    <div>
      <h1>AllListings</h1>
    </div>
  );
};

const AddListing = () => {
  return (
    <div>
      <h1>AddListing</h1>
    </div>
  );
};

const VendorDashboard = () => {
  const [user, setUser] = useState({});
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const data = [
    {
      name: "Jan",
      Leads: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      Leads: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      Leads: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Apr",
      Leads: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "May",
      Leads: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Jun",
      Leads: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Jul",
      Leads: 3490,
      pv: 4300,
      amt: 1900,
    },
    {
      name: "Aug",
      Leads: 2490,
      pv: 4300,
      amt: 1700,
    },
    {
      name: "Sep",
      Leads: 1490,
      pv: 1300,
      amt: 1000,
    },
    {
      name: "Oct",
      Leads: 2490,
      pv: 4300,
      amt: 1700,
    },
    {
      name: "Nov",
      Leads: 2790,
      pv: 4300,
      amt: 1700,
    },
    {
      name: "Dec",
      Leads: 3490,
      pv: 4300,
      amt: 1700,
    },
  ];
  const [selectedField, setSelectedField] = useState('dashboard');

  const handleSelectedField = (field) => {
    setSelectedField(field);
    console.log(field);
  };
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

            <div
              className={`flex items-center cursor-pointer gap-2 ${selectedField === 'dashboard' ? 'text-blue-500' : 'text-gray-700'}`}
              onClick={() => handleSelectedField("dashboard")}
            >
              <LuLayoutDashboard className="w-6 h-6" />
              <span className="">Dashboard</span>
            </div>

            <div
              className={`flex items-center cursor-pointer gap-2 ${selectedField === 'profile' ? 'text-blue-500' : 'text-gray-700'}`}
              onClick={() => handleSelectedField("profile")}
            >
              <AiOutlineUser className="w-6 h-6 " />
              <span className="">Profile</span>
            </div>

            <div
              className={`flex items-center cursor-pointer gap-2 ${selectedField === 'allListings' ? 'text-blue-500' : 'text-gray-700'}`}
              onClick={() => handleSelectedField("allListings")}
            >
              <AiOutlineAppstore className="w-6 h-6 " />
              <span className="">All Listing</span>
            </div>
            <div
              className={`flex items-center cursor-pointer gap-2 ${selectedField === 'addListing' ? 'text-blue-500' : 'text-gray-700'}`}
              onClick={() => handleSelectedField("addListing")}
            >
              <AiOutlineAppstoreAdd className="w-6 h-6 " />
              <span className="">Add New Listing</span>
            </div>
            <div
              className={`flex items-center cursor-pointer gap-2 ${selectedField === 'reviews' ? 'text-blue-500' : 'text-gray-700'}`}
              onClick={() => handleSelectedField("reviews")}
            >
              <MdOutlineReviews className="w-6 h-6 " />
              <span className="">Reviews</span>
            </div>
            <div
              className={`flex items-center cursor-pointer gap-2 ${selectedField === 'leads' ? 'text-blue-500' : 'text-gray-700'}`}
              onClick={() => handleSelectedField("leads")}
            >
              <MdOutlineLeaderboard className="w-6 h-6 " />
              <span className="">Leads</span>
            </div>
            <div
              className={`flex items-center cursor-pointer gap-2 ${selectedField === 'subscriptions' ? 'text-blue-500' : 'text-gray-700'}`}
              onClick={() => handleSelectedField("subscriptions")}
            >
              <BiDollar className="w-6 h-6 text-gray-700" />
              <span className="">Subscriptions</span>
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
              <div role="status" className="max-w-sm animate-pulse">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-32 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-32 mb-4"></div>
                <span className="sr-only">Loading...</span>
              </div>
            ) : businesses.length > 0 ? (
              <div>
                {selectedField === "dashboard" && <Overview businesses={businesses} data={data}/>}
                {selectedField === "profile" && <Profile />}
                {selectedField === "allListings" && <AllListings />}
                {selectedField === "addListing" && <AddListing />}
                {selectedField === "reviews" && <Reviews />}
                {selectedField === "leads" && <Leads />}
                {selectedField === "subscriptions" && <Subscriptions />}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-300 p-6 mb-6 min-h-screen">
                <BusinessRegister />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
