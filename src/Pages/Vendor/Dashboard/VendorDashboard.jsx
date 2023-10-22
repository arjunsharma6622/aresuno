import axios from 'axios';
import React, { useState, useEffect } from 'react';

const VendorDashboard = () => {

    const [user, setUser] = useState({});
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchUserData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const res = await axios.get("https://aresuno-server.vercel.app/api/vendor/", { headers: { Authorization: `Bearer ${token}` } });
            const user = res.data;

            const resBusinesses = await axios.get("https://aresuno-server.vercel.app/api/vendor/businesses", { headers: { Authorization: `Bearer ${token}` } });
            const businesses = resBusinesses.data;


            console.log(user)
            console.log(businesses)
            setUser(user);
            setBusinesses(businesses);

            setLoading(false);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [])


    const [editMode, setEditMode] = useState(false);


    const [userEnquiries, setUserEnquiries] = useState([
        {
            id: 1,
            title: 'Enquiry 1',
            description: 'Description of Enquiry 1',
            // other fields for enquiries
        },
        // other enquiries
    ]);
    const [userReviews, setUserReviews] = useState([
        {
            id: 1,
            title: 'Review 1',
            content: 'Content of Review 1',
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
        <div className="container mx-auto p-6">


            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Profile Section</h2>

                {loading ?
                    <div role="status" class="max-w-sm animate-pulse">
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-32 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-32 mb-4"></div>
                        <span className="sr-only">Loading...</span>
                    </div>
                    :

                    <div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                Name
                            </label>

                            {editMode ? (
                                <>
                                    <input
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={user.name}
                                        onChange={handleChange}
                                    />

                                    <input
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                        id="email"
                                        type="text"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                    />

                                    <input
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                        id="phone"
                                        type="text"
                                        name="phone"
                                        value={user.phone}
                                        onChange={handleChange}
                                    />
                                </>

                            ) : (
                                <>
                                    <p className="text-gray-700">{user.name}</p>
                                    <p className="text-gray-700">{user.email}</p>
                                    <p className="text-gray-700">{user.phone}</p>
                                </>
                            )}
                        </div>
                        {/* Repeat the same structure for other fields */}
                        {editMode ? (
                            <div>
                                <button
                                    onClick={saveProfile}
                                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleEditProfile}
                                    className="ml-4 bg-gray-500 text-white py-2 px-4 rounded hover-bg-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleEditProfile}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                }
            </div>


            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">All Businesses</h2>
                {loading ? (
                    <div role="status" class="max-w-sm animate-pulse">
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-32 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-32 mb-4"></div>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) :
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {businesses.map((business, index) => (
                            <div
                                key={business._id}
                                className="mb-4 flex flex-col border border-gray p-6 rounded-2xl"
                            >
                                <span className='font-bold'>{business.name}</span>
                                <span>Type : {business.type}</span>
                                <span>Phone : {business.phone}</span>
                                <span>MainCategory : {business.mainCategory}</span>
                                <span>SubCategory : {business.subCategory}</span>
                            </div>
                        ))}
                    </div>
                }
            </div>

        </div>
    );
};

export default VendorDashboard;
