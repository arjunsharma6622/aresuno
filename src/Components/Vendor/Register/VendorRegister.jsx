
import React, { useState } from "react";
import axios from "axios";

const VendorRegister = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        gender: ""
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [registered, setRegistered] = useState(false);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await axios.post("https://aresuno-server.vercel.app/api/vendor/register", formData);
            console.log(res.data);
            setRegistered(true);
        } catch (err) {
            if (err.response && err.response.data) {
                setErrors(err.response.data);
            } else {
                setErrors({ message: "An error occurred." });
            }
        }

        setIsLoading(false);
    };

    return (
        <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-full max-w-md px-4">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                        Name<span className="text-black-500 font-light">*</span>
                    </label>
                    <input
                        className={`${errors.name ? "border-red-500" : ""}  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  `}
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
                        className={`${errors.email ? "border-red-500" : ""}  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  `}
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
                        className={`${errors.phone ? "border-red-500" : ""}  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  `}
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
                            className={`${errors.password ? "border-red-500" : ""}  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  `}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <span
                            className="z-10 absolute top-1/2  transform -translate-y-1/2 right-0 mr-4 text-sm cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </span>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="gender">
                        Gender<span className="text-black-500 font-light">*</span>
                    </label>
                    <select
                        className={`${errors.gender ? "border-red-500" : ""}  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  `}
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-xs italic">{errors.gender}</p>}
                </div>

                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  "
                        type="submit"
                    >
                        {isLoading ? "Loading..." : "Register"}
                    </button>
                </div>


                {registered && (
                    <div className="text-center mt-4">
                        <p className="text-green-500">Registered successfully!</p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default VendorRegister;
