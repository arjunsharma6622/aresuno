import { useState } from "react";
import { BiDetail } from "react-icons/bi";
import { FiChevronDown, FiXCircle } from "react-icons/fi";
import "react-international-phone/style.css";

const BasicDetails = ({ businessDetails, setBusinessDetails }) => {
  const [serviceError, setServiceError] = useState("");
  const handleBusinessDetailsChange = (e) => {
    const { name, value } = e.target;
    setBusinessDetails((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "name":
        setNameError(value ? "" : "Please enter the business name");
        break;
      case "type":
        setTypeError(value ? "" : "Please select the business type");
        break;
      case "description":
        setDescriptionError(
          value ? "" : "Please enter the business description",
        );
        break;
      case "email": {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        setEmailError(emailPattern.test(value) ? "" : "Invalid email format");
        break;
      }
      default:
        break;
    }
  };

  // const handlePhoneChange = (value) => {
  //   setBusinessDetails((prev) => ({
  //     ...prev,
  //     phone: value,
  //   }));
  // };

  const [wordCount, setWordCount] = useState(0);
  const maxWordCount = 100;

  // const handleBusinessDescriptionChange = (e) => {
  //   const inputText = e.target.value;
  //   const words = inputText.trim().split(/\s+/);
  //   const currentWordCount = words.length;

  //   // Ensure that the word count doesn't exceed the maximum
  //   if (currentWordCount <= maxWordCount) {
  //     setBusinessDetails({ description: inputText });
  //     setWordCount(currentWordCount);
  //   }
  // };

  const handleBusinessDescriptionChange = (e) => {
    const inputText = e.target.value;

    // Check if the input is empty
    if (!inputText.trim()) {
      setBusinessDetails({ ...businessDetails, description: inputText });
      setWordCount(0); // Set word count to 0 for an empty description
      return;
    }

    const words = inputText.trim().split(/\s+/);
    const currentWordCount = words.length;

    // Ensure that the word count doesn't exceed the maximum
    if (currentWordCount <= maxWordCount) {
      setBusinessDetails({ ...businessDetails, description: inputText });
      setWordCount(currentWordCount);
    }
  };

  // const handlePhoneChange = (value) => {
  //   if (value && value.length >= 2 && value.length <= 14) {
  //     setBusinessDetails((prev) => ({ ...prev, phone: value }));
  //     setPhoneError("");
  //   } else {
  //     setPhoneError("Please enter a valid phone number");
  //   }
  // };

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

  const [nameError, setNameError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  return (
    <div className="md:mt-6 md:mb-6">
      <div className="flex items-center gap-2">
        <BiDetail className="w-5 h-5 md:w-6 md:h-6" />
        <div className="flex items-center gap-4">
          <h2 className="text-lg md:text-xl font-semibold">
            Enter basic business details
          </h2>
          <span className="text-gray-500 text-sm">
            * All fields are required
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex flex-col md:flex-row w-full gap-3">
          {/* BUSINESS NAME */}
          <div className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <label htmlFor="">
                Business Name <span className="text-red-500 text-sm">*</span>
              </label>
              {nameError && <p className="text-red-500 text-xs">{nameError}</p>}
            </div>
            <input
              type="text"
              name="name"
              value={businessDetails.name}
              onChange={handleBusinessDetailsChange}
              className="mt-2 rounded-md input border text-base border-gray-300 w-full py-3 px-4 text-gray-600 leading-tight focus:outline-none"
              placeholder="Enter business name"
            />
          </div>

          {/* BUSINESS TYPE */}
          <div className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <label htmlFor="">
                Business Type <span className="text-red-500 text-sm">*</span>
              </label>
              {typeError && <p className="text-red-500 text-xs">{typeError}</p>}
            </div>
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
                  <option value="doctor">Doctor</option>
                  <option value="manufacturing">Manufacturing</option>
                </select>

                <div>
                  <FiChevronDown className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm text-gray-500 w-6 h-6" />
                </div>
              </div>
            </div>

            {typeError && (
              <p className="text-red-500 text-xs mt-2">{typeError}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full gap-3">
          {/* PHONE NUMBER */}
          <div className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <label htmlFor="phone">
                Business Phone <span className="text-red-500 text-sm">*</span>
              </label>
              {phoneError && (
                <p className="text-red-500 text-xs">{phoneError}</p>
              )}
            </div>
            {/* <PhoneInput
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
            /> */}

            <input
              type="text"
              name="phone"
              value={businessDetails.phone}
              onChange={handleBusinessDetailsChange}
              className="mt-2 rounded-md input border text-base border-gray-300 w-full py-3 px-4 text-gray-600 leading-tight focus:outline-none"
            />
          </div>

          {/* BUSINESS EMAIL */}
          <div className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <label htmlFor="">
                Mail ID <span className="text-red-500 text-sm">*</span>
              </label>
              {emailError && (
                <p className="text-red-500 text-xs">{emailError}</p>
              )}
            </div>{" "}
            <input
              type="email"
              name="email"
              value={businessDetails.email}
              onChange={handleBusinessDetailsChange}
              className="mt-2 rounded-md input border text-base border-gray-300 w-full py-3 px-4 text-gray-600 leading-tight focus:outline-none"
            />
          </div>
        </div>

        {/* <div className="flex flex-col w-full">
        <div className="flex gap-2 items-center">
            <label htmlFor="">About your business <span className="text-red-500 text-sm">*</span></label>
            {descriptionError && <p className="text-red-500 text-xs">{descriptionError}</p>}
            </div>
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
        </div> */}

        <div className="flex flex-col w-full">
          <div className="flex gap-2 items-center">
            <label htmlFor="description">
              About your business
              <span className="text-red-500 text-sm">*</span>
              <span className="text-gray-500 text-xs ml-2">
                give your business description in 100 words
              </span>
            </label>
            {wordCount > maxWordCount && (
              <p className="text-red-500 text-xs">
                Exceeded maximum word count.
              </p>
            )}
            <p className="text-gray-500 text-sm ml-auto">
              {wordCount}/{maxWordCount}
            </p>
          </div>
          <textarea
            name="description"
            value={businessDetails.description}
            id="description"
            cols="30"
            rows="4"
            placeholder="Enter a brief description about your business"
            className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            onChange={(e) => handleBusinessDescriptionChange(e)}
          ></textarea>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-[3] w-full">
            <label>
              Founded In <span className="text-red-500 text-sm">*</span>
            </label>
            <div className="flex items-center gap-4 mt-2">
              <input
                type="date"
                name="foundedIn"
                value={businessDetails.foundedIn}
                id=""
                placeholder="When was your business found"
                className="flex-[8] rounded-md input border text-base border-gray-300 w-full py-3 px-4 text-gray-600 leading-tight focus:outline-none"
                onChange={handleBusinessDetailsChange}
              />
            </div>
          </div>
          <div className="flex-[9] flex flex-col w-full">
            <label>
              What services you offer{" "}
              <span className="text-red-500 text-sm">*</span>
            </label>
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
                className="rounded-md bg-blue-500 text-white px-8 py-3 md:flex-[4] focus:outline-none border border-blue-500"
                onClick={() => handleServiceAction("add")}
              >
                Add
              </button>
            </div>

            {serviceError && (
              <p className="text-red-500 text-xs mt-2">{serviceError}</p>
            )}

            <div className="mt-6 flex flex-wrap gap-4 w-full">
              {businessDetails.services?.map((service, index) => (
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
    </div>
  );
};

export default BasicDetails;
