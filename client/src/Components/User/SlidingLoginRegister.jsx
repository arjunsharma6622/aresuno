import React, { useState } from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";


const SlidingLoginRegister = () => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md px-4">
                <div className="flex mb-4">
                    <button
                        className={`flex-1 py-2 ${
                            showLogin ? "bg-blue-500 text-white" : "bg-gray-200"
                        } rounded-tl rounded-bl focus:outline-none`}
                        onClick={() => setShowLogin(true)}
                    >
                        Sign In
                    </button>
                    <button
                        className={`flex-1 py-2 ${
                            showLogin ? "bg-gray-200" : "bg-blue-500 text-white"
                        } rounded-tr rounded-br focus:outline-none`}
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

export default SlidingLoginRegister;
