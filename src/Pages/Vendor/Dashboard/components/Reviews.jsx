import React from "react";
import { BsStarFill } from "react-icons/bs";

const Reviews = ({ businesses }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">All the Ratings & Reviews</h1>

      <div className="bg-white rounded-xl">
        <table className="w-full">
          <thead className="">
            <tr className="bg-gray-300">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Review
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-sm">
            {businesses.map((business) =>
              business.ratingsReviews.map((ratingReview, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2 items-center">
                      <img
                        src={
                          ratingReview.user.image ||
                          "https://i.pravatar.cc/300"
                        }
                        alt=""
                        className="w-5 h-5 rounded-full"
                      />
                      {ratingReview.user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {business.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2 items-center">
                      {ratingReview.rating}
                      <BsStarFill className="text-gray-500" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {ratingReview.review}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reviews;
