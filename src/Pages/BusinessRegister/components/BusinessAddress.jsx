import React, { useState } from "react";
import { BiNavigation } from "react-icons/bi";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const BusinessAddress = ({businessDetails, setBusinessDetails}) => {
  const [address, setAddress] = useState("");

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    console.log("Selected Address:", value);
    console.log("Latitude and Longitude:", latLng);
  };

  // handle address
  const handleAddressSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      setBusinessDetails((prev) => ({
        ...prev,
        address: address,
        coordinates: [latLng.lng, latLng.lat],
      }));
    } catch (error) {
      console.error("Error", error);
    }
  };
  return (
    <div className="md:mt-6 md:mb-6">
      <div className="flex items-center gap-2">
        <BiNavigation className="w-5 h-5 md:w-6 md:h-6" />
        <div className="flex items-center gap-4">
        <h2 className="text-lg md:text-xl font-semibold">Add business address 
        </h2>
        <span className="text-gray-500 text-sm">* All fields are required</span>
        </div>      </div>

      <div className="flex flex-col gap-4 mt-6">
        <div className="flex flex-col">
          <label htmlFor="">Address</label>

          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div className="relative">
                <input
                  {...getInputProps({
                    placeholder: "Enter your address...",
                    className: "location-search-input",
                  })}
                  className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text"
                />

                { suggestions.length > 0 &&
                <div className="absolute z-50 w-full px-5 py-4 bg-gray-200 rounded-lg">
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
}
              </div>
            )}
          </PlacesAutocomplete>
        </div>

        <div className="flex flex-col">
          <label htmlFor="">
            Address Line 2{" "}
            <span className="text-gray-500 font-light text-sm">(optional)</span>
          </label>
          <input
            type="text"
            className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text"
          />
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col">
            <label htmlFor="" className="">
              City
            </label>
            <input
              type="text"
              className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className="">
              Zip Code
            </label>
            <input
              type="text"
              className="mt-2 mappearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessAddress;