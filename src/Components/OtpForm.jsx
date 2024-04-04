import { useEffect, useState } from "react";
import { API_URL, ToastParams } from "../utils/util";
import axios from "axios";
import { toast } from "react-toastify";

const OtpForm = ({ phone, setIsOtpVerified }) => {
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(60);

  const verifyOtp = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/forgetPassword-verify-otp`,
        {
          phone,
          otp: otp,
        },
      );
      if (response.data.success) {
        setOtp("");
      }

      setIsOtpVerified(true);

      toast.success("OTP Verified", ToastParams);
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message, ToastParams);
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post(`${API_URL}/api/forgetPassword-otp`, {
        phone: phone,
      });
      toast.success("OTP Sent", ToastParams);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (resendTimer > 0) {
        setResendTimer(resendTimer - 1);
      } else if (resendTimer === 0) {
        return;
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  return (
    <div className="w-full flex justify-start items-center">
      <div className="bg-white rounded">
        <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>
        <p className="text-sm text-gray-600 mb-4">
          Please enter the 4-digit OTP sent to your phone number.
        </p>
        <div className="flex justify-between">
          <input
            type="text"
            onChange={(e) => setOtp(e.target.value)}
            className="w-full py-3 text-center border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          onClick={verifyOtp}
          className="w-fit mt-4 mb-4 bg-blue-500 mx-auto hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
        >
          Verify
        </button>

        <p className="text-sm text-gray-600 mb-4">
          Didn&apos;t receive the OTP?{" "}
          <button
            type="button"
            disabled={resendTimer > 0}
            onClick={handleResendOtp}
            className={` ${
              resendTimer > 0
                ? "cursor-not-allowed text-gray-500"
                : "text-blue-500"
            }`}
          >
            Resend
          </button>{" "}
          {resendTimer > 0 && <span>{resendTimer}</span>}
        </p>
      </div>
    </div>
  );
};

export default OtpForm;
