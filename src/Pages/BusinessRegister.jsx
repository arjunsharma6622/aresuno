import React, { useState } from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiChevronDown } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";

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
                    }
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
            <div className="max-w-md w-full justify-between flex flex-col h-80">
                <div className="flex flex-col">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Register Your Business
                        </h2>
                    </div>

                    {step === 1 && (
                        <div className="mt-8 space-y-6">
                            <h2 className="text-2xl">Enter Business Address</h2>

                            <div>
                                <div className="flex flex-col">
                                    <label htmlFor="">Business Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={businessDetails.name}
                                        onChange={handleBusinessDetailsChange}
                                        placeholder="Business Name"
                                        className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    />
                                </div>
                            </div>
                            {/* <div className="relative">
                                <select
                                    id=""
                                    type="text"
                                    placeholder="Type"
                                    className="bg-transparent appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                >
                                    <option value="" selected hidden className="text-gray-500">
                                        Busiess Type
                                    </option>
                                    <option value="Individual">Individual</option>
                                    <option value="Company">Company</option>
                                </select>
                                <div>
                                    <FiChevronDown className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm text-gray-500 w-6 h-6" />
                                </div>
                            </div> */}

                            <div className="flex mt-8 justify-start gap-4">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        id="service"
                                        name="type"
                                        value="service"
                                        checked={businessDetails.type === "service"}
                                        onChange={handleBusinessDetailsChange}
                                        className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                                    />
                                    <label htmlFor="service" className=" text-gray-700 text-sm">
                                        Service
                                    </label>
                                </div>
                                <div className="font-base text-gray-500 text-sm">
                                    <span>or</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        id="manufacturing"
                                        name="type"
                                        value="manufacturing"
                                        checked={businessDetails.type === "manufacturing"}
                                        onChange={handleBusinessDetailsChange}
                                        className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                                    />
                                    <label
                                        htmlFor="manufacturing"
                                        className=" text-gray-700 text-sm"
                                    >
                                        Manufacturing
                                    </label>
                                </div>
                            </div>


                            <div className="flex flex-col">
                                <label htmlFor="">Category</label>

                                <div className="relative mt-2">

                                    <select
                                        name="subCategory"
                                        value={businessDetails.subCategory}
                                        onChange={handleBusinessDetailsChange}
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 bg-transparent focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    >
                                        <option value="" disabled>
                                            Select Main Category
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
                            <div className="flex flex-col">
                                <label htmlFor="">Category</label>

                                <div className="relative mt-2">

                                    <select
                                        name="mainCategory"
                                        value={businessDetails.mainCategory}
                                        onChange={handleBusinessDetailsChange}
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 bg-transparent focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    >
                                        <option value="" disabled>
                                            Select Main Category
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








                            <div className="mt-8 space-y-6">
                                <h2 className="text-2xl">Enter Business Address</h2>

                                <div className="flex flex-col">
                                    <label htmlFor="">Address</label>
                                    <input type="text" className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text" />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="">Address Line 2 <span className="text-gray-500 font-light text-sm">(optional)</span></label>
                                    <input type="text" className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text" />
                                </div>



                                <div className="flex">

                                    <div className="flex flex-col">
                                        <label htmlFor="" className="">City</label>
                                        <input type="text" className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="" className="">Zip Code</label>
                                        <input type="text" className="mt-2 ml-2 mappearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="mt-8 space-y-6">
                            <h2 className="text-2xl">Enter Business Address</h2>

                            <div className="flex flex-col">
                                <label htmlFor="">Address</label>
                                <input type="text" className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text" />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="">Address Line 2 <span className="text-gray-500 font-light text-sm">(optional)</span></label>
                                <input type="text" className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text" />
                            </div>



                            <div className="flex">

                                <div className="flex flex-col">
                                    <label htmlFor="" className="">City</label>
                                    <input type="text" className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="" className="">Zip Code</label>
                                    <input type="text" className="mt-2 ml-2 mappearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
                                </div>
                            </div>







                            {/* PlacesAutocomplete Component */}
                            {/* <PlacesAutocomplete
                            value={businessDetails.address}
                            onChange={(address) => setBusinessDetails((prev) => ({ ...prev, address }))}
                            onSelect={handleAddressSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <input
                                        {...getInputProps({
                                            placeholder: "Type address here...",
                                            className: "location-search-input appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm",
                                        })}
                                    />
                                    <div>
                                        {loading ? <div>Loading...</div> : null}
                                        {suggestions.map((suggestion) => {
                                            const style = {
                                                backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                                            };
                                            return (
                                                <div {...getSuggestionItemProps(suggestion, { style })}>
                                                    {suggestion.description}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete> */}
                        </div>
                    )}

                    {step === 3 && (
                        <div className="mt-8 space-y-6">
                            <input
                                type="text"
                                name="address"
                                value={businessDetails.address}
                                onChange={handleBusinessDetailsChange}
                                placeholder="Address"
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={businessDetails.phone}
                                onChange={handleBusinessDetailsChange}
                                placeholder="Phone"
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                            <input
                                type="text"
                                name="timing"
                                value={businessDetails.timing}
                                onChange={handleBusinessDetailsChange}
                                placeholder="Timing"
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                    )}
                </div>


                <div className="flex items-end justify-between mt-4">
                    <div className="text-xs">
                        <p>Step {step} out of 3</p>
                    </div>

                    <div className="flex justify-center gap-8">
                        {step > 1 && (
                            <button
                                onClick={handlePreviousStep}
                                className="bg-gray-400 group flex justify-center items-center py-2 px-4 text-white font-medium rounded-md text-base"
                            >


                                <FiArrowLeft className=" text-white w-4 h-4 mr-2" />

                                Back
                            </button>
                        )}

                        {step < 3 && (
                            <button
                                onClick={handleNextStep}
                                className="group flex justify-center items-center py-2 px-4 border-gray-500text-base font-medium rounded-md bg-blue-500 text-white"
                            >
                                Next

                                <FiArrowRight className=" text-white w-4 h-4 ml-2" />


                            </button>
                        )}

                        {step === 3 && (
                            <button
                                onClick={handleSubmit}
                                className="group relative flex justify-center items-center py-2 px-4 border-gray-500text-base font-medium rounded-md bg-blue-600 text-white"
                            >
                                Register
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default BusinessRegister;
