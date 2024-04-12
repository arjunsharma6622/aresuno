import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiEdit3, FiX } from "react-icons/fi";
import { BsFillCameraFill } from "react-icons/bs";
import { API_URL, ToastParams } from "../../../utils/util";

export default function EditModal({ category, onClose, categoryTitle }) {
  const [open, setOpen] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const editUrl = category
    ? `${API_URL}/api/category/${category._id}`
    : `${API_URL}/api/category-title/${categoryTitle._id}`;

  const [imageToUpdate, setImageToUpdate] = useState(null);

  const [showOnHome, setShowOnHome] = useState(
    category ? category.showOnHome : categoryTitle.showOnHome,
  );

  const [icon, setIcon] = useState(null);
  const [iconToShow, setIconToShow] = useState(category ? category.icon : null);

  const [subCategoryToEdit, setSubCategoryToEdit] = useState(category);

  const [mainCategoryToEdit, setMainCategoryToEdit] = useState(categoryTitle);

  // const handleCategoryTitleChange = (e) => {
  //   const categoryTitleId = e.target.value;
  //   setMainCategoryToEdit((prevCategory) => ({
  //     ...prevCategory,
  //     categoryTitle: categoryTitleId,
  //   }));
  // };

  const handleIconChange = (e) => {
    setIcon(e.target.files[0]);
    const iconUrl = URL.createObjectURL(e.target.files[0]);
    setIconToShow(iconUrl);
  };

  const handleImageUpload = async () => {
    try {
      const imageData = new FormData();
      imageData.append("file", imageToUpdate);
      imageData.append("upload_preset", "ml_default");
      imageData.append("folder", `aresuno/category/${category.name}`);

      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dexnb3wkw/image/upload",
        imageData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const imageUrl = uploadResponse.data.secure_url;

      return imageUrl;
    } catch (err) {
      console.error(err);
    }
  };

  const handleIconUpload = async () => {
    try {
      const iconData = new FormData();
      iconData.append("file", icon);
      iconData.append("upload_preset", "ml_default");
      iconData.append("folder", `aresuno/category/${category.name}`);

      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dexnb3wkw/image/upload",
        iconData,
      );
      const iconUrl = uploadResponse.data.secure_url;

      return iconUrl;
    } catch (err) {
      console.error(err);
    }
  };

  const handleMainCategoryUpdate = async () => {
    try {
      setIsUpdating(true);
      await axios.put(
        editUrl,
        { ...mainCategoryToEdit, showOnHome: showOnHome },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      toast.success("Main Category Updated", ToastParams);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err, ToastParams);
    }
  };

  const handleSubCategoryUpdate = async () => {
    try {
      setIsUpdating(true);
      let imageUrl = "";
      let iconUrl = "";
      let subCatToEdit = {};

      if (imageToUpdate) {
        imageUrl = await handleImageUpload();
        subCatToEdit = {
          ...subCategoryToEdit,
          image: {
            ...subCategoryToEdit.image,
            url: imageUrl,
          },
        };
      } else {
        subCatToEdit = {
          ...subCategoryToEdit,
          image: {
            ...subCategoryToEdit.image,
          },
        };
      }

      if (icon) {
        iconUrl = await handleIconUpload();
        subCatToEdit = {
          ...subCategoryToEdit,
          icon: iconUrl,
        };
      }

      await axios.put(
        editUrl,
        { ...subCatToEdit, showOnHome: showOnHome },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      toast.success("Category Updated", ToastParams);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err, ToastParams);
    }
  };

  const handleCancel = () => {
    // Perform cancel operations here
    setIsUpdating(false); // Reset deleting state
    onClose(); // Close the modal
  };

  return (
    <div>
      {open && (
        <div className="z-[40] fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-sm">
          <div className="bg-white flex flex-col gap-6 p-6 rounded-lg w-[55%]">
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center justify-center">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-100">
                  <FiEdit3 className="h-6 w-6 text-gray-600" />
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-medium">
                  Edit
                  <span className="font-bold underline">
                    {" "}
                    {category ? category.name : categoryTitle.title}
                  </span>{" "}
                  Category
                </h3>
              </div>
            </div>

            <div className=" flex items-start gap-2 flex-col w-[90%] m-auto justify-center">
              {subCategoryToEdit ? (
                <div className="w-full flex flex-col gap-6 text-sm">
                  <div className="flex w-full items-center justify-start gap-6">
                    <div className="flex justify-start gap-6 items-end">
                      {/* <div className="flex items-center gap-2 relative">
                    <img
                      src={
                        imageToShow ? imageToShow : subCategoryToEdit.image?.url
                      }
                      alt=""
                      className=" h-20 rounded-md"
                    />
                    <label
                      htmlFor="subCategoryImage"
                      className="cursor-pointer absolute bottom-1 right-1 bg-blue-500 p-[6px] rounded-full"
                    >
                      <BsFillCameraFill className="h-5 w-5 text-white" />
                      <input
                        type="file"
                        id="subCategoryImage"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                    {imageToUpdate && (
                      <div
                        className="absolute cursor-pointer top-1 right-1 bg-red-200 rounded-full p-[2px]"
                        onClick={() => {
                          setImageToUpdate(null);
                          setImageToShow(null);
                        }}
                      >
                        <FiX className="h-4 w-4 text-red-500 " />
                      </div>
                    )}
                  </div> */}

                      <div className="flex items-center gap-2 relative">
                        {iconToShow ? (
                          <img
                            src={
                              iconToShow ? iconToShow : subCategoryToEdit.icon
                            }
                            alt=""
                            className=" w-20 rounded-md"
                          />
                        ) : (
                          <span>Click on green cam to add icon</span>
                        )}
                        <label
                          htmlFor="subCategoryIcon"
                          className="cursor-pointer absolute bottom-1 right-1 bg-green-500 p-[6px] rounded-full"
                        >
                          <BsFillCameraFill className="h-5 w-5 text-white" />
                          <input
                            type="file"
                            id="subCategoryIcon"
                            className="hidden"
                            onChange={handleIconChange}
                          />
                        </label>
                        {icon && (
                          <div
                            className="absolute cursor-pointer top-1 right-1 bg-red-200 rounded-full p-[2px]"
                            onClick={() => {
                              setIcon(null);
                              setIconToShow(null);
                            }}
                          >
                            <FiX className="h-4 w-4 text-red-500 " />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="w- flex flex-col gap-1 text-sm">
                      <label
                        htmlFor="showOnHome"
                        className="font-medium text-base"
                      >
                        Show on Home Page
                      </label>
                      <div className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="showOnHome"
                          id="show"
                          value={true}
                          checked={showOnHome === true}
                          onChange={() => setShowOnHome(true)}
                          className="cursor-pointer"
                        />
                        <label htmlFor="show">Show</label>
                      </div>

                      <div className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="showOnHome"
                          id="dontShow"
                          value={false}
                          checked={showOnHome === false}
                          onChange={() => setShowOnHome(false)}
                          className="cursor-pointer"
                        />
                        <label htmlFor="dontShow">Don&apos;t Show</label>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-start items-center gap-4">
                    <div className="w-full flex flex-col gap-1 text-sm">
                      <label
                        htmlFor="subCategoryName"
                        className="font-medium text-base"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="subCategoryName"
                        value={subCategoryToEdit.name}
                        onChange={(e) =>
                          setSubCategoryToEdit({
                            ...subCategoryToEdit,
                            name: e.target.value,
                          })
                        }
                        className="text-base w-full border border-gray-300 p-2 rounded-md"
                      />
                    </div>

                    <div className="w-full flex flex-col gap-1 text-sm">
                      <label htmlFor="altTag" className="font-medium text-base">
                        Image Alt Tag
                      </label>

                      <input
                        type="text"
                        id="altTag"
                        value={subCategoryToEdit.image.altTag}
                        className="text-base w-full border border-gray-300 p-2 rounded-md"
                        onChange={(e) =>
                          setSubCategoryToEdit({
                            ...subCategoryToEdit,
                            image: {
                              ...subCategoryToEdit.image,
                              altTag: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
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
                      value={
                        subCategoryToEdit.keywords
                          ? subCategoryToEdit.keywords
                          : ""
                      }
                      className="text-base w-full border border-gray-300 p-2 rounded-md resize-none"
                      onChange={(e) => {
                        setSubCategoryToEdit({
                          ...subCategoryToEdit,
                          keywords: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-1 text-sm">
                    <label htmlFor="altTag" className="font-medium text-base">
                      Description
                    </label>

                    <textarea
                      type="text"
                      id="altTag"
                      placeholder="description"
                      value={
                        subCategoryToEdit.description
                          ? subCategoryToEdit.description
                          : ""
                      }
                      className="text-base w-full border border-gray-300 p-2 rounded-md resize-none"
                      onChange={(e) => {
                        setSubCategoryToEdit({
                          ...subCategoryToEdit,
                          description: e.target.value,
                        });
                      }}
                      rows={4}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col gap-4 text-sm">
                  <div className="w-full flex flex-col gap-1 text-sm">
                    <label
                      htmlFor="mainCategoryName"
                      className="font-medium text-base"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="mainCategoryName"
                      value={mainCategoryToEdit.title}
                      onChange={(e) =>
                        setMainCategoryToEdit({
                          ...mainCategoryToEdit,
                          title: e.target.value,
                        })
                      }
                      className="text-base w-full border border-gray-300 p-2 rounded-md"
                    />
                  </div>

                  <div className="w-full flex flex-col gap-1 text-sm">
                    <label
                      htmlFor="showOnHome"
                      className="font-medium text-base"
                    >
                      Show on Home Page
                    </label>
                    <div className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="showOnHome"
                        id="show"
                        value={true}
                        checked={showOnHome === true}
                        onChange={() => setShowOnHome(true)}
                        className="cursor-pointer"
                      />
                      <label htmlFor="show">Show</label>
                    </div>

                    <div className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="showOnHome"
                        id="dontShow"
                        value={false}
                        checked={showOnHome === false}
                        onChange={() => setShowOnHome(false)}
                        className="cursor-pointer"
                      />
                      <label htmlFor="dontShow">Don&apos;t Show</label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500"
                onClick={
                  category ? handleSubCategoryUpdate : handleMainCategoryUpdate
                }
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
              <button
                className="bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100"
                onClick={handleCancel}
                disabled={isUpdating}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
