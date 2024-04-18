import { FiEdit3 } from "react-icons/fi";
import { TiTick } from "react-icons/ti";

const PackageCard = ({ pkg, editCallback }) => {
  return (
    <div className="relative justify-between items-center">
      <div className="bg-white p-5 border border-zinc-900/10 justify-start flex-col rounded-xl flex gap-2 items-start">
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
          <div className="pt-2 flex flex-col items-start justify-start">
            {pkg.features.map((benefit, index) => {
              return (
                <div
                  key={benefit + index}
                  className="flex items-center justify-center "
                >
                  <TiTick className="text-green-600 text-2xl" />
                  <p className="text-sm">{benefit}</p>
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
