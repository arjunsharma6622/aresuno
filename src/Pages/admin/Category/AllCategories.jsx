import { useState } from "react";
import { FiCheckCircle, FiEdit3, FiTrash2, FiXCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

const AllCategories = () => {
  const categories = useSelector((state) => state.categories);
  const categoriesTitles = useSelector((state) => state.categoriestitle);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedCategoryToEdit, setSelectedCategoryToEdit] = useState(null);
  const [selectedMainCategoryToEdit, setSelectedMainCategoryToEdit] =
    useState(null);

  const [selectedBusinessType, setSelectedBusinessType] = useState("service");

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-semibold mb-5">View All Categories</h1>

        <div className="flex items-center gap-6">
          <div>
            <input
              type="radio"
              name="businessTypeToShow"
              id="service"
              value={"service"}
              onChange={(e) => setSelectedBusinessType(e.target.value)}
              checked={selectedBusinessType === "service"}
            />
            <label htmlFor="service" className="ml-2">
              Service
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="businessTypeToShow"
              id="doctor"
              value={"doctor"}
              onChange={(e) => setSelectedBusinessType(e.target.value)}
              checked={selectedBusinessType === "doctor"}
            />
            <label htmlFor="doctor" className="ml-2">
              Doctor
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="businessTypeToShow"
              id="manufacturing"
              value={"manufacturing"}
              onChange={(e) => setSelectedBusinessType(e.target.value)}
              checked={selectedBusinessType === "manufacturing"}
            />
            <label htmlFor="manufacturing" className="ml-2">
              Manufacturing
            </label>
          </div>
        </div>

        {/* {categoriesTitles.map((categoryTitle, titleIndex) => ( */}
        <div className="mb-8">
          {/* {categoryTitle && (
              <h2 className="text-lg font-semibold mt-4 mb-2">
                {categoryTitle.title}
              </h2>
            )} */}

          <div className="mt-2 rounded-xl grid grid-cols-4 gap-4">
            {categories
              .filter(
                (category) => category.businessType === selectedBusinessType,
              )
              .map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className="bg-white relative shadow rounded-xl p-5 py-5 flex justify-between items-center"
                >
                  <div className="justify-start flex-col flex gap-2 items-start">
                    <div>
                      <img src={category.icon} alt="" className="w-12 h-12" />
                    </div>
                    <div className="flex flex-col gap-0">
                      <h2 className="text-md font-medium">{category.name}</h2>
                      <div className="text-sm text-gray-500 flex gap-2 items-center">
                        <span>Show on Home </span>
                        {category.showOnHome ? (
                          <FiCheckCircle className="text-green-600 w-5 h-5" />
                        ) : (
                          <FiXCircle className="text-red-600 w-5 h-5" />
                        )}
                      </div>
                      <div className="flex justify-start gap-2 mt-3">
                        <FiEdit3
                          className="w-5 h-5 text-gray-500 cursor-pointer"
                          onClick={() => setSelectedCategoryToEdit(category)}
                        />
                        {selectedCategoryToEdit &&
                          selectedCategoryToEdit._id === category._id && (
                            <EditModal
                              category={selectedCategoryToEdit}
                              onClose={() => setSelectedCategoryToEdit(null)}
                            />
                          )}

                        <FiTrash2
                          className="w-5 h-5 text-red-500 cursor-pointer"
                          onClick={() => setSelectedCategory(category)}
                        />
                        {selectedCategory &&
                          selectedCategory._id === category._id && (
                            <DeleteModal
                              categoryId={category._id}
                              subCategory={selectedCategory}
                              onClose={() => setSelectedCategory(null)}
                            />
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* ))} */}
      </div>

      {selectedBusinessType === "service" && (
        <div>
          <h1 className="text-2xl font-medium mb-5">Category Titles</h1>

          <div className="relative grid grid-cols-4 gap-4">
            {categoriesTitles.map((category, index) => (
              <div
                key={index}
                className=" flex flex-col items-start justify-start gap-4 bg-white px-5 py-6 rounded-lg"
              >
                <div className="flex flex-col gap-0">
                  <h2 className="text-md font-base">{category.title}</h2>
                  <div className="text-sm text-gray-500 flex gap-2 items-center">
                    <span>Show on Home </span>
                    {category.showOnHome ? (
                      <FiCheckCircle className="text-green-600 w-5 h-5" />
                    ) : (
                      <FiXCircle className="text-red-600 w-5 h-5" />
                    )}
                  </div>
                </div>

                <div className=" flex items-center justify-center gap-4">
                  <FiEdit3
                    className="w-5 h-5 text-gray-500 cursor-pointer"
                    onClick={() => setSelectedMainCategoryToEdit(category)}
                  />
                  {selectedMainCategoryToEdit &&
                    selectedMainCategoryToEdit._id === category._id && (
                      <EditModal
                        categoryTitle={category}
                        onClose={() => setSelectedMainCategoryToEdit(null)}
                      />
                    )}
                  <FiTrash2
                    className="w-5 h-5 text-red-500 cursor-pointer"
                    onClick={() => setSelectedMainCategory(category)}
                  />

                  {selectedMainCategory &&
                    selectedMainCategory._id === category._id && (
                      <DeleteModal
                        mainCategory={selectedMainCategory}
                        onClose={() => setSelectedMainCategory(null)}
                      />
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCategories;
