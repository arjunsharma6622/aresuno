import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { API_URL, ToastParams } from "../../../utils/util";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import EditLocation from "./EditLocation";
import DeleteLocation from "./DeleteLocation";

const LocationData = ({ allLocations }) => {
  const [location, setLocation] = useState({
    name: "",
    latitude: "",
    longitude: "",
  });

  const [openEditLocationModal, setOpenEditLocationModal] = useState(false);
  const [locationToEdit, setLocationToEdit] = useState(null);

  const [openDeleteLocationModal, setOpenDeleteLocationModal] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleAddLocation = async () => {
    setIsLoading(true);
    try {
      const locationDataToSend = {
        name: location.name,
        coordinates: [
          parseFloat(location.longitude),
          parseFloat(location.latitude),
        ],
      };

      const res = await axios.post(
        `${API_URL}/api/city/add`,
        locationDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setIsLoading(false);
      setLocation({
        name: "",
        latitude: "",
        longitude: "",
      });

      toast.success("Location Added", ToastParams);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      toast.error("Something went wrong", ToastParams);
    }
  };

  const tableHeaders = [
    "Id",
    "Name",
    "Latitude",
    "Longitude",
    "Edit",
    "Delete",
  ];
  return (
    <div>
      <div>
        <h1 className="text-2xl font-medium mb-5">LOCATION DATA</h1>
      </div>

      <div className="flex flex-col gap-10">
        <div className="w-1/2 bg-white px-5 py-5 shadow-md rounded-lg">
          <h1 className="text-2xl font-medium mb-5">Add Location</h1>
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
            <div>
              <button
                onClick={handleAddLocation}
                className="p-2 bg-blue-500 text-white rounded-md w-full"
              >
                {isLoading ? (
                  <div
                    className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                ) : (
                  "Add Location"
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="">
          <h1 className="text-2xl font-medium mb-5">All Locations</h1>
          <table className="table text-sm table-auto w-full">
            <thead className="bg-gray-300">
              <tr>
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {[...allLocations].reverse().map((location, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {location._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {location.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {location.coordinates[1]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {location.coordinates[0]}
                  </td>
                  <td className="px-2 py-4">
                    <FiEdit2
                      className="text-gray-500 w-5 h-5 cursor-pointer"
                      onClick={() => {
                        setOpenEditLocationModal(true);
                        setLocationToEdit(location);
                      }}
                    />
                  </td>
                  <td className="px-0 py-4 whitespace-nowrap items-center">
                    <FiTrash2
                      className="text-red-500 w-5 h-5 cursor-pointer"
                      onClick={() => {
                        setOpenDeleteLocationModal(true);
                        setLocationToDelete(location);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>

            {openEditLocationModal && (
              <EditLocation
                loc={locationToEdit}
                onClose={() => setOpenEditLocationModal(false)}
              />
            )}

            {openDeleteLocationModal && (
              <DeleteLocation
                loc={locationToDelete}
                onClose={() => setOpenDeleteLocationModal(false)}
              />
            )}
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LocationData;
