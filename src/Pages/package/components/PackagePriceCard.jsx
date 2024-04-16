const PackagePriceCard = ({
  name,
  price,
  prevPrice,
  isTopPopular,
  benefits,
}) => {
  return (
    <div className="relative w-full">
      {isTopPopular && (
        <div className="absolute -top-4 right-4 bg-white rounded-3xl px-4 py-3">
          <p className="text-xs">Most Popular!</p>
        </div>
      )}

      <div
        className={`rounded-2xl p-4 ${isTopPopular ? "bg-primary-light-blue-500 pt-6" : "bg-white"}`}
      >
        {/* Upper half */}
        <div className="flex w-full ">
          {/* left half */}
          <div className="w-full">
            {/* name */}
            <div>
              <p
                className={`font-bold text-2xl uppercase ${isTopPopular ? "text-white" : "text-black"}`}
              >
                {name}
              </p>
            </div>

            {/* benefits */}
            <div className="mt-3">
              {benefits.map((benefit) => {
                return (
                  <div key={benefit}>
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
          <div className="flex flex-col items-end w-full">
            {/* prev price */}
            <div className="pt-3">
              <p
                className={`line-through text-xs ${isTopPopular ? "text-primary-neutral-light" : "text-primary-neutral"}`}
              >
                ₹{prevPrice}
              </p>
            </div>

            {/* price */}
            <div>
              <p
                className={`font-semibold text-2xl ${isTopPopular ? "text-white" : "text-black"}`}
              >
                ₹{price}
              </p>
            </div>

            {/* per year */}
            <div>
              <p
                className={`text-sm ${isTopPopular ? "text-white" : "text-black"}`}
              >
                per year
              </p>
            </div>
          </div>
        </div>

        {/* lower half */}
        <div className="w-full flex flex-col items-center justify-center mt-6">
          <button
            className={`w-full font-semibold py-2 rounded-lg ${!isTopPopular ? "bg-primary-light-blue-500 text-white" : "bg-white text-primary-light-blue-500"}`}
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackagePriceCard;
