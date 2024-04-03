import { useSelector } from "react-redux";
import CategoriesSlider from "./CategoriesSlider";

const ServiceCategories = () => {
  const categories = useSelector((state) => state.categories);
  const categoriesTitles = useSelector((state) => state.categoriestitle);
  const categoriesTitlesToShowOnHome =
    categoriesTitles.length > 0 &&
    categoriesTitles?.filter((categoryTitle) => categoryTitle.showOnHome);

  return (
    <div className="self-center w-full max-w-[1314px] mt-5 md:mt-16 max-md:max-w-full px-3 md:px-8">
      <div className="w-full">
        <div className="w-full flex flex-col gap-3 md:gap-10">
          {categoriesTitlesToShowOnHome.map((categoryTitle, index) => (
            <div
              key={index}
              className="w-full flex flex-col items-stretch max-md:w-full max-md:ml-0"
            >
              <div className="justify-start items-start flex grow flex-col w-full mx-auto rounded-xl border-solid border-zinc-300 max-md:max-w-full mt-2 md:mt-10 max-md:px-5">
                <div className="text-black text-xl md:text-2xl lg:text-3xl font-bold">
                  Browse from all {categoryTitle.title}
                </div>
                <div className="w-full max-md:max-w-full">
                  <CategoriesSlider
                    categories={categories?.filter(
                      (category) =>
                        category.categoryTitle === categoryTitle._id,
                    )}
                    categoryTitle={categoryTitle}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCategories;
