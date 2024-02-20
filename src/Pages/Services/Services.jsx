import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ServiceCard from "./components/ServiceCard";
import ServiceCardSkeleton from "./components/ServiceCardSkeleton";
import NotFound from "../NotFound/NotFound";
import { API_URL } from "../../utils/util";
import EnquiryForm from "../../Components/EnquiryForm";
import { Helmet } from "react-helmet-async";
import BlogCard from "../Blog/BlogCard";

const Services = () => {
  const [allBusinesses, setAllBusinesses] = useState([]);
  const { categoryName, city } = useParams();
  const extractedCity = city.split("-").join(" ");
  console.log(city)
  const extractedName = categoryName.split("-").join(" ");
  console.log(extractedName);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState({});

  const [blogs, setBlogs] = useState([]);

  const fetchCategoryBlogs = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/blog/category/${extractedName}`
      )
      setBlogs(res.data);
      console.log(res.data);
    } catch (e) {
      console.log(e);
      setIsLoading(false)
    }
  };
  const fetchCategory = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/category/${extractedName}`
      )
      setCategory(res.data);
      console.log(res.data);
    } catch (e) {
      console.log(e);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchCategoryBlogs();
    fetchCategory();
  }, [extractedName]);
  

  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  const coordinates = useSelector((state) => {
    return state.user.coordinates;
  })

  const subCategoryId = useSelector((state) => {
    // Use flatMap to flatten the array of subcategories
    const categories = state.categories

    // Find the subcategory with the matching name
    const matchingSubcategory = categories.find(
      (category) => category.name.toLowerCase() === extractedName
    );

    // Return the _id if a matching subcategory is found
    return matchingSubcategory ? matchingSubcategory._id : null;
  });

  console.log(subCategoryId);

  const fetchAllBusinessesByCategory = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get(
        `${API_URL}/api/business/getNearbyBusinesses?lat=${coordinates.lat}&long=${coordinates.lng}&categoryName=${extractedName}&city=${city}`
      )
      setAllBusinesses(res.data);
      console.log(res.data);
      setIsLoading(false)
    } catch (e) {
      console.log(e);
      setIsLoading(false)
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
                  {/* <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(businessStrDataStructure),
                }}
            /> */}

            <Helmet>
                <title>{`Find Best ${extractedName} Near ${extractedCity}`}</title>
                <meta name="description" content={category.description ? category.description : `Find Best ${extractedName} Near ${extractedCity}`} />
                <meta name="keywords" content={category.keywords ? category.keywords : `${extractedName}, ${extractedCity}`} />
            </Helmet>
      {
        isLoading ? (

          <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-center md:mt-10 mt-6 md:mb-4">
            Find the service you want
          </h1>
          <p className="md:mb-8 mb-6 text-center ">
            Total of {allBusinesses.length} {extractedName} available in {extractedCity}
          </p>
      

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-[85%] mx-auto mb-8">
                    <ServiceCardSkeleton />
                    <ServiceCardSkeleton />
                    <ServiceCardSkeleton />
                    <ServiceCardSkeleton />
                  </div>

                  </div>
        ) : 

        allBusinesses.length > 0 && (

          <div>
            {showEnquiryForm && <EnquiryForm categoryId={subCategoryId} onClose={() => setShowEnquiryForm(false)}/>}
          <h1 className="text-2xl md:text-3xl font-semibold text-center md:mt-10 mt-6 md:mb-4">
            Find the service you want
          </h1>
          <p className="md:mb-8 mb-6 text-center ">
            Total of {allBusinesses.length} {extractedName} available in {extractedCity}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-4 w-[90%] md:w-[95%] mx-auto mb-8">
          {allBusinesses?.map((business) => (
            <ServiceCard key={business._id} business={business} />
          ))}
        </div>
        </div>
        )
      }
      
        
        {
          !isLoading && allBusinesses.length === 0 && (
            <NotFound />
          )
        }

        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-center md:mt-10 mt-6 md:mb-4">
            Blogs
          </h1>
          <p className="md:mb-8 mb-6 text-center ">
            Total of {blogs.length} blogs available
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-[85%] mx-auto mb-8">
          {/* {blogs?.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))} */}
        </div>
        </div>
    </div>
  );
};

export default Services;
