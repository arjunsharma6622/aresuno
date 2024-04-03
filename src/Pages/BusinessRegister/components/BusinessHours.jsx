import { FiChevronDown, FiClock } from "react-icons/fi";

const BusinessHours = ({ businessDetails, setBusinessDetails }) => {
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

  // Function to handle "Open on all days" checkbox change
  const handleOpenAllDaysChange = (isChecked) => {
    const updatedBusinessHours = businessDetails.timing.map((day) => ({
      ...day,
      isOpen: isChecked,
      from: isChecked ? "09:00" : "",
      to: isChecked ? "18:00" : "",
    }));

    setBusinessDetails((prev) => ({
      ...prev,
      timing: updatedBusinessHours,
    }));
  };

  return (
    <div className="md:mt-6 md:mb-6">
      <div className="flex items-center gap-2">
        <FiClock className="w-5 h-5 md:w-6 md:h-6" />
        <h2 className="text-lg md:text-xl font-semibold">Business Hours</h2>
      </div>

      <div className="mt-6">
        <div className="flex flex-col gap-4">
          {/* Checkbox for "Open on all days" */}
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="openAllDays"
              name="openAllDays"
              className="form-checkbox accent-green-600 h-5 w-5 text-blue-500"
              onChange={(e) => handleOpenAllDaysChange(e.target.checked)}
            />
            <label
              htmlFor="openAllDays"
              className="block text-base text-gray-700"
            >
              Open on all days
            </label>
          </div>

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
