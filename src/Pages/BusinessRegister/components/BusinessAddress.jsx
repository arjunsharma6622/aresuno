import React, { useState } from "react";
import { BiNavigation } from "react-icons/bi";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const BusinessAddress = ({businessDetails, setBusinessDetails}) => {
  const [address, setAddress] = useState({
    street: "",
    landmark: "",
    pincode: "",
    city : "",
    district : "",
    state : ""
  });

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
  

  const [isAddressValidated, setIsAddressValidated] = useState(false)

  const [isAddressValidationLoading, setisAddressValidationLoading] = useState(true)


  const handleAddressValidation = () => {
    setTimeout(() => {
      setisAddressValidationLoading(false)
    }, 1500)
    setIsAddressValidated(true)
  }

  const handleAddressChange = (e) => {
    const {name, value} = e.target

    setAddress((prev) => {
      return {
        ...prev,
        [name] : value
      }
    })

    setBusinessDetails((prev) => {
      return {
        ...prev,
        address : address
      }
    })
  }


  return (
    <div className="md:mt-6 md:mb-6">

      
      <div className="flex items-center gap-2">
        <BiNavigation className="w-5 h-5 md:w-6 md:h-6" />
        <div className="flex items-center gap-4">
        <h2 className="text-lg md:text-xl font-semibold">Business Address 
        </h2>
        <span className="text-gray-500 text-sm">* All fields are required</span>
        </div>      </div>



        <div className="flex gap-8 flex-col md:flex-row">
      <div className="flex flex-col gap-6 mt-6 flex-[6]">

      <h2 className="text-lg font-medium">Enter Address Details <span className="text-sm text-gray-500 ml-3">( Step - 1 )</span></h2>


        <div className="flex gap-6 w-full flex-col">
        <div className="flex flex-col w-full">
          <label htmlFor="">Street / Locality / Colony</label>

          {/* <PlacesAutocomplete
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
          </PlacesAutocomplete> */}

          {/* street, landmark, pincode, city, state */}

          <input
            type="text"
            name="street"
            value={address.street}
            className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text"
            onChange = {handleAddressChange}
          />        
          </div>

        <div className="flex flex-col w-full">
          <label htmlFor="">
            Landmark / Address lane 2
            <span className="text-gray-500 font-light text-sm">(optional)</span>
            <input
            type="text"
            name="landmark"
            value={address.landmark}
            className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text"
            onChange = {handleAddressChange}
          />
          </label>

        </div>

        </div>

        <div className="flex flex-col w-full gap-6">

<div className="flex flex-col md:flex-row gap-4">
  
        <div className="flex flex-col w-full">
            <label htmlFor="" className="">
              Zip Code
            </label>
            <input
              type="number"
              name="pincode"
              maxLength={6}
              value={address.pincode}
              className="mt-2 mappearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              onChange = {handleAddressChange}
            />
          </div>


          <div className="flex flex-col w-full">
            <label htmlFor="" className="">
              City
            </label>
            <input
              type="text"
              name = "city"
              value={address.city}
              className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              onChange = {handleAddressChange}
            />
          </div>

          </div>


<div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="" className="">
              District
            </label>
            <input
              type="text"
              name = "district"
              value={address.district}
              className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              onChange = {handleAddressChange}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="" className="">
              State
            </label>
            <input
              type="text"
              name="state"
              value={address.state}
              className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              onChange = {handleAddressChange}
            />
          </div>
          </div>


        </div>
{ !isAddressValidated &&
        <button className="bg-blue-500 text-white mt-4 py-2 px-4 rounded-md" onClick={handleAddressValidation}>Validate Address</button>
}
      </div>

<div className="flex-[6] mt-6">
<div className="flex flex-col w-full gap-4">
<h2 className="text-lg font-medium">Pin Point Location <span className="text-sm text-gray-500 ml-3">( Step - 2 )</span></h2>  { !isAddressValidated ? 
      <p>After validating your address you will get a map here and you will be asked to exactly pin point the location of your business</p>
      : isAddressValidationLoading ? 

<div className="flex flex-col gap-4">
<div className="h-80 w-full bg-gray-300 animate-pulse rounded-lg"></div>
<div className="h-12 w-full bg-gray-300 animate-pulse rounded-lg"></div>
</div>

      :

      <div className="flex flex-col gap-4">
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15229.124557242834!2d78.4825873!3d17.3982906!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb994eaaaa3b7d%3A0x4aa420ccb9c38e00!2sBox-fitt11%20-%209247877888!5e0!3m2!1sen!2sin!4v1704905139696!5m2!1sen!2sin"  className="w-full h-80 rounded-lg" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      <button className="bg-blue-500 w-full text-white py-2 px-4 rounded-md" onClick={handleAddressValidation}>Done</button>
      </div>



  }

      </div>
      </div>
      </div>

    </div>
  );
};

export default BusinessAddress;