import React, { useState } from "react";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await axios.post("https://aresuno-server.vercel.app/api/user/register", formData);
            console.log(res.data);
            toast.success("User Registered Successfully")
        } catch (err) {
            setErrors(err.response.data);
            toast.error("User Registration Failed")
        }

        setIsLoading(false);
    };

    return (
        <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-full max-w-md px-4">

                <h2 className="text-2xl font-bold mb-4 text-center">User Register</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                        Name<span className="text-black-500 font-light">*</span>
                    </label>
                    <input
                        className={`${errors.name ? "border-red-500" : ""}  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none `}
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                </div>


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
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                        Phone<span className="text-black-500 font-light">*</span>
                    </label>
                    <input
                        className={`${errors.phone ? "border-red-500" : ""}  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none `}
                        id="phone"
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
                </div>



                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                        Password<span className="text-black-500 font-light">*</span>
                    </label>
                    <div className="relative">
                        <input
                            className={`${errors.password ? "border-red-500" : ""}  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none `}
                            id="password"
                            type={showPassword ? "text" : "password"}
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
                        {isLoading ? "Loading..." : "Register"}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Register;