import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiExternalLink } from 'react-icons/fi';
import BusinessEdit from "../../BusinessEdit";
import BusinessRegister from "../../BusinessRegister";

const VendorDashboard = () => {
    const [user, setUser] = useState({});
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);

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
            <div className="w-1/4 overflow-y-auto border-r border-gray-300 p-10 flex flex-col justify-between items-start">

                <div className="flex flex-col gap-8 w-full">

                    <div className="flex items-center gap-4">
                        <img src="https://picsum.photos/200" alt="" className="rounded-full w-10 h-10"/>
                        <h2 className="text-2xl font-semibold">{user.name}</h2>
                    </div>


                    <div className="flex flex-col gap-4 w-full">
                        <h2>My Profile</h2>
                        <h2>All Listings</h2>
                        <h2>Add New Listing</h2>
                        <h2>Reviews</h2>
                        <h2>Leads</h2>
                        <h2>Subscriptions</h2>
                    </div>
                </div>
                <div className="w-full">
                    <button className="w-full px-4 py-1 border text-red-500 border-red-500">Logout</button>
                </div>
            </div>
            <div className="w-3/4 bg-gray-100 p-6 overflow-y-scroll">

                <div className="flex flex-col w-full justify-center">


                    <div className="bg-white rounded-lg border border-gray-300 p-6 mb-6 min-h-screen">
                        {loading ? (
                            <div role="status" class="max-w-sm animate-pulse">
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-32 mb-4"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-48 mb-4"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-32 mb-4"></div>
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : businesses.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                                        <h2 className="text-2xl font-bold mb-4">All Businesses</h2>

                                {businesses.map((business, index) => (
                                    <div key={business._id} className=" flex flex-col rounded-lg">
                                        <span className="font-bold">{business.name}</span>
                                        <span>Type : {business.type}</span>
                                        <span>Phone : {business.phone}</span>
                                        <span>MainCategory : {business.mainCategory}</span>
                                        <span>SubCategory : {business.subCategory}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
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
