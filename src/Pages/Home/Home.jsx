import Banner from "./components/Banner";
import ServiceCategories from "./components/ServiceCategories";
import Testimonials from "./components/Testimonials";
import AboutUs from "./components/AboutUs";
import MainCategories from "./components/MainCategories";

const Home = () => {

  return (
    <div className="bg-white flex flex-col">
      <Banner />

      <MainCategories />

      <ServiceCategories />

    </div>
  );
};

export default Home;
