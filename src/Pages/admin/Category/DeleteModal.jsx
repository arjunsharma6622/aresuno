import { useState } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL, ToastParams } from "../../../utils/util";

export default function DeleteModal({
  categoryId,
  subCategory,
  onClose,
  mainCategory,
}) {
  const [open, setOpen] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteUrl = subCategory
    ? `${API_URL}/api/category/${subCategory._id}`
    : `${API_URL}/api/category-title/${mainCategory._id}`;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await axios.delete(deleteUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Category Deleted", ToastParams);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err, ToastParams);
    }
  };

  const handleCancel = () => {
    // Perform cancel operations here
    setIsDeleting(false); // Reset deleting state
    onClose(); // Close the modal
  };

  return (
    <div>
      {open && (
        <div className="z-[40] fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg w-[40%]">
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
                <AiFillExclamationCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium">
                Delete{" "}
                <span className="font-bold underline">
                  {" "}
                  {subCategory ? subCategory.name : mainCategory.title}
                </span>{" "}
                Category
              </h3>
              {mainCategory && (
                <div className="px-4">
                  <p className="text-sm text-gray-500">
                    All the below mentioned subCategories will be deleted
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 items-center justify-center">
                    {mainCategory.subcategories.map((subCategory, index) => (
                      <span
                        className="text-xs bg-gray-200 rounded-full px-3 py-[6px] flex items-center justify-center"
                        key={index}
                      >
                        {subCategory.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-500"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
              <button
                className="bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100"
                onClick={handleCancel}
                disabled={isDeleting}
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
