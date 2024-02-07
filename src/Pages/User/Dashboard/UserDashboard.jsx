import axios from "axios";
import React, { useState, useEffect } from "react";

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://aresuno-server.vercel.app/api/user/",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const user = res.data;
      console.log(user);
      setUser(user);
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
    <>
      <div className="relative h-screen">
            
      </div>
    </>
  );
};

export default UserDashboard;
