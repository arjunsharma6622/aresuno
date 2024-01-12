import React, { useState } from "react";
import { BiNavigation } from "react-icons/bi";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import MapComponent from "./MapComponent";
import {API_URL} from "../../../utils/util"
import axios from "axios"

const BusinessAddress = ({businessDetails, setBusinessDetails}) => {
  const [address, setAddress] = useState({
    street: "",
    landmark: "",
    pincode: "",
    city : "",
    district : "",
    state : ""
  });

  const [validatedLatLng, setValidatedLatLng] = useState({
    lat: null,
    lng: null
  })


  const [isAddressValidated, setIsAddressValidated] = useState(false)

  const [isAddressValidationLoading, setisAddressValidationLoading] = useState(true)


  const handleAddressValidation = async () => {
    const address = `${businessDetails.address.street} ${businessDetails.address.landmark} ${businessDetails.address.pincode} ${businessDetails.address.city} ${businessDetails.address.district} ${businessDetails.address.state} India`
    try{

      const res = await axios.get(`${API_URL}/api/getLatLongFromAddress?address=${address}`)
      console.log(res.data)


      setBusinessDetails((prev) => {
        return {
          ...prev,
          address : {
            ...prev.address,
            coordinates : [res.data.lng, res.data.lat]
          }
        }
      })

      setIsAddressValidated(true)
      setisAddressValidationLoading(false)

    }catch(error){
      console.log(error)
      setIsAddressValidated(false)
      setisAddressValidationLoading(false)
    }

  }

  const handleAddressChange = (e) => {
    const {name, value} = e.target

    setBusinessDetails((prev) => {
      return {
        ...prev,
        address : {
          ...prev.address,
          [name] : value
        }
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
            value={businessDetails.address.street}
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
            value={businessDetails.address.landmark}
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
              value={businessDetails.address.pincode}
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
              value={businessDetails.address.city}
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
              value={businessDetails.address.district}
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
              value={businessDetails.address.state}
              className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              onChange = {handleAddressChange}
            />
          </div>
          </div>


        </div>
{/* { !isAddressValidated && */}
        <button className="bg-blue-500 text-white mt-4 py-2 px-4 rounded-md" onClick={handleAddressValidation}>Validate Address</button>
{/* } */}
      </div>

<div className="flex-[6] mt-6">
<div className="flex flex-col w-full gap-4">
<h2 className="text-lg font-medium">Pin Point Location <span className="text-sm text-gray-500 ml-3">( Step - 2 )</span></h2>  





{ !isAddressValidated ?

<p>After validating your address you will get a map here and you will be asked to exactly pin point the location of your business</p>


:

<p>Drag the marker to the exact location of your business</p>
}



      {  businessDetails.address.coordinates[0] && businessDetails.address.coordinates[1] &&

      <div className="flex flex-col gap-4">
      <MapComponent businessDetails={businessDetails} setBusinessDetails={setBusinessDetails}/>
      </div>
}





      </div>
      </div>
      </div>

    </div>
  );
};

export default BusinessAddress;