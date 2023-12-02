import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "./components/Sidebar";
import Overview from "./components/Overview";
import Reviews from "./components/Reviews";
import Posts from "./components/Posts";
import Leads from "./components/Leads";
import Subscriptions from "./components/Subscriptions";
import AllListings from "./components/AllListings";
import AddListing from "./components/AddListing";
import Profile from "./components/Profile";

const VendorDashboard = () => {
  const [user, setUser] = useState({});
  const [businesses, setBusinesses] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedField, setSelectedField] = useState("dashboard");


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
      <Sidebar user={user} handleSelectedField={(selectedField) => handleSelectedField(selectedField)} selectedField={selectedField} />

      <div className="flex-[10] bg-gray-100 p-10 overflow-y-scroll">
        <div className="flex flex-col w-full justify-center">
          {/* <div className="">
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
                  <Overview businesses={businesses}/>
                )}
                {selectedField === "profile" && (
                  <Profile user={user}/>
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
          </div> */}


<div className="">
                {selectedField === "dashboard" && (
                  <Overview businesses={businesses} posts={allPosts}/>
                )}
                {selectedField === "profile" && (
                  <Profile user={user}/>
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
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VendorDashboard;
