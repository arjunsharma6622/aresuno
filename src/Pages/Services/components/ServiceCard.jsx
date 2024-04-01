import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineWhatsApp } from "react-icons/ai";
import {
  FiExternalLink,
  FiFacebook,
  FiInstagram,
  FiMapPin,
  FiMessageCircle,
  FiMessageSquare,
  FiPhoneCall,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { API_URL } from "../../../utils/util";
import axios from "axios";
import CallClick from "../../../Components/CallClickForm";
import { useSelector } from "react-redux";
import EnquiryForm from "../../../Components/EnquiryForm";
import { CgWebsite } from "react-icons/cg";

const ServiceCard = ({ business }) => {
  const user = useSelector((state) => state.user);

  const [ratings, setRatings] = useState([]);
  const [callClick, setCallClick] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [avgRating, setAvgRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  const openingHours = business.timing?.map((hour) => {
    if (hour.isOpen) {
      return `${hour.day.slice(0, 2)} ${hour.from}-${hour.to}`; // Assuming 17:00 as a fixed closing time
    } else {
      return `${hour.day.slice(0, 2)} Closed`;
    }
  });

  const businessStrDataStructure = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address?.street
        ? business.address?.street
        : business.address?.landmark
        ? business.address?.landmark
        : "",
      addressLocality: business.address?.district,
      addressRegion: business.address?.state,
      postalCode: business.address?.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.address?.coordinates[1],
      longitude: business.address?.coordinates[0],
    },
    description: business.description,
    name: business.name,
    telephone: business.phone,
    openingHours: openingHours,
    email: business.email,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating,
      reviewCount: business.ratings?.length,
    },
  };

  useEffect(() => {
    const fetchRatings = async () => {
      const ratingsRes = await axios.get(
        `${API_URL}/api/rating/${business._id}`
      );
      setRatings(ratingsRes.data.filteredRatings);
      setAvgRating(parseInt(ratingsRes.data.avgRating));
      setTotalRatings(ratingsRes.data.totalRatings);
    };
    fetchRatings();
  }, []);

  const handleCallClick = async () => {
    if (user.name) {
      try {
        const res = await axios.post(
          `${API_URL}/api/call-lead/createLoggedInLead`,
          {
            name: user.name,
            phone: user.phone ? user.phone : "-",
            business: business._id,
          }
        );

        console.log(res.data);

        window.location.href = `tel:${business.phone}`;
      } catch (err) {
        console.log(err);
      }
    } else {
      setCallClick(true);
    }
  };

  const onClose = () => {
    setCallClick(false);
  };


  const businessLinks = [
    {
        link: "website",
        icon: (
            <CgWebsite className="text-[#1467E5] h-5 w-5 md:h-6 md:w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        ),
    },
    {
        link: "instagram",
        icon: (
            <FiInstagram className="text-[#1467E5] h-5 w-5 md:h-6 md:w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        ),
    },
    {
        link: "whatsapp",
        icon: (
            <AiOutlineWhatsApp className="text-[#1467E5] h-5 w-5 md:h-6 md:w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        ),
    },
    {
        link: "twitter",
        icon: (
            <FiTwitter className="text-[#1467E5] h-5 w-5 md:h-6 md:w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        ),
    },
    {
        link: "facebook",
        icon: (
            <FiFacebook className="text-[#1467E5] h-5 w-5 md:h-6 md:w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        ),
    },
    {
        link: "youtube",
        icon: (
            <FiYoutube className="text-[#1467E5] h-5 w-5 md:h-6 md:w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        ),
    },
];

  return (
    <div
      className="flex md:flex-row flex-col border rounded-2xl relative overflow-hidden"
      key={business._id}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessStrDataStructure),
        }}
      />

      <div className="flex-[3] relative">
        <Link
          to={`/business/${business.name.split(" ").join("-").toLowerCase()}`}
        >
          <img
            loading="lazy"
            src={business.images.cover}
            alt=""
            className="w-full h-full object-cover rounded-tl-lg rounded-bl-lg"
          />
        </Link>
      </div>

      <div className="bg-white flex-[9] py-2 md:flex-[8] w-full rounded-tr-lg rounded-br-lg flex flex-col justify-between gap-6 md:gap-4">
        <div className="flex px-4 flex-col gap-3 justify-between">
          <div className="text-base md:text-lg border-b pb-2 items-center gap-4 border-gray-300">
            <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>
                <img
                  src={
                    business.images.logo
                      ? business.images.logo
                      : "/assets/images/businessLogo.png"
                  }
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <h1 className="text-xl font-semibold">
                {business.name}

                <div className="flex items-center gap-3">
                <div className="flex gap-1 text-sm font-normal items-center">
                  <FiMapPin className="w-4 h-4" />

                  <span className="text-sm font-normal">
                    {business.address?.district}
                  </span>
                </div>
                
                <span className="w-1 h-1 rounded-full bg-black"></span>

                <div className="flex gap-1 items-center">
                {avgRating ? (
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      {[...Array(Math.round(avgRating))].map((_, index) => (
                        <AiFillStar key={index} className="text-yellow-500 w-4 h-4" />
                      ))}
                      {[...Array(5 - Math.round(avgRating))].map((_, index) => (
                        <AiFillStar className="text-gray-300 h-4 w-4" key={index} />
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              </div>


              </h1>

              
            </div>

              </div>
          </div>

          <div className="flex items-end gap-4 justify-between">
            <div className="flex flex-col w-full gap-2 md:gap-3">


              <div className="flex gap-2 flex-wrap">
                {business.services?.slice(0, 3).map((service, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-[5px] bg-gray-200 rounded-full"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <p className="text-sm truncated-description-2">
                {business.description}
              </p>
            </div>


          </div>



          <div className="w-fit flex mt-1 items-center justify-start gap-2 md:gap-4">
                                    {businessLinks.map((item, index) => {
                                        return (
                                            business.socialLinks?.[item.link] && (
                                                <a
                                                    key={index}
                                                    href={business.socialLinks?.[item.link]}
                                                    target="_blank"
                                                >
                                                    <div
                                                        key={index}
                                                        className="cursor-pointer relative rounded-full md:h-6 md:w-6 w-6 h-6"
                                                    >
                                                        {item.icon}
                                                    </div>
                                                </a>
                                            )
                                        );
                                    })}
                                </div>

          <div className="flex gap-4 mt-2 justify-start items-center">


<button
  className="w-fit px-2 py-2 md:px-6 md:py-2 bg-blue-500 text-white rounded-xl"
  onClick={handleCallClick}
>
  <a className="flex text-sm items-center gap-3 justify-center">
    <FiPhoneCall className="w-4 h-4 md:w-5 md:h-5" />
    Call Now
  </a>
</button>
<button
  onClick={() => setShowEnquiryForm(true)}
  className="w-fit text-sm  md:px-6 px-3 py-2  md:py-2 text-white bg-blue-500 flex items-center justify-center gap-3 rounded-xl"
>
  <FiMessageSquare className="w-4 h-4 md:w-5 md:h-5" />
  Enquire
</button>

{business.socialLinks?.whatsapp && (
                <button className="w-fit h-fit px-1 py-1 bg-green-500 rounded-full text-white">
                  <a href={`${business.socialLinks.whatsapp}`} target="_blank">
                    <AiOutlineWhatsApp className="w-6 h-6 md:w-6 md:h-6" />
                  </a>
                  
                </button>
              )}
</div>
        </div>

        {showEnquiryForm && (
          <EnquiryForm
            business={business}
            onClose={() => setShowEnquiryForm(false)}
            categoryId={business.category}
          />
        )}

        {callClick && !user.name && (
          <CallClick onClose={onClose} business={business} />
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
