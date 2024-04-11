import React from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { HiCheck, HiX } from "react-icons/hi";
import { FiMail, FiPhoneCall } from "react-icons/fi";
import {
  DoctorFeatures,
  DoctorPackages,
  ManufacturerFeatures,
  ManufacturerPackages,
  ServiceFeatures,
  ServicePackages,
} from "../../../data";
import SelectCategory from "./SelectCategory";

const Pricing = () => {
  const [selectedCategory, setSelectedCategory] = React.useState({
    name: "Service",
    icon: "service.png",
  });

  const getFeatures = (categoryName) => {
    switch (categoryName) {
      case "Service":
        return ServiceFeatures;
      case "Doctor":
        return DoctorFeatures;
      case "Manufacturer":
        return ManufacturerFeatures;
      default:
        return [];
    }
  };

  const getPackage = (categoryName) => {
    switch (categoryName) {
      case "Service":
        return ServicePackages;
      case "Doctor":
        return DoctorPackages;
      case "Manufacturer":
        return ManufacturerPackages;
      default:
        return [];
    }
  };

  const getFeatureIcon = (hasFeature) => {
    return hasFeature ? (
      <HiCheck className="text-green-500" />
    ) : (
      <HiX className="text-red-500" />
    );
  };

  const calacPercentage = (prevPrice, price) => {
    const percent =
      ((parseInt(prevPrice) - parseInt(price)) / parseInt(prevPrice)) * 100;
    return Math.round(percent);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold">
          Choose the Perfect Package for Your Business
        </h2>
      </div>

      <SelectCategory
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="">
        <div className="w-full">
          <table className="w-full table-fixed ">
            <thead className="w-full ">
              <tr className="w-full ">
                <th className=" py-4 px-6  border w-full sticky top-0">
                  {selectedCategory && (
                    <div className="flex items-center justify-start gap-4">
                      <img
                        src={`/assets/images/${selectedCategory?.icon}`}
                        alt={selectedCategory?.name}
                        className="w-14 h-14"
                      />
                      <p className="text-lg font-medium">
                        {selectedCategory.name}
                      </p>
                    </div>
                  )}
                </th>
                {getPackage(selectedCategory?.name).map((pkg) => (
                  <th
                    key={pkg.name}
                    className={`h-[120px] w-full sticky top-0  py-4 px-6 border`}
                  >
                    <div className=" flex items-center gap-1 justify-center flex-col">
                      <div className="w-full text-xs font-semibold uppercase">
                        {pkg.name} plan
                      </div>
                      {pkg.price != 0 && (
                        <div className="flex items-center gap-2">
                          <div
                            className={` line-through text-gray-400 text-sm flex items-center gap-0 justify-center font-normal`}
                          >
                            <FaIndianRupeeSign className="w-4 h-4" />
                            <span>{pkg.prevPrice}</span>
                          </div>
                          <span className="font-medium text-xs text-white bg-green-500 px-2 py-[2px] rounded-full">
                            {calacPercentage(pkg.prevPrice, pkg.price)}% off
                          </span>
                        </div>
                      )}

                      <div
                        className={`text-3xl flex items-center gap-0 justify-center font-semibold`}
                      >
                        <FaIndianRupeeSign className="w-5 h-5" />
                        <span>
                          {pkg.price}
                          {pkg.price != 0 && (
                            <span className="text-xs font-bold">/yr</span>
                          )}
                        </span>
                      </div>

                      {pkg.price == 0 && (
                        <div className="text-sm font-normal">Free Forever</div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {getFeatures(selectedCategory?.name).map((feature, index) => (
                <tr key={feature} className={`border`}>
                  <td className="py-4 px-6 text-start">{feature}</td>
                  {getPackage(selectedCategory?.name).map((pkg) => (
                    <td
                      key={pkg.name}
                      className={`py-4 px-6 w-full text-center border `}
                    >
                      <div className="flex items-center text-2xl w-full justify-center">
                        {getFeatureIcon(pkg.features[index])}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
              <td className="py-4 px-6 text-start border italic">
                Avail the offer here
              </td>
              <td className="py-4 px-6 text-center border">
                <button className="px-4 w-full py-2 bg-blue-500 rounded-lg text-white">
                  Sign Up
                </button>
              </td>
              <td className="py-4 px-6 text-center border">
                <button className="px-4 w-full py-2 bg-blue-500 rounded-lg text-white">
                  Buy Now
                </button>
              </td>
              <td className="py-4 px-6 text-center border">
                <button className="px-4 w-full py-2 bg-blue-500 rounded-lg text-white">
                  Buy Now
                </button>
              </td>
              <td className="py-4 px-6 text-center border">
                <button className="px-4 w-full py-2 bg-blue-500 rounded-lg text-white">
                  Buy Now
                </button>
              </td>
            </tbody>
          </table>
        </div>
      </div>

      <div className="max-w-4xl mx-auto border p-5 px-8 rounded-2xl mb-20 mt-10">
        <div className="w-full flex flex-col gap-4 justify-start">
          <div>
            <div>
              <img
                src="/assets/images/customer-care.png"
                alt=""
                className="w-28"
              />
            </div>
            <h1 className="text-2xl font-medium">Need Help Deciding?</h1>
          </div>
          <p className="text-sm">
            We understand that choosing the right plan can be challenging. Our
            team of experts is here to help you with any queries or concerns you
            may have. Our dedicated support team is available from Monday to
            Friday, 9 AM to 6 PM EST. You can reach out to us via phone or
            email, and we&apos;ll be more than happy to assist you.
          </p>
          <div className="flex items-center justify-start gap-4">
            <a
              href="tel:1800 123 4567"
              className="text-blue-500 px-2 py-1 rounded-full  border border-blue-500 flex items-center gap-1"
            >
              <FiPhoneCall /> <p className="text-sm">Call us</p>
            </a>
            <a
              href="mailto:info@aresuno.com"
              className="text-white px-2 py-1 rounded-full bg-blue-500 flex items-center gap-1"
            >
              <FiMail /> <p className="text-sm">Email us</p>
            </a>
          </div>
          <p className="text-sm">
            Our team of experts has years of experience in the industry and is
            committed to providing you with the best possible solutions tailored
            to your needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
