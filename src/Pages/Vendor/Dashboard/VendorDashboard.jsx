import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Overview from "./components/Overview";
import Reviews from "./components/Reviews";
import Posts from "./components/Posts";
import Leads from "./components/Leads";
import Subscriptions from "./components/Subscriptions";
import AllListings from "./components/AllListings";
import AddListing from "./components/AddListing";
import Profile from "./components/Profile";
import DashboardLayout from "./DashboardLayout";
import { Route, Routes } from "react-router-dom";

const api = axios.create({
  baseURL: "https://aresuno-server.vercel.app/api/vendor/",
});

const VendorDashboard = () => {
  const [user, setUser] = useState({});
  const [businesses, setBusinesses] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data: user } = await api.get("/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { data: businesses } = await api.get("/businesses", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Extract all posts from businesses array
      const allPosts = businesses.flatMap((business) => business.posts);

      setUser(user);
      setBusinesses(businesses);
      setAllPosts(allPosts);
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error (e.g., show a user-friendly message)
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  console.log(user)

  return (
    <div className="">
      <DashboardLayout user={user}>
        <Routes>
          <Route
            path="/"
            element={<Overview businesses={businesses} posts={allPosts} />}
          />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route
            path="/all-listings"
            element={<AllListings businesses={businesses} />}
          />
          <Route path="/add-listing" element={<AddListing />} />
          <Route
            path="/posts"
            element={<Posts posts={allPosts} businesses={businesses} />}
          />
          <Route
            path="/reviews"
            element={<Reviews businesses={businesses} />}
          />
          <Route path="/leads" element={<Leads />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
        </Routes>

        <ToastContainer />
      </DashboardLayout>
    </div>
  );
};

export default VendorDashboard;
