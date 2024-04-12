import Pricing from "./components/Pricing";
import PackageHead from "./components/PackageHead";
import HeadComponent from "../../Components/Common/HeadComponent";

const PackageSection = () => {
  return (
    <>
      <HeadComponent _title={"Packages"}></HeadComponent>
      <div className="bg-white flex items-center justify-center">
        <div className="w-[90%] mx-auto flex flex-col gap-32 mt-6 md:mt-16">
          <PackageHead />
          <Pricing />
        </div>
      </div>
    </>
  );
};

export default PackageSection;
