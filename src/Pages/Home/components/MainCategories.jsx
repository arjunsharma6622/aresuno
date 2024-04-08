import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MainCategories = () => {
  const categories = useSelector((state) => state.categories);
  const categoriesToShowOnHome =
    categories.length > 0 &&
    categories.filter((category) => category.showOnHome);
  const userLocationName = useSelector((state) => state.user.locationName);
  const isMobile = window.innerWidth < 450;
  const numberOfIconsToShow = isMobile ? 15 : 14;

  return (
    <div className="self-center w-full max-w-[1314px] mt-6 md:mt-16">
      <div className="text-bold text-center font-bold text-xl md:text-2xl lg:text-3xl leading-10 self-center whitespace-nowrap max-md:max-w-full">
        Explore all the categories
      </div>
      <div className="m-auto self-center w-full  max-w-[1200px] mt-12 max-md:max-w-full max-md:mt-10">
        <div className="flex flex-wrap gap-4 md:gap-10 justify-center items-start">
          {categoriesToShowOnHome
            .slice(0, numberOfIconsToShow)
            .map((category, index) => (
              <Link
                key={index}
                to={`${userLocationName?.toLowerCase()}/${category.name
                  .split(" ")
                  .join("-")
                  .toLowerCase()}`}
                className=""
              >
                <div
                  key={index}
                  className="flex flex-col gap-3 items-center justify-center w-24 md:w-32 h-full"
                >
                  <div className="">
                    <img
                      loading="lazy"
                      src={category.icon}
                      alt={category.image.altTag}
                      className="bg-gray-100 p-4 rounded-xl w-20 md:w-24"
                    />
                  </div>
                  <span className="text-xs md:text-sm text-center leading-4 ">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </div>{" "}
    </div>
  );
};

export default MainCategories;
