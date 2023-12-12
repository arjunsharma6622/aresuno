import Banner from "./components/Banner";
import ServiceCategories from "./components/ServiceCategories";
import Testimonials from "./components/Testimonials";
import AboutUs from "./components/AboutUs";

const Home = () => {

  return (
    <div className="bg-white flex flex-col">
      <Banner />

      <ServiceCategories />

    </div>
  );
};

export default Home;
