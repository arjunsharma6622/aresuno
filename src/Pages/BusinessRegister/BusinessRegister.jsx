import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import BasicDetails from "./components/BasicDetails";
import BusinessCategory from "./components/BusinessCategory";
import BusinessAddress from "./components/BusinessAddress";
import BusinessIframe from "./components/BusinessIframe";
import BusinessLinks from "./components/BusinessLinks";
import BusinessFaqs from "./components/BusinessFaqs";
import BusinessModeOfPayment from "./components/BusinessModeOfPayment";
import BusinessHours from "./components/BusinessHours";
import BusinessImages from "./components/BusinessImages";

const BusinessRegister = () => {
  const navigate = useNavigate();

  const [businessDetails, setBusinessDetails] = useState({
    name: "",
    type: "",
    phone: "",
    email: "",
    description: "",
    mainCategory: "",
    subCategory: "",
    address: "",
    timing: [
      { day: "Monday", from: "", to: "", isOpen: false },
      { day: "Tuesday", from: "", to: "", isOpen: false },
      { day: "Wednesday", from: "", to: "", isOpen: false },
      { day: "Thursday", from: "", to: "", isOpen: false },
      { day: "Friday", from: "", to: "", isOpen: false },
      { day: "Saturday", from: "", to: "", isOpen: false },
      { day: "Sunday", from: "", to: "", isOpen: false },
    ],
    faqs: [{ question: "", answer: "" }],
    socialLinks: {
      website: "",
      instagram: "",
      whatsapp: "",
      twitter: "",
      facebook: "",
      youtube: "",
    },
    modeOfPayment: [],
    iframe: { embedLink: "", extractedLink: "" },
    services: [],
    photosGallery: [],
  });

  const handleBusinessRegistration = async () => {
    try {
      const token = localStorage.getItem("token");
      const vendorRes = await axios.get(
        "https://aresuno-server.vercel.app/api/vendor/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { _id: vendorId, name: vendorName } = vendorRes.data;

      setBusinessDetails((prev) => ({
        ...prev,
        vendorId,
        vendorName,
      }));

      const updatedBusinessDetails = {
        ...businessDetails,
        vendorId,
        vendorName,
      };

      const res = await axios.post(
        "https://aresuno-server.vercel.app/api/business/register",
        updatedBusinessDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Business Registered");
      window.location.reload();
      navigate("/vendor/dashboard");

      console.log(res.data);
    } catch (error) {
      console.error("Error", error);
      toast.error("Business Registration Failed");
    }
  };

  console.log(businessDetails)

  return (
    <div className="flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full justify-between flex flex-col">
        <div className="flex flex-col gap-6">
          <BasicDetails
            businessDetails={businessDetails}
            setBusinessDetails={setBusinessDetails}
          />
          <hr className="border-1 border-gray-300" />
          <BusinessCategory
            businessDetails={businessDetails}
            setBusinessDetails={setBusinessDetails}
          />
          <hr className="border-1 border-gray-300" />
          <BusinessAddress
            businessDetails={businessDetails}
            setBusinessDetails={setBusinessDetails}
          />
          <hr className="border-1 border-gray-300" />
          <BusinessIframe
            businessDetails={businessDetails}
            setBusinessDetails={setBusinessDetails}
          />
          <hr className="border-1 border-gray-300" />
          <BusinessLinks
            businessDetails={businessDetails}
            setBusinessDetails={setBusinessDetails}
          />
          <hr className="border-1 border-gray-300" />
          <BusinessFaqs
            businessDetails={businessDetails}
            setBusinessDetails={setBusinessDetails}
          />
          <hr className="border-1 border-gray-300" />
          <BusinessModeOfPayment
            businessDetails={businessDetails}
            setBusinessDetails={setBusinessDetails}
          />
          <hr className="border-1 border-gray-300" />
          <BusinessHours
            businessDetails={businessDetails}
            setBusinessDetails={setBusinessDetails}
          />
          <hr className="border-1 border-gray-300" />
          <BusinessImages
            businessDetails={businessDetails}
            setBusinessDetails={setBusinessDetails}
          />
        </div>
        <button
          type="submit"
          className="mt-6 py-2 px-4 bg-blue-500 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleBusinessRegistration}
        >
          Register Business
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BusinessRegister;
