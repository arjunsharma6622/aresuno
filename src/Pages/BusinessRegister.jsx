import React, { useState } from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    FiChevronDown,
    FiClock,
    FiFacebook,
    FiGlobe,
    FiInstagram,
    FiTwitter,
    FiYoutube,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import {
    BiCategory,
    BiDetail,
    BiLink,
    BiNavigation,
    BiQuestionMark,
} from "react-icons/bi";
import { MdPayment } from "react-icons/md";

const BusinessRegister = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    // const [businessDetails, setBusinessDetails] = useState({
    //     name: "",
    //     type: "",
    //     mainCategory: "",
    //     subCategory: "",
    //     address: "",
    //     phone: "",
    //     timing: "",
    //     businessHours : []
    // });

    const [businessDetails, setBusinessDetails] = useState({
        name: "",
        type: "",
        mainCategory: "",
        subCategory: "",
        address: "",
        phone: "",
        timing: "",
        businessHours: [
            { day: "Monday", from: "", to: "", isOpen: false },
            { day: "Tuesday", from: "", to: "", isOpen: false },
            { day: "Wednesday", from: "", to: "", isOpen: false },
            { day: "Thursday", from: "", to: "", isOpen: false },
            { day: "Friday", from: "", to: "", isOpen: false },
            { day: "Saturday", from: "", to: "", isOpen: false },
            { day: "Sunday", from: "", to: "", isOpen: false },
        ],
    });


    console.log(businessDetails.businessHours)


    const [phoneNumber, setPhoneNumber] = useState();
    const [selectedModesOfPayment, setSelectedModesOfPayment] = useState([]);

    const paymentModes = [
        "UPI",
        "Cash",
        "Credit Card",
        "Debit Card",
        "Net Banking",
        "EMI",
        "Wallet",
        "American Express",
    ];
    const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    //   const handleBusinessHoursChange = (index, isChecked) => {
    //     const updatedBusinessHours = [...businessDetails.businessHours];
    //     updatedBusinessHours[index].isOpen = isChecked;
    //     setBusinessDetails((prev) => ({
    //       ...prev,
    //       businessHours: updatedBusinessHours,
    //     }));

    //     console.log(businessDetails.businessHours);
    //   };


    const handleBusinessHoursChange = (index, isChecked) => {
        const updatedBusinessHours = [...businessDetails.businessHours];
        updatedBusinessHours[index].isOpen = isChecked;
        if (!isChecked) {
            updatedBusinessHours[index].from = "";
            updatedBusinessHours[index].to = "";
        }
        setBusinessDetails((prev) => ({ ...prev, businessHours: updatedBusinessHours }));
    };

    const handleBusinessHoursFromChange = (index, value) => {
        const updatedBusinessHours = [...businessDetails.businessHours];
        updatedBusinessHours[index].from = value;
        setBusinessDetails((prev) => ({
            ...prev,
            businessHours: updatedBusinessHours,
        }));
    };

    const handleBusinessHoursToChange = (index, value) => {
        const updatedBusinessHours = [...businessDetails.businessHours];
        updatedBusinessHours[index].to = value;
        setBusinessDetails((prev) => ({
            ...prev,
            businessHours: updatedBusinessHours,
        }));
    };



    const timeOptions = [
        "06:00 AM",
        "07:00 AM",
        "08:00 AM",
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "01:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM",
        "06:00 PM",
        "07:00 PM",
        "08:00 PM",
        "09:00 PM",
        "10:00 PM",
        "11:00 PM",
    ];

    // Implement complete functionality
    // Make sure to use the above functions as needed
    // Add any additional logic or UI changes here
    // Remember to update the state using setBusinessDetails appropriately
    // You can refer to the existing code for examples on how to update the state

    const handlePhoneChange = (value) => {
        setPhoneNumber(value);
    };

    const handlModeOfPaymentClick = (option) => {
        if (!selectedModesOfPayment.includes(option)) {
            setSelectedModesOfPayment([...selectedModesOfPayment, option]);
        }
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
                            </div>
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

                        <hr className="border-1 border-gray-300" />

                        {/* Business Faqs */}
                        <div className="mt-6 mb-6">
                            <div className="flex items-center gap-2">
                                <BiQuestionMark className="w-6 h-6" />
                                <h2 className="text-xl font-semibold">Add FAQ's</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4 mt-6">
                                <div>
                                    <label className="block text-gray-700">Question</label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="question"
                                            id="question"
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <label className="block text-gray-700 mt-4">Answer</label>
                                    <div className="mt-2">
                                        <textarea
                                            id="answer"
                                            name="answer"
                                            rows={2}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            defaultValue={""}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="border-1 border-gray-300" />

                        {/* Mode of Payment */}
                        <div className="mt-6 mb-6">
                            <div className="flex items-center gap-2">
                                <MdPayment className="w-6 h-6" />
                                <h2 className="text-xl font-semibold">Mode of Payment</h2>
                            </div>

                            <div className="flex flex-wrap gap-4 mt-6">
                                {paymentModes.map((mode, index) => (
                                    <span
                                        className={`px-4 py-2 border rounded-lg cursor-pointer  ${selectedModesOfPayment.includes(mode)
                                            ? "border-blue-500 text-blue-600"
                                            : "border-gray-300"
                                            }`}
                                        onClick={() => {
                                            handlModeOfPaymentClick(mode);
                                        }}
                                    >
                                        {mode}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <hr className="border-1 border-gray-300" />

                        <div className="mt-6 mb-6">
                            <div className="flex items-center gap-2">
                                <FiClock className="w-6 h-6" />
                                <h2 className="text-xl font-semibold">Business Hours</h2>
                            </div>

                            <div className="mt-6">
                                <div className="flex flex-col gap-4">
                                    {daysOfWeek.map((day, index) => (
                                        <div className="flex flex-col items-start gap-4" key={day}>

                                            <div className="flex gap-6 justify-start items-center">
                                                <input
                                                    type="checkbox"
                                                    id={day}
                                                    name={day}
                                                    className="form-checkbox accent-green-600 h-5 w-5 text-blue-500"
                                                    checked={businessDetails.businessHours[index].isOpen}
                                                    onChange={(e) => handleBusinessHoursChange(index, e.target.checked)}
                                                />
                                                <label
                                                    htmlFor={day}
                                                    className="block text-base text-gray-700"
                                                >
                                                    {day}
                                                </label>

                                            </div>
                                            {businessDetails.businessHours[index].isOpen && (
                                                <div className="flex gap-4 items-center">

                                                    <div className="relative">
                                                        <select
                                                            className="appearance-none py-2 px-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                                            value={businessDetails.businessHours[index].from}
                                                            onChange={(e) => handleBusinessHoursFromChange(index, e.target.value)}
                                                        >
                                                            <option value="" disabled defaultChecked>-</option>

                                                            {timeOptions.map((time) => (
                                                                <option key={time} value={time}>
                                                                    {time}
                                                                </option>
                                                            ))}
                                                        </select>

                                                        <FiChevronDown className="w-5 h-5 pointer-events-none absolute right-3 transform -translate-y-1/2 top-1/2" />

                                                    </div>



                                                    <span className="text-gray-600">to</span>

                                                    <div className="relative">
                                                        <select
                                                            className="appearance-none py-2 px-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                                            value={businessDetails.businessHours[index].to}
                                                            onChange={(e) => handleBusinessHoursToChange(index, e.target.value)}
                                                        >
                                                            {/* {timeOptions.map((time) => (
                                                            <option key={time} value={time}>
                                                                {time}
                                                            </option>
                                                        ))} */}


                                                            <option value="" disabled defaultChecked>-</option>


                                                            {timeOptions
                                                                .filter((time) => new Date(`01/01/2000 ${time}`) > new Date(`01/01/2000 ${businessDetails.businessHours[index].from}`))
                                                                .map((time) => (
                                                                    <option key={time} value={time}>
                                                                        {time}
                                                                    </option>
                                                                ))}
                                                        </select>

                                                        <FiChevronDown className="w-5 h-5 pointer-events-none absolute right-3 transform -translate-y-1/2 top-1/2" />

                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
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
