import React from 'react'
import { MdPayment } from 'react-icons/md';

const BusinessModeOfPayment = ({businessDetails, setBusinessDetails}) => {

    const paymentModes = [
        "UPI",
        "Cash",
        "Credit Card",
        "Debit Card",
        "Net Banking",
        "EMI",
        "Wallet",
        "American Express",
        "Master Card",
        "Visa",
        "Other",
        "Paytm",
        "PhonePe",
        "Google Pay",
        "Apple Pay",
        "Paytm Wallet",
        "Amazon Pay",
        "Razorpay",
      ];

    const handlModeOfPaymentClick = (option) => {
        if (businessDetails.modeOfPayment.includes(option)) {
          setBusinessDetails((prev) => ({
            ...prev,
            modeOfPayment: prev.modeOfPayment.filter((item) => item !== option),
          }));
        } else {
          setBusinessDetails((prev) => ({
            ...prev,
            modeOfPayment: [...prev.modeOfPayment, option],
          }));
        }
      };
  return (
    <div className="md:mt-6 md:mb-6">
    <div className="flex items-center gap-2">
      <MdPayment className="w-5 h-5 md:w-6 md:h-6" />
      <h2 className="text-lg md:text-xl font-semibold">Mode of Payment</h2>
    </div>

    <div className="flex flex-wrap gap-4 mt-6">
      {paymentModes.map((mode, index) => (
        <span
          className={`md:px-4 px-3 py-1 md:py-2 border rounded-lg text-sm md:text-base cursor-pointer  ${
            businessDetails.modeOfPayment.includes(mode)
              ? "border-blue-500 text-blue-600"
              : "border-gray-300"
          }`}
          onClick={() => {
            handlModeOfPaymentClick(mode);
          }}
          key={index}
        >
          {mode}
        </span>
      ))}
    </div>
  </div>  
  )
}

export default BusinessModeOfPayment