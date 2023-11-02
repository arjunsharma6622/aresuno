import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { userLogin } from "../../userSlice";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [focusedField, setFocusedField] = useState(null);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("");
  const [next, setNext] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://aresuno-server.vercel.app/api/${role}/register`,
        formData
      );
      console.log(res.data);
      const token = res.data.token;
      localStorage.setItem("token", token);

      toast.success("success");

      dispatch(
        userLogin({
          name: res.data.vendor.name,
          userType: role,
        })
      );
      setIsLoading(false);

      if (role === "vendor") {
        navigate(`/vendor/onboarding`);
      } else {
        navigate(`/user/dashboard`);
      }
    } catch (err) {
      setErrors(err.response.data);
      toast.error("User Registration Failed");
    }
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {!next && (
        <div className="flex flex-col">
          <div className="mb-4">
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="client"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={(e) => setRole(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="client" className="text-lg">
                I'm a User
              </label>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="vendor"
                name="role"
                value="vendor"
                checked={role === "vendor"}
                onChange={(e) => setRole(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="vendor" className="text-lg">
                I'm a vendor
              </label>
            </div>
          </div>
          <div>
            <button
              disabled={!role}
              onClick={() => {
                setNext(true);
                console.log(role);
              }}
              className={`bg-gray-400 group flex justify-center items-center py-2 px-4 text-white font-medium rounded-md text-base`}
            >
              {!role ? (
                "Please Select"
              ) : (
                <div className="flex items-center">
                  Continue as {role}
                  <FiArrowRight
                    strokeWidth={2}
                    className=" text-white w-5 h-5 ml-2"
                  />
                </div>
              )}
            </button>
          </div>
        </div>
      )}

      {next && (
        <section className="w-full max-w-md">
          <div className={` login w-full`}>
            <div className="shadow-lg w-full p-8 bg-white rounded-xl">
              <div>
                <button
                  onClick={() => {
                    setNext(!next);
                    console.log(role);
                  }}
                  className=""
                >
                  <FiArrowLeft strokeWidth={2} className="h-5 w-5" />
                </button>
              </div>
              <p className="text-3xl font-bold mb-6 text-center text-blue-500">
                Aresuno
              </p>

              <h2 className="text-2xl font-bold mb-4 text-center">
                Get Started as {role}
              </h2>
              <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="field input-field mb-6 ">
                  <div className="relative">
                    <span
                      className={`bg-white pointer-events-none px-2 z-10  absolute transform -translate-y-1/2 left-3  transition-all duration-75 ease-in ${
                        focusedField === "name" || formData.name
                          ? "top-0 scale-90 text-blue-500 text-sm"
                          : "text-gray-400 top-1/2  text-base"
                      } ${
                        focusedField === "name"
                          ? "text-blue-500"
                          : "text-gray-500"
                      }`}
                      onFocus={handleFocus}
                      onBeforeInput={handleBlur}
                    >
                      Name
                    </span>

                    <input
                      className={`${
                        errors.name ? "border-red-500" : ""
                      }  rounded-md input border border-gray-300 w-full py-3 px-3 text-gray-600 leading-tight focus:outline-none focus:border-blue-500`}
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus("name")}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs italic">{errors.name}</p>
                  )}
                </div>

                <div className="field input-field mb-6 ">
                  <div className="relative">
                    <span
                      className={`bg-white pointer-events-none px-2 z-10  absolute transform -translate-y-1/2 left-3 transition-all duration-75 ease-in ${
                        focusedField === "email" || formData.email
                          ? "top-0 scale-90 text-blue-500 text-sm"
                          : "text-gray-400 top-1/2  text-base"
                      } ${
                        focusedField === "email"
                          ? "text-blue-500"
                          : "text-gray-500"
                      }`}
                      onFocus={handleFocus}
                      onBeforeInput={handleBlur}
                    >
                      Email
                    </span>
                    <input
                      className={`${
                        errors.email ? "border-red-500" : ""
                      }  rounded-md input border border-gray-300 w-full py-3 px-3 text-gray-600 leading-tight focus:outline-none focus:border-blue-500`}
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus("email")}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs italic">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="field input-field mb-5">
                  <div className="relative">
                    <span
                      className={`bg-white pointer-events-none px-2 z-10  absolute transform -translate-y-1/2 left-3 transition-all duration-75 ease-in ${
                        focusedField === "password" || formData.password
                          ? "top-0 scale-90 text-blue-500 text-sm"
                          : "text-gray-400 top-1/2  text-base"
                      } ${
                        focusedField === "password"
                          ? "text-blue-500"
                          : "text-gray-500"
                      }`}
                      onFocus={handleFocus}
                      onBeforeInput={handleBlur}
                    >
                      Password
                    </span>
                    <input
                      className={`${
                        errors.password ? "border-red-500" : ""
                      }  rounded-md input border border-gray-300 w-full py-3 px-3 text-gray-600 leading-tight focus:outline-none focus:border-blue-500`}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => handleFocus("password")}
                      onBlur={handleBlur}
                    />

                    <div onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <FiEye
                          strokeWidth={1.5}
                          className="bx bx-hide eye-icon absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm cursor-pointer text-gray-400 w-6 h-6"
                        />
                      ) : (
                        <FiEyeOff
                          strokeWidth={1.5}
                          className="bx bx-show eye-icon absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm cursor-pointer text-gray-400 w-6 h-6"
                        />
                      )}
                    </div>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs italic">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="field button-field">
                  <button
                    className=" bg-blue-700 text-white font-bold w-full py-3  px-4 rounded-lg focus:outline-none"
                    type="submit"
                  >
                    {isLoading ? (
                      <div
                        class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                      >
                        <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                          Loading...
                        </span>
                      </div>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
              </form>

              <div className="form-link text-center mt-4">
                <span>
                  Already have an account?{" "}
                  <Link to="/login" className="link text-blue-500 underline">
                    Login
                  </Link>
                </span>
              </div>

              <div className="line h-[1.4px] w-full mt-9 mb-9 bg-gray-300 relative">
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-gray-400 text-sm font-light">
                  Or
                </span>
              </div>

              <div className="media-options mb-4">
                <a
                  href="#"
                  className="field facebook w-full flex items-center justify-center text-white  bg-[#1877F2] py-2 px-4 rounded focus:outline-none"
                >
                  <img
                    src="./assets/images/facebook.svg"
                    alt=""
                    className="bx bxl-facebook facebook-icon text-blue-500 rounded-full flex items-center justify-center w-8 h-8 mr-2"
                  ></img>
                  <span>Signpu with Facebook</span>
                </a>
              </div>

              <div className="media-options">
                <a
                  href="#"
                  className="field google w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded focus:outline-none"
                >
                  <img
                    src="./assets/images/google.svg"
                    alt=""
                    className="google-img h-8 w-8 object-cover mr-2"
                  />
                  <span>Signup with Google</span>
                </a>
              </div>
            </div>
          </div>

          <ToastContainer />
        </section>
      )}
    </div>
  );
};

export default Register;
