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
import { MdOutlineDone } from "react-icons/md";
import Review from "./components/Review";
import { API_URL } from "../../utils/util";

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
    "reviewDetails",
  ];

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [businessRegisterLoading, setBusinessRegisterLoading] = useState(false);

  const [businessDetails, setBusinessDetails] = useState({
    name: "",
    type: "",
    phone: "",
    email: "",
    foundedIn: "",
    description: "",
    category: "",
    address: {
      street : "",
      landmark : "",
      pincode : "",
      city : "",
      state : "",
      coordinates : []
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
    faqs: [],
    socialLinks: {
      website: "",
      instagram: "",
      whatsapp: "",
      twitter: "",
      facebook: "",
      youtube: "",
    },
    modeOfPayment: [],
    iframe: { embedLink: 'src="example link"', extractedLink: "example link" },
    services: [],
    images : {
      logo : "",
      cover : "",
      gallery : []
    }
  });

  const [notFilledError, setNotFilledError] = useState("");

  const handleBusinessRegistration = async () => {
    try {
      setBusinessRegisterLoading(true);
      const token = localStorage.getItem("token");
      const vendorRes = await axios.get(
        `${API_URL}/api/vendor/`,
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
        `${API_URL}/api/business/register`,
        updatedBusinessDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Business Registered");
      navigate("/dashboard");

      console.log(res.data);
    } catch (error) {
      setBusinessRegisterLoading(false);
      console.error("Error", error);
      toast.error("Business Registration Failed");
    }
  };

  const handleNext = () => {
    // Check if it's the first section and if any of the required fields are empty
    if (currentSectionIndex === 0) {
      const { name, phone, email, description, type, services, foundedIn } =
        businessDetails;

      if (
        !name ||
        !phone ||
        !email ||
        !description ||
        !type ||
        !foundedIn ||
        services.length === 0
      ) {
        toast.error("Please enter all details");
        return; // Exit the function if there's an error
      }
    }

    // Check if it's the second section and if category details are missing
    if (currentSectionIndex === 1) {
      const { category } = businessDetails;

      if (!category) {
        toast.error("Please enter the category");
        return; // Exit the function if there's an error
      }
    }

    // Check if it's the fourth section and if iframe details are missing
    if (currentSectionIndex === 3) {
      const { iframe } = businessDetails;
      if (!iframe.embedLink || !iframe.extractedLink) {
        toast.error("Please enter valid iframe link");
        return; // Exit the function if there's an error
      }
    }

    // check if it's the fifth section and if social links are missing
    if (currentSectionIndex === 4) {
      const { socialLinks } = businessDetails;

      const socialPlatforms = [
        socialLinks.website,
        socialLinks.instagram,
        socialLinks.whatsapp,
        socialLinks.twitter,
        socialLinks.facebook,
        socialLinks.youtube,
      ];

      // Filter out any empty or undefined values
      const filledLinks = socialPlatforms.filter(
        (link) => link && link.trim() !== ""
      );

      // Check if at least 3 links are entered
      if (filledLinks.length < 3) {
        toast.error("Please enter at least 3 valid social links");
        return; // Exit the function if there's an error
      }
    }

    if (currentSectionIndex === 5) {
      const { faqs } = businessDetails;

      // Check if there's at least one FAQ
      if (faqs.length === 0) {
        toast.error("Please add at least one FAQ");
        return; // Exit the function if there's an error
      }

      // Check if all FAQs have both a question and an answer
      const hasIncompleteFAQ = faqs.some((faq) => !faq.question || !faq.answer);

      if (hasIncompleteFAQ) {
        toast.error(
          "Please ensure all FAQs have both a question and an answer"
        );
        return; // Exit the function if there's an error
      }
    }

    if (currentSectionIndex === 6) {
      const { modeOfPayment } = businessDetails;

      if (modeOfPayment.length < 3) {
        toast.error("Please select at least 3 mode of payment");
        return; // Exit the function if there's an error
      }
    }

    if (currentSectionIndex === 8) {
      const { images } = businessDetails;

      if (images.gallery.length < 3) {
        toast.error("Please add at least 3 image");
        return; // Exit the function if there's an error
      }
    }

    // If it's not the last section, proceed to the next section
    if (currentSectionIndex < totalSections.length) {
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

        //   <BusinessImages
        //   businessDetails={businessDetails}
        //   setBusinessDetails={setBusinessDetails}
        // />
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
      case "reviewDetails":
        return <Review businessDetails={businessDetails} />;
      default:
        return null;
    }
  };

  console.log(businessDetails);

  return (
    <div className="flex items-start justify-center mt-6 md:py-0 px-0 md:px-6 lg:px-8">
      <div className="w-full justify-between flex flex-col gap-6 md:gap-8">
        {/* desktop */}
        <div className="hidden md:flex flex-col gap-5">
          <div className="hidden md:flex gap-2 w-full">
            {totalSections.map((section, index) => (
              <ProgressBar
                completed={index <= currentSectionIndex ? 100 : 0}
                bgColor="#007BFF"
                height="5px"
                isLabelVisible={false}
                transitionDuration="0.3s"
                className="w-full"
                key={section}
              />
            ))}
          </div>
          <div className=" flex flex-col gap-2 md:flex-row text-sm md:text-base justify-between items-start">
            <p>
              {(currentSectionIndex + 1) * 10}% Done
            </p>

            <div className="flex justify-end md:justify-end gap-4 md:gap-6 text-sm md:text-base">
              {currentSectionIndex > 0 && (
                <button
                  type="button"
                  className="py-2 px-3 md:py-2 md:px-4 bg-gray-400 text-white rounded-lg shadow focus:outline-none"
                  onClick={handlePrev}
                  disabled={currentSectionIndex === 0}
                >
                  <span className="flex items-center gap-2">
                    <FiArrowLeft className="w-4 h-5 md:w-5 md:h-5" />
                    <span>Back</span>
                  </span>
                </button>
              )}

              <button
                type="button"
                className="py-2 px-3 md:py-2 md:px-4 bg-blue-500 text-white rounded-lg shadow focus:outline-none"
                onClick={
                  currentSectionIndex === totalSections.length - 1
                    ? handleBusinessRegistration
                    : handleNext
                }
              >
                {currentSectionIndex === totalSections.length - 1 ? (
                  <span>
                    {!businessRegisterLoading
                      ? "Register Business"
                      : "Registering..."}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span>Next</span>
                    <FiArrowRight className="w-4 h-5 md:w-5 md:h-5" />
                  </span>
                )}

                {businessRegisterLoading && (
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

        {/* mobile */}
        <div className="md:hidden flex flex-col gap-2">
          <div className="flex flex-col md:hidden w-full">
            <p className="text-sm">
              {currentSectionIndex + 1} out of {totalSections.length} sections
            </p>
            <ProgressBar
              completed={(currentSectionIndex + 1) * 11.111}
              bgColor="#007BFF"
              height="5px"
              isLabelVisible={false}
              transitionDuration="0.3s"
              className="w-full"
            />
          </div>

          <div className=" flex flex-col gap-2 md:flex-row text-sm md:text-base justify-between items-center">
            <div className="w-full self-end">
              <div className="flex w-full justify-between gap-4 md:gap-6 text-sm md:text-base">
                {currentSectionIndex > 0 && (
                  <button
                    type="button"
                    className="py-2 px-3 md:py-2 md:px-4 bg-gray-400 text-white rounded-lg shadow focus:outline-none"
                    onClick={handlePrev}
                    disabled={currentSectionIndex === 0}
                  >
                    <span className="flex items-center gap-2">
                      <FiArrowLeft className="w-4 h-5 md:w-5 md:h-5" />
                      <span>Back</span>
                    </span>
                  </button>
                )}

                <button
                  type="button"
                  className="py-2 px-3 md:py-2 md:px-4 bg-blue-500 text-white rounded-lg shadow focus:outline-none"
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
                      <FiArrowRight className="w-4 h-5 md:w-5 md:h-5" />
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 bg-white md:p-4 md:px-6 rounded-2xl mb-8 md:shadow-lg">
          {notFilledError && <p>{notFilledError}</p>}
          {renderCurrentSection()}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BusinessRegister;
