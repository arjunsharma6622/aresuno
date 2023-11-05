import axios from "axios";
import React, { useState, useEffect } from "react";
import { BiDollar, BiSolidBusiness } from "react-icons/bi";
import { BsPeopleFill, BsStarFill } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import {
    MdOutlineLeaderboard,
    MdOutlineReviews,
    MdReviews,
} from "react-icons/md";
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
import { FiDelete, FiEdit, FiExternalLink, FiEye, FiEyeOff, FiLink, FiLock, FiStar, FiTrash2, FiX } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";



const AllBusiness = ({ businesses }) => {

    const handleDelete = async (id) => {
        try {
            
            const res = await axios.delete(`https://aresuno-server.vercel.app/api/business/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            // toast.success(res.data.message);
            window.location.reload();
        }
        catch (err) {
            // toast.error(err.response.data.message);
            console.log(err)
        }
    }



    return (
        <div>
                <div className="bg-white rounded-xl">

                    <table className="w-full text-sm table-auto">
                        <thead className="">
                            <tr className="bg-gray-300">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SNo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owned by</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Main Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {businesses.map((business, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{index+1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{business.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{business.vendorName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{business.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{business.mainCategory}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{business.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <FiTrash2 className="text-red-500 w-5 h-5 cursor-pointer" onClick={() => handleDelete(business._id)}/>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

        </div>
    );
};



const AdminDashboard = () => {
    const [user, setUser] = useState({});
    const [userEdit, setUserEdit] = useState({});
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
    const [selectedField, setSelectedField] = useState("allBusinesses");


    const handleSelectedField = (field) => {
        setSelectedField(field);
        console.log(field);
    };

    const fetchBusinessesData = async () => {
        try {
            setLoading(true);

            const resBusinesses = await axios.get(
                "https://aresuno-server.vercel.app/api/business/");
            const businesses = resBusinesses.data;

            console.log(businesses);
            setBusinesses(businesses);

            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchBusinessesData();
    }, []);

    return (
        <div className="flex h-screen">
            <div className="flex-[2] overflow-y-auto border-r border-gray-300 p-10 flex flex-col justify-between items-start">
                <div className="flex flex-col gap-10 w-full">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-semibold">ARESUNO ADMIN</h2>
                    </div>

                    <div className="text-sm flex flex-col gap-6 w-full">
                        <div
                            className={`flex items-center cursor-pointer gap-2 ${selectedField === "allBusinesses"
                                ? "text-blue-500"
                                : "text-gray-700"
                                }`}
                            onClick={() => handleSelectedField("allBusinesses")}
                        >
                            <LuLayoutDashboard className="w-6 h-6" />
                            <span className="">All Businesses</span>
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
                                {selectedField === "allBusinesses" && <AllBusiness businesses={businesses} />}
                            </div>
                        )}
                    </div>
                </div>
            </div >
            <ToastContainer />

        </div >
    );
};

export default AdminDashboard;
