import { BsStarFill } from "react-icons/bs";

const Reviews = ({ businesses }) => {
  return (
    <div>
      <h1 className="text-lg md:text-2xl font-semibold mt-6 md:mt-0 mb-3 md:mb-6">
        All the Ratings & Reviews
      </h1>

      <div className="bg-white rounded-xl overflow-auto">
        <table className="md:w-full ">
          <thead className="">
            <tr className="bg-gray-300">
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Name
              </th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                Business
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                Review
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-xs md:text-sm">
            {businesses.map((business) =>
              [...business.ratings].reverse().map((ratingReview, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {business.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2 items-center">
                      {ratingReview?.rating}
                      <BsStarFill className="text-gray-500" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {ratingReview.review}
                  </td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reviews;
