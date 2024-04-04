import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/util";
import axios from "axios";

const CallClickForm = ({ onClose, business }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
  });

  const [otp, setOtp] = useState("");
  const [count, setCount] = useState(60);

  const [showNumber, setShowNumber] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [callLead, setCallLead] = useState(null);

  const handleUserDetails = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetPhoneNumber = async (e) => {
    e.preventDefault();
    try {
      const callLeadToSend = {
        ...userDetails,
        business: business._id,
      };
      const res = await axios.post(
        `${API_URL}/api/call-lead/create`,
        callLeadToSend,
      );
      setCallLead(res.data);

      setUserDetails({
        name: "",
        phone: "",
      });

      setShowNumber(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${API_URL}/api/call-lead/verify-otp`, {
        _id: callLead._id,
        otp: otp,
        phone: callLead.phone,
      });
      setIsOtpVerified(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let timer;
    if (count > 0) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [count]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div>
      <div className="z-[40] fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-sm">
        {!showNumber ? (
          <div className="bg-white p-6 rounded-xl w-[90%] md:w-[40%] md:px-10 md:py-10">
            <div className="flex justify-between items-start">
              <div className="">
                <h2 className="text-lg md:text-xl font-bold">
                  Get Phone Number of{" "}
                  <span className="text-blue-500">
                    {business.name.split(" ").slice(0, 2).join(" ")}
                    {business.name?.length > 2 ? "" : "..."}
                  </span>
                </h2>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  To get phone number either{" "}
                  <Link to="/login" className="text-blue-500 underline">
                    Login
                  </Link>{" "}
                  or give your details
                </p>
              </div>
              <FiX className="w-6 h-6  cursor-pointer" onClick={onClose} />
            </div>

            <form className="flex flex-col gap-4 mt-4 md:mt-6">
              <div className="flex flex-col gap-1">
                <label className="text-gray-700" htmlFor="name">
                  Name
                </label>
                <input
                  className="rounded-md input border text-sm md:text-base border-gray-300 w-full py-3 md:px-4 px-3 text-gray-600 leading-tight focus:outline-none focus:border-blue-500"
                  onChange={(e) => handleUserDetails(e)}
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={userDetails.name}
                  name="name"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className=" text-gray-700" htmlFor="phone">
                  Phone
                </label>
                <input
                  className="rounded-md input border text-sm md:text-base border-gray-300 w-full py-3 md:px-4 px-3 text-gray-600 leading-tight focus:outline-none focus:border-blue-500"
                  onChange={(e) => handleUserDetails(e)}
                  id="phone"
                  type="number"
                  value={userDetails.phone}
                  placeholder="Enter your phone number"
                  name="phone"
                />
              </div>

              <div className="flex items-center justify-center w-full">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded focus:outline-none text-sm md:text-base focus:shadow-outline w-full"
                  type="submit"
                  onClick={handleGetPhoneNumber}
                >
                  Get Phone Number
                </button>
              </div>
            </form>
          </div>
        ) : !isOtpVerified ? (
          <div className=" flex justify-start bg-white rounded-xl items-center w-[90%] md:w-[40%] py-8 md:py-10 px-8 md:px-10">
            <div className="bg-white rounded w-full">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-semibold">Enter OTP</h2>
                <FiX className="w-6 h-6 cursor-pointer" onClick={onClose} />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Please enter the 4-digit OTP sent to your phone number.
              </p>
              <div className="flex justify-between">
                <input
                  type="text"
                  maxLength={4}
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  name="otp"
                  placeholder="****"
                  className="py-3 px-4 w-full border border-gray-300 text-center tracking-[0.8rem] text-xl mb-4 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                onClick={handleOTPSubmit}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>

              {/* <p className="text-sm text-gray-600 mt-4">
                Didn't receive the OTP?{' '}
                <span className="text-blue-500">Resend OTP</span> in {count}{' '}
                seconds
              </p> */}
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl w-[90%] md:w-[40%] px-6 py-6 md:px-10 md:py-10">
            <div className="flex justify-between items-start">
              <div>
                <h2 className=" md:text-xl font-bold">
                  <span className="text-blue-500 mr-1">{business.name} </span>{" "}
                  Phone Number
                </h2>
                <p className=" text-gray-900 mt-1 text-lg font-medium">
                  {business.phone}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Call this number to get more details about this business
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  You can also visit this business by clicking on the{" "}
                  <Link
                    target="_blank"
                    to={`/business/${business.name.split(" ").join("-")}`}
                    className="text-blue-500 underline cursor-pointer"
                  >
                    View
                  </Link>
                </p>
              </div>
              <FiX className="w-6 h-6  cursor-pointer" onClick={onClose} />
            </div>

            <div className="flex items-center justify-center gap-6 w-full mt-4 md:mt-6 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-3 md:py-3 md:px-4 rounded focus:outline-none focus:shadow-outline">
              <button
                className=""
                onClick={() => {
                  window.location.href = `tel:${business.phone}`;
                }}
              >
                Call Now {business.phone}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallClickForm;
