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
import ProgressBar from "@ramonak/react-progress-bar";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Input from "../../Components/Input";

const BusinessRegister = () => {
  const navigate = useNavigate();
  const totalSections = [
    "basicDetails",
    "businessCategory",
    "businessAddress",
    "businessIframe",
    "businessLinks",
    "businessFaqs",
    "businessModeOfPayment",
    "businessHours",
    "businessImages",
  ];

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

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

  const handleNext = () => {
    if (currentSectionIndex < totalSections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const getCurrentSection = () => {
    return totalSections[currentSectionIndex];
  };

  const renderCurrentSection = () => {
    switch (getCurrentSection()) {
      case "basicDetails":
        return (
          <BasicDetails
            businessDetails={businessDetails}
            setBusinessDetails={setBusinessDetails}
          />
        );
      case "businessCategory":
        return (
          <BusinessCategory
            businessDetails={businessDetails}
            setBusinessDetails={setBusinessDetails}
          />
        );
      case "businessAddress":
        return (
          <BusinessAddress
            businessDetails={businessDetails}
            setBusinessDetails={setBusinessDetails}
          />
        );
      case "businessIframe":
        return (
          <BusinessIframe
            businessDetails={businessDetails}
            setBusinessDetails={setBusinessDetails}
          />
        );
      case "businessLinks":
        return (
          <BusinessLinks
            businessDetails={businessDetails}
            setBusinessDetails={setBusinessDetails}
          />
        );
      case "businessFaqs":
        return (
          <BusinessFaqs
            businessDetails={businessDetails}
            setBusinessDetails={setBusinessDetails}
          />
        );
      case "businessModeOfPayment":
        return (
          <BusinessModeOfPayment
            businessDetails={businessDetails}
            setBusinessDetails={setBusinessDetails}
          />
        );
      case "businessHours":
        return (
          <BusinessHours
            businessDetails={businessDetails}
            setBusinessDetails={setBusinessDetails}
          />
        );
      case "businessImages":
        return (
          <BusinessImages
            businessDetails={businessDetails}
            setBusinessDetails={setBusinessDetails}
          />
        );
      default:
        return null;
    }
  };

  console.log(businessDetails);

  return (
    <div className="flex items-start justify-center py-0 px-4 sm:px-6 lg:px-8">
      <div className="w-full justify-between flex flex-col gap-8">
        <div className="flex gap-2 w-full">
          {totalSections.map((section, index) => (
            <ProgressBar
              completed={index <= currentSectionIndex ? 100 : 0}
              bgColor="#007BFF"
              height="5px"
              isLabelVisible={false}
              transitionDuration="0.3s"
              className="w-full"
            />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <p>
            {currentSectionIndex + 1} out of {totalSections.length} sections
            completed
          </p>

          <div className="flex justify-end gap-6">
            {currentSectionIndex > 0 && (
              <button
                type="button"
                className="py-2 px-4 bg-gray-400 text-white rounded-lg shadow focus:outline-none"
                onClick={handlePrev}
                disabled={currentSectionIndex === 0}
              >
                <span className="flex items-center gap-2">
                  <FiArrowLeft className="w-5 h-5" />
                  <span>Previous</span>
                </span>
              </button>
            )}

            <button
              type="button"
              className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={
                currentSectionIndex === totalSections.length - 1
                  ? handleBusinessRegistration
                  : handleNext
              }
            >
              {currentSectionIndex === totalSections.length - 1 ? (
                "Register Business"
              ) : (
                <span className="flex items-center gap-2">
                  <span>Next</span>
                  <FiArrowRight className="w-5 h-5" />
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 bg-white p-4 px-6 rounded-2xl shadow-lg">
          {renderCurrentSection()}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BusinessRegister;
