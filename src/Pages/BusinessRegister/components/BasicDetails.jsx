import React, { useState } from "react";
import { BiDetail } from "react-icons/bi";
import { FiChevronDown, FiXCircle } from "react-icons/fi";
import { PhoneInput } from "react-international-phone";
import Input from "../../../Components/Input";

const BasicDetails = ({ businessDetails, setBusinessDetails }) => {
  const [serviceError, setServiceError] = useState("");
  const handleBusinessDetailsChange = (e) => {
    const { name, value } = e.target;
    setBusinessDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setBusinessDetails((prev) => ({
      ...prev,
      phone: value,
    }));
  };

  const [service, setService] = useState("");

  const handleServicesChange = (e) => {
    setService(e.target.value);
    setServiceError("");
  };

  const handleServiceAction = (action) => {
    if (action === "add" && service === "") {
      setServiceError("Please enter a service name");
      return;
    }

    setBusinessDetails((prev) => ({
      ...prev,
      services:
        action === "add"
          ? [...prev.services, service]
          : prev.services.filter((_, i) => i !== action),
    }));

    setService("");
    setServiceError("");
  };

  return (
    <div className="mt-6 mb-6">
      <div className="flex items-center gap-2">
        <BiDetail className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Enter basic business details</h2>
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
              className="mt-2 rounded-md input border text-base border-gray-300 w-full py-3 px-4 text-gray-600 leading-tight focus:outline-none"
            />
          </div>

          {/* BUSINESS TYPE */}
          <div className="flex flex-col w-full">
            <label htmlFor="">Business Type</label>

            <div className="flex items-center justify-center h-full">
              <div className="relative w-full">
                <select
                  name="type"
                  value={businessDetails.type}
                  className="mt-2 appearance-none rounded-md relative block w-full px-4 py-3 h-full border  border-gray-300 placeholder-gray-500  bg-white"
                  onChange={handleBusinessDetailsChange}
                >
                  <option value="" disabled className="">
                    -
                  </option>
                  <option value="service">Service</option>
                  <option value="manufacturing">Manufacturing</option>
                </select>

                <div>
                  <FiChevronDown className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm text-gray-500 w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full gap-3">
          {/* PHONE NUMBER */}
          <div className="flex flex-col w-full">
            <label htmlFor="phone">Phone Number</label>
            <PhoneInput
              international
              defaultCountry="in"
              value={businessDetails.phone}
              onChange={handlePhoneChange}
              className="mt-2 appearance-none placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-md input border text-base border-gray-300 w-full py-3 px-4 text-gray-600 leading-tight focus:outline-none"
              style={{
                width: "100%",
                height: "50px",
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

          {/* BUSINESS EMAIL */}
          <div className="flex flex-col w-full">
            <label htmlFor="">Mail Id</label>
            <input
              type="email"
              name="email"
              value={businessDetails.email}
              onChange={handleBusinessDetailsChange}
              className="mt-2 rounded-md input border text-base border-gray-300 w-full py-3 px-4 text-gray-600 leading-tight focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <label>About your business</label>
          <textarea
            name="description"
            value={businessDetails.description}
            id=""
            cols="30"
            rows="4"
            placeholder="Enter a brief description about your business"
            className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            onChange={handleBusinessDetailsChange}
          ></textarea>
        </div>
        <div className="flex flex-col w-full">
          <label>What services you offer</label>
          <div className="flex items-center gap-4 mt-2">
            <input
              type="text"
              name="service"
              value={service}
              id=""
              placeholder="Service name"
              className="flex-[8] rounded-md input border text-base border-gray-300 w-full py-3 px-4 text-gray-600 leading-tight focus:outline-none"
              onChange={handleServicesChange}
            />
            <button
              className="rounded-md bg-blue-500 text-white px-8 py-3 flex-[4] focus:outline-none border border-blue-500"
              onClick={() => handleServiceAction("add")}
            >
              Add
            </button>
          </div>

          {serviceError && (
            <p className="text-red-500 text-xs mt-2">{serviceError}</p>
          )}

          <div className="mt-6 flex flex-wrap gap-4 w-full">
            {businessDetails.services.map((service, index) => (
              <div
                key={index}
                className="relative flex items-center gap-4 mt-2"
              >
                <span className="px-4 py-2 border rounded-lg">{service}</span>
                <FiXCircle
                  className="bg-red-100 rounded-full text-red-500 absolute cursor-pointer -top-2 -right-2 w-5 h-5"
                  onClick={() => handleServiceAction(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;