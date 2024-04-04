import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FiMap, FiMapPin, FiMessageSquare, FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";
import { API_URL } from "../../../utils/util";
import axios from "axios";
import CallClick from "../../../Components/CallClickForm";
import { useSelector } from "react-redux";
import EnquiryForm from "../../../Components/EnquiryForm";

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
        `${API_URL}/api/rating/${business._id}`,
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
          },
        );

        window.location.href = `tel:${business.phone}`;
      } catch (err) {
        console.error(err);
      }
    } else {
      setCallClick(true);
    }
  };

  const onClose = () => {
    setCallClick(false);
  };

  const commonIconProps = {
    className:
      "text-[#1467E5] h-5 w-5 md:h-6 md:w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };
  const businessLinks = [
    {
      link: "website",
      icon: "website.png",
    },
    {
      link: "instagram",
      icon: "instagram.png",
    },
    {
      link: "whatsapp",
      icon: "whatsapp.png",
    },
    {
      link: "twitter",
      icon: "twitter.png",
    },
    {
      link: "facebook",
      icon: "facebook.png",
    },
    {
      link: "youtube",
      icon: "youtube.png",
    },
  ];
  return (
    <div
      className="flex md:flex-row md:gap-3 flex-col border rounded-2xl relative overflow-hidden"
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
            className="w-full h-full aspect-[20/9] md:aspect-auto object-cover rounded-tl-lg rounded-bl-lg"
          />
        </Link>
      </div>

      <div className="bg-white flex-[9] py-2 md:flex-[8] w-full rounded-tr-lg rounded-br-lg flex flex-col justify-between gap-6 md:gap-4">
        <div className="flex px-4 flex-col gap-3 justify-between">
          <div className="text-base md:text-lg border-b pb-2 items-center gap-4 border-gray-300">
            <div className="flex items-center justify-between">
              <div className="flex items-start md:items-center gap-2">
                <div className="hidden md:flex">
                  <img
                    src={
                      business.images.logo
                        ? business.images.logo
                        : "/assets/images/businessLogo.png"
                    }
                    alt=""
                    className="md:w-10 md:h-10 w-8 h-8 rounded-full object-cover"
                  />
                </div>
                <h1 className="md:text-xl text-lg font-semibold">
                  {business.name}

                  <div className="flex md:flex-row flex-col items-start md:items-center gap-1 md:gap-3">
                    <div className="flex items-center gap-4 md:flex md:gap-3">
                      <div className="flex gap-1 text-sm font-normal items-center">
                        <span className="text-sm font-normal">
                          {business.address?.district}
                        </span>

                        <FiMapPin className="w-4 h-4 text-blue-500" />
                      </div>

                      <span className="w-1 h-1 rounded-full hidden md:flex bg-black"></span>

                      <Link
                        target="_blank"
                        to={`https://www.google.com/maps/dir//${business.address.coordinates[1]},${business.address.coordinates[0]}/@${business.address.coordinates[1]},${business.address.coordinates[0]},17.66z?entry=ttu`}
                        className="flex gap-2 text-sm font-normal items-center"
                      >
                        <span className="text-sm font-normal">Directions</span>

                        <FiMap className="w-4 h-4 text-blue-500" />
                      </Link>
                    </div>

                    <span className="w-1 h-1 rounded-full hidden md:flex bg-black"></span>

                    <div className="flex gap-1 items-center">
                      {avgRating ? (
                        <div className="flex gap-4">
                          <div className="flex items-center">
                            {[...Array(Math.round(avgRating))].map(
                              (_, index) => (
                                <AiFillStar
                                  key={index}
                                  className="text-yellow-500 w-4 h-4"
                                />
                              ),
                            )}
                            {[...Array(5 - Math.round(avgRating))].map(
                              (_, index) => (
                                <AiFillStar
                                  className="text-gray-300 h-4 w-4"
                                  key={index}
                                />
                              ),
                            )}
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
                          {/* {item.icon} */}
                          <img
                            src={`/assets/images/socials/${item.icon}`}
                            alt=""
                          />
                        </div>
                      </a>
                    )
                  );
                })}
              </div>

              <div className="flex gap-2 flex-wrap">
                {business.services?.slice(0, 3).map((service, index) => (
                  <span
                    key={index}
                    className="text-[10px] md:text-xs px-3 py-[5px] bg-gray-200 text-black rounded-full"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <p className="text-xs md:text-sm truncated-description-2">
                {business.description}
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-2 w-full md:gap-4 md:mt-2 justify-start items-center">
            <button
              className="w-full md:w-fit px-2 py-2 md:px-6 md:py-2 border border-blue-500 text-blue-500 rounded-xl"
              onClick={handleCallClick}
            >
              <a className="flex text-sm md:text-base font-medium items-center gap-3 justify-center">
                <FiPhoneCall className="w-5 h-5 md:w-5 md:h-5" />
                Call Now
              </a>
            </button>
            <button
              onClick={() => setShowEnquiryForm(true)}
              className="w-full md:w-fit text-sm md:text-base  font-medium md:px-6 px-3 py-2  md:py-2 text-white bg-blue-500 flex items-center justify-center gap-3 rounded-xl"
            >
              <FiMessageSquare className="w-5 h-5 md:w-5 md:h-5" />
              Enquire
            </button>
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
