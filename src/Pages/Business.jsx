import React, { useState } from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";

const BusinessRegister = () => {
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

    return (
        <div className="min-h-screen  flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">



                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Register Your Business
                    </h2>
                </div>
                {step === 1 && (
                    <div className="mt-8 space-y-6">
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={businessDetails.name}
                                onChange={handleBusinessDetailsChange}
                                placeholder="Business Name"
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                        <div className="relative">
                            <select
                                id=""
                                type="text"
                                placeholder="Type"
                                className="bg-transparent appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            >
                                <option value="" selected hidden className="text-gray-500">Busiess Type</option>
                                <option value="Individual">Individual</option>
                                <option value="Company">Company</option>
                            </select>
                            <img
                                src="./assets/images/dropdown.svg"
                                alt="mail"
                                className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm cursor-pointer text-gray-600 w-5 h-5"
                            ></img>


                        </div>


                        <div className="flex mt-8 justify-start gap-4">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id="individual"
                                    name="type"
                                    value="Individual"
                                    checked={businessDetails.type === 'Individual'}
                                    onChange={handleBusinessDetailsChange}
                                    className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                                />
                                <label htmlFor="individual" className=" text-gray-700 text-sm">
                                    Service
                                </label>
                            </div>
                            <div className="font-base text-gray-500 text-sm">
                                <span>or</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id="company"
                                    name="type"
                                    value="Company"
                                    checked={businessDetails.type === 'Company'}
                                    onChange={handleBusinessDetailsChange}
                                    className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                                />
                                <label htmlFor="company" className=" text-gray-700 text-sm">
                                    Manufacturer
                                </label>
                            </div>
                        </div>

                    </div>
                )}

                {step === 2 && (
                    <div className="mt-8 space-y-6">
                        <input
                            type="text"
                            name="mainCategory"
                            value={businessDetails.mainCategory}
                            onChange={handleBusinessDetailsChange}
                            placeholder="Main Category"
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                        {/* PlacesAutocomplete Component */}
                        <PlacesAutocomplete
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
</PlacesAutocomplete>


                        <input
                            type="text"
                            name="subCategory"
                            value={businessDetails.subCategory}
                            onChange={handleBusinessDetailsChange}
                            placeholder="Sub Category"
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />

                        <input
                            type="text"
                            name="subCategory"
                            value={businessDetails.subCategory}
                            onChange={handleBusinessDetailsChange}
                            placeholder="Sub Category"
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
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

                <div className="mt-8 flex items-end justify-between">
                    <div className="text-xs">
                        <p>Step {step} out of 3</p>
                    </div>

                    <div className="flex justify-center gap-8">
                        {step > 1 && (
                            <button
                                onClick={handlePreviousStep}
                                className="bg-gray-400 group flex justify-center items-center py-2 px-4 text-white font-medium rounded-md text-base"
                            >
                                <img
                                    src="./assets/images/arrow-left.svg"
                                    alt=""
                                    className="h-4 w-4 mr-2 "
                                />
                                Back
                            </button>
                        )}

                        {step < 3 && (
                            <button
                                onClick={handleNextStep}
                                className="group flex justify-center items-center py-2 px-4 border-gray-500text-base font-medium rounded-md bg-blue-500 text-white"
                            >
                                Next
                                <img
                                    src="./assets/images/arrow-right.svg"
                                    alt=""
                                    className="h-4 w-4 ml-2"
                                />
                            </button>
                        )}

                        {step === 3 && (
                            <button
                                // onClick={handleSubmit}
                                className="group relative flex justify-center items-center py-2 px-4 border-gray-500text-base font-medium rounded-md bg-blue-600 text-white"
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessRegister;
