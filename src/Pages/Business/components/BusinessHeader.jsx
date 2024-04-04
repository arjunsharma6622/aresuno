import { useState } from "react";
import { BiCheckShield } from "react-icons/bi";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiMessageSquare, FiPhone } from "react-icons/fi";
import { isStoreOpenNow } from "../../../utils/businessPageUtils";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import CallClickForm from "../../../Components/CallClickForm";
import EnquiryForm from "../../../Components/EnquiryForm";
import { toast } from "react-toastify";
import { ToastParams } from "../../../utils/util";
import axios from "axios";
import { API_URL } from "../../../utils/util";

const BusinessHeader = ({
  business,
  avgRating,
  fullStars,
  hasHalfStar,
  ratings,
}) => {
  const [callClick, setCallClick] = useState(false);
  const [enquiryClick, setEnquiryClick] = useState(false);
  const handleCallNow = async () => {
    if (user.name) {
      try {
        await axios.post(`${API_URL}/api/call-lead/createLoggedInLead`, {
          name: user.name,
          phone: user.phone ? user.phone : "-",
          business: business._id,
        });

        window.location.href = `tel:${business.phone}`;
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong.", ToastParams);
      }
    } else {
      setCallClick(true);
    }
  };

  const handleFollowBusiness = async () => {
    //pass
  };

  const handleUnfollowBusiness = async () => {
    //pass
  };

  const businessLinks = [
    {
      link: "website",
      icon: "website",
    },
    {
      link: "instagram",
      icon: "instagram",
    },
    {
      link: "whatsapp",
      icon: "whatsapp",
    },
    {
      link: "twitter",
      icon: "twitter",
    },
    {
      link: "facebook",
      icon: "facebook",
    },
    {
      link: "youtube",
      icon: "youtube",
    },
  ];
  return (
    <div className="w-full md:border border-solid border-gray-300 rounded-xl  flex justify-center flex-col">
      <div className="relative">
        <img
          src={business.images.cover}
          alt=""
          className="rounded-tr-xl rounded-tl-xl aspect-[10/3] md:aspect-[20/3] object-cover w-full"
        />

        <div className="absolute md:left-10 md:-bottom-7 left-4 -bottom-4">
          <div className="relative">
            <img
              src={
                business.images?.logo
                  ? business.images.logo
                  : "/assets/images/businessLogo.png"
              }
              alt=""
              className="md:w-24 md:h-24 w-16 h-16 bg-white object-cover rounded-full shadow-md"
            />
            <div
              className={`absolute top-1 right-1 justify-center  flex items-center w-5 h-5 text-xs md:text-xs rounded-full font-medium border-white border-2 ${
                isStoreOpenNow(business) ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex md:flex-row flex-col mt-3 w-full md:p-6 md:px-10 md:items-start md:justify-start">
        <div className="flex md:flex-[9] py-2 justify-center items-center">
          <div className="w-full bg-cover bg-center">
            <div className="flex flex-col md:flex-row md:gap-6 justify-start items-center">
              <div className="md:flex-[8] mt-2 md:mt-0 w-[90%] flex flex-col gap-1 justify-start items-start">
                <div className="text-black flex-col flex justify-start items-start">
                  <span className="text-xl md:text-3xl font-bold">
                    {business.name}
                  </span>

                  <div className="flex items-center justify-start gap-2">
                    <span className="text-gray-800 text-sm md:text-base font-medium">
                      {business.category?.name}
                    </span>

                    <div className="rounded-full w-1 h-1 bg-gray-500"></div>

                    <div className="flex items-center text-xs">
                      <span className="text-gray-600 text-sm font-normal">
                        {business.address?.city}
                      </span>
                    </div>

                    <div className="rounded-full w-1 h-1 bg-gray-500"></div>

                    <span className="flex items-center gap-1 text-xs">
                      <BiCheckShield className="text-green-600 w-5 h-5 md:w-6 md:h-6" />
                      Verified
                    </span>
                  </div>
                </div>

                {avgRating ? (
                  <div className="flex items-center gap-3 md:gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-black text-sm md:text-lg font-semibold">
                        {avgRating ? avgRating : "-"}
                      </span>

                      <div className="flex items-center gap-1">
                        {[...Array(fullStars ? fullStars : 0)].map(
                          (_, index) => (
                            <BsStarFill
                              key={index}
                              className="text-yellow-500 w-3 h-3 md:w-4 md:h-4"
                            />
                          ),
                        )}

                        {hasHalfStar && (
                          <BsStarHalf className="text-yellow-500 w-3 h-3 md:w-4 md:h-4" />
                        )}

                        {[
                          ...Array(
                            5 -
                              (fullStars ? fullStars : 0) -
                              (hasHalfStar ? 1 : 0),
                          ),
                        ].map((_, index) => (
                          <BsStar
                            key={index}
                            className="text-gray-300 w-3 h-3 md:w-4 md:h-4"
                          />
                        ))}
                      </div>
                    </div>

                    <a href="#ratings">
                      <span className="text-gray-black text-xs md:text-sm text-blue-500">
                        {ratings?.length} ratings
                      </span>
                    </a>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">
                      No ratings yet
                    </span>
                  </div>
                )}

                <div className="w-fit flex mt-1 items-center justify-start gap-2 md:gap-3">
                  {businessLinks.map((item, index) => {
                    return (
                      business.socialLinks?.[item.link] && (
                        <a
                          key={index}
                          href={business.socialLinks?.[item.link]}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <div
                            key={index}
                            className="cursor-pointer relative rounded-full md:h-7 md:w-7 w-6 h-6"
                          >
                            <img
                              src={`/assets/images/socials/${item.icon}.png`}
                              alt=""
                            />
                          </div>
                        </a>
                      )
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:flex-[3] flex-col border-t pt-4 md:border-none md:pt-0  gap-4 justify-center items-center">
          <div className=" flex md:flex-col flex-col w-full justify-center items-center gap-4 md:gap-2">
            <button
              className="w-full flex items-center justify-center gap-2 p-2  rounded-full border border-solid border-blue-600 text-sm md:text-base"
              onClick={handleFollowBusiness}
            >
              <RiUserFollowLine className="text-blue-600 w-5 h-5 md:w-6 md:h-6" />
              <span className="text-blue-600 font-semibold">
                <span>Follow Business</span>
              </span>
            </button>
            <button
              className="w-full flex items-center justify-center gap-2 p-2  rounded-full border border-solid border-red-600 text-sm md:text-base"
              onClick={handleUnfollowBusiness}
            >
              <RiUserUnfollowLine className="text-red-600 w-5 h-5 md:w-6 md:h-6" />
              <span className="text-red-600 font-semibold">
                <span>Unfollow Business</span>
              </span>
            </button>

            <div className="flex items-center gap-2 w-full">
              <button
                className="w-full flex items-center justify-center gap-2 p-2  rounded-full bg-blue-600 text-sm md:text-base"
                onClick={() => setEnquiryClick(true)}
              >
                <FiMessageSquare className="text-white w-5 h-5 md:w-6 md:h-6" />
                <span className="text-white text-sm font-semibold">
                  Enquire Now
                </span>
              </button>
              <button
                className="w-full flex items-center justify-center gap-2 p-2  rounded-full bg-blue-600 text-sm md:text-base"
                onClick={handleCallNow}
              >
                <FiPhone className="text-white w-5 h-5 md:w-6 md:h-6" />
                <span className="text-white text-sm font-semibold">
                  <span>Call Now</span>
                </span>
              </button>
              {callClick && (
                <CallClickForm
                  business={business}
                  onClose={() => setCallClick(false)}
                />
              )}

              {enquiryClick && (
                <EnquiryForm onClose={() => setEnquiryClick(false)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessHeader;
