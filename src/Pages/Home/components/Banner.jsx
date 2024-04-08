import { useEffect, useState } from "react";
import { FiHardDrive, FiNavigation } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getBanner } from "../../../state/slices/bannerSlice";
import Header from "../../../Components/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import PlaceSearch from "./PlaceSearch";

const Banner = () => {
  const bannerUrl = useSelector((state) => state.banner.url);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchBoxFocused, setIsSearchBoxFocused] = useState(false);
  const userLocationName = useSelector((state) => state.user.locationName);
  const navigate = useNavigate();

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

  return (
    <div className="relative flex-col self-stretch flex w-full items-center max-md:max-w-full  h-[45vh] bg-gradient-to-b from-blue-800 to-blue-900">
      <div className=" z-[999] w-full">
        <Header homePage={true} />
      </div>
      <div className="gradient-overlay-top-banner h-[100%] z[-1]"></div>
      <img
        loading="lazy"
        src={bannerUrl}
        className="absolute h-full w-full object-cover object-center inset-0"
        alt="banner"
      />
      <div className="absolute -bottom-6 md:bottom-4 z-[10] m-auto px-5 md:px-0  max-w-[1100px] flex w-full flex-col max-md:max-w-full max-md:my-10 gap-4 md:gap-10 items-start justify-start">
        <div className="text-white   max-md:max-w-full flex flex-col gap-1 md:gap-2">
          <p className="text-2xl md:text-4xl font-bold">
            Find your next service
          </p>
          <p className="text-sm md:text-xl">
            at most affordable prices, from over 1000+ services
          </p>
        </div>
        <div className="relative flex flex-col md:flex-row w-full items-center justify-between gap-2 md:px-2 md:py-2 rounded-lg md:rounded-2xl">
          <div className=" flex-[4] px-4 py-2 w-full h-full flex items-center gap-2 bg-white rounded-xl relative">
            <FiNavigation className="w-6 h-6" />
            <PlaceSearch></PlaceSearch>
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
                      to={`/${userLocationName.toLowerCase()}/${category.name
                        .split(" ")
                        .join("-")
                        .toLowerCase()}`}
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
