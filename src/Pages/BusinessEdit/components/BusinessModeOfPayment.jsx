import { useState } from "react";
import { FiCheckCircle, FiEdit2, FiX } from "react-icons/fi";
import { MdPayment } from "react-icons/md";

const BusinessModeOfPayment = ({ businessDetails, setBusinessDetails }) => {
  // handle mode of payment
  const paymentModes = [
    {
      name: "Cash",
      icon: "https://res.cloudinary.com/dexnb3wkw/image/upload/v1705817172/aresuno/paymentModes/pwgkaicbn4oiqlmbdu4y.png",
    },
    {
      name: "Card",
      icon: "https://res.cloudinary.com/dexnb3wkw/image/upload/v1705817173/aresuno/paymentModes/dy4nsy9gl6m6bnb2nfmd.png",
    },
    {
      name: "Visa",
      icon: "https://res.cloudinary.com/dexnb3wkw/image/upload/v1705817170/aresuno/paymentModes/xoinunrckkg3rww8k77b.png",
    },
    {
      name: "Rupay",
      icon: "https://res.cloudinary.com/dexnb3wkw/image/upload/v1705817172/aresuno/paymentModes/obi22zyxsbq5xlzlp0ws.png",
    },
    {
      name: "Mastercard",
      icon: "https://res.cloudinary.com/dexnb3wkw/image/upload/v1705817172/aresuno/paymentModes/hhqomnbw4qrwdwhob5mp.png",
    },
    {
      name: "UPI",
      icon: "https://res.cloudinary.com/dexnb3wkw/image/upload/v1705817171/aresuno/paymentModes/xkiu9aow2dqy0rr7dtrn.png",
    },
    {
      name: "Google Pay",
      icon: "https://res.cloudinary.com/dexnb3wkw/image/upload/v1705817170/aresuno/paymentModes/fvpdyuhabbvdkqdyu0ob.png",
    },
    {
      name: "PhonePe",
      icon: "https://res.cloudinary.com/dexnb3wkw/image/upload/v1705817170/aresuno/paymentModes/cbazb5dpnijmc488pvbx.png",
    },
    {
      name: "Patym",
      icon: "https://res.cloudinary.com/dexnb3wkw/image/upload/v1705817171/aresuno/paymentModes/rs14sxkqwwnbxshhrbbw.png",
    },
    {
      name: "Apple Pay",
      icon: "https://res.cloudinary.com/dexnb3wkw/image/upload/v1705817171/aresuno/paymentModes/xkiu9aow2dqy0rr7dtrn.png",
    },
    {
      name: "Razorpay",
      icon: "https://res.cloudinary.com/dexnb3wkw/image/upload/v1705817172/aresuno/paymentModes/vlkap6xgiua5svwbjkpm.png",
    },
    {
      name: "American Express",
      icon: "https://res.cloudinary.com/dexnb3wkw/image/upload/v1705817171/aresuno/paymentModes/xr6kdw1itposojv1bsw0.png",
    },
  ];

  const handleModeOfPaymentClick = (option, icon) => {
    const isOptionIncluded = businessDetails.modeOfPayment.some(
      (item) => item.name === option,
    );

    if (isOptionIncluded) {
      setBusinessDetails((prev) => ({
        ...prev,
        modeOfPayment: prev.modeOfPayment.filter(
          (item) => item.name !== option,
        ),
      }));
    } else {
      setBusinessDetails((prev) => ({
        ...prev,
        modeOfPayment: [...prev.modeOfPayment, { name: option, icon: icon }],
      }));
    }
  };

  const [businessModeOfPaymentUpdate, setBusinessModeOfPaymentUpdate] =
    useState(true);
  return (
    <div className="mt-6 mb-6">
      <div className="flex justify-start gap-8 items-center">
        <div className="flex items-center gap-2">
          <MdPayment className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Mode of Payment</h2>
        </div>
        {businessModeOfPaymentUpdate ? (
          <FiEdit2
            className="cursor-pointer w-5 h-5"
            onClick={() => setBusinessModeOfPaymentUpdate(false)}
          />
        ) : (
          <FiX
            className="cursor-pointer w-5 h-5 text-red-500"
            onClick={() => setBusinessModeOfPaymentUpdate(true)}
          />
        )}
      </div>

      <div className={`flex flex-wrap gap-4 mt-6`}>
        {paymentModes.map(({ name, icon }, index) => (
          <span
            className={`relative flex flex-col items-start border-[1.5px] rounded-lg md:px-3 px-2 py-1 md:py-2  text-sm md:text-base  ${
              businessDetails.modeOfPayment.some((item) => item.name === name)
                ? "border-blue-500 text-blue-600"
                : "border-gray-300"
            } ${!businessModeOfPaymentUpdate && "cursor-pointer"}`}
            onClick={() => {
              !businessModeOfPaymentUpdate &&
                handleModeOfPaymentClick(name, icon);
            }}
            key={index}
          >
            <div>
              <img
                src={icon}
                alt={name}
                className="w-24 aspect-[2/1] inline-block object-contain"
              />
            </div>
            <div
              className={`bg-white rounded-full absolute -right-2 -top-2 ${
                businessDetails.modeOfPayment.some((item) => item.name === name)
                  ? "block"
                  : "hidden"
              }`}
            >
              <FiCheckCircle className={`w-5 h-5 md:w-6 md:h-6 `} />
            </div>
          </span>
        ))}
      </div>
    </div>
  );
};

export default BusinessModeOfPayment;
