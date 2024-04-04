import { useEffect, useState } from "react";
import { FiCrosshair, FiHardDrive, FiNavigation } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getBanner } from "../../../state/slices/bannerSlice";
import Header from "../../../Components/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import {
  setUserCoordinates,
  setUserLocationName,
} from "../../../state/slices/userSlice";
import { API_URL } from "../../../utils/util";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const Banner = () => {
  const bannerUrl = useSelector((state) => state.banner.url);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchBoxFocused, setIsSearchBoxFocused] = useState(false);
  // const [crds, setCrds] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [slugLocationName, setSlugLocationName] = useState("");

  const userLocationName = useSelector((state) => state.user.locationName);
  const [location, setLocation] = useState(userLocationName);

  const [autoDetectHovered, setAutoDetectHovered] = useState(false);

  const [address, setAddress] = useState("");

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
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

  const navigate = useNavigate();

  // useEffect(() => {
  //   // Initialize Google Places Autocomplete
  //   const autocomplete = new window.google.maps.places.Autocomplete(
  //     document.getElementById('location-input')
  //   );

  //   // Listen for the 'place_changed' event
  //   autocomplete.addListener('place_changed', () => {
  //     const place = autocomplete.getPlace();
  //     if (place.geometry && place.address_components) {

  //       dispatch(setUserCoordinates({lat: formattedLocation.lat, lng: formattedLocation.long}))
  //       dispatch(setUserLocationName({locationName: formattedLocation.city}))

  //       setSlugLocationName(formattedLocation.city)
  //       // Here, you can dispatch an action or set the state with the formattedLocation object as needed
  //     }
  //   });
  // }, []);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get(
          "https://aresuno-server.vercel.app/api/banner",
        );
        dispatch(getBanner(res.data[0].image));
      } catch (err) {
        console.error(err);
      }
    };

    fetchBanner();
  }, []);

  const filteredSubcategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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

  return (
    <div className="relative flex-col self-stretch flex w-full items-center max-md:max-w-full  h-[45vh] bg-gradient-to-b from-blue-600 to-blue-800">
      <div className=" z-[999] w-full">
        <Header homePage={true} />
      </div>
      <div className="gradient-overlay-top-banner h-[100%] z[-1]"></div>
      {/* <img
        loading="lazy"
        src={bannerUrl}
        className="absolute h-full w-full object-cover object-center inset-0"
        alt="banner"
      /> */}
      <div className="absolute -bottom-6 md:bottom-4 z-[10] m-auto px-5 md:px-0  max-w-[1100px] flex w-full flex-col max-md:max-w-full max-md:my-10 gap-4 md:gap-10 items-start justify-start">
        <div className="text-white   max-md:max-w-full flex flex-col gap-1 md:gap-2">
          <p className="text-2xl md:text-4xl font-bold">
            Find your next doctor
          </p>
          <p className="text-sm md:text-xl">
            at most affordable prices, from over 1000+ services
          </p>
        </div>
        <div className="relative flex flex-col md:flex-row w-full items-center justify-between gap-2 md:px-2 md:py-2 rounded-lg md:rounded-2xl">
          <div className=" flex-[4] px-4 py-2 w-full h-full flex items-center gap-2 bg-white rounded-xl relative">
            <FiNavigation className="w-6 h-6" />
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
                className={`w-48 px-2 py-2 absolute z-10 top-10 left-1/2 transform -translate-x-1/2 p-1 text-xs bg-black text-white rounded ${autoDetectHovered ? "block" : "hidden"}  transition ease-in-out duration-150`}
              >
                Click to autodetect location
              </div>
            </div>
          </div>

          <div className="flex-[4] px-4 py-2 relative w-full h-full flex items-center gap-2 bg-white rounded-xl">
            <FiHardDrive className="w-6 h-6" />
            <input
              className="py-1 focus:outline-none text-sm text-black md:text-base w-full h-full"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchBoxFocused(true)}
            />

            {searchQuery && isSearchBoxFocused && (
              <div className="absolute z-10 px-3 md:px-4 max-h-72 overflow-y-auto py-4 md:py-6 bg-white shadow-xl w-full top-8 md:top-9 rounded-b-xl left-0 text-sm md:text-base">
                <div className="flex flex-col gap-1 md:gap-2">
                  {filteredSubcategories?.map((category, index) => (
                    <Link
                      to={`/${userLocationName.toLowerCase()}/${category.name.split(" ").join("-").toLowerCase()}`}
                      key={index}
                    >
                      <p key={category.name}>{category.name}</p>
                    </Link>
                  ))}
                  {filteredSubcategories.length === 0 && (
                    <p>No results found</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="hidden md:flex flex-[2] px-4 py-2 w-full items-center h-full bg-blue-600 rounded-xl">
            <button
              className="text-base text-white text-center w-full h-full py-1"
              onClick={() =>
                navigate(`/${userLocationName.toLowerCase()}/${searchQuery}`)
              }
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
