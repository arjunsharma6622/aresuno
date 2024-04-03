import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
// import { userLogin } from "../../userSlice";
import { Link, useSearchParams } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiCheckCircle, FiEye, FiEyeOff, FiHome } from "react-icons/fi";
import { userLogin } from "../../state/slices/userSlice";
import InputBx from "../User/InputBx";
import { API_URL, ToastParams } from "../../utils/util";
import { AiFillLayout } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import FormValidation from '../../utils/formValidator';
import { useForm } from 'react-hook-form';
import { validationRules } from '../../utils/constants'

const Register = () => {
  const formValidtaion = FormValidation()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: ""
  });

  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      if (resendTimer > 0) {
        setResendTimer(resendTimer - 1);
      }
      else if (resendTimer === 0) {
        return
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleResendOtp = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/forgetPassword-otp`, { phone: formData.phone });
      console.log(response.data);
      toast.success('OTP Sent', ToastParams);
    } catch (err) {
      console.log(err);
    }
  };

  const [queryParams] = useSearchParams()

  const [focusedField, setFocusedField] = useState(null);

  // const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [next, setNext] = useState(false);

  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [otpVefiryLoading, setOtpVefiryLoading] = useState(false)

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    setOtpVefiryLoading(true)
    try {
      const response = await axios.patch(`${API_URL}/api/user/verify-otp`, {
        _id: formData._id,
        otp: otp,
        phone: formData.phone,
      })

      console.log(response.data)

      toast.success("OTP Verified", ToastParams)
      setOtpVerified(true)
      setOtpVefiryLoading(false)
    }
    catch (err) {
      setOtpVefiryLoading(false)
      toast.error(err.response.data.message, ToastParams)
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onRegister = async (e) => {
    // e.preventDefault();  // Prevent the default form submission behavior
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/api/user/register`,
        {...e,role:formData?.role}
      );
      console.log(res.data);
      const token = res.data.token;
      localStorage.setItem("token", token);

      setOtpSent(true)
      toast.success("OTP sent", ToastParams);


      if (formData.role === "vendor") {
        dispatch(
          userLogin({
            name: res.data.vendor.name,
            userType: formData.role,
          })
        );
      }

      if (formData.role === "user") {
        dispatch(
          userLogin({
            name: res.data.user.name,
            userType: formData.role,
          })
        );
      }




      setIsLoading(false);

    } catch (err) {
      console.log(err)
      toast.error(err.response.data.message, ToastParams);
      setIsLoading(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
      });
      // setErrors(err.response.data.message);
    }
  };



  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <div className="flex w-full justify-between h-screen">
      <div className="flex-[5] hidden md:flex">
        <img src="https://images.pexels.com/photos/19896578/pexels-photo-19896578/free-photo-of-a-small-wooden-building-on-the-side-of-the-road.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className="w-full h-full object-cover" />
      </div>


      <div className="flex w-full md:flex-[5] md:mx-44 md:mt-12 items-start justify-center">
        {!next ? (
          <div className="flex md:items-start flex-col mx-6 gap-4 justify-start mt-12 w-full h-full">
            <p className="text-base md:text-lg">Before creating an account, please tell us your role</p>
            <div className="flex w-full flex-col">

              <div className="text-sm md:text-base">
                <div className="flex items-center mb-4">
                  <input
                    type="radio"
                    id="client"
                    name="role"
                    value="user"
                    checked={formData.role === "user"}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="mr-2"
                  />
                  <label htmlFor="client" className="">
                    I'm a User
                  </label>
                </div>
              </div>

              <div className="text-sm md:text-base">
                <div className="flex items-center mb-4">
                  <input
                    type="radio"
                    id="vendor"
                    name="role"
                    value="vendor"
                    checked={formData.role === "vendor"}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="mr-2"
                  />
                  <label htmlFor="vendor" className="">
                    I'm a vendor
                  </label>
                </div>
              </div>
              <div>
                <button
                  disabled={!formData.role}
                  onClick={() => {
                    setNext(true);
                    console.log(formData.role);
                  }}
                  className={`bg-blue-500 group flex justify-center items-center py-2 px-4 text-white font-medium rounded-md text-base`}
                >
                  {!formData.role ? (
                    "Please Select"
                  ) : (
                    <div className="flex items-center">
                      Continue as {formData.role}
                      <FiArrowRight
                        strokeWidth={2}
                        className=" text-white w-5 h-5 ml-2"
                      />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        )
          : (

            <section className="w-full flex items-center md:items-start ">
              <div className={`w-full`}>
                <div className="md:shadow-lg w-full p-4 md:p-8 bg-white rounded-xl">
                  <div>
                    <button
                      onClick={() => {
                        setNext(!next);
                        console.log(formData.role);
                      }}
                      className=""
                    >
                      <FiArrowLeft strokeWidth={2} className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex mb-6 gap-4 items-center justify-center">
                    <img src="./assets/logo.png" alt="" className="w-16" />
                  </div>
                  {
                    !otpSent ? (
                      <div>
                        <h2 className="text-2xl font-bold mb-4 text-center">
                          Get Started as {formData.role}
                        </h2>
                        <form onSubmit={handleSubmit(onRegister)} className="w-full">
                          <div className="flex md:flex-row flex-col gap-2 w-full">
                            <div className="field input-field  relative z-0 mb-4 w-full group">
                              <input
                                type="text"
                                id="name"
                                className=" dark:text-white block py-3 px-3 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-[#DFDFDF] appearance-none dark:text-black dark:border-[#DFDFDF]  focus:outline-none focus:ring-0  peer"
                                placeholder=""
                                name="name"
                                {...register("name", formValidtaion.name)}
                              />
                              {errors && <small className="text-red-500">{errors?.name?.message}</small>}
                              <label
                                htmlFor="name"
                                className=" dark:text-white peer-focus:font-normal absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 left-3 bg-white dark:bg-slate-900 p-1.5 z-10 origin-[2] peer-focus:left-0 peer-focus:text-[#A5A5A5] peer-focus:text-lg  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                              >
                                Name
                                <span className="text-red-500">*</span>
                              </label>
                            </div>

                            <div className="field input-field  relative z-0 mb-4 w-full group">
                              <input
                                type="text"
                                id="phone"
                                className=" dark:text-white block py-3 px-3 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-[#DFDFDF] appearance-none dark:text-black dark:border-[#DFDFDF]  focus:outline-none focus:ring-0  peer"
                                placeholder=" "
                                name="phone"
                                  maxLength={10}
                                {...register("phone", formValidtaion.mobile)}
                              />
                              {errors && <small className="text-red-500">{errors?.phone?.message}</small>}

                              <label
                                htmlFor="phone"
                                className=" dark:text-white peer-focus:font-normal absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 left-3 bg-white dark:bg-slate-900 p-1.5 z-10 origin-[2] peer-focus:left-0 peer-focus:text-[#A5A5A5] peer-focus:text-lg  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                              >
                                Phone
                                <span className="text-red-500">*</span>
                              </label>
                            </div>
                          </div>

                          <div className="field input-field  relative z-0 mb-4 w-full group">
                            <input
                              type="text"
                              id="email"
                              className=" dark:text-white block py-3 px-3 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-[#DFDFDF] appearance-none dark:text-black dark:border-[#DFDFDF]  focus:outline-none focus:ring-0  peer"
                              placeholder=" "
                              name="email"

                              {...register("email", formValidtaion.email)}
                            />
                            {errors && <small className="text-red-500">{errors?.email?.message}</small>}

                            <label
                              htmlFor="email"
                              className=" dark:text-white peer-focus:font-normal absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 left-3 bg-white dark:bg-slate-900 p-1.5 z-10 origin-[2] peer-focus:left-0 peer-focus:text-[#A5A5A5] peer-focus:text-lg  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                            >
                              Email
                              <span className="text-red-500">*</span>
                            </label>
                          </div>

                         

                          <div className="field input-field   z-0 mb-6 w-full group">
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className=" dark:text-white block py-3 px-3 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-[#DFDFDF] appearance-none dark:text-black dark:border-[#DFDFDF]  focus:outline-none focus:ring-0  peer"
                                placeholder=" "
                                name="password"

                                {...register("password", formValidtaion.password)}
                              />

                              <label
                                htmlFor="password"
                                className=" dark:text-white peer-focus:font-normal absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 left-3 bg-white dark:bg-slate-900 p-1.5 z-10 origin-[2] peer-focus:left-0 peer-focus:text-[#A5A5A5] peer-focus:text-lg  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                              >
                                Password
                                <span className="text-red-500">*</span>
                              </label>

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
                            {errors && <small className="text-red-500">{errors?.password?.message}</small>}

                          </div>

                          <div className="field input-field   z-0 mb-6 w-full group">
                            <div className="relative">
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmpassword"
                                className=" dark:text-white block py-3 px-3 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-[#DFDFDF] appearance-none dark:text-black dark:border-[#DFDFDF]  focus:outline-none focus:ring-0  peer"
                                placeholder=" "
                                name="confirmpassword"

                                {...register("confirmpassword",{required:'Please enter confirm password.',
                                pattern: {
                                  value: validationRules.password,
                                  message: validationRules.confirmPasswordMessage
                                },
                                  validate: (val) => {
                                  if (watch('password') != val) {
                                    return "Password does not match.";
                                  }
                                },})}
                              />

                              <label
                                htmlFor="confirmpassword"
                                className=" dark:text-white peer-focus:font-normal absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 left-3 bg-white dark:bg-slate-900 p-1.5 z-10 origin-[2] peer-focus:left-0 peer-focus:text-[#A5A5A5] peer-focus:text-lg  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                              >
                                Confirm Password
                                <span className="text-red-500">*</span>
                              </label>

                              <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? (
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
                            {errors && <small className="text-red-500">{errors?.confirmpassword?.message}</small>}

                          </div>



                          {/* </div> */}


                          <div className="field button-field">
                            <button
                              type="submit"  // This line is optional since the default type of a button inside a form is 'submit'
                              className="bg-blue-700 text-white font-bold w-full py-3 px-4 rounded-lg focus:outline-none"
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
                    )

                      : !otpVerified ? (
                        <div className=" w-full mt-10">
                          <div>
                            <div className="flex flex-col gap-4">
                              <div>
                                <h2 className="text-start text-lg font-semibold">Enter OTP</h2>
                                <p className="text-start text-sm">Enter the OTP sent to your phone number - {formData.phone}</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <input type="text" pattern={"\d*"} name="otp" maxLength="4" max={9999} onChange={(e) => setOtp(e.target.value)} className="flex-[8] border border-gray-300 w-full py-3 px-3 text-gray-600 leading-tight focus:outline-none focus:border-blue-500 rounded-lg" />
                                <button className="bg-blue-500 flex-[4] text-white w-full py-3  px-4 rounded-lg focus:outline-none" onClick={handleSubmitOtp}>
                                  {otpVefiryLoading ? (
                                    <div
                                      class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                      role="status"
                                    >
                                      <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                        Loading...
                                      </span>
                                    </div>
                                  ) : (
                                    "Verify OTP"
                                  )}
                                </button>
                              </div>
                              <p className="text-sm text-gray-600 mb-4">
                                Didn't receive the OTP?{' '}
                                <button
                                  type="button"
                                  disabled={resendTimer > 0}
                                  onClick={handleResendOtp}
                                  className={`${resendTimer > 0 ? 'cursor-not-allowed text-gray-500' : 'text-blue-500'}`}
                                >
                                  Resend
                                </button>{' '}
                                {resendTimer > 0 && <span>{resendTimer}</span>}
                              </p>            </div>

                          </div>
                        </div>
                      )

                        : (

                          <div className="flex flex-col gap-4 mt-10 w-full">
                            <div className="flex flex-col gap-1">

                              <h2 className="text-start text-lg font-semibold">Registration Successful</h2>
                              <p className="text-start text-sm">Your account has been created successfully</p>
                            </div>




                            <div className="flex gap-4">
                              <Link to={"/dashboard"} className="bg-blue-500 flex items-center gap-2 text-white w-fit py-3  px-4 rounded-lg focus:outline-none">
                                <LuLayoutDashboard className="w-6 h-6" />
                                <span className="">Dashboard</span>
                              </Link>
                              <Link to={"/"} className="bg-gray-500 flex items-center gap-2 text-white w-fit py-3  px-4 rounded-lg focus:outline-none">
                                <FiHome className="w-6 h-6" />
                                <span className="">Home</span>
                              </Link>
                            </div>
                          </div>



                        )
                  }
                </div>
              </div>

              <ToastContainer />
            </section>

          )}



      </div>



      <ToastContainer />
    </div>
  );
};

export default Register;
