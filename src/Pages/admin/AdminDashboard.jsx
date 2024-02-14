import axios from "axios";
import React, { useState, useEffect } from "react";
import { BiCategory, BiDollar, BiSolidBusiness } from "react-icons/bi";
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
import { FiDelete, FiEdit, FiEdit2, FiExternalLink, FiEye, FiEyeOff, FiHome, FiImage, FiLink, FiLock, FiStar, FiTrash2, FiUsers, FiX } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { setAllCategories } from "../../state/slices/categoriesSlice";
import Banner from "./Banner";
import Category from "./Category";
import AdminHome from "./AdminHome";
import Footer from "./Footer";
import { FaGripLines } from "react-icons/fa";
import { API_URL } from "../../utils/util";
import Sidebar from "./Sidebar";
import Enquiries from "./Enquiries";
import CallLeads from "./CallLeads";
import Blog from "./Blog";
import { Helmet } from "react-helmet-async";
import BusinessRegister from "../BusinessRegister/BusinessRegister";
import AdminListings from "./AdminListings";


const AllBusiness = ({ businesses, categories }) => {




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
                            <th className="px-2 text-center py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">SNo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owned</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email/Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {businesses.map((business, index) => (
                            <tr key={index}>
                                <td className="px-2 text-center py-4 whitespace-nowrap">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex gap-2 items-center">
                                        {business.name}
                                        <Link to={`/business/${business.name.split(' ').join('-').toLowerCase()}`}><FiExternalLink className="text-blue-500 w-4 h-4 cursor-pointer" /></Link>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{business.vendorName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date( business.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{business.category.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap flex flex-col">
                                <span>{business.phone}</span>
                                    <span>{business.email}</span>
                                    
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <FiTrash2 className="text-red-500 w-5 h-5 cursor-pointer" onClick={() => handleDelete(business._id)} />
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </div>
    );
};
const AllUsers = ({ users }) => {

    const handleDelete = async (id) => {
        try {

            const res = await axios.delete(`https://aresuno-server.vercel.app/api/user/${id}`, {
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date( user.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <FiTrash2 className="text-red-500 w-5 h-5 cursor-pointer" onClick={() => handleDelete(user._id)} />
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </div>
    );
};
const AllVendors = ({ users }) => {

    const handleDelete = async (id) => {
        try {

            const res = await axios.delete(`https://aresuno-server.vercel.app/api/vendor/${id}`, {
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) : "N/A"}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <FiTrash2 className="text-red-500 w-5 h-5 cursor-pointer" onClick={() => handleDelete(user._id)} />
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

    const [users, setUsers] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [businesses, setBusinesses] = useState([]);
    const [callLeads, setCallLeads] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [adminBusinesses, setAdminBusinesses] = useState([]);

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()

    const [selectedField, setSelectedField] = useState("Home");

    const categories = useSelector(state => state.categories);


    const handleSelectedField = (field) => {
        setSelectedField(field);
        console.log(field);
    };

    const fetchBusinessesData = async () => {
        try {
            setLoading(true);

            const resBusinesses = await axios.get(
                `${API_URL}/api/business/`);
            const businesses = resBusinesses.data;

            console.log(businesses);
            setBusinesses(businesses);

            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };
    const fetchUsersData = async () => {
        try {
            setLoading(true);

            const resUsers = await axios.get(
                `${API_URL}/api/user/all-users`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
            const resVendors = await axios.get(
                `${API_URL}/api/vendor/all-vendors`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            const users = resUsers.data
            const vendors = resVendors.data

            setUsers(users);

            console.log(users);


            setVendors(vendors);
            console.log(vendors)

            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchAllCategories = async () => {
        try {
            const res = await axios.get(
                `${API_URL}/api/category/`
            );
            dispatch(setAllCategories(res.data));
        } catch (err) {
            console.log(err);
        }
    };

    const fetchCallLeads = async () => {
        try{
            const res = await axios.get(`${API_URL}/api/call-lead`)
            setCallLeads(res.data)
        }catch(err){
            console.log(err)
        }

        }


        const fetchEnquiries = async () => {
            try{
                const res = await axios.get(`${API_URL}/api/enquiry`)
                setEnquiries(res.data)
            }catch(err){
                console.log(err)
            }
    
            }

    const fetchAllBlogs = async () => {
        try{
            const response = await axios.get(`${API_URL}/api/blog/`);
            setBlogs(response.data);
            console.log(response.data)
        }
        catch(err){
            console.log(err)
        }
    }

    const fetchAdminBusinesses = async () => {
        try{
            const token = localStorage.getItem("token");
            const response = await axios.get(`${API_URL}/api/vendor/businesses`, {
                headers: { Authorization: `Bearer ${token}` },
              });            
              setAdminBusinesses(response.data);
            console.log(response.data)
        }
        catch(err){
            console.log(err)
        }
    }



    useEffect(() => {
        fetchBusinessesData();
        fetchUsersData();
        fetchAllCategories();
        fetchCallLeads();
        fetchEnquiries();
        fetchAllBlogs();
        fetchAdminBusinesses();
    }, []);

    return (
        <div className="flex h-screen">
            <Helmet>
                <title>Aresuno - Admin</title>
            </Helmet>
            <div className="flex-[2] overflow-y-auto border-r border-gray-300 p-10 flex flex-col justify-between items-start">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-semibold">ARESUNO ADMIN</h2>
                    </div>

                <Sidebar handleSelectedField={handleSelectedField} selectedField={selectedField}/>

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
                                {selectedField === "Businesses" && <AllBusiness businesses={businesses} categories={categories}/>}
                                {selectedField === "Users" && <AllUsers users={users} />}
                                {selectedField === "Vendors" && <AllVendors users={vendors} />}
                                {selectedField === "Home" && <AdminHome/>}
                                {selectedField === "Enquiries" && <Enquiries enquiries={enquiries}/>}
                                {selectedField === "Call Leads" && <CallLeads callLeads={callLeads}/>}
                                {selectedField === "Banner" && <Banner />}
                                {selectedField === "Categories" && <Category />}
                                {selectedField === "Blogs" && <Blog blogs={blogs}/>}
                                {selectedField === "Add Listing" && <BusinessRegister />}
                                {selectedField === "My Listings" && <AdminListings businesses={adminBusinesses}/>}
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
