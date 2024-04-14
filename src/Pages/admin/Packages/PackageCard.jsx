import { FiEdit3 } from "react-icons/fi";
import { TiTick, TiTimes } from "react-icons/ti";

const PackageCard = ({ pkg, benefitsData, editCallback }) => {
  return (
    <div className="bg-white relative border border-zinc-900/10 rounded-xl p-5 py-5 flex justify-between items-center">
      <div className="justify-start flex-col flex gap-2 items-start">
        <div className="flex flex-col">
          {/* name */}
          <h2 className="text-md font-medium">{pkg.name}</h2>

          <h3 className="text-sm text-zinc-900">{pkg.desc}</h3>

          {/* current price*/}
          <div
            className={`text-normal mt-4 flex items-center gap-0 font-semibold`}
          >
            ₹<span>{pkg.price}</span>
          </div>

          {/* previous price */}
          <div
            className={`line-through text-gray-400 text-sm flex items-center gap-0`}
          >
            ₹<span>{pkg.prevPrice}</span>
          </div>

          {/* benefits */}
          <div className="pt-2">
            {benefitsData.map((benefit, index) => {
              return (
                <div
                  key={benefit._id}
                  className="flex items-center justify-center "
                >
                  {pkg.features[index + 1] ? (
                    <TiTick className="text-green-600 text-2xl" />
                  ) : (
                    <TiTimes className="text-red-600 text-2xl" />
                  )}
                  <p className="text-sm">{benefit.name}</p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-start gap-2 mt-3">
            <FiEdit3
              className="w-5 h-5 text-gray-500 cursor-pointer"
              onClick={editCallback}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
