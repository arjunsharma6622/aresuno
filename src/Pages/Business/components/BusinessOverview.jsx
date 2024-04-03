import { FiArrowRight, FiFileText } from "react-icons/fi";

const Overview = ({ business }) => {
  return (
    <div
      id="overview"
      className="w-full border-b border-t md:border-none py-4 md:pt-0 md:pb-10 border-b-gray-300 border-t-gray-300"
    >
      <div className="w-full">
        <div className="flex items-center justify-start gap-3 md:gap-4">
          <FiFileText className="text-black w-5 h-5 md:w-6 md:h-6" />
          <h2 className="text-lg md:text-2xl font-bold text-black">Overview</h2>
        </div>
        <p className="mt-2 text-gray-700 text-sm md:text-base">
          <span>{business.description}</span>
        </p>

        <div className="flex justify-start items-center">
          <div className="flex flex-col justify-start w-full items-start">
            <div>
              <p className="text-base font-medium mb-1 mt-2">We offer</p>
              {business.services?.map((service, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <FiArrowRight className="text-gray-800 w-4 h-4 md:w-5 md:h-5" />
                  <p className="text-gray-800 md:text-base text-sm">
                    {service}
                  </p>
                </div>
              ))}
            </div>

            <div className="w-full">
              <p className="text-base font-medium mb-1 mt-2">We accept</p>

              <div className="grid grid-cols-4 gap-2 w-full md:flex md:flex-wrap md:items-center md:justify-start md:gap-5">
                {business.modeOfPayment?.map(({ name, icon }) => (
                  <div
                    key={name}
                    className="flex items-center mb-2 bg-gray-100 rounded-lg justify-center px-2 md:px-3 py-2"
                  >
                    <span className="text-gray-800 text-xs md:text-sm">
                      <img
                        src={icon}
                        alt={name}
                        className="w-[55px] md:w-[70px] aspect-[2/1] object-cover"
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
