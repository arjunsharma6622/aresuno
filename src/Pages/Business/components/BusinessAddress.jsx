import { FiNavigation } from "react-icons/fi";

const BusinessAddress = ({ business }) => {
  return (
    <div id="address" className="w-full border-b pb-10 border-b-gray-300">
      <div className="flex items-center gap-3 md:gap-4">
        <FiNavigation className="text-black w-5 h-5 md:w-6 md:h-6" />
        <h2 className="text-lg md:text-2xl font-bold text-black">Address</h2>
      </div>
      <div className="my-4">
        <p className="text-gray-600 text-sm md:text-base">
          {`${business.address?.street}, ${business.address?.city}, ${business.address?.pincode}, ${business.address?.state}, India`}
        </p>
      </div>

      <iframe
        width="100%"
        height="400"
        loading="lazy"
        allowFullScreen
        className="rounded-xl h-[240px] md:h-[400px] border-none"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyABgLLjLKkUT86jshhsoWlWY8VXV8hi9oY&q=${business.address.coordinates[1]},${business.address.coordinates[0]}`}
      ></iframe>
    </div>
  );
};

export default BusinessAddress;
