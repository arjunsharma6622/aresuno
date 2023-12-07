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
import { BiCheckShield, BiStar } from "react-icons/bi";
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
import BusinessNotFound from "./BusinessNotFound";
import { ToastContainer, toast } from "react-toastify";
import { MdOutlineDone } from "react-icons/md";

const Business = () => {
    const [business, setBusiness] = useState({});
    const [posts, setPosts] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [selectedStars, setSelectedStars] = useState(4);
    const [review, setReview] = useState("");
    const [isReviewLoading, setIsReviewLoading] = useState(false);
    const [hoveredStars, setHoveredStars] = useState(0);
    const { businessName } = useParams();

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
            const res = await axios.post(
                // `http://localhost:8000/api/rating/create/${business._id}`,
                `https://aresuno-server.vercel.app/api/rating/create/${business._id}`,
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
            toast.success("Thank you for your feedback");
        } catch (e) {
            console.log(e);
            setIsReviewLoading(false);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        fetchBusiness();
    }, []);
    const fetchBusiness = async () => {
        try {
            const res = await axios.get(
                // "http://localhost:8000/api/business/getBusinessByName/" + businessName
                "https://aresuno-server.vercel.app/api/business/getBusinessByName/" +
                businessName
            );
            setBusiness(res.data);
            const postsRes = await axios.get(
                `https://aresuno-server.vercel.app/api/post/all-posts/${res.data._id}`
            );
            setPosts(postsRes.data);

            const ratingsRes = await axios.get(
                // `http://localhost:8000/api/rating/${res.data._id}`
                `https://aresuno-server.vercel.app/api/rating/${res.data._id}`
            );
            setRatings(ratingsRes.data);
            console.log(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    const businessLinks = [
        {
            link: "website",
            icon: (
                <CgWebsite className="text-[#1467E5] h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            ),
        },
        {
            link: "instagram",
            icon: (
                <FiInstagram className="text-[#1467E5] h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            ),
        },
        {
            link: "whatsapp",
            icon: (
                <AiOutlineWhatsApp className="text-[#1467E5] h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            ),
        },
        {
            link: "twitter",
            icon: (
                <FiTwitter className="text-[#1467E5] h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            ),
        },
        {
            link: "facebook",
            icon: (
                <FiFacebook className="text-[#1467E5] h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            ),
        },
        {
            link: "youtube",
            icon: (
                <FiYoutube className="text-[#1467E5] h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            ),
        },
    ];

    const categories = useSelector((state) => state.categories);
    const subCategory = categories
        .flatMap((category) => category.subcategories)
        .find((subcategory) => subcategory._id === business.subCategory);

    const daysAgoFormatDate = (dateString) => {
        const currentDate = new Date();
        const inputDate = new Date(dateString);

        const elapsedDays = Math.round(
            (currentDate - inputDate) / (1000 * 60 * 60 * 24)
        );

        if (elapsedDays <= 1) {
            return "Today";
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
        const currentDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();

        const currentTiming = business?.timing?.find((item) => item.day === currentDay);

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
                    currentHour <= toTime.getHours()
                );
            }
        }

        return false;
    };

    const openTimingToday = (business) => {
        const currentDate = new Date();
        const currentDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

        const currentTiming = business?.timing?.find((item) => item.day === currentDay);
        if (currentTiming && currentTiming.isOpen) {
            if (currentTiming.from && currentTiming.to) {
                return `${currentTiming.from} - ${currentTiming.to}`;
            }
        }

    }


    return (
        <div>
            {business.name ? (
                <div className="bg-white flex flex-col gap-6 justify-center w-full px-6 mt-10">
                    <div className="w-full border border-solid border-gray-300 rounded-xl p-8 flex gap-4">
                        <div className="flex flex-[9] justify-center items-center">
                            <div className="w-full bg-cover bg-center">
                                <div className="flex gap-6 justify-start items-center">
                                    <div className="flex-[4] flex w-[300px] rounded-xl">
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
                                                {business.photosGallery?.map((slide, index) => (
                                                    <SwiperSlide className="rounded-xl" key={index}>
                                                        <img src={slide} alt="" className="rounded-xl" />
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                            <span className="z-10 absolute top-0 left-0 rounded-tl-xl rounded-br-xl bg-green-600 text-xs text-white px-3 py-1 font-medium">
                                                top rated
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex-[8] flex flex-col justify-between items-start h-[200px]">
                                        <div className="text-black text-3xl flex-col font-semibold flex justify-start items-start">
                                            <span>{business.name}</span>
                                            <span className="text-gray-800 text-base font-medium">
                                                {subCategory?.name}
                                            </span>

                                            <div className="flex items-center text-xs">
                                                <span className="text-gray-600 text-xs font-normal">
                                                    Hyderabad, Hitech city
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-600 text-sm bg-gray-200 py-[2px] px-2 font-semibold rounded-full">
                                                6 Yrs
                                            </span>

                                            <span className="flex items-center gap-1 text-xs">
                                                <BiCheckShield className="text-green-600 w-6 h-6" />
                                                Verified
                                            </span>
                                        </div>

                                        {avgRating ? (
                                            <div className="flex items-center gap-6">

                                                <div className="flex items-center gap-2">
                                                    <span className="text-black text-lg font-semibold">
                                                        {avgRating ? avgRating.toFixed(1) : "-"}
                                                    </span>

                                                    <div className="flex items-center gap-1">
                                                        {[...Array(fullStars ? fullStars : 0)].map(
                                                            (_, index) => (
                                                                <BsStarFill
                                                                    key={index}
                                                                    className="text-yellow-500 w-4 h-4"
                                                                />
                                                            )
                                                        )}

                                                        {hasHalfStar && (
                                                            <BsStarHalf className="text-yellow-500 w-4 h-4" />
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
                                                                className="text-gray-300 w-4 h-4"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                <a href="#ratings">
                                                    <span className="text-gray-black text-sm text-blue-500">
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



                                        <div className="w-full flex items-center justify-start gap-4">
                                            {businessLinks.map((item, index) => {
                                                return (
                                                    business.socialLinks?.[item.link] && (
                                                        <a
                                                            key={index}
                                                            href={business.socialLinks?.[item.link]}
                                                        >
                                                            <div
                                                                key={index}
                                                                className="cursor-pointer relative bg-[#E9F5FE] rounded-full h-9 w-9"
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

                        <div className="flex flex-[3] flex-col gap-4 justify-center items-center">
                            <div className="w-full">
                                <div className="flex items-start gap-3">
                                    {/* <PiCalendarCheckLight
                    className="text-gray-800 w-10 h-10 mt-1"
                    strokeWidth={0.1}
                  /> */}

                                    {/* {() => { */}


                                    {/* }; */}


                                    {/* return ( */}
                                    <div className="w-full">
                                        <div className="flex items-center gap-4">

{ openTimingToday(business) &&
                                        <div className="flex items-center gap-2">
                                                <FiClock className="text-gray-800 w-6 h-6"/>
                                            <p>{openTimingToday(business)}</p>
                                            </div>
}

                                            <div className={`flex items-center px-3 py-1 text-sm rounded-full font-medium ${isStoreOpenNow(business) ? 'bg-green-500' : 'bg-red-500'}`}>
                                                {isStoreOpenNow(business) ? (
                                                    <div className="flex items-center gap-2 text-white">
                                                        Open
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-white">
                                                        Closed
                                                    </div>
                                                )}</div>



                                        </div>
                                    </div>
                                    {/* ) */}


                                    {/* })} */}

                                </div>
                            </div>

                            <div className="w-full flex flex-col items-center gap-2">
                                <button className="w-full flex items-center justify-center gap-2 p-2 rounded-full border border-solid border-blue-600">
                                    <FiPhone className="text-blue-600 w-6 h-6" />
                                    <span className="text-blue-600 font-semibold">
                                        <a href={`tel:${business?.phone}`}>Call Now</a>
                                    </span>
                                </button>
                                <button className="w-full flex items-center justify-center gap-2 p-2 rounded-full bg-blue-600">
                                    <FiMessageSquare className="text-white w-6 h-6" />
                                    <span className="text-white font-semibold">Enquire Now</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-6 mb-10">
                        {/* business bottom sedtion */}

                        {/* business bottom left */}
                        <div className="w-full flex flex-col gap-4 flex-[9] border border-solid border-[#d7d7d7] rounded-xl px-2 pt-3">


                        <div className="flex items-center justify-between px-12 py-5 rounded-xl bg-gray-300">
                            <div className="w-full flex items-center justify-between ">
                            <span className=""><a href="#overview">Overview</a></span>
                            <span className=""><a href="#photos">Images</a></span>
                            <span className=""><a href="#address">Address</a></span>
                            <span className=""><a href="#posts">Posts</a></span>
                            <span className=""><a href="#ratings">Ratings</a></span>
                            <span className=""><a href="#faq">FAQ</a></span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-10 px-8 py-8 pt-2">


                            {/* overview */}

                            <div id="overview" className="w-full border-b pb-10 border-b-gray-300">
                                <div className="w-full">
                                    <div className="flex items-center justify-start gap-4">
                                        <FiFileText className="text-black w-6 h-6" />
                                        <h2 className="text-2xl font-bold text-black">Overview</h2>
                                    </div>
                                    <p className="mt-2 text-gray-700 text-base">
                                        <span>{business.description}</span>
                                    </p>

                                    <div className="flex justify-start items-center">
                                        <div className="flex flex-col justify-start items-start">
                                            <div>
                                                <p className="text-base font-medium mb-1 mt-2">
                                                    We offer
                                                </p>
                                                {business.services?.map((service, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-2 mb-2"
                                                    >
                                                        <FiArrowRight className="text-gray-800 w-5 h-5" />
                                                        <p className="text-gray-800">{service}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="">
                                                <p className="text-base font-medium mb-1 mt-2">
                                                    We accept
                                                </p>

                                                <div className="flex flex-wrap gap-2">
                                                    {business.modeOfPayment?.map((payment, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center mb-2 bg-gray-300 rounded-full justify-center px-4 py-1"
                                                        >
                                                            <span className="text-gray-800 text-sm">
                                                                {payment}
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
                            <div id="photos" className=" w-full border-b pb-10 border-b-gray-300">
                                <div className="flex items-start gap-4">
                                    <FiImage className="text-black w-6 h-6" />
                                    <h2 className="text-2xl font-bold text-black">Photos</h2>
                                </div>

                                <div className="relative">
                                    <div className="overflow-x-auto flex w-[calc(100%-10px)] custom-scrollbar">
                                        {/* <img
                                    src="https://media.istockphoto.com/id/1023612090/photo/interior-of-clothing-store.jpg?s=612x612&w=0&k=20&c=84NciWwU43Zyzmxph6bCVTG9WRO9rxDGUYtYnUqpTt8="
                                    alt=""
                                    className="rounded-lg m-2 w-64"
                                /> */}

                                        {business.photosGallery?.map((image) => (
                                            <img
                                                key={image}
                                                src={image}
                                                alt=""
                                                className="rounded-lg m-2 w-64 aspect-auto object-cover"
                                            />
                                        ))}
                                    </div>
                                    <div className="gradient-overlay-right" />
                                </div>

                                <div className="flex items-center justify-start gap-4 mt-4">
                                    <button
                                        className="flex items-center gap-2 p-2 px-4 bg-[#E9F5FE] rounded-full"
                                        style={{ border: "2px solid #C9E0F2" }}
                                    >
                                        <FiUploadCloud className="text-gray-700 w-6 h-6" />
                                        <p className="text-blue-500 text-md font-medium">
                                            Upload Photos
                                        </p>
                                    </button>
                                </div>
                            </div>

                            {/* address */}
                            <div id="address" className="w-full border-b pb-10 border-b-gray-300">
                                <div className="flex items-center gap-4">
                                    <FiNavigation className="text-black w-6 h-6" />
                                    <h2 className="text-2xl font-bold text-black">Address</h2>

                                    {/* <iframe
                                width="600"
                                height="450"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDaaCWy7vsFxmPd5zHmapYuO5KH8kaw67M&q=Space+Needle,Seattle+WA">
                            </iframe> */}
                                </div>
                                <div className="my-4">
                                    <p className="text-gray-600 text-base">
                                        H.No.185 Maruti City Mauza Kahrai, Shamshabad Road, Kahrai,
                                        Agra - 282001 (Near All Sent School)
                                    </p>
                                </div>

                                <iframe
                                    src={business.iframe?.extractedLink}
                                    width="100%"
                                    height="400"
                                    allowFullScreen=""
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="rounded-xl"
                                ></iframe>
                            </div>

                            {/* posts */}
                            <div id="posts" className="w-full border-b pb-10 border-b-gray-300">
                                <div className="flex items-center gap-4">
                                    <FiInbox className="text-black w-6 h-6" />
                                    <h2 className="text-2xl font-bold text-black">Updates</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-8 mt-8">
                                    {posts?.map((post, index) => (
                                        <div
                                            key={index}
                                            className="max-w-full gap-4 flex items-start"
                                        >
                                            <div className="flex-[3]">
                                                <img
                                                    className="w-full rounded-xl object-cover"
                                                    alt="Image"
                                                    src={
                                                        post.image
                                                            ? post.image
                                                            : "https://img.freepik.com/premium-vector/happy-diwali-festival-wishing-post-design-with-red-background-template_593190-96.jpg"
                                                    }
                                                />
                                            </div>

                                            <div className="flex-[10]">
                                                <p className="text-sm text-gray-600">
                                                    {post.description}
                                                </p>
                                                <div className="mt-2 text-blue-600">
                                                    #autodetailing&nbsp;&nbsp;#detailing&nbsp;&nbsp;#cardetailing&nbsp;&nbsp;#carcare&nbsp;&nbsp;#paintprote
                                                </div>
                                                <div className="mt-2 text-gray-500">
                                                    {new Date(post.createdAt).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </div>
                                                <div className="flex items-center mt-2 text-green-600">
                                                    <span className="font-semibold">VIEW MORE</span>
                                                    <FiArrowRight
                                                        className="ml-1 w-5 h-5"
                                                        strokeWidth={2}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ratings and reviews */}
                            <div
                                className="flex flex-col border-b pb-10 border-b-gray-300"
                                id="ratings"
                            >
                                <div className="flex gap-4">
                                    <FiStar className="text-black w-6 h-6" />
                                    <h2 className="text-2xl font-bold text-black">
                                        Customer ratings & reviews
                                    </h2>
                                </div>

                                {avgRating ? (
                                    <div className="grid grid-cols-1 gap-8 mt-8">


                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center gap-4">

                                                <div className="">
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(fullStars ? fullStars : 0)].map(
                                                            (_, index) => (
                                                                <BsStarFill
                                                                    key={index}
                                                                    className="text-yellow-500 w-6 h-6"
                                                                />
                                                            )
                                                        )}

                                                        {hasHalfStar && (
                                                            <BsStarHalf className="text-yellow-500 w-6 h-6" />
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
                                                                className="text-gray-300 w-6 h-6"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                <span className="flex items-center gap-2">
                                                    <span className="text-black text-base">
                                                        {avgRating.toFixed(1)} out of 5
                                                    </span>
                                                </span>

                                            </div>

                                            <span className="text-gray-600 text-sm">
                                                {ratings?.length === 0
                                                    ? "No ratings yet"
                                                    : ratings?.length === 1
                                                        ? "1 rating"
                                                        : `${ratings?.length} ratings`}
                                            </span>

                                        </div>

                                        <div className="flex flex-col gap-4">
                                            {[...ratings]?.reverse().map((rating, index) => (
                                                <div key={index} className="flex items-start gap-4">
                                                    <div>
                                                        <img
                                                            src={rating.user?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                                            alt=""
                                                            className="w-9 h-9 rounded-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <div className="">
                                                            <span>{rating.user.name}</span>
                                                            <div className="flex gap-4 mt-1">
                                                                <div className="flex items-center">
                                                                    {[...Array(rating.rating)].map((_, index) => (
                                                                        <AiFillStar
                                                                            key={index}
                                                                            className="text-yellow-500"
                                                                        />
                                                                    ))}
                                                                    {[...Array(5 - rating.rating)].map(
                                                                        (_, index) => (
                                                                            <AiFillStar
                                                                                key={index}
                                                                                className="text-gray-300"
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
                                                            <p className=" font-normal text-sm">
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

                            {/* faqs */}
                            <div id="faq" className="w-full mb-10">
                                <div className="flex items-center gap-4">
                                    <FiHelpCircle className="text-black w-6 h-6" />
                                    <h2 className="text-2xl font-bold text-black">
                                        Frequently Asked Questions
                                    </h2>
                                </div>
                                <div className="flex flex-col gap-3 mt-4">
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
                                <div className="flex items-center flex-col gap-2">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="w-full h-10 bg-gray-100 rounded-md px-4"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        className="w-full h-10 bg-gray-100 rounded-md px-4"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        className="w-full h-10 bg-gray-100 rounded-md px-4"
                                    />
                                    <textarea
                                        name="text"
                                        id=""
                                        cols="30"
                                        placeholder="Message"
                                        rows="10"
                                        className="w-full h-32 bg-gray-100 rounded-md px-4 py-2 resize-none"
                                    ></textarea>
                                    <button className="bg-blue-600 text-white w-full h-10 rounded-md">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            ) : (
                <BusinessNotFound />
            )}
        </div>
    );
};

export default Business;
