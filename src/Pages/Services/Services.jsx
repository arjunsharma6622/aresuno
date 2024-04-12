import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ServiceCard from "./components/ServiceCard";
import ServiceCardSkeleton from "./components/ServiceCardSkeleton";
import { API_URL, ToastParams } from "../../utils/util";
import EnquiryForm from "../../Components/EnquiryForm";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";

const Services = () => {
  const [allBusinesses, setAllBusinesses] = useState([]);
  const { categoryName, city } = useParams();
  const extractedCity = city.split("-").join(" ");
  const extractedName = categoryName.split("-").join(" ");
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState({});
  const [cityCoordinates, setCityCoordinates] = useState([]);

  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [showEnquiryForm2, setShowEnquiryForm2] = useState(false);

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
      enquiryToSend.category = category?._id;
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

  const [blogs, setBlogs] = useState([]);

  const fetchCategoryBlogs = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/blog/category/${extractedName}`,
      );
      setBlogs(res.data);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const fetchCategory = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/category/${extractedName}`);
      setCategory(res.data);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowEnquiryForm2(true);
    }, 1000);
    fetchCategoryBlogs();
    fetchCategory();
  }, [extractedName]);

  const coordinates = useSelector((state) => {
    return state.user.coordinates;
  });

  const subCategoryId = useSelector((state) => {
    // Use flatMap to flatten the array of subcategories
    const categories = state.categories;

    // Find the subcategory with the matching name
    const matchingSubcategory = categories.find(
      (category) => category.name.toLowerCase() === extractedName,
    );

    // Return the _id if a matching subcategory is found
    return matchingSubcategory ? matchingSubcategory._id : null;
  });

  const fetchAllBusinessesByCategory = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get(
        `${API_URL}/api/business/getNearbyBusinesses?lat=${coordinates.lat}&long=${coordinates.lng}&categoryName=${extractedName}&city=${city}`,
      );
      setAllBusinesses(res.data.businesses);
      setCityCoordinates(res.data.coordinates);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowEnquiryForm(true);
    }, 10000);

    fetchAllBusinessesByCategory();
  }, []);

  return (
    <div className="relative">
      <Helmet>
        <title>{`Find best ${extractedName} near ${extractedCity}`}</title>
        <meta
          name="description"
          content={
            category.description
              ? category.description
              : `Find best ${extractedName} near ${extractedCity}`
          }
        />
        <meta
          name="keywords"
          content={
            category.keywords
              ? category.keywords
              : `${extractedName}, ${extractedCity}`
          }
        />
        <meta
          name="geo.position"
          content={`${cityCoordinates[1]}; ${cityCoordinates[0]}`}
        />
        <meta name="geo.placename" content="India" />
        <meta name="geo.region" content={`${city}`} />
      </Helmet>
      {isLoading ? (
        <div className="md:p-10">
          <h1 className="text-lg md:text-3xl font-semibold text-center">
            Find the service you want
          </h1>
          <p className="text-sm md:text-base md:mb-8 mb-6 text-center ">
            Total of {allBusinesses.length} {extractedName} available in{" "}
            {extractedCity}
          </p>
          <div className="flex md:gap-16">
            <div className="flex flex-col gap-6 w-[85%] flex-[10] mx-auto mb-8 px-4 md:px-10">
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
            </div>
          </div>
        </div>
      ) : (
        allBusinesses.length > 0 && (
          <div className="flex items-start m-auto mt-4  justify-start md:w-full w-[90%] md:gap-6 md:p-10">
            <div className=" w-full">
              <div>
                <h1 className=" text-xl text-center md:text-3xl font-semibold">
                  Find the service you want
                </h1>
                <p className="text-sm text-center md:text-base md:mb-8 mb-6 ">
                  Total of {allBusinesses.length} {extractedName} available in{" "}
                  {extractedCity}
                </p>
              </div>

              <div className="flex md:flex-row flex-col justify-start gap-5">
                <div className="flex  flex-col md:gap-6 flex-[8.5] gap-4 md:px-0 w-full md:w-full mb-8">
                  {allBusinesses?.map((business) => (
                    <ServiceCard key={business._id} business={business} />
                  ))}
                </div>

                <div className="sticky top-5 hidden md:flex flex-[3.5] h-fit">
                  <div className="w-full border shadow-md border-gray-200 rounded-xl py-6 pb-8 px-5">
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
            </div>
          </div>
        )
      )}

      {!isLoading && allBusinesses.length === 0 && (
        <>
          {showEnquiryForm2 && (
            <EnquiryForm showCloseIcon={false} categoryId={subCategoryId} />
          )}
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default Services;
