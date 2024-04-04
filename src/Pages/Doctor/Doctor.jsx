import Banner from "./components/Banner";
import MainCategories from "./components/MainCategories";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getBanner } from "../../state/slices/bannerSlice";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { userLogout } from "../../state/slices/userSlice";
import { toast } from "react-toastify";
import { API_URL } from "../../utils/util";
import { setAllCategories } from "../../state/slices/categoriesSlice";
import { setAllCategoryTitle } from "../../state/slices/categoriestitleSlice";

const Doctor = () => {
  const dispatch = useDispatch();

  const fetchBanner = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/banner`);
      dispatch(getBanner(res.data[0].image));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.get(`${API_URL}/api/userData`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      toast.error(err.response.data.message);
      if (err.response.data.message === "Unauthorized") {
        localStorage.removeItem("token");
        dispatch(userLogout());
      }
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchBanner();
  }, []);

  const fetchAllCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/category/`);
      const resTitles = await axios.get(`${API_URL}/api/category-title/`);
      dispatch(setAllCategories(res.data));
      dispatch(setAllCategoryTitle(resTitles.data));
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };
  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <div className="bg-white flex flex-col gap-4">
      <Helmet>
        <title>Aresuno - Home</title>
        <meta name="description" content="Aresuno - Home" />
        <meta name="keywords" content="Aresuno - Home" />
        <meta name="author" content="Aresuno - Home" />
        <link rel="canonical" href="https://www.aresuno.com" />
        <meta
          name="description"
          content="Explore and discover a wide range of services on Aresuno. Find ratings, reviews, images, and addresses for different services. Your go-to platform for service recommendations."
        />
        <meta
          name="keywords"
          content="services, ratings, reviews, images, addresses, Aresuno, discover services"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Aresuno - Discover and Rate Services"
        />
        <meta
          property="og:description"
          content="and discover a wide range of services on Aresuno. Find ratings, reviews, images, and addresses for different services. Your go-to platform for service recommendations."
        />
        <meta property="og:url" content="https://www.aresuno.com/" />
        <meta property="og:site_name" content="Aresuno" />
      </Helmet>

      <Banner />
      <MainCategories />
      {/* <ServiceCategories /> */}
      <div className="bg-gray-300 h-[120px] md:h-[300px] w-full mt-5"></div>
    </div>
  );
};

export default Doctor;
