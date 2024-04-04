import axios from "axios";
import { useState } from "react";
import { FiUploadCloud, FiX, FiXCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import { API_URL, ToastParams } from "../../../utils/util";

const CategoryInput = ({
  index,
  onRemove,
  onImageChange,
  onUpdateCategoryName,
  onUpdateCategoryKeywords,
  onUpdateCategoryImageAltTag,
  onCategoryTitleChange,
}) => {
  const [category, setCategory] = useState({
    name: "",
    image: { url: null, altTag: "" },
    businessType: "",
    icon: "",
    keywords: "",
  });
  const [imageToShow, setImageToShow] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (e.target.files[0].size > 1 * 1000 * 1024) {
      toast.error(
        `File with maximum size of 1MB is allowed, your size is ${(
          e.target.files[0].size /
          1000 /
          1024
        ).toFixed(2)} MB`,
        ToastParams,
      );
      return false;
    } else {
      const imageUrl = URL.createObjectURL(file);
      setCategory((prevCategory) => ({
        ...prevCategory,
        image: { ...prevCategory.image, url: file },
      }));
      setImageToShow(imageUrl);
      onImageChange(index, file);
    }
  };

  const onUpdateCategoryImageAltTagHandler = (e) => {
    const altTag = e.target.value;
    setCategory((prevCategory) => ({
      ...prevCategory,
      image: { ...prevCategory.image, altTag },
    }));
    onUpdateCategoryImageAltTag(index, altTag);
  };

  const handleCategoryNameChange = (e) => {
    const categoryName = e.target.value;
    setCategory((prevCategory) => ({ ...prevCategory, name: categoryName }));
    onUpdateCategoryName(index, categoryName);
  };

  const handleCategoryKeywordsChange = (e) => {
    const categoryKeywords = e.target.value;
    setCategory((prevCategory) => ({
      ...prevCategory,
      keywords: categoryKeywords,
    }));
    onUpdateCategoryKeywords(index, categoryKeywords);
  };

  return (
    <div className="border w-full rounded-xl p-5 py-6 relative justify-start flex gap-10 items-end">
      <div className="w-full flex flex-col gap-5">
        <div className="flex items-center justify-between w-full">
          <label htmlFor="" className="flex flex-col gap-3 w-full">
            Category Name
            <input
              type="text"
              value={category.name}
              onChange={handleCategoryNameChange}
              className="border py-2 px-4 focus:outline-none rounded-lg"
            />
          </label>
        </div>

        <div className="w-full flex flex-col gap-1 text-sm">
          <label htmlFor="altTag" className="font-medium text-base">
            Keywords{" "}
            <span className="text-gray-500 text-sm font-normal">
              - add comma separated keywords
            </span>
          </label>

          <textarea
            type="text"
            id="altTag"
            placeholder="eg. electronics, mobile, laptop, tv"
            value={category.keywords}
            className="border rounded-lg py-2 px-4 focus:outline-none"
            onChange={(e) => handleCategoryKeywordsChange(e)}
          />
        </div>

        <div className="w-full flex items-end">
          <div className="flex flex-col gap-2 flex-[3]">
            {!category.image.url && (
              <label
                htmlFor="categoryImage"
                className="flex mb-2 flex-col w-fit gap-2 cursor-pointer"
              >
                <span className="text-gray-700">Category Image</span>
                <div className="flex items-center gap-2 border text-gray-700 border-dashed p-6 w-fit border-gray-500 rounded-lg">
                  <FiUploadCloud className="w-6 h-6" />
                </div>
                <input
                  type="file"
                  id="categoryImage"
                  multiple={false}
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}

            {category.image.url && (
              <div className="relative w-fit">
                <img
                  src={imageToShow}
                  alt=""
                  className=" w-24 h-24 object-cover rounded-xl"
                />
                <FiXCircle
                  className="absolute bg-white rounded-full -top-2 -right-2 w-5 h-5 text-red-500 cursor-pointer"
                  onClick={() => {
                    setCategory((prevCategory) => ({
                      ...prevCategory,
                      image: { ...prevCategory.image, url: null },
                    }));
                    setImageToShow(null);
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between flex-[9]">
            <label htmlFor="" className="flex flex-col gap-3  w-full">
              Describe your image (helps in SEO)
              <input
                type="text"
                value={category.image.altTag}
                onChange={onUpdateCategoryImageAltTagHandler}
                className="border rounded-lg py-2 px-4 focus:outline-none"
              />
            </label>
          </div>
        </div>
      </div>

      {onRemove && (
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 absolute top-3 right-3 focus:outline-none"
        >
          <FiX className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

const AddCategories = () => {
  const [categories, setCategories] = useState([
    {
      name: "",
      image: { url: null, altTag: "" },
      businessType: "",
      icon: "",
      keywords: "",
    },
  ]);

  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");

  const addCategory = () => {
    setCategories((prevCategories) => [
      ...prevCategories,
      { name: "", image: null },
    ]);
  };

  const removeCategory = (index) => {
    setCategories((prevCategories) =>
      prevCategories.filter((_, i) => i !== index),
    );
  };

  const updateCategory = (index, categoryData) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat, i) =>
        i === index ? { ...cat, ...categoryData } : cat,
      ),
    );
  };

  const updateCategoryName = (index, name) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat, i) =>
        i === index ? { ...cat, name: name } : cat,
      ),
    );
  };

  const updateCategoryKeywords = (index, keywords) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat, i) =>
        i === index ? { ...cat, keywords: keywords } : cat,
      ),
    );
  };

  const uploadAllCategoryImages = async () => {
    setIsCategoryLoading(true);

    var imgUrls = [];

    try {
      const uploadPromises = categories.map(async (category) => {
        try {
          if (category.image.url) {
            const img = category.image.url;
            const imageData = new FormData();
            imageData.append("file", img);
            imageData.append("upload_preset", "ml_default");
            imageData.append("folder", `aresuno/category/${category.name}`);

            const uploadResponse = await axios.post(
              "https://api.cloudinary.com/v1_1/dexnb3wkw/image/upload",
              imageData,
            );

            const imageUrl = uploadResponse.data.secure_url;
            imgUrls.push(imageUrl);
            return {
              ...category,
              image: { url: imageUrl, altTag: category.image.altTag },
            };
          }
          return category;
        } catch (err) {
          console.error(err.response.data.error.message);
          toast.error(err.response.data.error.message, ToastParams);
        }
      });

      await Promise.all(uploadPromises);
      return imgUrls; // Return the array of image URLs
    } catch (error) {
      console.error(error);
    } finally {
      setIsCategoryLoading(false);
    }
  };

  const handleAddCategories = async () => {
    const imgUrls = await uploadAllCategoryImages();

    try {
      const updatedCategories = categories.map((category, index) => {
        return {
          ...category,
          image: { url: imgUrls[index], altTag: category.image.altTag },
          businessType: selectedBusinessType,
        };
      });

      const res = await axios.post(
        `${API_URL}/api/category/create`,
        updatedCategories,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      toast.success("Categories added successfully", ToastParams);
      setIsCategoryLoading(false);
      setCategories([]);
    } catch (err) {
      console.error(err);
      setIsCategoryLoading(false);
      toast.error("Categories add failed", ToastParams);
    }
  };

  // const createNewCategoryTitle = async () => {
  //   try {
  //     const res = await axios.post(
  //       `${API_URL}/api/category-title/create`,
  //       { title: newCategoryTitle },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     toast.success("Category created successfully", ToastParams);
  //     setNewCategoryTitle("");
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Problem creating category", ToastParams);
  //     setNewCategoryTitle("");
  //   }
  // };

  const businessTypes = ["Service", "Doctor", "Manufacturing"];

  const [selectedBusinessType, setSelectedBusinessType] = useState("service");

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">
            Select the business type in which you want to add categories
          </h2>
          <div className="flex gap-8 ">
            {businessTypes.map((businessType, index) => (
              <div className="flex gap-2" key={index}>
                <input
                  type="radio"
                  id={businessType}
                  name="businessType"
                  value={businessType.toLowerCase()}
                  checked={selectedBusinessType === businessType.toLowerCase()}
                  onChange={() =>
                    setSelectedBusinessType(businessType.toLowerCase())
                  }
                />
                <label htmlFor={businessType}>{businessType}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-[70%] bg-white rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Add Categories</h2>

            <div className="flex flex-col gap-5">
              {categories.map((category, index) => (
                <CategoryInput
                  key={index}
                  index={index}
                  onRemove={() => removeCategory(index)}
                  onImageChange={(index, image) =>
                    updateCategory(index, {
                      image: { ...category.image, url: image },
                    })
                  }
                  onUpdateCategoryName={(index, name) =>
                    updateCategoryName(index, name)
                  }
                  onUpdateCategoryKeywords={(index, keywords) =>
                    updateCategoryKeywords(index, keywords)
                  }
                  onUpdateCategoryImageAltTag={(index, altTag) =>
                    updateCategory(index, {
                      image: { ...category.image, altTag },
                    })
                  }
                  onCategoryTitleChange={(index, categoryTitle) =>
                    updateCategory(index, { categoryTitle })
                  }
                />
              ))}
              <button
                onClick={addCategory}
                className="bg-blue-600 rounded-lg text-white w-fit py-2 px-4"
              >
                Add {categories.length > 0 ? "Another" : "New"}
              </button>
            </div>

            <button
              className="mt-6 text-center  w-full py-2 px-4 bg-blue-500 flex items-center justify-center gap-4 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleAddCategories}
            >
              {isCategoryLoading && (
                <div
                  className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              )}

              {isCategoryLoading ? "Uploading..." : "Upload Categories"}
            </button>
          </div>

          {/* <div className="w-1/2 bg-white rounded-xl">
            { selectedBusinessType === "service" &&
            <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Add Category Title
            </h2>

            <div className="flex gap-2 w-full">
              <input
                type="text"
                placeholder="Category Title"
                className=" w-full border border-gray-300 p-3 py-2 rounded-lg focus:outline-none"
                value={newCategoryTitle}
                onChange={(e) => setNewCategoryTitle(e.target.value)}
              />
              <div className="flex items-center gap-3">
                <button
                  onClick={createNewCategoryTitle}
                  className="bg-blue-600 w-fit  rounded-lg text-white py-2 h-full px-5"
                >
                  Create
                </button>
              </div>
            </div>
            </div>
}

          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AddCategories;
