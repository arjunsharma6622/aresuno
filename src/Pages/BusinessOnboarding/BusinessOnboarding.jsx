import { useSelector } from "react-redux";
import BusinessRegister from "../BusinessRegister/BusinessRegister";

const BusinessOnboarding = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="flex h-screen">
      <div className="relative lg:block hidden h-full flex-[5]">
        <img
          src="https://papers.co/wallpaper/papers.co-vz49-polygon-blue-texture-abstract-pattern-background-23-wallpaper.jpg"
          alt=""
          className="object-cover h-full"
        />
        <div>
          <div className="absolute top-6 flex flex-col items-center left-1/2 w-[90%] transform -translate-x-1/2 ">
            <span className="text-xl">Hello👋 {user.name}</span>

            <h2 className="mt-2 text-center text-3xl font-bold text-gray-900">
              Register Your Business
            </h2>
          </div>
        </div>
      </div>

      <div className="flex-[7] overflow-y-auto px-10">
        <BusinessRegister />
      </div>
    </div>
  );
};

export default BusinessOnboarding;
