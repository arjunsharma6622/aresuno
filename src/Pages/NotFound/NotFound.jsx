import { FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center w-full justify-center h-[90vh] bg-gray-100">
      <div className="px-4 md:w-[50%] text-center flex flex-col gap-6 items-start ">
        <img src="./assets/error.png" alt="" className="w-32" />

        <div className="flex flex-col items-start">
          <h1 className=" text-4xl md:text-6xl font-semibold text-red-500 mb-4">
            404
          </h1>
          <p className="text-2xl mb-4">Oops! Page not found.</p>
          <p className="text-gray-500 mb-4 text-start">
            The page you are looking for does not exist or might have been
            removed.
          </p>
        </div>

        <button className="bg-blue-500 text-white px-4 py-3 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          <Link to="/" className="flex items-center gap-2">
            <FiHome className="w-5 h-5" />
            Go Home
          </Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
