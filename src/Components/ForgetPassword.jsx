import { useState } from "react";
import OtpForm from "./OtpForm";
import { API_URL, ToastParams } from "../utils/util";
import axios from "axios";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";

const ForgetPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [updatedPassword, setUpdatedPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordClick = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`${API_URL}/api/reset-password`, {
        password: updatedPassword?.newPassword,
        phone: phoneNumber,
      });
      setUpdatedPassword({
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Password Updated", ToastParams);
    } catch (err) {
      console.error(err);

      toast.error("Error Updating Password", ToastParams);
    }
  };

  const handlePasswordChange = (e) => {
    setUpdatedPassword({ ...updatedPassword, [e.target.name]: e.target.value });
  };

  const handleGetOtp = async () => {
    try {
      await axios.post(`${API_URL}/api/forgetPassword-otp`, {
        phone: phoneNumber,
      });
      setOtpSent(true);
      toast.success("OTP Sent", ToastParams);
    } catch (err) {
      console.error(err.response.data.message);
      toast.error(err.response.data.message, ToastParams);
    }
  };

  return (
    <div className="h-[70vh] w-full flex items-start justify-center">
      <div className="bg-white shadow-lg p-8 w-full md:w-1/2 mx-auto my-10 rounded">
        <h2 className="text-2xl font-semibold mb-8">Forget Password</h2>

        {!otpSent ? (
          <div>
            <div className="w-full">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 font-semibold mb-2"
              >
                Phone Number
              </label>
              <div className="flex gap-4">
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full border flex-[8] border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleGetOtp}
                  className="bg-blue-500 flex-[4] text-white w-full px-4 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Get OTP
                </button>
              </div>
            </div>
          </div>
        ) : !isOtpVerified ? (
          <div className="w-full">
            <OtpForm phone={phoneNumber} setIsOtpVerified={setIsOtpVerified} />
          </div>
        ) : (
          <div className="px-3 py-3 w-full md:w-full bg-white md:p-6 md:py-10 rounded-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-base md:text-lg font-medium my-0">
                Change Password -{" "}
                <span className="text-gray-500 text-sm ml-2">
                  {phoneNumber}
                </span>
              </h2>

              <FiLock className="text-gray-500 w-5 h-5 md:w-6 md:h-6" />
            </div>

            <div className="">
              <form className={`flex flex-col gap-4 mt-6`}>
                <div>
                  <input
                    type="password"
                    value={updatedPassword?.newPassword}
                    className="border border-gray-300 text-sm md:text-base bg-transparent rounded-md px-3 py-2 md:px-4 md:py-3 focus:outline-none w-full"
                    onChange={handlePasswordChange}
                    name="newPassword"
                    placeholder="New Password"
                  />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={updatedPassword?.confirmPassword}
                    className="border border-gray-300 text-sm md:text-base bg-transparent rounded-md px-3 py-2 md:px-4 md:py-3 focus:outline-none w-full"
                    onChange={handlePasswordChange}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />

                  <div onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <FiEye
                        strokeWidth={1.5}
                        className="bx bx-hide eye-icon absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm cursor-pointer text-gray-400 w-5 h-5 md:w-6 md:h-6"
                      />
                    ) : (
                      <FiEyeOff
                        strokeWidth={1.5}
                        className="bx bx-show eye-icon absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm cursor-pointer text-gray-400 w-5 h-5 md:w-6 md:h-6"
                      />
                    )}
                  </div>
                </div>

                {updatedPassword?.confirmPassword &&
                  (updatedPassword?.newPassword !==
                  updatedPassword?.confirmPassword ? (
                    <p className="text-red-500 text-xs -mt-3">
                      Passwords do not match
                    </p>
                  ) : (
                    <p className="text-green-600 text-xs -mt-3">
                      Passwords Match
                    </p>
                  ))}

                <button
                  type="submit"
                  className={`bg-blue-500 rounded-lg px-3 text-sm md:text-base py-2 md:py-3 md:px-5 text-white ${
                    !updatedPassword?.confirmPassword ||
                    updatedPassword?.newPassword !==
                      updatedPassword?.confirmPassword
                      ? "cursor-not-allowed"
                      : ""
                  }`}
                  disabled={
                    !updatedPassword?.confirmPassword ||
                    updatedPassword?.newPassword !==
                      updatedPassword?.confirmPassword
                  }
                  onClick={handlePasswordClick}
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgetPassword;
