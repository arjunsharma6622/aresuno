import React, { useState } from "react";

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
                        <input
                            type="text"
                            name="name"
                            value={businessDetails.name}
                            onChange={handleBusinessDetailsChange}
                            placeholder="Business Name"
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" // Your classes here
                        />
                        <input
                            type="text"
                            name="type"
                            value={businessDetails.type}
                            onChange={handleBusinessDetailsChange}
                            placeholder="Type"
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" // Your classes here
                        />
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
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" // Your classes here
                />
                <input
                    type="text"
                    name="subCategory"
                    value={businessDetails.subCategory}
                    onChange={handleBusinessDetailsChange}
                    placeholder="Sub Category"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" // Your classes here
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
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" // Your classes here
                />
                <input
                    type="text"
                    name="phone"
                    value={businessDetails.phone}
                    onChange={handleBusinessDetailsChange}
                    placeholder="Phone"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" // Your classes here
                />
                <input
                    type="text"
                    name="timing"
                    value={businessDetails.timing}
                    onChange={handleBusinessDetailsChange}
                    placeholder="Timing"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" // Your classes here
                />
            </div>
        )}


                <div className="mt-8 flex items-center justify-between">
                    <div>
                        <p>Step {step} out of 3</p>

                    </div>

                    <div className="flex justify-center">

                        {
                            step > 1 && (
                                <button
                                    onClick={handlePreviousStep}
                                    className="group relative flex justify-center items-center py-2 px-4 border-black font-medium rounded-md text-base"
                                >
                                    <img src="./assets/images/arrow-left.svg" alt="" className="h-4 w-4 mr-2 " />
                                    Back
                                </button>
                            )

                        }

                        {step < 3 && (
                            <button
                                onClick={handleNextStep}
                                className="group relative flex justify-center items-center py-2 px-4 border-gray-500text-base font-medium rounded-md bg-blue-600 text-white"
                            >
                                Next
                                <img src="./assets/images/arrow-right.svg" alt="" className="h-4 w-4 ml-2" />
                            </button>

                        )
                        }

                        {
                            step === 3 && (
                                <button
                                    // onClick={handleSubmit}
                                    className="group relative flex justify-center items-center py-2 px-4 border-gray-500text-base font-medium rounded-md bg-blue-600 text-white"
                                >
                                    Submit
                                </button>
                            )
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BusinessRegister;
