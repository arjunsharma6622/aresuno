import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { removeDuplicationsArray } from "../../../utils/util";

const DetailedComparison = ({ packagesData }) => {
  const features = removeDuplicationsArray(
    [].concat.apply([], [...packagesData.map((pkg) => pkg.features)]),
  );

  return (
    <div className="flex w-[100vw] lg:w-min ml-4">
      {/* features side */}
      <div className="bg-white min-w-36 lg:min-w-52">
        <div className="py-[.38rem]">
          <p className="font-bold uppercase pl-3 text-base lg:text-lg">
            Features
          </p>
        </div>

        {features.map((feature) => (
          <div
            key={feature}
            className="py-[.86rem] lg:py-5 pl-3 rounded-sm lg:rounded-l-2xl odd:bg-primary-salmon-500"
          >
            <p className="text-xs tracking-wide lg:text-sm">{feature}</p>
          </div>
        ))}
      </div>

      {/* packages */}
      <div className="flex overflow-auto bg-neutral-50">
        {/* mapping through packages */}
        {packagesData.map((pkg) => {
          return (
            <div key={pkg._id} className="min-w-32 md:min-w-36 lg:min-w-56">
              {/* package name */}
              <div className="flex items-center py-2 lg:py-[.4rem] justify-center">
                <p className="font-bold uppercase text-sm lg:text-lg">
                  {pkg.name}
                </p>
              </div>

              {/* mapping through features */}
              {features.map((feature) => {
                return (
                  <div
                    key={feature}
                    className="flex items-center py-[.925rem] lg:py-[1.31rem] odd:bg-neutral-100 justify-center"
                  >
                    {/* state of the feature */}
                    <p className="font-normal text-sm lg:text-lg">
                      {pkg.features.includes(feature) ? (
                        <FaCheckCircle className="text-primary-allowing-green" />
                      ) : (
                        <FaTimesCircle className="text-primary-warning-red" />
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DetailedComparison;
