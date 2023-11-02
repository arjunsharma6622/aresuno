import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiChevronDown,
  FiFacebook,
  FiGlobe,
  FiInfo,
  FiInstagram,
  FiMail,
  FiTwitch,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
import { FaFileContract, FaWhatsapp } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { BiCategory, BiDetail, BiLink, BiNavigation } from "react-icons/bi";

const BusinessRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [businessDetails, setBusinessDetails] = useState({
    name: "",
    type: "",
    mainCategory: "",
    subCategory: "",
    address: "",
    phone: "",
    timing: "",
  });
  const [phoneNumber, setPhoneNumber] = useState();

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
  };

  const handleAddressSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      setBusinessDetails((prev) => ({
        ...prev,
        address: address,
        coordinates: [latLng.lng, latLng.lat],
      }));
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleBusinessDetailsChange = (e) => {
    const { name, value } = e.target;
    setBusinessDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      const vendorId = vendorRes.data._id;
      console.log(vendorId);

      setBusinessDetails((prev) => ({
        ...prev,
        vendorId: vendorId,
      }));

      const updatedBusinessDetails = { ...businessDetails, vendorId: vendorId };
      console.log(updatedBusinessDetails);

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

      // navigate("/vendor/dashboard");

      console.log(res.data);
    } catch (error) {
      console.error("Error", error);
      toast.error("Business Registration Failed");
    }
  };

  return (
    <div className="  flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className=" w-full justify-between flex flex-col">
        <div className="flex flex-col">

          <div className="flex flex-col gap-6">
            {/* BUSINESS DETAILS */}
            <div className="mt-6 mb-6">
              <div className="flex items-center gap-2">
                <BiDetail className="w-6 h-6" />
                <h2 className="text-xl font-semibold">
                  Enter basic business details
                </h2>
              </div>
              <div className="flex flex-col gap-4 mt-6">
                <div className="flex w-full gap-3">
                  {/* BUSINESS NAME */}
                  <div className="flex flex-col w-full">
                    <label htmlFor="">Business Name</label>
                    <input
                      type="text"
                      name="name"
                      value={businessDetails.name}
                      onChange={handleBusinessDetailsChange}
                      className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                  </div>

                  {/* BUSINESS EMAIL */}
                  <div className="flex flex-col w-full">
                    <label htmlFor="">Mail Id</label>
                    <input
                      type="email"
                      name="email"
                      value={businessDetails.number}
                      onChange={handleBusinessDetailsChange}
                      className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex w-full gap-3">
                  {/* PHONE NUMBER */}
                  <div className="flex flex-col w-full">
                    <label htmlFor="phone">Phone Number</label>
                    <PhoneInput
                      international
                      defaultCountry="in"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      className="mt-2 appearance-none rounded-md w-full px-3 py-2 border  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      style={{
                        width: "100%",
                        height: "39px",
                        padding: "0px",
                        border: "none",
                      }}
                      inputStyle={{
                        width: "100%",
                        height: "100%",
                      }}
                      countrySelectorStyleProps={{
                        width: "100%",
                        height: "100%",
                      }}
                      dialCodePreviewStyleProps={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>

                  {/* BUSINESS TYPE */}
                  <div className="flex flex-col w-full">
                    <label htmlFor="">Business Type</label>

                    <div className="flex items-center justify-center mt-2 h-full">
                      <div className="relative w-full">
                        <select
                          name="type"
                          value={businessDetails.type}
                          className="appearance-none rounded-md relative block w-full px-3 py-2 h-full border  border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 bg-white focus:border-indigo-500 focus:z-10 sm:text-sm"
                        >
                          <option value="" disabled className="">
                            -
                          </option>
                          <option value="Category1">Category 1</option>
                          <option value="Category2">Category 2</option>
                          <option value="Category3">Category 3</option>
                          {/* Add more options as needed */}
                        </select>

                        <div>
                          <FiChevronDown className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm text-gray-500 w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-1 border-gray-300" />

            {/* BUSINESS CATEGORY */}
            <div className="mt-6 mb-6">
              <div className="flex items-center gap-2">
                <BiCategory className="w-6 h-6" />
                <h2 className="text-xl font-semibold">
                  Select you business category
                </h2>
              </div>
              <div className="flex gap-4 mt-6 w-full">
                {/* CATEGORY */}
                <div className="flex flex-col w-full">
                  <label htmlFor="">Category</label>

                  <div className="relative mt-2">
                    <select
                      name="subCategory"
                      value={businessDetails.subCategory}
                      onChange={handleBusinessDetailsChange}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border  border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 bg-white focus:border-indigo-500 focus:z-10 sm:text-sm"
                    >
                      <option value="" disabled className="text-red">
                        -
                      </option>
                      <option value="Category1">Category 1</option>
                      <option value="Category2">Category 2</option>
                      <option value="Category3">Category 3</option>
                      {/* Add more options as needed */}
                    </select>

                    <div>
                      <FiChevronDown className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm text-gray-500 w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* SUB CATEGORY */}
                <div className="flex flex-col w-full">
                  <label htmlFor="">Sub Category</label>

                  <div className="relative mt-2">
                    <select
                      name="mainCategory"
                      value={businessDetails.mainCategory}
                      onChange={handleBusinessDetailsChange}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 bg-white focus:border-indigo-500 focus:z-10 sm:text-sm"
                    >
                      <option value="" disabled>
                        -
                      </option>
                      <option value="Category1">Category 1</option>
                      <option value="Category2">Category 2</option>
                      <option value="Category3">Category 3</option>
                      {/* Add more options as needed */}
                    </select>

                    <div>
                      <FiChevronDown className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm text-gray-500 w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-1 border-gray-300" />

            {/* BUSINESS ADDRESS */}
            <div className="mt-6 mb-6">
              <div className="flex items-center gap-2">
                <BiNavigation className="w-6 h-6" />
                <h2 className="text-xl font-semibold">Add business address</h2>
              </div>
              <div className="flex flex-col gap-4 mt-6">
                <div className="flex flex-col">
                  <label htmlFor="">Address</label>
                  <input
                    type="text"
                    className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="">
                    Address Line 2{" "}
                    <span className="text-gray-500 font-light text-sm">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text"
                  />
                </div>

                <div className="flex">
                  <div className="flex flex-col">
                    <label htmlFor="" className="">
                      City
                    </label>
                    <input
                      type="text"
                      className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="" className="">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      className="mt-2 ml-2 mappearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-1 border-gray-300" />

            {/* BUSINESS LINKS */}
            <div className="mt-6 mb-6">
              <div className="flex items-center gap-2">
                <BiLink className="w-6 h-6" />
                <h2 className="text-xl font-semibold">Add social links</h2>
              </div>{" "}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex flex-col">
                  <label className="flex gap-2 items-center mb-2">
                    Website Link
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10"
                    />
                    <FiGlobe className="z-10 h-5 w-5 absolute right-2 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="flex gap-2 items-center mb-2">
                    Instagram
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10"
                    />
                    <FiInstagram className="z-10 h-5 w-5 absolute right-2 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="flex gap-2 items-center mb-2">
                    WhatsApp
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10"
                    />
                    <FaWhatsapp className="z-10 h-5 w-5 absolute right-2 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="flex gap-2 items-center mb-2">
                    Twitter
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10"
                    />
                    <FiTwitter className="z-10 h-5 w-5 absolute right-2 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="flex gap-2 items-center mb-2">
                    Facebook
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10"
                    />
                    <FiFacebook className="z-10 h-6 w-6 absolute right-2 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="flex gap-2 items-center mb-2">
                    Youtube
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10"
                    />
                    <FiYoutube className="z-10 h-5 w-5 absolute right-2 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BusinessRegister;
