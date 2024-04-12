import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setAllCategories } from "../../state/slices/categoriesSlice";
import Banner from "./Banner/Banner";
import AdminHome from "./AdminHome";
import { API_URL } from "../../utils/util";
import Sidebar from "./Sidebar";
import Enquiries from "./Leads/Enquiries";
import Blog from "./Blog/Blog";
import { Helmet } from "react-helmet-async";
import LocationData from "./LocationData/LocationData";
import AllUsers from "./AllUsers/AllUsers";
import BusinessDashboard from "./Listings/BusinessDashboard";
import LeadsDashboard from "./Leads/LeadsDashboard";
import CategoryDashboard from "./Category/CategoryDashboard";
import Packages from "./Packages/Packages";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [callLeads, setCallLeads] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [adminBusinesses, setAdminBusinesses] = useState([]);
  const [allLocations, setAllLocations] = useState([]);

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const [selectedField, setSelectedField] = useState("Home");
  const [selectedSubField, setSelectedSubField] = useState("");

  const categories = useSelector((state) => state.categories);

  const handleSelectedField = (field) => {
    setSelectedField(field);
  };

  const fetchBusinessesData = async () => {
    try {
      setLoading(true);

      const resBusinesses = await axios.get(`${API_URL}/api/business/`);
      const businesses = resBusinesses.data;

      setBusinesses(businesses);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchUsersData = async () => {
    try {
      setLoading(true);

      const resUsers = await axios.get(`${API_URL}/api/user/all-users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const resVendors = await axios.get(`${API_URL}/api/user/all-vendors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const users = resUsers.data;
      const vendors = resVendors.data;

      setUsers(users);
      setVendors(vendors);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/category/`);
      dispatch(setAllCategories(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCallLeads = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/call-lead`);
      setCallLeads(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEnquiries = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/enquiry`);
      setEnquiries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/blog/`);
      setBlogs(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAdminBusinesses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/vendor/businesses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdminBusinesses(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllLocations = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/city/`);
      setAllLocations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBusinessesData();
    fetchUsersData();
    fetchAllCategories();
    fetchCallLeads();
    fetchEnquiries();
    fetchAllBlogs();
    fetchAdminBusinesses();
    fetchAllLocations();
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

        <Sidebar
          handleSelectedField={handleSelectedField}
          selectedField={selectedField}
          selectedSubField={selectedSubField}
          setSelectedSubField={setSelectedSubField}
        />

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
                {selectedField === "Businesses" && (
                  <BusinessDashboard
                    businesses={businesses}
                    categories={categories}
                    subField={selectedSubField}
                    adminBusinesses={adminBusinesses}
                  />
                )}
                {selectedField === "Users" && (
                  <AllUsers users={users} vendors={vendors} />
                )}
                {selectedField === "Home" && <AdminHome />}
                {selectedField === "Enquiries" && (
                  <Enquiries enquiries={enquiries} />
                )}
                {selectedField === "Leads" && (
                  <LeadsDashboard
                    callLeads={callLeads}
                    enquiries={enquiries}
                    subField={selectedSubField}
                  />
                )}
                {selectedField === "Banner" && <Banner />}
                {selectedField === "Categories" && (
                  <CategoryDashboard subField={selectedSubField} />
                )}
                {selectedField === "Blogs" && <Blog blogs={blogs} />}
                {selectedField === "Location Data" && (
                  <LocationData allLocations={allLocations} />
                )}
                {selectedField === "Packages" && <Packages />}
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;
