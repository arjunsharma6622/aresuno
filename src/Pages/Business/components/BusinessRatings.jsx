import { AiFillStar } from "react-icons/ai";
import { BsStar, BsStarFill } from "react-icons/bs";
import { FiStar } from "react-icons/fi";
import { daysAgoFormatDate } from "../../../utils/businessPageUtils";
import { BsStarHalf } from "react-icons/bs";

const BusinessRatings = ({ ratings, avgRating, hasHalfStar, fullStars }) => {
  return (
    <div
      className="w-full flex flex-col border-b pb-4 md:pb-10 border-b-gray-300"
      id="ratings"
    >
      <div className="flex gap-3 items-center md:gap-4">
        <FiStar className="text-black w-5 h-5 md:w-6 md:h-6" />
        <h2 className="text-lg md:text-2xl font-bold text-black">Ratings</h2>
      </div>

      {avgRating ? (
        <div className="grid grid-cols-1 gap-6 mt-4 md:gap-8 md:mt-8">
          <div className="flex flex-col gap-2 md:gap-3">
            <div className="flex items-center gap-4">
              <div className="">
                <div className="flex items-center gap-1">
                  {[...Array(fullStars ? fullStars : 0)].map((_, index) => (
                    <BsStarFill
                      key={index}
                      className="text-yellow-500 w-5 h-5 mdw-6 md:h-6"
                    />
                  ))}

                  {hasHalfStar && (
                    <BsStarHalf className="text-yellow-500 w-5 h-5 mdw-6 md:h-6" />
                  )}

                  {[
                    ...Array(
                      5 - (fullStars ? fullStars : 0) - (hasHalfStar ? 1 : 0),
                    ),
                  ].map((_, index) => (
                    <BsStar
                      key={index}
                      className="text-gray-300 w-5 h-5 mdw-6 md:h-6"
                    />
                  ))}
                </div>
              </div>

              <span className="flex items-center gap-2">
                <span className="text-black text-sm md:text-base">
                  {avgRating} out of 5
                </span>
              </span>
            </div>

            <span className="text-gray-600 text-xs md:text-sm">
              {ratings?.length === 0
                ? "No ratings yet"
                : ratings?.length === 1
                  ? "1 rating"
                  : `${ratings?.length} ratings`}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {[...ratings]?.reverse().map((rating, index) => (
              <div
                key={index}
                className="flex items-start justify-start gap-2 md:gap-4 w-full"
              >
                <div className="">
                  <img
                    loading="lazy"
                    src={
                      rating.user?.image ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt=""
                    className="w-8 md:w-9 md:h-9 rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1 md:gap-2 w-full">
                  <div className="">
                    <span className="text-sm md:text-base">
                      {rating.user.name}
                    </span>
                    <div className="flex gap-4 mt-0  md:mt-1">
                      <div className="flex items-center">
                        {[...Array(rating.rating)].map((_, index) => (
                          <AiFillStar
                            key={index}
                            className="text-yellow-500 w-3 h-3 md:w-4 md:h-4"
                          />
                        ))}
                        {[...Array(5 - rating.rating)].map((_, index) => (
                          <AiFillStar
                            key={index}
                            className="text-gray-300 w-3 h-3 md:w-4 md:h-4"
                          />
                        ))}
                      </div>
                      <div className="text-gray-500 text-xs mr-4">
                        {daysAgoFormatDate(rating.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className=" font-normal text-xs md:text-sm">
                      {rating.review}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <span className="text-gray-600">No ratings yet</span>
        </div>
      )}
    </div>
  );
};

export default BusinessRatings;
