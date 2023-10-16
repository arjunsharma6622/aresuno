import axios from 'axios';
import React, { useState, useEffect } from 'react';

const UserDashboard = () => {

    const [user, setUser] = useState({});




    const fetchUserData = async () => {
        try {
            const res = await axios.get("https://aresuno-server.vercel.app/api/user/", { withCredentials: true });
            const user = res.data;
            console.log(user)
            setUser(user);
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
                            <input type="password" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id='password' value={user.password} onChange={handleChange} />

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
                            <p className="text-gray-700">{user.password}</p>
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


            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Enquiries Section</h2>
                {userEnquiries.map((enquiry) => (
                    <div key={enquiry.id} className="mb-4">
                        <p className="text-gray-700 font-semibold">Title: {enquiry.title}</p>
                        <p className="text-gray-700 font-semibold">Description: {enquiry.description}</p>
                        {/* Other enquiry fields */}
                    </div>
                ))}
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-4">Reviews Section</h2>
                {userReviews.map((review) => (
                    <div key={review.id} className="mb-4">
                        <p className="text-gray-700 font-semibold">Title: {review.title}</p>
                        <p className="text-gray-700 font-semibold">Content: {review.content}</p>
                        {/* Other review fields */}
                    </div>
                ))}
            </div>
            {/* ... (other sections remain the same) */}
        </div>
    );
};

export default UserDashboard;
