import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiClock, FiEdit3, FiImage } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import {
  BiCategory,
  BiDetail,
  BiLink,
  BiNavigation,
  BiQuestionMark,
} from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { API_URL, ToastParams } from "../../utils/util";
import BasicDetails from "./components/BasicDetails";
import BusinessCategory from "./components/BusinessCategory";
import BusinessAddress from "./components/BusinessAddress";
import BusinessLinks from "./components/BusinessLinks";
import BusinessFaqs from "./components/BusinessFaqs";
import BusinessModeOfPayment from "./components/BusinessModeOfPayment";
import BusinessHours from "./components/BusinessHours";
import BusinessImages from "./components/BusinessImages";

const BusinessEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [currentSection, setCurrentSection] = useState("Basic Details");

  const [businessDetails, setBusinessDetails] = useState({
    name: "",
    type: "",
    phone: "",
    email: "",
    description: "",
    category: "",
    address: {
      place: "",
      city: "",
      pincode: null,
      coordinates: [],
    },
    timing: [
      { day: "Monday", from: "", to: "", isOpen: false },
      { day: "Tuesday", from: "", to: "", isOpen: false },
      { day: "Wednesday", from: "", to: "", isOpen: false },
      { day: "Thursday", from: "", to: "", isOpen: false },
      { day: "Friday", from: "", to: "", isOpen: false },
      { day: "Saturday", from: "", to: "", isOpen: false },
      { day: "Sunday", from: "", to: "", isOpen: false },
    ],
    faqs: [
      {
        question: "",
        answer: "",
      },
    ],
    socialLinks: {
      website: "",
      instagram: "",
      whatsapp: "",
      twitter: "",
      facebook: "",
      youtube: "",
    },
    modeOfPayment: [],
    foundedIn: "YYYY-MM-DD",
    services: [],
    photosGallery: [],
  });

  const [isBusinessUpdating, setIsBusinessUpdating] = useState(false);

  const handleBusinessDetailsChange = (e) => {
    const { name, value } = e.target;
    setBusinessDetails((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/api/business/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBusinessDetails(res.data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchBusinessDetails();
  }, []);

  const handleUpdate = async () => {
    try {
      setIsBusinessUpdating(true);

      const res = await axios.put(
        `${API_URL}/api/business/${id}`,
        businessDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      toast.success("Business Details Updated", ToastParams);
      setIsBusinessUpdating(false);
    } catch (err) {
      setIsBusinessUpdating(false);
      console.error(err);
      toast.error("Business Update Failed", ToastParams);
    }
  };

  const sidebarElements = [
    { name: "Basic Details", icon: <BiDetail className="w-5 h-5" /> },
    {
      name: "Category",
      icon: <BiCategory className="w-5 h-5" />,
    },
    {
      name: "Address",
      icon: <BiNavigation className="w-5 h-5" />,
    },
    {
      name: "Social Links",
      icon: <BiLink className="w-5 h-5" />,
    },
    {
      name: "FAQ",
      icon: <BiQuestionMark className="w-5 h-5" />,
    },
    {
      name: "Mode of Payment",
      icon: <MdPayment className="w-5 h-5" />,
    },
    {
      name: "Timings",
      icon: <FiClock className="w-5 h-5" />,
    },
    {
      name: "Images",
      icon: <FiImage className="w-5 h-5" />,
    },
  ];

  return (
    <div className="h-screen overflow-y-scroll  flex items-start justify-center">
      <div className="flex gap-0 h-screen w-full">
        <div className="flex-[3.2] border w-full flex items-start py-6 pt-0 pl-0 pr-0 flex-col gap-12">
          <div className="w-full flex flex-col gap-3 bg-gray-200 py-4">
            <div
              className="flex gap-2 items-center justify-start px-5 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <FiArrowLeft className="w-5 h-5 " />
              <span>Go Back</span>
            </div>
            <div className="flex flex-col gap-2 items-start w-full px-5 py-2">
              <div className="flex gap-4 items-center justify-start ">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-100">
                  <FiEdit3 className="h-6 w-6 text-gray-600" />
                </div>
                <span className="text-xl font-semibold">Edit Business</span>
              </div>

              <p>
                Edit Your{" "}
                <span className="font-medium"> {businessDetails.name} </span>{" "}
                business
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-4">
            {sidebarElements.map(({ name, icon }) => (
              <div
                key={name}
                className={`flex items-center gap-2 cursor-pointer w-full px-6 py-2 ${
                  currentSection === name && "bg-gray-200"
                }`}
                onClick={() => setCurrentSection(name)}
              >
                {icon}
                <h2 className="text-base font-medium">{name}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="px-12 py-6 flex-[10] w-full h-screen overflow-y-scroll justify-start flex flex-col">
          <div className="flex flex-col">
            <div className="flex flex-col gap-6">
              {currentSection === "Basic Details" && (
                <BasicDetails
                  setBusinessDetails={setBusinessDetails}
                  businessDetails={businessDetails}
                  handleBusinessDetailsChange={handleBusinessDetailsChange}
                />
              )}

              {currentSection === "Category" && (
                <BusinessCategory
                  businessDetails={businessDetails}
                  handleBusinessDetailsChange={handleBusinessDetailsChange}
                />
              )}

              {currentSection === "Address" && (
                <BusinessAddress
                  businessDetails={businessDetails}
                  setBusinessDetails={setBusinessDetails}
                />
              )}

              {currentSection === "Social Links" && (
                <BusinessLinks
                  businessDetails={businessDetails}
                  setBusinessDetails={setBusinessDetails}
                />
              )}

              {currentSection === "FAQ" && (
                <BusinessFaqs
                  businessDetails={businessDetails}
                  setBusinessDetails={setBusinessDetails}
                />
              )}

              {currentSection === "Mode of Payment" && (
                <BusinessModeOfPayment
                  businessDetails={businessDetails}
                  setBusinessDetails={setBusinessDetails}
                />
              )}

              {currentSection === "Timings" && (
                <BusinessHours
                  businessDetails={businessDetails}
                  setBusinessDetails={setBusinessDetails}
                />
              )}

              {currentSection === "Images" && (
                <BusinessImages
                  businessDetails={businessDetails}
                  setBusinessDetails={setBusinessDetails}
                />
              )}
            </div>

            <button
              type="submit"
              className="flex gap-4 items-center justify-center py-2 px-4 bg-blue-500 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleUpdate}
            >
              {isBusinessUpdating ? "Saving business" : "Save business"}

              {isBusinessUpdating && (
                <div
                  className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default BusinessEdit;
