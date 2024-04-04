import { FiEdit2, FiExternalLink, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const AllBusinesses = ({ businesses, categories }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://aresuno-server.vercel.app/api/business/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-xl">
        <table className="w-full text-sm table-auto">
          <thead className="">
            <tr className="bg-gray-300">
              <th className="px-2 text-center py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                SNo
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owned
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email/Phone
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edit
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {businesses.map((business, index) => (
              <tr key={index}>
                <td className="px-2 text-center py-4 whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  <div className="flex gap-2 items-center">
                    {business.name}
                    <Link
                      to={`/business/${business.name
                        .split(" ")
                        .join("-")
                        .toLowerCase()}`}
                    >
                      <FiExternalLink className="text-blue-500 w-4 h-4 cursor-pointer" />
                    </Link>
                  </div>
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  {business.vendorName}
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  {new Date(business.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  {business.category.name}
                </td>
                <td className="px-2 py-4 whitespace-nowrap flex flex-col">
                  <span>{business.phone}</span>
                  <span>{business.email}</span>
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  <Link
                    to={`/business/edit/${business._id}`}
                    className="flex gap-2 items-center justify-start text-gray-500"
                  >
                    <FiEdit2 className="text-gray-500 w-5 h-5 cursor-pointer" />
                  </Link>
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  <FiTrash2
                    className="text-red-500 w-5 h-5 cursor-pointer"
                    onClick={() => handleDelete(business._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBusinesses;
