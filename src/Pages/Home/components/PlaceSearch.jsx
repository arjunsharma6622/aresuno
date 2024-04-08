import { useState } from "react";
import { FiCrosshair } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setUserCoordinates,
  setUserLocationName,
} from "../../../state/slices/userSlice";
import { API_URL } from "../../../utils/util";
import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress } from "react-places-autocomplete";

const PlaceSearch = () => {
  const [address, setAddress] = useState("");
  const userLocationName = useSelector((state) => state.user.locationName);
  const [location, setLocation] = useState(userLocationName);
  const dispatch = useDispatch();
  const [autoDetectHovered, setAutoDetectHovered] = useState(false);

  const handleDetectLocation = async () => {
    const success = async (pos) => {
      const crds = pos.coords;
      const location = await axios.get(
        `${API_URL}/api/getLocationFromLatLong?lat=${crds.latitude}&long=${crds.longitude}`,
      );
      setLocation(location.data.city);
      dispatch(setUserCoordinates({ lat: crds.latitude, lng: crds.longitude }));
      dispatch(setUserLocationName({ locationName: location.data.city }));
    };

    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const place = results[0];
    // Construct the desired format from the selected place details
    const formattedLocation = {
      value: place.formatted_address,
      area: "", // You can set this value based on your requirements
      city:
        place.address_components.find((component) =>
          component.types.includes("locality"),
        )?.long_name || "",
      dcity:
        place.address_components.find((component) =>
          component.types.includes("administrative_area_level_2"),
        )?.long_name || "",
      state:
        place.address_components.find((component) =>
          component.types.includes("administrative_area_level_1"),
        )?.long_name || "",
      country:
        place.address_components.find((component) =>
          component.types.includes("country"),
        )?.long_name || "",
      pincode:
        place.address_components.find((component) =>
          component.types.includes("postal_code"),
        )?.long_name || "",
      lat: place.geometry.location.lat(),
      long: place.geometry.location.lng(),
      type: "City", // You can set this value based on your requirements
      mobicode: "in", // You can set this value based on your requirements
      isExact: 0, // You can set this value based on your requirements
    };

    dispatch(
      setUserCoordinates({
        lat: formattedLocation.lat,
        lng: formattedLocation.long,
      }),
    );
    dispatch(setUserLocationName({ locationName: formattedLocation.city }));

    setAddress(formattedLocation.city);
  };

  return (
    <>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className=" px-4 w-full">
            <input
              {...getInputProps({
                placeholder: "Enter your address...",
                className: "location-search-input",
              })}
              className="py-1 appearance-none rounded-md relative block w-full  text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text"
            />

            {suggestions.length > 0 && (
              <div className="absolute left-0 top-9 z-50 w-full px-5 py-4 bg-white shadow-lg rounded-lg rounded-t-none">
                {loading ? <div>Loading...</div> : null}

                {suggestions.map((suggestion, index) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#f7f7f7" : "",
                    cursor: suggestion.active ? "pointer" : "",
                    padding: "12px",
                    borderRadius: "10px",
                    // borderBottom: `${index === suggestions.length - 1 ? "none" : "1px solid #f7f7f7"}`,
                  };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, { style })}
                      key={index}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </PlacesAutocomplete>

      <div className="relative group">
        <FiCrosshair
          className="w-6 h-6 text-gray-500 hover:text-gray-800 cursor-pointer"
          onClick={handleDetectLocation}
          onMouseEnter={() => setAutoDetectHovered(true)}
          onMouseLeave={() => setAutoDetectHovered(false)}
        />
        <div
          className={`w-48 px-2 py-2 absolute z-10 top-10 left-1/2 transform -translate-x-1/2 p-1 text-xs bg-black text-white rounded ${
            autoDetectHovered ? "block" : "hidden"
          }  transition ease-in-out duration-150`}
        >
          Click to autodetect location
        </div>
      </div>
    </>
  );
};

export default PlaceSearch;
