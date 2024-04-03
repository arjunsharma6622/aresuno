import { FiClock } from "react-icons/fi";

const BusinessTimings = ({ business }) => {
  return (
    <div
      id="timings"
      className="border-b pb-4 md:pb-10 w-full border-b-gray-300"
    >
      <div className="flex items-center gap-3 md:gap-4">
        <FiClock className="text-black w-5 h-5 md:w-6 md:h-6" />
        <h2 className="text-lg md:text-2xl font-bold text-black">
          Business Timings
        </h2>
      </div>

      <div className="flex items-center flex-wrap text-center gap-4 justify-start mt-4 text-sm md:text-base">
        {business.timing?.map((time) =>
          time.isOpen && time.from && time.to ? (
            <div
              key={time._id}
              className="flex w-fit items-center gap-2 bg-green-400 rounded-full px-4 py-1"
            >
              <span className="font-medium w-full">{time.day.slice(0, 3)}</span>
              <div className="text-xs flex items-center gap-2">
                <span>{time.from}</span>-<span>{time.to}</span>
              </div>
            </div>
          ) : (
            <div
              key={time._id}
              className="flex items-center gap-2 w-fit bg-gray-300 rounded-full px-4 py-1"
            >
              <span className="font-medium">{time.day.slice(0, 3)}</span>
              <span className="text-gray-500 text-xs">Closed</span>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default BusinessTimings;
