import React, { useEffect, useState } from "react";
import { FiArrowRight, FiClock, FiFileText, FiFrown, FiGlobe, FiHelpCircle, FiImage, FiInbox, FiMail, FiMapPin, FiMessageSquare, FiNavigation, FiPhone, FiShield, FiStar, FiUploadCloud } from "react-icons/fi";
import { AiFillFrown, AiFillStar, AiOutlineWhatsApp } from "react-icons/ai";
import { PiShareFatBold } from "react-icons/pi";
import { BiLike } from "react-icons/bi";
import axios from "axios";
import Accordion from "../Accordion";

export const Business = () => {
    const [business, setBusiness] = useState({})
    const [selectedStars, setSelectedStars] = useState(4);
    const [hoveredStars, setHoveredStars] = useState(0);

    const handleStarHover = (index) => {
        setHoveredStars(index + 1);
    };

    const handleStarLeave = () => {
        setHoveredStars(0);
    };

    const handleStarClick = (index) => {
        setSelectedStars(index + 1);
    };
    useEffect(() => {
        fetchBusiness()
    }, [])
    const fetchBusiness = async () => {
        try {
            const res = await axios.get('https://aresuno-server.vercel.app/api/business/6533fd7ddb86f671ea9da76a')
            setBusiness(res.data)
            console.log(res.data)
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="bg-white flex flex-col gap-6 justify-center w-full px-6 mt-10">


            <div className="w-full border border-solid border-gray-300 rounded-xl p-8 flex gap-4">
                <div className="flex flex-[9] justify-center items-center">
                    <div className="w-full bg-cover bg-center">


                        <div className="flex gap-4 justify-start items-start">

                            <div className="">
                                <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT2uKp7lRJ0koQdIwQ_doi-Lg1y_OgomVR4Zmqs3bR4VLyeL4mm" alt="" className="rounded-xl h-[100%]" />
                            </div>


                            <div>
                                <div className="text-black text-2xl font-semibold whitespace-nowrap">{business.name}</div>

                                <div className="flex items-center gap-2">
                                    <FiMapPin className="text-blue-500" />
                                    <span className="text-gray-600 text-sm">Hyderabad, Hitech city</span>
                                </div>


                                <div className="flex items-center gap-2 mt-2">

                                    <span className="text-black text-lg font-bold">
                                        4.4
                                    </span>

                                    <div className="flex items-center">
                                        <AiFillStar className="text-yellow-500" />
                                        <AiFillStar className="text-yellow-500" />
                                        <AiFillStar className="text-yellow-500" />
                                        <AiFillStar className="text-yellow-500" />
                                        <AiFillStar className="text-yellow-500" />
                                    </div>
                                    <span className="text-gray-600 text-sm">50 Ratings</span>
                                </div>


                                <div className="flex items-center gap-2">

                                    <div className="flex items-center gap-2">
                                        <FiShield className="text-blue-500" />
                                        <span className="text-blue-500 text-sm">Verified</span>
                                    </div>
                                    <span className="text-gray-600 text-sm bg-gray-200 py-[2px] px-2 font-bold rounded-full">6 YRS</span>

                                </div>

                                {/* <div className="flex items-center gap-2">
                                    <div className="relative bg-[#E9F5FE] rounded-full h-9 w-9" style={{ border: "2px solid #C9E0F2" }}>
                                        <PiShareFatBold className="text-[#1467E5] h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                    </div>
                                    <div className="relative bg-[#E9F5FE] rounded-full h-9 w-9" style={{ border: "2px solid #C9E0F2" }}>
                                        <BiLike className="text-[#1467E5] h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                    </div>
                                </div> */}

                                <div className="w-full flex items-center justify-start gap-4">

                                    <div className="flex justify-start items-center gap-2 flex-col">
                                        <FiGlobe className="text-blue-500 w-8 h-8" />
                                    </div>
                                    <div className="flex items-center gap-2 flex-col">
                                        <FiMail className="text-blue-500 w-8 h-8" />
                                    </div>

                                    <div className="flex items-center gap-2 flex-col">
                                        <AiOutlineWhatsApp className="text-blue-500 w-8 h-8" />
                                    </div>
                                </div>




                            </div>
                        </div>


                    </div>
                </div>



                <div className="flex flex-[3] flex-col gap-4 justify-center items-center">
                    <div className="w-full">
                        <div className="text-2xl font-bold flex items-center gap-3"> <FiClock className="text-black w-6 h-6" /> Business Hours</div>
                        <p className=" text-gray-600">Monday - Sunday, 9:00 AM to 10:00 PM</p>
                    </div>



                    <div className="w-full flex flex-col items-center gap-2">
                        <button className="w-full flex items-center justify-center gap-2 p-2 rounded-full border border-solid border-blue-600">
                            <FiPhone className="text-blue-600 w-6 h-6" />
                            <span className="text-blue-600 font-semibold">
                                <a href="tel:1234567890">Call Now</a>
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

                <div className="flex flex-col gap-10 flex-[9] border border-solid border-[#d7d7d7] rounded-xl px-10 py-8">


                    {/* overview */}

                    <div className="w-full border-b pb-10 border-b-gray-300">
                        <div className="w-full">
                            <div className="flex items-center justify-start gap-4">
                                <FiFileText className="text-black w-6 h-6" />
                                <h2 className="text-2xl font-bold text-black">Overview</h2>
                            </div>
                            <p className="mt-2 text-gray-700 text-base">
                                <span>Royal Packers and movers excellent Pan India Home Moving &amp; Packing Services. Royal promises the best prices, dedicated Move Consultants, authorized Service Partners and Tension Free Shifting for its customers.</span>
                                <span className="text-blue-600"> #HomeMovingkaSaathi</span>
                                <span className="text-gray-700">&nbsp;</span>
                                <span className="text-blue-600">#SmartHomeMoving</span>
                            </p>

                            <div className="flex justify-start items-center">



                                <div className="flex flex-col justify-start items-start">

                                    <div>
                                        <p className="text-base font-medium mb-1 mt-2">We offer</p>
                                        <div className="flex items-center gap-2 mb-2">
                                            <FiArrowRight className="text-gray-800 w-5 h-5" />
                                            <p className="text-gray-800">Logistic Services</p>
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <FiArrowRight className="text-gray-800 w-5 h-5" />
                                            <p className="text-gray-800">Packers and Movers</p>
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <FiArrowRight className="text-gray-800 w-5 h-5" />
                                            <p className="text-gray-800">Transportation</p>
                                        </div>
                                    </div>

                                    <div className="">
                                        <p className="text-base font-medium mb-1 mt-2">We accept</p>

                                        <div className="flex flex-wrap gap-2">
                                            <div className="flex items-center mb-2 bg-gray-300 rounded-full justify-center px-4 py-1">
                                                <span className="text-gray-800 text-sm">Cash</span>
                                            </div>
                                            <div className="flex items-center mb-2 bg-gray-300 rounded-full justify-center px-4 py-1">
                                                <p className="text-gray-800 text-sm">Card</p>
                                            </div>
                                            <div className="flex items-center mb-2 bg-gray-300 rounded-full justify-center px-4 py-1">
                                                <p className="text-gray-800 text-sm">UPI</p>
                                            </div>
                                            <div className="flex items-center mb-2 bg-gray-300 rounded-full justify-center px-4 py-1">
                                                <p className="text-gray-800 text-sm">American Express</p>
                                            </div>
                                        </div>

                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>


                    {/* photos gallery */}
                    <div className=" w-full border-b pb-10 border-b-gray-300">
                        <div className="flex items-start gap-4">
                            <FiImage className="text-black w-6 h-6" />
                            <h2 className="text-2xl font-bold text-black">Photos</h2>
                        </div>

                        <div className="relative">
                            <div className="overflow-x-auto flex w-[calc(100%-10px)] custom-scrollbar">
                                <img src="https://media.istockphoto.com/id/1023612090/photo/interior-of-clothing-store.jpg?s=612x612&w=0&k=20&c=84NciWwU43Zyzmxph6bCVTG9WRO9rxDGUYtYnUqpTt8=" alt="" className="rounded-lg m-2 w-64" />
                                <img src="https://media.istockphoto.com/id/1023612090/photo/interior-of-clothing-store.jpg?s=612x612&w=0&k=20&c=84NciWwU43Zyzmxph6bCVTG9WRO9rxDGUYtYnUqpTt8=" alt="" className="rounded-lg m-2 w-64" />
                                <img src="https://media.istockphoto.com/id/1023612090/photo/interior-of-clothing-store.jpg?s=612x612&w=0&k=20&c=84NciWwU43Zyzmxph6bCVTG9WRO9rxDGUYtYnUqpTt8=" alt="" className="rounded-lg m-2 w-64" />
                                <img src="https://media.istockphoto.com/id/1023612090/photo/interior-of-clothing-store.jpg?s=612x612&w=0&k=20&c=84NciWwU43Zyzmxph6bCVTG9WRO9rxDGUYtYnUqpTt8=" alt="" className="rounded-lg m-2 w-64" />
                                <img src="https://media.istockphoto.com/id/1023612090/photo/interior-of-clothing-store.jpg?s=612x612&w=0&k=20&c=84NciWwU43Zyzmxph6bCVTG9WRO9rxDGUYtYnUqpTt8=" alt="" className="rounded-lg m-2 w-64" />
                                <img src="https://media.istockphoto.com/id/1023612090/photo/interior-of-clothing-store.jpg?s=612x612&w=0&k=20&c=84NciWwU43Zyzmxph6bCVTG9WRO9rxDGUYtYnUqpTt8=" alt="" className="rounded-lg m-2 w-64" />
                                <img src="https://media.istockphoto.com/id/1023612090/photo/interior-of-clothing-store.jpg?s=612x612&w=0&k=20&c=84NciWwU43Zyzmxph6bCVTG9WRO9rxDGUYtYnUqpTt8=" alt="" className="rounded-lg m-2 w-64" />
                                <img src="https://media.istockphoto.com/id/1023612090/photo/interior-of-clothing-store.jpg?s=612x612&w=0&k=20&c=84NciWwU43Zyzmxph6bCVTG9WRO9rxDGUYtYnUqpTt8=" alt="" className="rounded-lg m-2 w-64" />
                            </div>
                            <div className="gradient-overlay-right" />

                        </div>





                        <div className="flex items-center justify-start gap-4 mt-4">
                            <button className="flex items-center gap-2 p-2 px-4 bg-[#E9F5FE] rounded-full" style={{ border: "2px solid #C9E0F2" }}>
                                <FiUploadCloud className="text-gray-700 w-6 h-6" />
                                <p className="text-blue-500 text-md font-medium">Upload Photos</p>
                            </button>

                        </div>
                    </div>


                    {/* address */}
                    <div className="w-full border-b pb-10 border-b-gray-300">
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
                                H.No.185 Maruti City Mauza Kahrai, Shamshabad Road, Kahrai, Agra - 282001 (Near All Sent School)
                            </p>
                        </div>

                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.945429788256!2d77.26983317550078!3d28.631397575665424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd437d9b5153%3A0x96a56befc2cfe09d!2sARESUNO%20INFO%20INDIA%20PVT%20LTD!5e0!3m2!1sen!2sin!4v1698030034459!5m2!1sen!2sin" width="100%" height="400" allowFullScreen="" referrerPolicy="no-referrer-when-downgrade" className="rounded-xl"></iframe>
                    </div>


                    {/* posts */}
                    <div className="w-full border-b pb-10 border-b-gray-300">
                        <div className="flex items-center gap-4">
                            <FiInbox className="text-black w-6 h-6" />
                            <h2 className="text-2xl font-bold text-black">Updates</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-8 mt-8">
                            <div className="max-w-full gap-4 flex items-start">
                                <div className="flex-[3]">
                                    <img className="w-full rounded-xl object-cover" alt="Image" src="https://img.freepik.com/premium-vector/happy-diwali-festival-wishing-post-design-with-red-background-template_593190-96.jpg" />
                                </div>

                                <div className="flex-[10]">
                                    <p className="text-sm text-gray-600">
                                        #Car #Detailing and #ceramic #Coating #Services is significant as it gives the #brand a new look to your #vehicle. The shine stays as long as your vehicle. So, Grap the opportunity within your budget by availing the best services from Onyxaa Noida. Inquire Or Whatsapp For Rates.
                                    </p>
                                    <div className="mt-2 text-blue-600">#autodetailing&nbsp;&nbsp;#detailing&nbsp;&nbsp;#cardetailing&nbsp;&nbsp;#carcare&nbsp;&nbsp;#paintprote</div>
                                    <div className="mt-2 text-gray-500">29 august, 2023</div>
                                    <div className="flex items-center mt-2 text-green-600">
                                        <span className="font-semibold">VIEW MORE</span>
                                        <FiArrowRight className="ml-1 w-5 h-5" strokeWidth={2} />
                                    </div>
                                </div>
                            </div>


                            <div className="max-w-full gap-4 flex items-start">
                                <div className="flex-[3]">
                                    <img className="w-full rounded-xl object-cover" alt="Image" src="https://img.freepik.com/premium-vector/happy-diwali-festival-wishing-post-design-with-red-background-template_593190-96.jpg" />
                                </div>

                                <div className="flex-[10] flex flex-col h-full">
                                    <p className="text-sm text-gray-600">
                                        #Car #Detailing and #ceramic #Coating #Services is significant as it gives the #brand a new look to your #vehicle. The shine stays as long as your vehicle. So, Grap the opportunity within your budget by availing the best services from Onyxaa Noida. Inquire Or Whatsapp For Rates.
                                    </p>
                                    <div className="mt-2 text-blue-600">#autodetailing&nbsp;&nbsp;#detailing&nbsp;&nbsp;#cardetailing&nbsp;&nbsp;#carcare&nbsp;&nbsp;#paintprote</div>
                                    <div className="mt-2 text-gray-500">29 august, 2023</div>
                                    <div className="flex items-center mt-2 text-green-600">
                                        <span className="font-semibold">VIEW MORE</span>
                                        <FiArrowRight className="ml-1 w-5 h-5" strokeWidth={2} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* ratings and reviews */}
                    <div className="flex flex-col border-b pb-10 border-b-gray-300">
                        <div className="flex gap-4">
                            <FiStar className="text-black w-6 h-6" />
                            <h2 className="text-2xl font-bold text-black">Customer ratings & reviews</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-8 mt-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                                    <div className="text-white text-lg font-semibold">4.3</div>
                                </div>
                                <p className="text-black text-base">Overall 50 Ratings</p>
                            </div>
                            <div className="flex flex-col gap-4">

                                <div className="flex items-start gap-4">
                                    <div>
                                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" className=" w-20 rounded-full" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="">


                                            <span>Arjun Sharma</span>
                                            <div className="flex gap-4 mt-1">
                                                <div className="flex items-center">
                                                    <AiFillStar className="text-yellow-500" />
                                                    <AiFillStar className="text-yellow-500" />
                                                    <AiFillStar className="text-yellow-500" />
                                                    <AiFillStar className="text-yellow-500" />
                                                    <AiFillStar className="text-gray-300" />
                                                </div>
                                                <div className="text-gray-500 text-xs mr-4">2 days ago</div>

                                            </div>
                                        </div>
                                        <div>
                                            <p className=" font-normal text-sm">
                                                Had a very great experience with them. They were very efficient and fast in their highly recommend them. ThanksHad a very great experience with them. They were very efficient and fast in their highly recommend them. Thanks
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div>
                                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" className=" w-20 rounded-full" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="">


                                            <span>Arjun Sharma</span>
                                            <div className="flex gap-4 mt-1">
                                                <div className="flex items-center">
                                                    <AiFillStar className="text-yellow-500" />
                                                    <AiFillStar className="text-yellow-500" />
                                                    <AiFillStar className="text-yellow-500" />
                                                    <AiFillStar className="text-yellow-500" />
                                                    <AiFillStar className="text-gray-300" />
                                                </div>
                                                <div className="text-gray-500 text-xs mr-4">2 days ago</div>

                                            </div>
                                        </div>
                                        <div>
                                            <p className=" font-normal text-sm">
                                                Had a very great experience with them. They were very efficient and fast in their highly recommend them. ThanksHad a very great experience with them. They were very efficient and fast in their highly recommend them. Thanks
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div>
                                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" className=" w-20 rounded-full" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="">


                                            <span>Arjun Sharma</span>
                                            <div className="flex gap-4 mt-1">
                                                <div className="flex items-center">
                                                    <AiFillStar className="text-yellow-500" />
                                                    <AiFillStar className="text-yellow-500" />
                                                    <AiFillStar className="text-yellow-500" />
                                                    <AiFillStar className="text-yellow-500" />
                                                    <AiFillStar className="text-gray-300" />
                                                </div>
                                                <div className="text-gray-500 text-xs mr-4">2 days ago</div>

                                            </div>
                                        </div>
                                        <div>
                                            <p className=" font-normal text-sm">
                                                Had a very great experience with them. They were very efficient and fast in their highly recommend them. ThanksHad a very great experience with them. They were very efficient and fast in their highly recommend them. Thanks
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>



                    {/* faqs */}
                    <div className="w-full mb-10">
                        <div className="flex items-center gap-4">
                            <FiHelpCircle className="text-black w-6 h-6" />
                            <h2 className="text-2xl font-bold text-black">Frequently Asked Questions</h2>
                        </div>

                        <Accordion question={"1. Will Agra Packers and Movers in Kahrai transport my belongings inside itself?"} content={"Clothes and other movable items are removed and packed separately in boxes. This also makes them lighter to carry furniture away."} />
                        <Accordion question={"2. Should I pre-pack everything for them to carry away to the transport facility?"} content={"No, you do not need to pre-pack things. But, if you wish to be better prepared, you can do that too."} />
                        <Accordion question={"3. Can I call them directly on the day of shifting or do I need an earlier appointment?"} content={"Personnel from the company needs to visit your home to assess the weight and capacity of your belongings so they can plan to bring adequate supplies and transport them accordingly. Agra Packers and Movers are available during Monday:- Open 24 Hrs, Tuesday: - Open 24 Hrs, Wednesday:- Open 24 Hrs, thu:- Open 24 Hrs, Friday:- Open 24 Hrs, Saturday:- Open 24 Hrs, Sunday:- Open 24 Hrs. So, schedule a house call accordingly."} />

                    </div>

                </div>




                <div className="flex flex-col flex-[4.7] gap-6">







                    <div className="w-full border border-solid border-gray-300 rounded-xl py-6 pb-8 px-5">
                        <div className="text-xl font-bold mb-3">
                            <span>Rate us</span>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-600 text-base my-2">How would you rate our service?</p>
                            <div>

                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, index) => (
                                        <AiFillStar
                                            key={index}
                                            className={`transition-all duration-75 w-8 h-8 cursor-pointer ${(hoveredStars > 0 ? hoveredStars : selectedStars) > index
                                                    ? ['text-red-500', 'text-orange-500', 'text-yellow-500', 'text-green-600', 'text-blue-500'][
                                                    (hoveredStars > 0 ? hoveredStars : selectedStars) - 1
                                                    ]
                                                    : 'text-gray-300'
                                                }`}
                                            onMouseEnter={() => handleStarHover(index)}
                                            onMouseLeave={handleStarLeave}
                                            onClick={() => handleStarClick(index)}
                                        />
                                    ))}
                                    {(hoveredStars > 0 ? hoveredStars : selectedStars) && (
                                        <span className="ml-2 text-2xl">
                                            {['😢', '😕', '😐', '🙂', '😄'][(hoveredStars > 0 ? hoveredStars : selectedStars) - 1]}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-gray-600 text-base my-2 mt-4">Share your experience</p>

                            <div className="flex items-center flex-col gap-2">
                                <textarea name="text" id="" cols="30" placeholder="This is a very good ..." rows="10" className=" focus:outline-none w-full h-24 bg-gray-100 rounded-md px-4 py-2 resize-none"></textarea>
                                <button className="bg-blue-600 text-white w-full h-10 rounded-md">Rate</button>
                            </div>
                        </div>
                    </div>


                    <div className="w-full border border-solid border-gray-300 rounded-xl py-6 pb-8 px-6">
                        <span className="text-xl font-bold">Any Query?</span>
                        <p className="text-gray-500 text-sm my-2">Write to us and we will get back to you</p>
                        <div className="flex items-center flex-col gap-2">
                            <input type="text" placeholder="Name" className="w-full h-10 bg-gray-100 rounded-md px-4" />
                            <input type="text" placeholder="Phone Number" className="w-full h-10 bg-gray-100 rounded-md px-4" />
                            <input type="text" placeholder="Email" className="w-full h-10 bg-gray-100 rounded-md px-4" />
                            <textarea name="text" id="" cols="30" placeholder="Message" rows="10" className="w-full h-32 bg-gray-100 rounded-md px-4 py-2 resize-none"></textarea>
                            <button className="bg-blue-600 text-white w-full h-10 rounded-md">Submit</button>
                        </div>
                    </div>
                </div>





            </div>

        </div>
    );
};
