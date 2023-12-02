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
    <div className="mt-6 mb-6">
    <div className="flex items-center gap-2">
      <MdPayment className="w-6 h-6" />
      <h2 className="text-xl font-semibold">Mode of Payment</h2>
    </div>

    <div className="flex flex-wrap gap-4 mt-6">
      {paymentModes.map((mode, index) => (
        <span
          className={`px-4 py-2 border rounded-lg cursor-pointer  ${
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