import { useState } from "react";
import { FiChevronDown, FiClock, FiEdit2, FiX } from "react-icons/fi";

const BusinessHours = ({ businessDetails, setBusinessDetails }) => {
  const [businessTimingsUpdate, setBusinessTimingsUpdate] = useState(true);

  //   handle business timings
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const timeOptions = [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  const handleBusinessHoursChange = (index, isChecked) => {
    const updatedBusinessHours = [...businessDetails.timing];
    updatedBusinessHours[index].isOpen = isChecked;
    if (!isChecked) {
      updatedBusinessHours[index].from = "";
      updatedBusinessHours[index].to = "";
    }
    setBusinessDetails((prev) => ({
      ...prev,
      timing: updatedBusinessHours,
    }));
  };

  const handleBusinessHoursFromChange = (index, value) => {
    const updatedBusinessHours = [...businessDetails.timing];
    updatedBusinessHours[index].from = value;
    setBusinessDetails((prev) => ({
      ...prev,
      timing: updatedBusinessHours,
    }));
  };

  const handleBusinessHoursToChange = (index, value) => {
    const updatedBusinessHours = [...businessDetails.timing];
    updatedBusinessHours[index].to = value;
    setBusinessDetails((prev) => ({
      ...prev,
      timing: updatedBusinessHours,
    }));
  };
  return (
    <div className="mt-6 mb-6">
      <div className="flex justify-start gap-8 items-center">
        <div className="flex items-center gap-2">
          <FiClock className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Business Hours</h2>
        </div>
        {businessTimingsUpdate ? (
          <FiEdit2
            className="cursor-pointer w-5 h-5"
            onClick={() => setBusinessTimingsUpdate(false)}
          />
        ) : (
          <FiX
            className="cursor-pointer w-5 h-5 text-red-500"
            onClick={() => setBusinessTimingsUpdate(true)}
          />
        )}
      </div>

      <div className="mt-6">
        <div className="flex flex-col gap-4">
          {daysOfWeek.map((day, index) => (
            <div className="flex flex-col items-start gap-4" key={day}>
              <div className="flex gap-6 justify-start items-center">
                <input
                  type="checkbox"
                  id={day}
                  name={day}
                  className="form-checkbox accent-green-600 h-5 w-5 text-blue-500"
                  checked={businessDetails.timing[index].isOpen}
                  onChange={(e) =>
                    handleBusinessHoursChange(index, e.target.checked)
                  }
                  disabled={businessTimingsUpdate}
                />
                <label htmlFor={day} className="block text-base text-gray-700">
                  {day}
                </label>
              </div>
              {businessDetails.timing[index].isOpen && (
                <div className="flex gap-4 items-center">
                  <div className="relative">
                    <select
                      className="appearance-none py-2 px-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      value={businessDetails.timing[index].from}
                      onChange={(e) =>
                        handleBusinessHoursFromChange(index, e.target.value)
                      }
                      disabled={businessTimingsUpdate}
                    >
                      <option value="" disabled defaultChecked>
                        -
                      </option>

                      {timeOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>

                    <FiChevronDown className="w-5 h-5 pointer-events-none absolute right-3 transform -translate-y-1/2 top-1/2" />
                  </div>

                  <span className="text-gray-600">to</span>

                  <div className="relative">
                    <select
                      className="appearance-none py-2 px-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      value={businessDetails.timing[index].to}
                      onChange={(e) =>
                        handleBusinessHoursToChange(index, e.target.value)
                      }
                      disabled={businessTimingsUpdate}
                    >
                      <option value="" disabled defaultChecked>
                        -
                      </option>

                      {timeOptions
                        .filter(
                          (time) =>
                            new Date(`01/01/2000 ${time}`) >
                            new Date(
                              `01/01/2000 ${businessDetails.timing[index].from}`,
                            ),
                        )
                        .map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                    </select>

                    <FiChevronDown className="w-5 h-5 pointer-events-none absolute right-3 transform -translate-y-1/2 top-1/2" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessHours;
