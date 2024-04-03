import { BsStarFill } from "react-icons/bs";

const Reviews = ({ Reviews }) => {
  const extract6Words = (text) => {
    const words = text.split(" ");
    return words.slice(0, 12).join(" ");
  };
  return (
    <div>
      <h1 className="text-lg md:text-2xl font-semibold mt-6 md:mt-0 mb-3 md:mb-6">
        All the Ratings & Reviews
      </h1>

      <div className="bg-white rounded-xl overflow-auto">
        <table className="md:w-full ">
          <thead className="">
            <tr className="bg-blue-500">
              <th className="px-6 py-3 text-left text-xs font-medium text-white">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white">
                Ratings
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-xs md:text-sm">
            {Reviews.map((review, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{review.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2 items-center">
                    {extract6Words(review.content)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-1">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <BsStarFill key={i} className="text-gray-500" />
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reviews;
