import { useState } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import axios from "axios";

export default function Modal({ business, onClose }) {
  const [open, setOpen] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await axios.delete(
        `https://aresuno-server.vercel.app/api/business/${business._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      onClose();
    } catch (err) {
      console.error(err.response.data);
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
        <div className="fixed inset-0 overflow-hidden   z-[10] flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-sm top-0 left-0 right-0 bottom-0">
          <div className="bg-white overflow-hidden fixed p-6 rounded-lg w-[40%]">
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
                <AiFillExclamationCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium">
                Delete{" "}
                <span className="font-bold underline"> {business.name}</span>{" "}
                Business
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Are you sure you want to delete this business? All of your data
                will be permanently removed. This action cannot be undone.
              </p>
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
