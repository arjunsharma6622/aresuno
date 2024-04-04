import { useEffect, useState } from "react";

import { AiFillStar } from "react-icons/ai";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

import NotFound from "../NotFound/NotFound";
import { API_URL, ToastParams } from "../../utils/util";
import { LuLoader } from "react-icons/lu";
import BusinessHeader from "./components/BusinessHeader";
import Overview from "./components/BusinessOverview";
import Images from "./components/BusinessImages";
import BusinessRatings from "./components/BusinessRatings";
import BusinessPosts from "./components/BusinessPosts";
import BusinessTimings from "./components/BusinessTimings";
import BusinessFaqs from "./components/BusinessFaqs";
import BusinessAddress from "./components/BusinessAddress";

const Business = () => {
  const [business, setBusiness] = useState({});
  const [posts, setPosts] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [selectedStars, setSelectedStars] = useState(4);
  const [review, setReview] = useState("");
  const [isReviewLoading, setIsReviewLoading] = useState(false);
  const [hoveredStars, setHoveredStars] = useState(0);
  const { businessName } = useParams();
  const [isBusinessFetching, setIsBusinessFetching] = useState(true);

  const [totalRatings, setTotalRatings] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  const fullStars = Math.floor(avgRating);
  const hasHalfStar = avgRating % 1 !== 0;

  const handleStarHover = (index) => {
    setHoveredStars(index + 1);
  };

  const handleStarLeave = () => {
    setHoveredStars(0);
  };

  const handleStarClick = (index) => {
    setSelectedStars(index + 1);
  };

  const handleRating = async (e) => {
    e.preventDefault();
    try {
      setIsReviewLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to post a review", ToastParams);
        setIsReviewLoading(false);
        return;
      }

      await axios.post(
        `${API_URL}/api/rating/create/${business._id}`,
        { rating: selectedStars, review: review },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setReview("");
      setSelectedStars(4);
      setIsReviewLoading(false);
      toast.success("Thank you for your feedback", ToastParams);
    } catch (e) {
      console.error(e);
      setIsReviewLoading(false);
      toast.error("Something went wrong", ToastParams);
    }
  };

  useEffect(() => {
    fetchBusiness();
  }, []);

  const fetchBusiness = async () => {
    setIsBusinessFetching(true);
    try {
      const res = await axios.get(
        `${API_URL}/api/business/getBusinessByName/${businessName}`,
      );
      setBusiness(res.data);
      const postsRes = await axios.get(
        `${API_URL}/api/post/all-posts/${res.data._id}`,
      );
      setPosts(postsRes.data);

      const ratingsRes = await axios.get(
        `${API_URL}/api/rating/${res.data._id}`,
      );
      setRatings(ratingsRes.data.filteredRatings);
      setTotalRatings(ratingsRes.data.totalRatings);
      setAvgRating(
        ratingsRes.data.avgRating == "NaN" ? 0 : ratingsRes.data.avgRating,
      );
      setIsBusinessFetching(false);
    } catch (e) {
      setIsBusinessFetching(false);
      toast.error("Something went wrong", ToastParams);
      console.error(e);
    }
  };

  const [isEnquiryLoading, setIsEnquiryLoading] = useState(false);
  const [isEnquirySent, setIsEnquirySent] = useState(false);

  const [enquiry, setEnquiry] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleEnquirySubmit = async () => {
    setIsEnquiryLoading(true);

    try {
      const enquiryToSend = {
        ...enquiry,
      };
      enquiryToSend.business = business._id;
      enquiryToSend.category = business.category?._id;
      await axios.post(`${API_URL}/api/enquiry/create`, enquiryToSend);
      toast.success("Enquiry Sent", ToastParams);
      setEnquiry({
        name: "",
        phone: "",
        message: "",
      });
      setIsEnquiryLoading(false);
      setIsEnquirySent(true);
    } catch (err) {
      console.error(err);

      toast.error("Something went wrong", ToastParams);
      setIsEnquiryLoading(false);
    }
  };

  const openingHours = business.timing?.map((hour) => {
    if (hour.isOpen) {
      return `${hour.day.slice(0, 2)} ${hour.from}-${hour.to}`; // Assuming 17:00 as a fixed closing time
    } else {
      return `${hour.day.slice(0, 2)} Closed`;
    }
  });

  const businessStrDataStructure = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address?.street
        ? business.address?.street
        : business.address?.landmark
          ? business.address?.landmark
          : "",
      addressLocality: business.address?.city,
      addressRegion: business.address?.state,
      postalCode: business.address?.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.address?.coordinates[1],
      longitude: business.address?.coordinates[0],
    },
    description: business.description,
    name: business.name,
    telephone: business.phone,
    openingHours: openingHours,
    email: business.email,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating,
      reviewCount: business.ratings?.length,
    },
  };

  return (
    <div>
      {isBusinessFetching && (
        <div className="w-full h-[80vh] flex items-center justify-center">
          <LuLoader className="w-10 h-10 animate-spin" />
        </div>
      )}

      {!isBusinessFetching && business && (
        <div className="bg-white flex flex-col gap-6 justify-center w-full md:px-6 mt-5">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(businessStrDataStructure),
            }}
          />

          <Helmet>
            <title>{`${business.name} in ${business.address?.city} - ${business.category?.name}`}</title>
            <meta name="description" content={business.description} />
            <meta name="keywords" content={business.name} />
            <meta name="author" content="aresuno" />
            <script type="application/ld+json">
              {JSON.stringify(businessStrDataStructure)}
            </script>
            <meta
              name="geo.position"
              content={`${business.address.coordinates[1]}; ${business.address.coordinates[0]}`}
            />
            <meta name="geo.placename" content="India" />
            <meta name="geo.region" content={business.address?.city} />
          </Helmet>

          <BusinessHeader
            business={business}
            avgRating={avgRating}
            hasHalfStar={hasHalfStar}
            fullStars={fullStars}
            ratings={ratings}
          />

          <div className="w-[90%] md:w-full flex m-auto md:m-0 gap-6 mb-10 flex-col md:flex-row">
            <div className="w-full md:w-full flex flex-col gap-6 flex-[9] md:border border-solid border-[#d7d7d7] rounded-xl ">
              <div className="md:flex hidden items-center justify-between px-12 py-5 border-b">
                <div className="w-full flex items-center justify-between ">
                  <span className="">
                    <a href="#overview">Overview</a>
                  </span>
                  <span className="">
                    <a href="#photos">Images</a>
                  </span>
                  <span className="">
                    <a href="#address">Address</a>
                  </span>
                  <span className="">
                    <a href="#posts">Posts</a>
                  </span>
                  <span className="">
                    <a href="#ratings">Ratings</a>
                  </span>
                  <span className="">
                    <a href="#timings">Timings</a>
                  </span>
                  <span className="">
                    <a href="#faq">FAQ</a>
                  </span>
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center gap-4 md:gap-10 md:px-8 md:py-8 md:pt-0 pt-2">
                <Overview business={business} />

                <Images business={business} />

                <BusinessAddress business={business} />

                {business.posts?.length > 0 && (
                  <BusinessPosts business={business} />
                )}

                {ratings.length > 0 && (
                  <BusinessRatings
                    ratings={ratings}
                    avgRating={avgRating}
                    hasHalfStar={hasHalfStar}
                    fullStars={fullStars}
                  />
                )}

                <BusinessTimings business={business} />

                <BusinessFaqs business={business} />
              </div>
            </div>

            {/* business bottom right */}
            <div className="flex flex-col flex-[4.7] gap-6 sticky top-0 md:flex h-fit">
              <div className="w-full border border-gray-200 shadow-md rounded-xl py-6 pb-8 px-5">
                <div className="text-xl font-bold mb-3">
                  <span>Rate us</span>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 text-base my-2">
                    How would you rate our service?
                  </p>
                  <div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, index) => (
                        <AiFillStar
                          key={index}
                          className={`transition-all duration-75 w-8 h-8 cursor-pointer ${
                            (hoveredStars > 0 ? hoveredStars : selectedStars) >
                            index
                              ? [
                                  "text-red-500",
                                  "text-orange-500",
                                  "text-yellow-500",
                                  "text-green-600",
                                  "text-blue-500",
                                ][
                                  (hoveredStars > 0
                                    ? hoveredStars
                                    : selectedStars) - 1
                                ]
                              : "text-gray-300"
                          }`}
                          onMouseEnter={() => handleStarHover(index)}
                          onMouseLeave={handleStarLeave}
                          onClick={() => handleStarClick(index)}
                        />
                      ))}
                      {(hoveredStars > 0 ? hoveredStars : selectedStars) && (
                        <span className="ml-2 text-2xl">
                          {
                            ["😢", "😕", "😐", "🙂", "😄"][
                              (hoveredStars > 0
                                ? hoveredStars
                                : selectedStars) - 1
                            ]
                          }
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 text-base my-2 mt-4">
                    Share your experience
                  </p>

                  <div className="flex items-center flex-col gap-2">
                    <textarea
                      name="text"
                      id=""
                      cols="30"
                      placeholder="This is a very good ..."
                      rows="10"
                      value={review}
                      className=" focus:outline-none w-full h-24 bg-gray-100 rounded-md px-4 py-2 resize-none"
                      onChange={(e) => setReview(e.target.value)}
                    ></textarea>
                    <button
                      className="bg-blue-600 text-white w-full h-10 rounded-md"
                      onClick={handleRating}
                    >
                      {isReviewLoading ? (
                        <div
                          className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                          role="status"
                        >
                          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Loading...
                          </span>
                        </div>
                      ) : (
                        "Rate"
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full  border shadow-md border-gray-200 rounded-xl py-6 pb-8 px-5">
                <span className="text-xl font-bold">Any Query?</span>
                <p className="text-gray-500 text-sm my-2">
                  Write to us and we will get back to you
                </p>
                <div className="flex items-center flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full h-10 bg-gray-100 rounded-md px-4"
                    value={enquiry.name}
                    onChange={(e) =>
                      setEnquiry({ ...enquiry, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full h-10 bg-gray-100 rounded-md px-4"
                    value={enquiry.phone}
                    onChange={(e) =>
                      setEnquiry({ ...enquiry, phone: e.target.value })
                    }
                  />
                  <textarea
                    name="text"
                    id=""
                    cols="30"
                    placeholder="Message"
                    rows="10"
                    className="w-full h-32 bg-gray-100 rounded-md px-4 py-2 resize-none"
                    value={enquiry.message}
                    onChange={(e) =>
                      setEnquiry({ ...enquiry, message: e.target.value })
                    }
                  ></textarea>
                  <button
                    onClick={handleEnquirySubmit}
                    className="bg-blue-600 text-white w-full h-10 rounded-md"
                  >
                    {isEnquiryLoading ? (
                      <div
                        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                      >
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                          Loading...
                        </span>
                      </div>
                    ) : (
                      "Send"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}

      {!isBusinessFetching && !business && <NotFound />}
    </div>
  );
};

export default Business;
