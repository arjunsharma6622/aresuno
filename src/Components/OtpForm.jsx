import React, { useState } from 'react';
import { API_URL } from '../utils/util';
import axios from 'axios';

const OtpForm = ({phone, setIsOtpVerified}) => {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    // Move to the next input box if the current one is filled
    if (value !== '' && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    setOtp(newOtp);
  };

  const verifyOtp = async () => {
    try{
        const formattedOtp = otp.join('');
        const response = await axios.post(`${API_URL}/api/forgetPassword-verify-otp`, {phone, otp : formattedOtp})
        if(response.data.success){
            setOtp(['', '', '', '']);
        }

        setIsOtpVerified(true)

        console.log(response.data)

    }
    catch(err){
        console.log(err)
    }
  };

  return (
    <div className=" w-full flex justify-center items-center">
      <div className="bg-white rounded">
        <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>
        <div className="flex justify-between">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className="w-16 h-16 border border-gray-300 text-center text-xl mb-4 rounded focus:outline-none focus:border-blue-500"
            />
          ))}
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Please enter the 4-digit OTP sent to your phone number.
        </p>
        <button onClick={verifyOtp} className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
      </div>
    </div>
  );
};

export default OtpForm;
