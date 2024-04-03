import { useState } from "react";
import { BiDetail } from "react-icons/bi";
import { FiChevronDown, FiEdit2, FiX, FiXCircle } from "react-icons/fi";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const BasicDetails = ({
  businessDetails,
  handleBusinessDetailsChange,
  setBusinessDetails,
}) => {
  const [basicBusinessDetailsUpdate, setBasicBusinessDetailsUpdate] =
    useState(true);

  const convertISODateToInputFormat = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // handle phone number
  const handlePhoneChange = (value) => {
    setBusinessDetails((prev) => ({
      ...prev,
      phone: value,
    }));
  };

  const [service, setService] = useState("");

  const handleServicesChange = (e) => {
    setService(e.target.value);
  };

  const addService = () => {
    if (service === "") return;
    setBusinessDetails({
      ...businessDetails,
      services: [...businessDetails.services, service],
    });
    setService("");
  };

  const removeService = (index) => {
    const updatedServices = businessDetails.services.filter(
      (_, i) => i !== index,
    );
    setBusinessDetails({
      ...businessDetails,
      services: updatedServices,
    });
  };
  return (
    <div className="mt-6 mb-6">
      <div className="flex justify-start gap-8 items-center">
        <div className="flex items-center gap-2">
          <BiDetail className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Basic business details</h2>
        </div>
        {basicBusinessDetailsUpdate ? (
          <FiEdit2
            className="cursor-pointer w-5 h-5"
            onClick={() => setBasicBusinessDetailsUpdate(false)}
          />
        ) : (
          <FiX
            className="cursor-pointer w-5 h-5 text-red-500"
            onClick={() => setBasicBusinessDetailsUpdate(true)}
          />
        )}
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex w-full gap-3">
          {/* BUSINESS NAME */}
          <div className="flex flex-col w-full">
            <label htmlFor="">Business Name</label>
            <input
              type="text"
              name="name"
              value={businessDetails.name}
              onChange={handleBusinessDetailsChange}
              className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              disabled={basicBusinessDetailsUpdate}
            />
          </div>

          {/* BUSINESS TYPE */}
          <div className="flex flex-col w-full">
            <label htmlFor="">Business Type</label>

            <div className="flex items-center justify-center mt-2 h-full">
              <div className="relative w-full">
                <select
                  name="type"
                  value={businessDetails.type}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 h-full border  border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 bg-white focus:border-indigo-500 focus:z-10 sm:text-sm"
                  onChange={handleBusinessDetailsChange}
                  disabled={basicBusinessDetailsUpdate}
                >
                  <option value="" disabled className="">
                    -
                  </option>
                  <option value="service">Service</option>
                  <option value="manufacturing">Manufacturing</option>
                </select>

                <div>
                  <FiChevronDown className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm text-gray-500 w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full gap-3">
          {/* PHONE NUMBER */}
          <div className="flex flex-col w-full">
            <label htmlFor="phone">Phone Number</label>
            <PhoneInput
              international
              defaultCountry="in"
              value={businessDetails.phone}
              onChange={handlePhoneChange}
              className="mt-2 appearance-none rounded-md w-full px-3 py-2 border  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              style={{
                width: "100%",
                height: "39px",
                padding: "0px",
                border: "none",
              }}
              inputStyle={{
                width: "100%",
                height: "100%",
              }}
              countrySelectorStyleProps={{
                width: "100%",
                height: "100%",
              }}
              dialCodePreviewStyleProps={{
                width: "100%",
                height: "100%",
              }}
              disabled={basicBusinessDetailsUpdate}
            />
          </div>

          {/* BUSINESS EMAIL */}
          <div className="flex flex-col w-full">
            <label htmlFor="">Mail Id</label>
            <input
              type="email"
              name="email"
              value={businessDetails.email}
              onChange={handleBusinessDetailsChange}
              className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              disabled={basicBusinessDetailsUpdate}
            />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <label>About your business</label>
          <textarea
            name="description"
            value={businessDetails.description}
            id=""
            cols="30"
            rows="4"
            className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            onChange={handleBusinessDetailsChange}
            disabled={basicBusinessDetailsUpdate}
          ></textarea>
        </div>

        <div className="flex gap-4">
          <div className="flex-[3] w-full">
            <label>Founded In</label>
            <div className="flex items-center gap-4 mt-2">
              <input
                type="date"
                name="foundedIn"
                value={convertISODateToInputFormat(businessDetails.foundedIn)}
                id=""
                placeholder="When was your business found"
                className=" flex-[8] rounded-md input border text-base border-gray-300 w-full py-3 px-4 text-gray-600 leading-tight focus:outline-none"
                onChange={handleBusinessDetailsChange}
                disabled={basicBusinessDetailsUpdate}
              />
            </div>
          </div>
          <div className="flex-[9] flex flex-col w-full">
            <label>What services you offer</label>
            {!basicBusinessDetailsUpdate && (
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  name="service"
                  value={service}
                  id=""
                  className="flex-[8] appearance-none rounded-md relative block w-full px-3 py-2 border  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  onChange={handleServicesChange}
                  disabled={basicBusinessDetailsUpdate}
                />
                <button
                  className="rounded-md bg-blue-500 text-white px-8 py-2 flex-[4]"
                  onClick={addService}
                >
                  Add
                </button>
              </div>
            )}

            <div className=" flex flex-wrap gap-4 w-full">
              {businessDetails.services.map((service, index) => (
                <div
                  key={index}
                  className="relative flex items-center gap-4 mt-2"
                >
                  <span className="px-4 py-2 border rounded-lg">{service}</span>
                  {!basicBusinessDetailsUpdate && (
                    <FiXCircle
                      className="bg-red-100 rounded-full text-red-500 absolute cursor-pointer -top-2 -right-2 w-5 h-5"
                      onClick={() => removeService(index)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
