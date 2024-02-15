
import React, { useEffect, useState } from "react";
import {
    FiArrowRight,
    FiClock,
    FiFacebook,
    FiFileText,
    FiHelpCircle,
    FiImage,
    FiInbox,
    FiInstagram,
    FiMail,
    FiMessageSquare,
    FiNavigation,
    FiPhone,
    FiStar,
    FiTwitter,
    FiUploadCloud,
    FiX,
    FiYoutube,
} from "react-icons/fi";
import { AiFillStar, AiOutlineWhatsApp } from "react-icons/ai";
import { PiCalendarCheckLight } from "react-icons/pi";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { BiCheckShield, BiLoader, BiStar } from "react-icons/bi";
import axios from "axios";
import Accordion from "./components/Accordion";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

import { Person } from "schema-dts";
import { JsonLd } from "react-schemaorg";
import NotFound from "../NotFound/NotFound";
import { API_URL, ToastParams } from "../../utils/util";
import { LuLoader } from "react-icons/lu";
import CallClickForm from "../../Components/CallClickForm";
import EnquiryForm from "../../Components/EnquiryForm";




const Business = () => {
    const [business, setBusiness] = useState({});
    const [posts, setPosts] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [selectedStars, setSelectedStars] = useState(4);
    const [review, setReview] = useState("");
    const [isReviewLoading, setIsReviewLoading] = useState(false);
    const [hoveredStars, setHoveredStars] = useState(0);
    const { businessName } = useParams();
    const [isBusinessFetching, setIsBusinessFetching] = useState(true);
    const [callClick, setCallClick] = useState(false);
    const [enquiryClick ,setEnquiryClick] = useState(false);

    const user = useSelector((state) => state.user);



    const avgRating =
        ratings?.reduce((acc, item) => acc + (item.rating || 0), 0) /
        ratings?.length;

    const fullStars = Math.floor(avgRating);
    const hasHalfStar = avgRating % 1 !== 0;

    const handleStarHover = (index) => {
        setHoveredStars(index + 1);
    };

    const handleStarLeave = () => {
        setHoveredStars(0);
    };

    const handleStarClick = (index) => {
        setSelectedStars(index + 1);
    };

    const handleRating = async (e) => {
        e.preventDefault();
        try {
            setIsReviewLoading(true);
            const token = localStorage.getItem("token");
            if(!token) {
                toast.error("Please login to post a review", ToastParams);
                setIsReviewLoading(false);
                return;
            }
            const res = await axios.post(
                `${API_URL}/api/rating/create/${business._id}`,
                { rating: selectedStars, review: review },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(res);
            setReview("");
            setSelectedStars(4);
            setIsReviewLoading(false);
            toast.success("Thank you for your feedback", ToastParams);
        } catch (e) {
            console.log(e);
            setIsReviewLoading(false);
            toast.error("Something went wrong", ToastParams);
        }
    };

    useEffect(() => {

        fetchBusiness();
    }, []);

    const handleCallNow = async () => {
        if(user.name){
            try{
                const res = await axios.post(
                    `${API_URL}/api/call-lead/createLoggedInLead`,
                    {
                        name : user.name,
                        phone : user.phone ? user.phone : '-',
                        business : business._id
                    }
                )

                console.log(res.data)

                window.location.href = `tel:${business.phone}`


            }catch(err){
                console.log(err)
            }

        }
        else{
            setCallClick(true)
        }
    }



    const fetchBusiness = async () => {


        setIsBusinessFetching(true);
        try {
            const res = await axios.get(
                `${API_URL}/api/business/getBusinessByName/${businessName}`
            );
            setBusiness(res.data);
            const postsRes = await axios.get(
                `${API_URL}/api/post/all-posts/${res.data._id}`
            );
            setPosts(postsRes.data);

            const ratingsRes = await axios.get(
                `${API_URL}/api/rating/${res.data._id}`
            );
            setRatings(ratingsRes.data);
            console.log(res.data);
            setIsBusinessFetching(false);
        } catch (e) {
            setIsBusinessFetching(false);
            console.log(e);
        }
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

    const categories = useSelector((state) => state.categories);
    const businessCategory = categories.find(
        (category) => category._id === business.category
    )

    const daysAgoFormatDate = (dateString) => {
        const currentDate = new Date();
        const inputDate = new Date(dateString);

        // Check if the inputDate is today
        if (
            inputDate.getDate() === currentDate.getDate() &&
            inputDate.getMonth() === currentDate.getMonth() &&
            inputDate.getFullYear() === currentDate.getFullYear()
        ) {
            const hoursDifference = Math.round(
                (currentDate - inputDate) / (1000 * 60 * 60)
            );
            if (hoursDifference > 0) {
                return `${hoursDifference} ${hoursDifference === 1 ? "hour" : "hours"
                    } ago`;
            } else {
                return "Just now";
            }
        }

        const elapsedDays = Math.round(
            (currentDate - inputDate) / (1000 * 60 * 60 * 24)
        );

        if (elapsedDays <= 1) {
            return "Yesterday";
        } else if (elapsedDays <= 30) {
            return `${elapsedDays} ${elapsedDays === 1 ? "day" : "days"} ago`;
        } else if (elapsedDays <= 365) {
            const elapsedMonths = Math.round(elapsedDays / 30);
            return `${elapsedMonths} ${elapsedMonths === 1 ? "month" : "months"} ago`;
        } else {
            const elapsedYears = Math.round(elapsedDays / 365);
            return `${elapsedYears} ${elapsedYears === 1 ? "year" : "years"} ago`;
        }
    };

    const isStoreOpenNow = (business) => {
        const currentDate = new Date();
        const currentDay = currentDate.toLocaleDateString("en-US", {
            weekday: "long",
        });
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();

        const currentTiming = business?.timing?.find(
            (item) => item.day === currentDay
        );

        if (currentTiming && currentTiming.isOpen) {
            if (currentTiming.from && currentTiming.to) {
                const [fromHour, fromMinute] = currentTiming.from.split(":");
                const [toHour, toMinute] = currentTiming.to.split(":");

                const fromTime = new Date();
                fromTime.setHours(Number(fromHour));
                fromTime.setMinutes(Number(fromMinute));

                const toTime = new Date();
                toTime.setHours(Number(toHour));
                toTime.setMinutes(Number(toMinute));

                return (
                    currentDay === currentTiming.day &&
                    currentHour >= fromTime.getHours() &&
                    currentHour < toTime.getHours()
                );
            }
        }

        return false;
    };

    console.log(business._id)


    const [isEnquiryLoading, setIsEnquiryLoading] = useState(false)
    const [isEnquirySent, setIsEnquirySent] = useState(false)


    const [enquiry, setEnquiry] = useState({
        name: "",
        phone: "",
        message: "",
    })

    const handleEnquirySubmit = async () => {
        setIsEnquiryLoading(true)
        
        try {
            const enquiryToSend = {
                ...enquiry
            }
                enquiryToSend.business = business._id
                enquiryToSend.category = business.category
            const res = await axios.post(`${API_URL}/api/enquiry/create`, enquiryToSend)
            console.log(res)
            toast.success('Enquiry Sent', ToastParams)
            setEnquiry({
                name: "",
                phone: "",
                message: "",
            })
            setIsEnquiryLoading(false)
            setIsEnquirySent(true)
            
        } catch (err) {
          console.error(err);

          toast.error('Something went wrong', ToastParams)
          setIsEnquiryLoading(false)
        }
      };

    console.log(enquiry)

    const openTimingToday = (business) => {
        const currentDate = new Date();
        const currentDay = currentDate.toLocaleDateString("en-US", {
            weekday: "long",
        });

        const currentTiming = business?.timing?.find(
            (item) => item.day === currentDay
        );
        if (currentTiming && currentTiming.isOpen) {
            if (currentTiming.from && currentTiming.to) {
                return `${currentTiming.from} - ${currentTiming.to}`;
            }
        }
    };


    const openingHours = business.timing?.map(hour => {
        if (hour.isOpen) {
            return `${hour.day.slice(0, 2)} ${hour.from}-${hour.to}`; // Assuming 17:00 as a fixed closing time
        } else {
            return `${hour.day.slice(0, 2)} Closed`;
        }
    });

    const allFAQsSchema = business.faqs?.map((faq, index) => (
        {
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": `<p>${faq.answer}</p>`
            }

        }
    ))

    console.log(allFAQsSchema)

    const businessStrDataStructure = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "address": {
          "@type": "PostalAddress",
          "streetAddress" : business.address?.street ? business.address?.street : business.address?.landmark ? business.address?.landmark : "",
          "addressLocality": business.address?.district,
          "addressRegion": business.address?.state,
          "postalCode": business.address?.pincode,
          "addressCountry": "IN"
        },
        "geo" : {
            "@type": "GeoCoordinates",
            "latitude": business.address?.coordinates[1],
            "longitude": business.address?.coordinates[0]
        },
        "description": business.description,
        "name": business.name,
        "telephone": business.phone,
        "openingHours": openingHours,
        "email": business.email,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": avgRating,
            "reviewCount": business.ratings?.length
        },
    }

    const totalYearsCompleted = new Date().getFullYear() - new Date(business.foundedIn).getFullYear()

    return (

        <div>

            {isBusinessFetching && 
            <div className="w-full h-[80vh] flex items-center justify-center">
                <LuLoader className="w-10 h-10 animate-spin"/>
            </div>
            }

            {!isBusinessFetching && business &&
            
        <div className="bg-white flex flex-col gap-6 justify-center w-full md:px-6 mt-10">

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(businessStrDataStructure),
                }}
            />

            <Helmet>
                <title>{business.name}</title>
                <meta name="description" content={business.description} />
                <meta name="keywords" content={business.name} />
                <meta name="author" content="aresuno" />
                <script type="application/ld+json">
                    {JSON.stringify(businessStrDataStructure)}
                </script>
            </Helmet>



            <div className="w-full md:border border-solid border-gray-300 rounded-xl md:p-8 flex justify-center flex-col md:flex-row gap-4">
                <div className="flex md:flex-[9] justify-center items-center">
                    <div className="w-full bg-cover bg-center">

                        <div className="flex flex-col md:flex-row md:gap-6 justify-start items-center">

                            <div className="md:flex-[4] flex w-[90%] md:w-[300px] rounded-xl">
                                <div className="w-full h-[200px] rounded-xl relative">
                                    <Swiper
                                        spaceBetween={30}
                                        centeredSlides={true}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
                                        modules={[Autoplay, Pagination]}
                                        className="mySwiper rounded-xl"
                                    >
                                        {business.images?.gallery.map((slide, index) => (
                                            <SwiperSlide className="rounded-xl" key={index}>
                                                <img loading="lazy" src={slide} alt="" className="rounded-xl" />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    <span className="z-10 absolute top-0 left-0 rounded-tl-xl rounded-br-xl bg-green-600 text-xs text-white px-3 py-1 font-medium">
                                        top rated
                                    </span>
                                </div>
                            </div>

                            <div className="md:flex-[8] mt-2 md:mt-0 w-[90%] flex flex-col gap-2 justify-between items-start md:h-[200px]">
                                <div className="text-black flex-col flex justify-start items-start">
                                    <span className="text-xl md:text-3xl font-bold">{business.name}</span>
                                    <span className="text-gray-800 text-sm md:text-base font-medium">
                                        {businessCategory?.name}
                                    </span>

                                    <div className="flex items-center text-xs">
                                        <span className="text-gray-600 text-xs font-normal">
                                            {business.address?.city}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-gray-600 md:text-sm text-xs  bg-gray-200 py-[2px] px-2 font-semibold rounded-full">
                                        {totalYearsCompleted} Yrs
                                    </span>

                                    <span className="flex items-center gap-1 text-xs">
                                        <BiCheckShield className="text-green-600 w-5 h-5 md:w-6 md:h-6" />
                                        Verified
                                    </span>
                                </div>

                                {avgRating ? (
                                    <div className="flex items-center gap-3 md:gap-6">
                                        <div className="flex items-center gap-2">
                                            <span className="text-black text-sm md:text-lg font-semibold">
                                                {avgRating ? avgRating.toFixed(1) : "-"}
                                            </span>

                                            <div className="flex items-center gap-1">
                                                {[...Array(fullStars ? fullStars : 0)].map(
                                                    (_, index) => (
                                                        <BsStarFill
                                                            key={index}
                                                            className="text-yellow-500 w-3 h-3 md:w-4 md:h-4"
                                                        />
                                                    )
                                                )}

                                                {hasHalfStar && (
                                                    <BsStarHalf className="text-yellow-500 w-3 h-3 md:w-4 md:h-4" />
                                                )}

                                                {[
                                                    ...Array(
                                                        5 -
                                                        (fullStars ? fullStars : 0) -
                                                        (hasHalfStar ? 1 : 0)
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

                                <div className="w-full flex items-center justify-start gap-2 md:gap-4">
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
                                                        className="cursor-pointer relative bg-[#E9F5FE] rounded-full md:h-9 md:w-9 w-8 h-8"
                                                        style={{ border: "2px solid #C9E0F2" }}
                                                    >
                                                        {item.icon}
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

                <div className="flex md:flex-[3] flex-col border-t pt-4 md:border-none md:pt-0 mt-2 m-auto w-[90%] gap-4 justify-center items-center">
                    <div className="w-full">
                        <div className="flex items-start gap-3">
                            <div className="w-full">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-4">
                                        {openTimingToday(business) && (
                                            <div className="flex items-center gap-2">
                                                <FiClock className="text-gray-800 w-6 h-6" />
                                                <p>{openTimingToday(business)}</p>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2 cursor-pointer">
                                            <span className="text-gray-600 text-xs md:text-sm">
                                                <a href="#timings">
                                                    View timings
                                                </a>

                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className={`w-20 justify-center  flex items-center px-3 md:py-1 py-2 text-xs md:text-sm rounded-full font-medium ${isStoreOpenNow(business)
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                            }`}
                                    >
                                        {isStoreOpenNow(business) ? (
                                            <div className="flex items-center gap-2 text-white">
                                                Open
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-white">
                                                Closed
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex md:flex-col flex-row items-center gap-4 md:gap-2">
                        <button 
                            className="w-full flex items-center justify-center gap-2 p-2  rounded-full border border-solid border-blue-600 text-sm md:text-base"    
                            onClick={handleCallNow}
                        >
                            <FiPhone className="text-blue-600 w-5 h-5 md:w-6 md:h-6" />
                            <span className="text-blue-600 font-semibold">
                                <span>Call Now</span>
                            </span>
                        </button>
                        { callClick &&
                        <CallClickForm business={business} onClose={() => setCallClick(false)}/>
}
                        <button 
                            className="w-full flex items-center justify-center gap-2 p-2  rounded-full bg-blue-600 text-sm md:text-base"
                            onClick={() => setEnquiryClick(true)}
                        >
                            <FiMessageSquare className="text-white w-5 h-5 md:w-6 md:h-6" />
                            <span className="text-white font-semibold">Enquire Now</span>
                        </button>
                        { enquiryClick &&
                        <EnquiryForm onClose={() => setEnquiryClick(false)}/> 
                        }
                    </div>
                </div>
            </div>

            <div className="w-[90%] md:w-full flex m-auto md:m-0 gap-6 mb-10 flex-col md:flex-row">
                {/* business bottom sedtion */}

                {/* business bottom left */}
                <div className="w-full md:w-full flex flex-col gap-4 flex-[9] md:border border-solid border-[#d7d7d7] rounded-xl md:px-2 pt-3">

                    <div className="md:flex hidden items-center justify-between px-12 py-5 rounded-xl bg-gray-300">
                        <div className="w-full flex items-center justify-between ">
                            <span className="">
                                <a href="#overview">Overview</a>
                            </span>
                            <span className="">
                                <a href="#photos">Images</a>
                            </span>
                            <span className="">
                                <a href="#address">Address</a>
                            </span>
                            <span className="">
                                <a href="#posts">Posts</a>
                            </span>
                            <span className="">
                                <a href="#ratings">Ratings</a>
                            </span>
                            <span className="">
                                <a href="#timings">Timings</a>
                            </span>
                            <span className="">
                                <a href="#faq">FAQ</a>
                            </span>
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center gap-10 md:px-8 md:py-8 pt-2">
                        {/* overview */}

                        <div
                            id="overview"
                            className="w-full border-b border-t pt-5 pb-10 border-b-gray-300 border-t-gray-300"
                        >
                            <div className="w-full">
                                <div className="flex items-center justify-start gap-3 md:gap-4">
                                    <FiFileText className="text-black w-5 h-5 md:w-6 md:h-6" />
                                    <h2 className="text-lg md:text-2xl font-bold text-black">
                                        Overview
                                    </h2>
                                </div>
                                <p className="mt-2 text-gray-700 text-sm md:text-base">
                                    <span>{business.description}</span>
                                </p>

                                <div className="flex justify-start items-center">




                                    <div className="flex flex-col justify-start w-full items-start">






                                        <div>
                                            <p className="text-base font-medium mb-1 mt-2">
                                                We offer
                                            </p>
                                            {business.services?.map((service, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 mb-2"
                                                >
                                                    <FiArrowRight className="text-gray-800 w-4 h-4 md:w-5 md:h-5" />
                                                    <p className="text-gray-800 md:text-base text-sm">{service}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="w-full">
                                            <p className="text-base font-medium mb-1 mt-2">
                                                We accept
                                            </p>

                                            <div className="grid grid-cols-4 gap-2 w-full md:flex md:flex-wrap md:items-center md:justify-start md:gap-5">
                                                {business.modeOfPayment?.map(({name, icon}, index) => (
                                                    <div
                                                        key={name}
                                                        className="flex items-center mb-2 bg-gray-100 rounded-lg justify-center px-2 md:px-3 py-2"
                                                    >
                                                        <span className="text-gray-800 text-xs md:text-sm">
                                                            <img src={icon} alt={name} className="w-[55px] md:w-[70px] aspect-[2/1] object-cover" />
                                                            {/* {name} */}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* photos gallery */}
                        <div
                            id="photos"
                            className=" w-full border-b pb-10 border-b-gray-300"
                        >
                            <div className="flex items-center gap-3 md:gap-4">
                                <FiImage className="text-black w-5 h-5 md:w-6 md:h-6" />
                                <h2 className="text-lg md:text-2xl font-bold text-black">Photos</h2>
                            </div>

                            <div className="relative">
                                <div className="overflow-x-auto flex w-[calc(100%-10px)] custom-scrollbar">
                                    {/* <img
                                    src="https://media.istockphoto.com/id/1023612090/photo/interior-of-clothing-store.jpg?s=612x612&w=0&k=20&c=84NciWwU43Zyzmxph6bCVTG9WRO9rxDGUYtYnUqpTt8="
                                    alt=""
                                    className="rounded-lg m-2 w-64"
                                /> */}

                                    {business.images?.gallery.map((image) => (
                                        <img
                                            loading="lazy"
                                            key={image}
                                            src={image}
                                            alt=""
                                            className="rounded-lg m-2 w-64 aspect-auto object-cover"
                                        />
                                    ))}
                                </div>
                                <div className=" md:gradient-overlay-right" />
                            </div>

                            {/* <div className="flex items-center justify-start gap-4 mt-4">
                                        <button
                                            className="flex items-center gap-2 p-2 px-4 bg-[#E9F5FE] rounded-full"
                                            style={{ border: "2px solid #C9E0F2" }}
                                        >
                                            <FiUploadCloud className="text-gray-700 w-6 h-6" />
                                            <p className="text-blue-500 text-md font-medium">
                                                Upload Photos
                                            </p>
                                        </button>
                                    </div> */}
                        </div>

                        {/* address */}
                        <div
                            id="address"
                            className="w-full border-b pb-10 border-b-gray-300"
                        >
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
  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyABgLLjLKkUT86jshhsoWlWY8VXV8hi9oY&q=${business.address.coordinates[1]},${business.address.coordinates[0]}`}>
</iframe>
                        </div>

                        {/* posts */}

                        { posts.length > 0 &&
                        <div
                            id="posts"
                            className="w-full border-b pb-10 border-b-gray-300"
                        >
                            <div className="flex items-center gap-3 md:gap-4">
                                <FiInbox className="text-black w-5 h-5 md:w-6 md:h-6" />
                                <h2 className="text-lg md:text-2xl font-bold text-black">Updates</h2>
                            </div>

                            <div className="grid grid-cols-1 gap-8 mt-8">
                                {posts?.map((post, index) => (
                                    <div
                                        key={index}
                                        className="max-w-full gap-4 flex flex-col md:flex-row items-start"
                                    >
                                        <div className="md:flex-[3] w-full">
                                            <img
                                                loading="lazy"
                                                className="w-full md:h-full h-[180px] rounded-xl object-cover"
                                                alt="Image"
                                                src={
                                                    post.image
                                                        ? post.image
                                                        : "https://img.freepik.com/premium-vector/happy-diwali-festival-wishing-post-design-with-red-background-template_593190-96.jpg"
                                                }
                                            />
                                        </div>

                                        <div className="md:flex-[10] w-full">
                                            <p className="text-sm text-gray-600">
                                                {post.description}
                                            </p>
                                            <p className="mt-2 text-blue-600 w-full text-sm md:text-base">
                                                #autodetailing&nbsp;&nbsp;#detailing
                                            </p>
                                            <div className="flex mt-3 justify-between items-center">
                                                <div className=" text-gray-500 text-xs md:text-base">
                                                    {new Date(post.createdAt).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </div>
                                                <div className="flex items-center md:mt-2 text-green-600">
                                                    <span className="font-semibold text-sm md:text-base">View more</span>
                                                    <FiArrowRight
                                                        className="ml-1 w-4 h-4 md:w-5 md:h-5"
                                                        strokeWidth={2}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                                                    }

                        {/* ratings and reviews */}
                        { ratings.length > 0 &&
                        <div
                            className="w-full flex flex-col border-b pb-10 border-b-gray-300"
                            id="ratings"
                        >
                            <div className="flex gap-3 items-center md:gap-4">
                                <FiStar className="text-black w-5 h-5 md:w-6 md:h-6" />
                                <h2 className="text-lg md:text-2xl font-bold text-black">
                                    Ratings
                                </h2>
                            </div>

                            {avgRating ? (
                                <div className="grid grid-cols-1 gap-6 mt-4 md:gap-8 md:mt-8">
                                    <div className="flex flex-col gap-2 md:gap-3">
                                        <div className="flex items-center gap-4">
                                            <div className="">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(fullStars ? fullStars : 0)].map(
                                                        (_, index) => (
                                                            <BsStarFill
                                                                key={index}
                                                                className="text-yellow-500 w-5 h-5 mdw-6 md:h-6"
                                                            />
                                                        )
                                                    )}

                                                    {hasHalfStar && (
                                                        <BsStarHalf className="text-yellow-500 w-5 h-5 mdw-6 md:h-6" />
                                                    )}

                                                    {[
                                                        ...Array(
                                                            5 -
                                                            (fullStars ? fullStars : 0) -
                                                            (hasHalfStar ? 1 : 0)
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
                                                    {avgRating.toFixed(1)} out of 5
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
                                            <div key={index} className="flex items-start justify-start gap-2 md:gap-4 w-full">
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
                                                        <span className="text-sm md:text-base">{rating.user.name}</span>
                                                        <div className="flex gap-4 mt-0  md:mt-1">
                                                            <div className="flex items-center">
                                                                {[...Array(rating.rating)].map(
                                                                    (_, index) => (
                                                                        <AiFillStar
                                                                            key={index}
                                                                            className="text-yellow-500 w-3 h-3 md:w-4 md:h-4"
                                                                        />
                                                                    )
                                                                )}
                                                                {[...Array(5 - rating.rating)].map(
                                                                    (_, index) => (
                                                                        <AiFillStar
                                                                            key={index}
                                                                            className="text-gray-300 w-3 h-3 md:w-4 md:h-4"
                                                                        />
                                                                    )
                                                                )}
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
}



                        <div id="timings" className="border-b pb-10 w-full border-b-gray-300">
                            <div className="flex items-center gap-3 md:gap-4">
                                <FiClock className="text-black w-5 h-5 md:w-6 md:h-6" />
                                <h2 className="text-lg md:text-2xl font-bold text-black">
                                    Business Timings
                                </h2>
                            </div>

                            <div className="flex flex-col gap-5 mt-4 text-sm md:text-base">
                                {business.timing?.map((time, index) => (

                                    time.isOpen && time.from && time.to ? (
                                        <div className="flex flex-col gap-1">
                                            <span className="font-medium">{time.day}</span>
                                            <div className=" flex items-center gap-2">
                                                <span>{time.from}</span>
                                                to
                                                <span>{time.to}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-1">
                                            <span className="font-medium">{time.day}</span>
                                            <span className="text-gray-500">Closed</span>
                                        </div>
                                    )



                                ))}
                            </div>
                        </div>




                        {/* faqs */}
                        <div id="faq" className="w-full mb-10">
                            <div className="flex items-center gap-3 md:gap-4">
                                <FiHelpCircle className="text-black w-5 h-5 md:w-6 md:h-6" />
                                <h2 className="text-lg md:text-2xl font-bold text-black">
                                    FAQ's
                                </h2>
                            </div>
                            <div className="flex flex-col gap-3 mt-4">



      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": allFAQsSchema
          }),
        }}
      />

                                {business.faqs?.map((faq, index) => (
                                    <Accordion
                                        question={`${faq.question}`}
                                        content={faq.answer}
                                        key={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* business bottom right */}
                <div className="flex flex-col flex-[4.7] gap-6">
                    <div className="w-full border border-solid border-gray-300 rounded-xl py-6 pb-8 px-5">
                        <div className="text-xl font-bold mb-3">
                            <span>Rate us</span>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-600 text-base my-2">
                                How would you rate our service?
                            </p>
                            <div>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, index) => (
                                        <AiFillStar
                                            key={index}
                                            className={`transition-all duration-75 w-8 h-8 cursor-pointer ${(hoveredStars > 0 ? hoveredStars : selectedStars) >
                                                index
                                                ? [
                                                    "text-red-500",
                                                    "text-orange-500",
                                                    "text-yellow-500",
                                                    "text-green-600",
                                                    "text-blue-500",
                                                ][
                                                (hoveredStars > 0
                                                    ? hoveredStars
                                                    : selectedStars) - 1
                                                ]
                                                : "text-gray-300"
                                                }`}
                                            onMouseEnter={() => handleStarHover(index)}
                                            onMouseLeave={handleStarLeave}
                                            onClick={() => handleStarClick(index)}
                                        />
                                    ))}
                                    {(hoveredStars > 0 ? hoveredStars : selectedStars) && (
                                        <span className="ml-2 text-2xl">
                                            {
                                                ["😢", "😕", "😐", "🙂", "😄"][
                                                (hoveredStars > 0
                                                    ? hoveredStars
                                                    : selectedStars) - 1
                                                ]
                                            }
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-gray-600 text-base my-2 mt-4">
                                Share your experience
                            </p>

                            <div className="flex items-center flex-col gap-2">
                                <textarea
                                    name="text"
                                    id=""
                                    cols="30"
                                    placeholder="This is a very good ..."
                                    rows="10"
                                    value={review}
                                    className=" focus:outline-none w-full h-24 bg-gray-100 rounded-md px-4 py-2 resize-none"
                                    onChange={(e) => setReview(e.target.value)}
                                ></textarea>
                                <button
                                    className="bg-blue-600 text-white w-full h-10 rounded-md"
                                    onClick={handleRating}
                                >
                                    {isReviewLoading ? (
                                        <div
                                            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                            role="status"
                                        >
                                            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                                Loading...
                                            </span>
                                        </div>
                                    ) : (
                                        "Rate"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full border border-solid border-gray-300 rounded-xl py-6 pb-8 px-5">
                        <span className="text-xl font-bold">Any Query?</span>
                        <p className="text-gray-500 text-sm my-2">
                            Write to us and we will get back to you
                        </p>
                        <div className="flex items-center flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full h-10 bg-gray-100 rounded-md px-4"
                                value={enquiry.name}
                                onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Phone Number"
                                className="w-full h-10 bg-gray-100 rounded-md px-4"
                                value={enquiry.phone}
                                onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value })}
                            />
                            <textarea
                                name="text"
                                id=""
                                cols="30"
                                placeholder="Message"
                                rows="10"
                                className="w-full h-32 bg-gray-100 rounded-md px-4 py-2 resize-none"
                                value={enquiry.message}
                                onChange={(e) => setEnquiry({ ...enquiry, message: e.target.value })}
                            ></textarea>
                            <button onClick={handleEnquirySubmit} className="bg-blue-600 text-white w-full h-10 rounded-md">
                                {
                                    isEnquiryLoading ? (
                                        <div
                                            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                            role="status"
                                        >
                                            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                                Loading...
                                            </span>
                                        </div>
                                    ) : (
                                        "Send"
                                    )
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>

        }

{ (!isBusinessFetching && !business) &&
        <NotFound />
}


        </div>

        
    );
};

export default Business;
