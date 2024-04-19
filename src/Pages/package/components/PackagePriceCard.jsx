import { useIsMobile } from "../../../utils/util";
import { Link } from "react-router-dom";

const PackagePriceCard = ({ singlePackage, isTopPopular }) => {
  const isMobile = useIsMobile(1024);

  return (
    <>
      {/* For mobile views  */}
      {isMobile && (
        <div className="relative w-full lg:min-h-96">
          {isTopPopular && (
            <div className="absolute -top-4 right-4 bg-white rounded-3xl px-4 py-3">
              <p className="text-xs">Most Popular!</p>
            </div>
          )}

          <div
            className={`shadow-2xl shadow-zinc-600/90 rounded-2xl p-4 lg:h-[100%] ${isTopPopular ? "bg-primary-light-blue-500 pt-6" : "bg-white"}`}
          >
            {/* Upper half */}
            <div className="flex w-full ">
              {/* left half */}
              <div className="w-full">
                {/* name */}
                <div>
                  <p
                    className={`font-bold text-xl uppercase ${isTopPopular ? "text-white" : "text-black"}`}
                  >
                    {singlePackage.name}
                  </p>
                </div>

                {/* benefits */}
                <div className="mt-3">
                  {singlePackage.features.map((benefit) => {
                    return (
                      <div className="py-1" key={benefit}>
                        <p
                          className={`text-sm ${isTopPopular ? "text-white" : "text-black"}`}
                        >
                          {benefit}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* right half */}
              <div className="flex flex-col items-end w-min">
                {/* prev price */}
                <div className="pt-3">
                  <p
                    className={`line-through text-xs ${isTopPopular ? "text-primary-neutral-light" : "text-primary-neutral"}`}
                  >
                    ₹{singlePackage.prevPrice}
                  </p>
                </div>

                {/* price */}
                <div>
                  <p
                    className={`font-semibold text-xl ${isTopPopular ? "text-white" : "text-black"}`}
                  >
                    ₹{singlePackage.price}
                  </p>
                </div>

                {/* per year */}
                <div>
                  <p
                    className={`text-sm text-nowrap ${isTopPopular ? "text-white" : "text-black"}`}
                  >
                    per year
                  </p>
                </div>
              </div>
            </div>

            {/* lower half */}
            <Link
              to={"/signup"}
              className="w-full flex flex-col items-center justify-center mt-6"
            >
              <button
                className={`w-full font-semibold py-2 rounded-lg ${!isTopPopular ? "bg-primary-light-blue-500 text-white" : "bg-white text-primary-light-blue-500"}`}
              >
                Get started
              </button>
            </Link>
          </div>
        </div>
      )}

      {/*  */}
      {/* For Desktop views */}
      {/*  */}

      {!isMobile && (
        <div className="h-[100%] flex-grow basis-0">
          <div
            className={`text-center flex flex-col gap-7 shadow-neutral-600/40 shadow-xl h-[100%] rounded-xl p-4 py-8 ${isTopPopular ? "bg-primary-light-blue-500" : "bg-white"}`}
          >
            {/* package name */}
            <div className="w-full">
              <p
                className={`font-bold text-2xl uppercase ${isTopPopular ? "text-white" : "text-black"}`}
              >
                {singlePackage.name}
              </p>
            </div>

            {/* most popular */}
            {isTopPopular && (
              <div className="w-full flex items-center justify-center">
                <div className="w-fit bg-white rounded-3xl px-4 py-3">
                  <p className="text-xs">Most Popular!</p>
                </div>
              </div>
            )}

            {/* price part */}
            <div>
              {/* prev */}
              <div>
                <p
                  className={`line-through text-sm ${isTopPopular ? "text-primary-neutral-light" : "text-primary-neutral"}`}
                >
                  ₹{singlePackage.prevPrice}
                </p>
              </div>

              {/* price */}
              <div>
                <p
                  className={`font-semibold text-3xl ${isTopPopular ? "text-white" : "text-black"}`}
                >
                  ₹{singlePackage.price}
                </p>
              </div>

              <div>
                <p
                  className={`text-lg text-nowrap ${isTopPopular ? "text-white" : "text-black"}`}
                >
                  per year
                </p>
              </div>
            </div>

            {/* benefits */}
            {singlePackage.features.length > 0 && (
              <div>
                {singlePackage.features.map((benefit) => {
                  return (
                    <div className="py-1" key={benefit}>
                      <p
                        className={`text-sm ${isTopPopular ? "text-white" : "text-black"}`}
                      >
                        {benefit}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* button */}
            <Link
              to={"/signup"}
              className="w-full h-full flex flex-col items-center justify-end mt-6"
            >
              <button
                className={`w-full font-semibold py-2 rounded-lg ${!isTopPopular ? "bg-primary-light-blue-500 text-white" : "bg-white text-primary-light-blue-500"}`}
              >
                Get started
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default PackagePriceCard;
