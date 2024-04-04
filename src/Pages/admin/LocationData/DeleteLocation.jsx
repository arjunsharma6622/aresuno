import { useState } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import { API_URL, ToastParams } from "../../../utils/util";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const DeleteLocation = ({ loc, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteLocation = async () => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`${API_URL}/api/city/${loc?._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        toast.success("Location Deleted", ToastParams);
        setIsLoading(false);
        onClose();
      }

      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong", ToastParams);
      setIsLoading(false);
      console.error(error);
    }
  };

  const handleCancel = () => {
    // Perform cancel operations here
    onClose(); // Close the modal
  };

  return (
    <div className="z-[40] fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg w-[40%]">
        <div className="flex items-center justify-center">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
            <AiFillExclamationCircle className="h-6 w-6 text-red-600" />
          </div>
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-lg font-medium">
            Delete <span className="font-bold underline"> {loc?.name} </span>{" "}
            Location
          </h3>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleDeleteLocation}
            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-500"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                Deleting
                <div
                  className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>
            ) : (
              "Delete Location"
            )}
          </button>
          <button
            className="bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100"
            onClick={handleCancel}
            // disabled={isUpdating}
          >
            Cancel
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DeleteLocation;
