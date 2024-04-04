import { useState } from "react";
import axios from "axios";
import { FiEdit2, FiEdit3, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { ToastParams } from "../../../../utils/util";

export default function ModalEdit({ onClose, post }) {
  const [open, setOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedPost, setUpdatedPost] = useState({
    image: post.image,
    description: post.description,
  });

  const handleEdit = async () => {
    try {
      setIsLoading(true);
      const res = await axios.patch(
        `https://aresuno-server.vercel.app/api/post/${post._id}`,
        updatedPost,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      toast.success("Post Updated", ToastParams);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Error Updating Post", ToastParams);
    }
  };

  const handleCancel = () => {
    // Perform cancel operations here
    setIsEditing(false); // Reset deleting state
    onClose(); // Close the modal
  };

  return (
    <div>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-sm z-[999]">
          <div className="bg-white p-6 rounded-lg w-[45%]">
            <div className="flex items-center gap-4 justify-center">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-100">
                <FiEdit3 className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-medium">Edit Post</h3>
            </div>

            <div className="mt-8 text-center w-full flex gap-4 justify-start">
              <div className="flex-[4]">
                <img
                  src={post.image}
                  alt=""
                  className="w-full object-cover rounded-lg"
                />
              </div>

              <div className="flex flex-[8] flex-col gap-2 items-start w-full">
                <div className="w-full flex items-center justify-between gap-2">
                  <span>{post.businessName}</span>
                  {isEditing ? (
                    <FiEdit2
                      className="cursor-pointer h-5 w-5 text-gray-600"
                      onClick={() => setIsEditing(!isEditing)}
                    />
                  ) : (
                    <FiX
                      className="cursor-pointer h-5 w-5 text-red-500"
                      onClick={() => setIsEditing(!isEditing)}
                    />
                  )}
                </div>
                <textarea
                  disabled={isEditing}
                  type="text"
                  value={updatedPost.description}
                  onChange={(e) =>
                    setUpdatedPost({
                      ...updatedPost,
                      description: e.target.value,
                    })
                  }
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border h-32 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                <span>
                  Created at{" "}
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500"
                onClick={handleEdit}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Edit"}
              </button>
              <button
                className="bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100"
                onClick={handleCancel}
                disabled={isLoading}
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
