import axios from "axios";
import { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import { Route, Routes } from "react-router-dom";
import Overview from "./components/Overview";
import Profile from "./components/Profile";
import Inquiries from "./components/Inquiries";
import Reviews from "./components/Reviews";

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://aresuno-server.vercel.app/api/user/",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const user = res.data;
      setUser(user);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const [editMode, setEditMode] = useState(false);

  const [userEnquiries, setUserEnquiries] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "123-456-7890",
      message: "I would like to inquire about your products.",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "987-654-3210",
      message: "Could you provide me with a price quotation?",
    },
    {
      id: 3,
      name: "Alice Johnson",
      phone: "555-123-4567",
      message: "I need more information about your shipping policies.",
    },
    {
      id: 4,
      name: "Bob Thompson",
      phone: "444-555-6666",
      message:
        "I am interested in your services. Can you provide more details?",
    },
    {
      id: 5,
      name: "Eve Wilson",
      phone: "777-888-9999",
      message:
        "Can you confirm if the item I'm interested in is currently available?",
    },
    {
      id: 6,
      name: "Michael Brown",
      phone: "123-555-7890",
      message:
        "I have a technical issue with your software product. Can you assist?",
    },
    {
      id: 7,
      name: "Emily Davis",
      phone: "555-777-3333",
      message:
        "I would like to customize your product to fit my specific requirements.",
    },
    {
      id: 8,
      name: "David Martinez",
      phone: "888-999-1111",
      message:
        "Here's my feedback on the recent service I received from your company.",
    },
    {
      id: 9,
      name: "Sophia Anderson",
      phone: "111-222-3333",
      message:
        "I have encountered an issue with your website. Can you help resolve it?",
    },
    {
      id: 10,
      name: "William Wilson",
      phone: "333-444-5555",
      message:
        "I am interested in partnership opportunities with your organization.",
    },
  ]);
  const [userReviews, setUserReviews] = useState([
    {
      id: 1,
      title: "Great Service",
      content:
        "I had a wonderful experience with this business. The staff was friendly and helpful. Would highly recommend.",
      rating: 5,
    },
    {
      id: 2,
      title: "Quality Products",
      content:
        "The products offered by this business are top-notch. I am extremely satisfied with my purchase.",
      rating: 4,
    },
    {
      id: 3,
      title: "Prompt Delivery",
      content:
        "Received my order earlier than expected. Impressed with the efficiency of this business.",
      rating: 5,
    },
    {
      id: 4,
      title: "Excellent Customer Support",
      content:
        "The customer support team went above and beyond to assist me with my inquiries. Very impressed.",
      rating: 5,
    },
    {
      id: 5,
      title: "Room for Improvement",
      content:
        "While the service was satisfactory, there is still room for improvement in terms of product variety.",
      rating: 3,
    },
    {
      id: 6,
      title: "Friendly Atmosphere",
      content:
        "The atmosphere in this business is warm and welcoming. Makes me want to come back again.",
      rating: 4,
    },
    {
      id: 7,
      title: "Quick Response",
      content:
        "Had an issue with my order, but it was quickly resolved by the responsive customer service team.",
      rating: 4,
    },
    {
      id: 8,
      title: "Value for Money",
      content:
        "The prices are reasonable considering the quality of the products. Great value for money.",
      rating: 5,
    },
    {
      id: 9,
      title: "Efficient Service",
      content:
        "The service provided by this business is efficient and hassle-free. Will definitely return.",
      rating: 5,
    },
    {
      id: 10,
      title: "Disappointing Experience",
      content:
        "Unfortunately, my experience with this business was disappointing. Product quality did not meet expectations.",
      rating: 2,
    },
  ]);

  return (
    <>
      <div className="relative h-screen">
        <DashboardLayout user={user}>
          <Routes>
            <Route
              path="/"
              element={
                <Overview
                  user={user}
                  Enquiries={userEnquiries}
                  Reviews={userReviews}
                />
              }
            />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route
              path="/inquiries"
              element={<Inquiries user={user} Enquiries={userEnquiries} />}
            />
            <Route
              path="/reviews"
              element={<Reviews user={user} Reviews={userReviews} />}
            />
          </Routes>
        </DashboardLayout>
      </div>
    </>
  );
};

export default UserDashboard;
