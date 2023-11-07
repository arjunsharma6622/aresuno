import axios, { all } from "axios";
import React, { useState, useEffect } from "react";
import { BiDollar, BiSolidBusiness } from "react-icons/bi";
import { BsPeopleFill, BsStarFill } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  MdOutlineLeaderboard,
  MdOutlinePostAdd,
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
import {
  FiDelete,
  FiEdit,
  FiEdit2,
  FiExternalLink,
  FiEye,
  FiEyeOff,
  FiLink,
  FiLock,
  FiStar,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import Modal from "./Modal";

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

const Reviews = ({ businesses }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">All the Ratings & Reviews</h1>

      <div className="bg-white rounded-xl">
        <table className="w-full">
          <thead className="">
            <tr className="bg-gray-300">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Review
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-sm">
            {businesses.map((business) =>
              business.ratingsReviews.map((ratingReview, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2 items-center">
                      <img
                        src={
                          ratingReview.user.profileImg ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                        alt=""
                        className="w-5 h-5 rounded-full"
                      />
                      {ratingReview.user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {business.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2 items-center">
                      {ratingReview.rating}
                      <BsStarFill className="text-gray-500" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {ratingReview.review}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Posts = ({ posts, businesses }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        You have {posts.length} Posts
      </h1>

      <table className="w-full table-auto">
        <thead className="">
          <tr className="bg-gray-300">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              PostId
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Posted In
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-sm">
          {businesses.map((business, topindex) =>
            business.posts.map((post, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{post._id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{business.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {post.image ? post.image : "No Image"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {post.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {
                    new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })

                  }
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <FiTrash2 className="text-red-500 w-5 h-5 cursor-pointer" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
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

const AllListings = ({ businesses }) => {
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-6">All Listings</h1>
      <div className="mb-6">
        <span>Total Businesses : {businesses.length}</span>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {businesses.map((business) => (
          <div
            key={business._id}
            className="text-base flex flex-col gap-4 border-[1.5px] border-gray-400 p-6 py-3 rounded"
          >
            <span className="font-semibold text-xl underline">
              {business.name}
            </span>
            <div className="flex gap-2 flex-col text-sm">
              <span>Category : {business.mainCategory}</span>
              <span>Phone : {business.phone}</span>
              <span>Created on : {new Date(business.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>Last Update : {new Date(business.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>



              <div className="flex items-center justify-between">

                <Link
                  to={`/business/${business._id}`}
                  className="flex gap-2 items-center justify-start text-blue-500"
                >
                  <span>View</span>
                  <FiExternalLink className="w-4 h-4" />
                </Link>


                <Link
                  to={`/business/edit/${business._id}`}
                  className="flex gap-2 items-center justify-start text-gray-500"
                >
                  <span>Edit</span>
                  <FiEdit2 className="w-4 h-4" />
                </Link>


              <div
                className="flex gap-2 items-center text-red-600 cursor-pointer"
                onClick={() => setSelectedBusiness(business)}
              >
                <span>Delete</span>
                <FiTrash2 className="w-4 h-4" />
              </div>

              </div>



            {selectedBusiness && selectedBusiness._id === business._id && (
              <Modal
                business={selectedBusiness}
                onClose={() => setSelectedBusiness(null)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const AddListing = () => {
  return (
    <div>
      <BusinessRegister />
    </div>
  );
};

const VendorDashboard = () => {
  const [user, setUser] = useState({});
  const [userEdit, setUserEdit] = useState({});
  const [businesses, setBusinesses] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
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
  const [selectedField, setSelectedField] = useState("dashboard");
  const [edit, setEdit] = useState(true);
  const [updatedPassword, setUpdatedPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        "https://aresuno-server.vercel.app/api/vendor/",
        { password: updatedPassword.newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUpdatedPassword({
        newPassword: "",
        confirmPassword: "",
      });
      console.log(res.data);
      toast.success("Password Updated");
    } catch (err) {
      console.log(err);
      toast.error("Error Updating Password");
    }
  };

  const handleChange = (e) => {
    setUserEdit({ ...userEdit, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setUpdatedPassword({ ...updatedPassword, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        "https://aresuno-server.vercel.app/api/vendor/",
        { name: userEdit.name },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      toast.success("Profile Updated");
    } catch (err) {
      console.log(err);
      toast.error("Error Updating Profile");
    }
  };

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

      // Extract all posts from businesses array
      const allPosts = businesses.flatMap((business) => business.posts);

      console.log(user);
      console.log(businesses);
      setUser(user);
      setUserEdit(user);

      setBusinesses(businesses);
      setAllPosts(allPosts);

      console.log(allPosts);
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
              className={`flex items-center cursor-pointer gap-2 ${selectedField === "dashboard"
                ? "text-blue-500"
                : "text-gray-700"
                }`}
              onClick={() => handleSelectedField("dashboard")}
            >
              <LuLayoutDashboard className="w-6 h-6" />
              <span className="">Dashboard</span>
            </div>

            <div
              className={`flex items-center cursor-pointer gap-2 ${selectedField === "profile" ? "text-blue-500" : "text-gray-700"
                }`}
              onClick={() => handleSelectedField("profile")}
            >
              <AiOutlineUser className="w-6 h-6 " />
              <span className="">Profile</span>
            </div>

            <div
              className={`flex items-center cursor-pointer gap-2 ${selectedField === "allListings"
                ? "text-blue-500"
                : "text-gray-700"
                }`}
              onClick={() => handleSelectedField("allListings")}
            >
              <AiOutlineAppstore className="w-6 h-6 " />
              <span className="">All Listing</span>
            </div>
            <div
              className={`flex items-center cursor-pointer gap-2 ${selectedField === "addListing"
                ? "text-blue-500"
                : "text-gray-700"
                }`}
              onClick={() => handleSelectedField("addListing")}
            >
              <AiOutlineAppstoreAdd className="w-6 h-6 " />
              <span className="">Add New Listing</span>
            </div>
            <div
              className={`flex items-center cursor-pointer gap-2 ${selectedField === "posts" ? "text-blue-500" : "text-gray-700"
                }`}
              onClick={() => handleSelectedField("posts")}
            >
              <MdOutlinePostAdd className="w-6 h-6 " />
              <span className="">Posts</span>
            </div>
            <div
              className={`flex items-center cursor-pointer gap-2 ${selectedField === "reviews" ? "text-blue-500" : "text-gray-700"
                }`}
              onClick={() => handleSelectedField("reviews")}
            >
              <MdOutlineReviews className="w-6 h-6 " />
              <span className="">Reviews</span>
            </div>
            <div
              className={`flex items-center cursor-pointer gap-2 ${selectedField === "leads" ? "text-blue-500" : "text-gray-700"
                }`}
              onClick={() => handleSelectedField("leads")}
            >
              <MdOutlineLeaderboard className="w-6 h-6 " />
              <span className="">Leads</span>
            </div>
            <div
              className={`flex items-center cursor-pointer gap-2 ${selectedField === "subscriptions"
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
            ) : (
              <div className="">
                {selectedField === "dashboard" && (
                  <Overview businesses={businesses} data={data} />
                )}
                {selectedField === "profile" && (
                  <div className="w-full flex justify-center items-center flex-col gap-10">
                    <img
                      src="https://picsum.photos/200"
                      alt=""
                      className="rounded-full w-28 h-28"
                    />

                    <div className="flex w-full flex-col items-center justify-between gap-8">
                      <div className="w-1/2">
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-medium">
                            Update Business Details
                          </h2>
                          {edit ? (
                            <FiEdit
                              className="text-gray-500 cursor-pointer w-6 h-6"
                              onClick={() => {
                                setEdit(!edit);
                              }}
                            />
                          ) : (
                            <FiX
                              className="text-red-500 cursor-pointer w-6 h-6"
                              onClick={() => {
                                setEdit(!edit);
                              }}
                            />
                          )}
                        </div>

                        <div className="">
                          <form className={`flex flex-col gap-4 mt-6`}>
                            <input
                              type="text"
                              value={userEdit.name}
                              disabled={edit}
                              className=" border-gray-400 border-[1px] rounded-sm px-5 py-2 focus:outline-none w-full"
                              onChange={handleChange}
                              name="name"
                              placeholder="Name"
                            />
                            <input
                              type="text"
                              value={userEdit.email}
                              disabled
                              className=" border-gray-400 text-gray-400 font-light cursor-not-allowed border-[1px] rounded-sm px-5 py-2 focus:outline-none w-full"
                              onChange={handleChange}
                              name="email"
                              placeholder="Email"
                            />
                            <input
                              type="text"
                              value={userEdit.phone}
                              disabled
                              className=" border-gray-400 cursor-not-allowed border-[1px] rounded-sm px-5 py-2 focus:outline-none w-full"
                              onChange={handleChange}
                              name="phone"
                              placeholder="Phone"
                            />

                            <button
                              type="submit"
                              className="bg-blue-500 rounded-sm py-2 px-5 text-white"
                              onClick={handleProfileUpdate}
                            >
                              Update Profile
                            </button>
                          </form>
                        </div>
                      </div>

                      <div className="w-1/2">
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-medium">
                            Change Password
                          </h2>

                          <FiLock className="text-gray-500 w-6 h-6" />
                        </div>

                        <div className="">
                          <form className={`flex flex-col gap-4 mt-6`}>
                            <div>
                              <input
                                type="password"
                                value={updatedPassword.newPassword}
                                className="border-gray-400 border-[1px] rounded-sm px-5 py-2 focus:outline-none w-full"
                                onChange={handlePasswordChange}
                                name="newPassword"
                                placeholder="New Password"
                              />
                            </div>

                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                value={updatedPassword.confirmPassword}
                                className="border-gray-400 border-[1px] rounded-sm px-5 py-2 focus:outline-none w-full"
                                onChange={handlePasswordChange}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                              />

                              <div
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <FiEye
                                    strokeWidth={1.5}
                                    className="bx bx-hide eye-icon absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm cursor-pointer text-gray-400 w-6 h-6"
                                  />
                                ) : (
                                  <FiEyeOff
                                    strokeWidth={1.5}
                                    className="bx bx-show eye-icon absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm cursor-pointer text-gray-400 w-6 h-6"
                                  />
                                )}
                              </div>
                            </div>

                            {updatedPassword.confirmPassword &&
                              (updatedPassword.newPassword !==
                                updatedPassword.confirmPassword ? (
                                <p className="text-red-500 text-xs italic">
                                  Passwords do not match
                                </p>
                              ) : (
                                <p className="text-green-500 text-xs italic">
                                  Passwords Match
                                </p>
                              ))}

                            <button
                              type="submit"
                              className={`bg-blue-500 rounded-sm py-2 px-5 text-white ${!updatedPassword.confirmPassword ||
                                updatedPassword.newPassword !==
                                updatedPassword.confirmPassword
                                ? "cursor-not-allowed"
                                : ""
                                }`}
                              disabled={
                                !updatedPassword.confirmPassword ||
                                updatedPassword.newPassword !==
                                updatedPassword.confirmPassword
                              }
                              onClick={handlePasswordClick}
                            >
                              Change Password
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {selectedField === "allListings" && (
                  <AllListings businesses={businesses} />
                )}
                {selectedField === "addListing" && <AddListing />}
                {selectedField === "reviews" && (
                  <Reviews businesses={businesses} />
                )}
                {selectedField === "posts" && (
                  <Posts posts={allPosts} businesses={businesses} />
                )}
                {selectedField === "leads" && <Leads />}
                {selectedField === "subscriptions" && <Subscriptions />}
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VendorDashboard;
