import React, { useState } from "react";
import Login from "./Login/VendorLogin";
import Register from "./Register/VendorRegister";

const SlidingVendorLoginRegister = () => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="flex flex-col items-center mt-20 justify-start h-screen">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                {showLogin ? (
                    <h2 className="text-2xl font-bold mb-6 text-center">Vendor Login</h2>
                ) : (
                    <h2 className="text-2xl font-bold mb-6 text-center">Vendor Register</h2>
                )}
                <div className="flex justify-center items-center mb-6 ">
                    <button
                        className={`flex-1 py-2 ${
                            showLogin ? "bg-blue-500 text-white" : " bg-gray-200"
                        } `}
                        onClick={() => setShowLogin(true)}
                    >
                        Sign In
                    </button>
                    <button
                        className={`flex-1 py-2 ${
                            showLogin ? "bg-gray-200" : " bg-blue-500 text-white"
                        } `}
                        onClick={() => setShowLogin(false)}
                    >
                        Register
                    </button>
                </div>
                {showLogin ? <Login /> : <Register />}
            </div>
        </div>
    );
};

export default SlidingVendorLoginRegister;
