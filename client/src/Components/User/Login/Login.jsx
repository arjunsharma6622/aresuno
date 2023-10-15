import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await axios.post("https://aresunoserver.vercel.app/api/user/login/", formData, {
                withCredentials: true
            });
            console.log(res.data);
            setLoggedIn(true);
            toast.success("User Logged In Successfully")
        } catch (err) {
            setErrors(err.response.data);
            toast.error("User Login Failed")
        }

        setIsLoading(false);
    };

    return (
        <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-full max-w-md px-4">
                {/* <h2 className="text-2xl font-bold mb-4 text-center">User Login</h2> */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                        Email<span className="text-black-500 font-light">*</span>
                    </label>
                    <input
                        className={`${errors.email ? "border-red-500" : ""}  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none `}
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                        Password<span className="text-black-500 font-light">*</span>
                    </label>
                    <div className="relative">
                        <input
                            className={`${errors.password ? "border-red-500" : ""}  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none `}
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <span
                            className="absolute top-1/2  transform -translate-y-1/2 right-0 mr-4 text-sm cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </span>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded focus:outline-none "
                        type="submit"
                    >
                        {isLoading ? "Loading..." : "Login"}
                    </button>
                </div>
            </form>

            <ToastContainer />
            
        </div>
    );
};

export default Login;
