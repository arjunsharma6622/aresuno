import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { API_URL, ToastParams } from "../../../utils/util";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const EditLocation = ({ loc, onClose }) => {
  const [location, setLocation] = useState({
    name: loc.name,
    latitude: loc.coordinates[1],
    longitude: loc.coordinates[0],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateLocation = async () => {
    setIsLoading(true);
    try {
      const res = await axios.put(
        `${API_URL}/api/city/${loc._id}`,
        {
          name: location.name,
          coordinates: [location.longitude, location.latitude],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (res.status === 200) {
        toast.success("Location updated successfully", ToastParams);
        setIsLoading(false);
        onClose();
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      toast.error(err.response.data, ToastParams);
    }
    setIsLoading(false);
  };

  const handleCancel = () => {
    // Perform cancel operations here
    onClose(); // Close the modal
  };

  return (
    <div className="z-[40] fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg w-[40%]">
        <div className="flex items-center justify-center">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-100">
            <FiEdit3 className="h-6 w-6 text-gray-600" />
          </div>
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-lg font-medium">
            Edit
            <span className="font-bold underline"></span> Location
          </h3>
        </div>

        <div className="w-full bg-white px-5 py-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="location">City Name</label>
              <input
                type="text"
                value={location.name}
                onChange={(e) =>
                  setLocation({ ...location, name: e.target.value })
                }
                name="location"
                id="location"
                placeholder="Hyderabad"
                className="p-2 border rounded-md focus:outline-none"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col md:w-1/2">
                <label htmlFor="location">Latitude</label>
                <input
                  type="number"
                  name="location"
                  id="location"
                  value={location.latitude}
                  onChange={(e) =>
                    setLocation({ ...location, latitude: e.target.value })
                  }
                  placeholder="17.3666403"
                  className="p-2 border rounded-md focus:outline-none"
                />
              </div>
              <div className="flex flex-col md:w-1/2">
                <label htmlFor="location">Longitude</label>
                <input
                  type="number"
                  name="location"
                  value={location.longitude}
                  onChange={(e) =>
                    setLocation({ ...location, longitude: e.target.value })
                  }
                  id="location"
                  placeholder="78.5205603"
                  className="p-2 border rounded-md focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={handleUpdateLocation}
                className="bg-gray-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    Updating
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
                  "Update Location"
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
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditLocation;
