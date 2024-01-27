import React, { useEffect, useState } from 'react';
import { API_URL } from '../utils/util';
import axios from 'axios';
import { toast } from 'react-toastify';

const OtpForm = ({phone, setIsOtpVerified}) => {
  const [otp, setOtp] = useState("");


  const verifyOtp = async () => {
    try{
        const formattedOtp = otp.join('');
        const response = await axios.post(`${API_URL}/api/forgetPassword-verify-otp`, {phone, otp : otp})
        if(response.data.success){
            setOtp("");
        }

        setIsOtpVerified(true)

        console.log(response.data)

    }
    catch(err){
        console.log(err)
        toast.error(err.response.data.message);
    }
  };


  const [resendTimer, setResendTimer] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);





  return (
    <div className=" w-full flex justify-start items-center">
      <div className="bg-white rounded">
        <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>
        <p className="text-sm text-gray-600 mb-4">
          Please enter the 4-digit OTP sent to your phone number.
        </p>
        <div className="flex justify-between">
          <input type="text" onChange={(e) => setOtp(e.target.value)} className='w-full py-3 text-center border border-gray-300 rounded focus:outline-none focus:border-blue-500'/>
        </div>

        <button onClick={verifyOtp} className='w-fit bg-blue-500 mx-auto hover:bg-blue-700 text-white font-bold py-2 px-6 rounded'>Verify</button>

        <p className="text-sm text-gray-600 mb-4">
          Didn't receive the OTP? <a href="#" className="text-blue-500">Resend</a>  <span>{resendTimer}</span>

        </p>
      </div>
    </div>
  );
};

export default OtpForm;
