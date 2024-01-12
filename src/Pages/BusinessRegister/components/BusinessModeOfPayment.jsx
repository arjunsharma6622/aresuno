import React from 'react'
import { FiCheck, FiCheckCircle } from 'react-icons/fi';
import { MdPayment } from 'react-icons/md';

const BusinessModeOfPayment = ({businessDetails, setBusinessDetails}) => {

  

    const paymentModes = [
        {
        name : "Cash",
        icon : "https://cdn-icons-png.flaticon.com/512/3566/3566403.png"
        },
        {
        name : "Card",
        icon : "https://cdn-icons-png.flaticon.com/512/6963/6963703.png"
        },
        {
        name : "Visa",
        icon : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
        },
        {
        name : "Rupay",
        icon : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Rupay-Logo.png/1200px-Rupay-Logo.png"
        },
        {
        name : "Mastercard",
        icon : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/2560px-Mastercard-logo.svg.png"
        },
        {
        name : "UPI",
        icon : "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1024px-UPI-Logo-vector.svg.png"
        },
        {
        name : "Google Pay",
        icon : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1200px-Google_Pay_Logo.svg.png"
        },
        {
          name : "PhonePe",
          icon : "https://seeklogo.com/images/P/phonepe-logo-B9E7D6F75F-seeklogo.com.png"
        },
        {
          name : "Patym",
          icon : "https://cdn.iconscout.com/icon/free/png-256/free-paytm-226448.png"
        },
        {
          name : "Apple Pay",
          icon : "https://cdn.iconscout.com/icon/free/png-256/free-applepay-226446.png"
        },
        {
          name : "Razorpay",
          icon : "https://cdn.iconscout.com/icon/free/png-256/free-razorpay-1649771-1399875.png"
        },
        {
          name : "American Express",
          icon : "https://cdn.iconscout.com/icon/free/png-256/free-american-express-7-711815.png"
        },
      ];

      const handleModeOfPaymentClick = (option, icon) => {
        const isOptionIncluded = businessDetails.modeOfPayment.some(
          (item) => item.name === option
        );
    
        if (isOptionIncluded) {
          setBusinessDetails((prev) => ({
            ...prev,
            modeOfPayment: prev.modeOfPayment.filter(
              (item) => item.name !== option
            ),
          }));
        } else {
          setBusinessDetails((prev) => ({
            ...prev,
            modeOfPayment: [...prev.modeOfPayment, { name: option, icon: icon }],
          }));
        }
      };


      return (
        <div className="md:mt-6 md:mb-6">
          <div className="flex items-center gap-2">
            <MdPayment className="w-5 h-5 md:w-6 md:h-6" />
            <h2 className="text-lg md:text-xl font-semibold">Mode of Payment</h2>
          </div>
    
          <div className="flex flex-wrap gap-12 mt-6">
            {paymentModes.map(({ name, icon }, index) => (
              <span
                className={`relative flex flex-col items-start border-[1.5px] rounded-lg md:px-3 px-2 py-1 md:py-2  text-sm md:text-base cursor-pointer  ${
                  businessDetails.modeOfPayment.some(
                    (item) => item.name === name
                  )
                    ? 'border-blue-500 text-blue-600'
                    : 'border-gray-300'
                }`}
                onClick={() => {
                  handleModeOfPaymentClick(name, icon);
                }}
                key={index}
              >
                <div>
                  <img
                    src={icon}
                    alt={name}
                    className="w-20 h-20 inline-block object-contain"
                  />
                </div>
                <div className={`bg-white rounded-full absolute -right-2 -top-2 ${
                      businessDetails.modeOfPayment.some(
                        (item) => item.name === name
                      )
                        ? 'block'
                        : 'hidden'
                    }`}>
                  <FiCheckCircle
                    className={`w-5 h-5 md:w-6 md:h-6 `}
                  />
                </div>
              </span>
            ))}
          </div>
        </div>
      );
    };

export default BusinessModeOfPayment