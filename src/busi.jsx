import React from "react";
import { FiArrowRight, FiFileText, FiHelpCircle, FiImage, FiInbox, FiLayout, FiMail, FiMapPin, FiMessageSquare, FiNavigation, FiPhone, FiShare2, FiShield, FiStar, FiThumbsUp, FiUploadCloud } from "react-icons/fi";
import { AiFillSketchSquare, AiFillStar, AiOutlineLike, AiOutlineWhatsApp } from "react-icons/ai";
import { PiShareFatBold } from "react-icons/pi";
import { BiLike } from "react-icons/bi";

export const Frame = () => {
    return (
        <div className="bg-white flex flex-col gap-4 justify-center w-full px-6">


            <div className="w-full border border-solid border-gray-300 rounded-xl p-8 flex gap-4">
                <div className="flex flex-[9] flex-col justify-center items-center md:items-start">
                    <div className="w-full bg-cover bg-center">


                        <div className="flex gap-4 justify-start items-start">

                            <div className="">
                                <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT2uKp7lRJ0koQdIwQ_doi-Lg1y_OgomVR4Zmqs3bR4VLyeL4mm" alt="" className="rounded-xl h-[100%]" />
                            </div>


                            <div>
                                <div className="text-black text-4xl font-bold whitespace-nowrap">Agra Packers And Movers</div>

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

                                <div className="flex items-center gap-2">
                                    <div className="relative bg-[#E9F5FE] rounded-full h-9 w-9" style={{ border: "2px solid #C9E0F2" }}>
                                        <PiShareFatBold className="text-[#1467E5] h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                    </div>
                                    <div className="relative bg-[#E9F5FE] rounded-full h-9 w-9" style={{ border: "2px solid #C9E0F2" }}>
                                        <BiLike className="text-[#1467E5] h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                    </div>
                                </div>




                            </div>
                        </div>


                    </div>
                </div>

                <div className="flex flex-[3] flex-col justify-center items-center md:items-start">

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            {/* <img className="w-6 h-6" alt="" src="vector-3.svg" /> */}
                            <FiMail className="text-gray-700" />
                            <span className="text-gray-700 text-sm">Mail</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* <img className="w-6 h-6" alt="" src="group.png" /> */}
                            <FiLayout className="text-gray-700" />
                            <span className="text-gray-700 text-sm">Website</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* <img className="w-6 h-6" alt="" src="vector-4.svg" /> */}
                            <AiOutlineWhatsApp className="text-gray-700" />
                            <span className="text-gray-700 text-sm">WhatsApp</span>
                        </div>
                    </div>


                    <div className="w-full flex flex-col items-center gap-4 mb-4">
                        <div className="w-full flex items-center gap-2 p-2 rounded-lg border border-solid border-blue-500">
                            <FiPhone className="text-blue-500" />
                            <span className="text-blue-500 font-semibold">Call Now</span>
                        </div>
                        <div className="w-full flex items-center gap-2 p-2 rounded-lg bg-blue-500">
                            <FiMessageSquare className="text-white" />
                            <span className="text-white font-semibold">Enquire Now</span>
                        </div>
                    </div>

                </div>
            </div>


            <div className="flex gap-4">

                {/* business bottom sedtion */}

                <div className="flex flex-col gap-4 flex-[9] border border-solid border-[#d7d7d7] rounded-xl px-10 py-8">


                    <div className="w-full border-b pb-4 border-b-gray-300">
                        <div className="w-full">
                            <div className="flex items-center justify-start gap-4">
                                <FiFileText className="text-gray-700 w-6 h-6" />
                                <h2 className="text-2xl font-bold text-black">Overview</h2>
                            </div>
                            <p className="mt-2 text-gray-700 text-base">
                                <span>Royal Packers and movers excellent Pan India Home Moving &amp; Packing Services. Royal promises the best
                                    prices, dedicated Move Consultants, authorized Service Partners and Tension Free Shifting for its customers.</span>
                                <span className="text-blue-500">#HomeMovingkaSaathi</span>
                                <span className="text-gray-700">&nbsp;</span>
                                <span className="text-blue-500">#SmartHomeMoving</span>
                                <span className="text-gray-700">&#34;</span>
                            </p>
                        </div>
                    </div>

                    <div className=" w-full">
                        <div className="flex items-start gap-4">
                            <FiImage className="text-gray-700 w-6 h-6" />
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
                    <div className="w-full">
                        <div className="flex items-center gap-4 mt-4">
                            {/* <img className="w-6 h-6" alt="Navigation" src="navigation-2.svg" /> */}
                            <FiNavigation className="text-gray-700 w-6 h-6" />
                            <h2 className="text-2xl font-bold text-black">Address</h2>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-600 text-base">
                                H.No.185 Maruti City Mauza Kahrai, Shamshabad Road, Kahrai, Agra - 282001 (Near All Sent School)
                            </p>
                        </div>
                        <img className="w-full h-auto mt-4" alt="Image" src="image-25-3.png" />
                    </div>


                    {/* posts */}
                    <div className="w-full">
                        <div className="flex items-center gap-4 mt-4">
                            <FiInbox className="text-gray-700 w-6 h-6" />
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
                                        <FiArrowRight className="ml-1 w-5 h-5" strokeWidth={2}/>
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
                                        <FiArrowRight className="ml-1 w-5 h-5" strokeWidth={2}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                    <div className="flex flex-col">
                        <div className="flex gap-4 mt-4">
                            <FiStar className="text-gray-700 w-6 h-6" />
                            <h2 className="text-2xl font-bold text-black">Ratings and Reviews</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-8 mt-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                    <div className="text-white text-lg font-semibold">4.3</div>
                                </div>
                                <p className="text-black text-base">Overall 50 Ratings</p>
                            </div>
                            <div className="grid grid-cols-1 gap-6">

                            </div>
                        </div>
                    </div>



                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mt-4">
                            {/* <img className="w-6 h-6" alt="Help circle" src="help-circle.svg" /> */}
                            <FiHelpCircle className="text-gray-700 w-6 h-6" />
                            <h2 className="text-2xl font-bold text-black">Frequently Asked Questions</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-8 mt-8">
                            <div className="max-w-full">
                                <p className="text-black text-lg">1. Will Agra Packers and Movers in Kahrai transport my belongings inside itself?</p>
                                <p className="mt-2 text-gray-600">
                                    Clothes and other movable items are removed and packed separately in boxes. This also makes them lighter to carry furniture away.
                                </p>
                            </div>
                            <div className="max-w-full">
                                <p className="text-black text-lg">2. Should I pre-pack everything for them to carry away to the transport facility?</p>
                                <p className="mt-2 text-gray-600">No, you do not need to pre-pack things. But, if you wish to be better prepared, you can do that too.</p>
                            </div>
                            <div className="max-w-full">
                                <p className="text-black text-lg">3. Can I call them directly on the day of shifting or do I need an earlier appointment?</p>
                                <p className="mt-2 text-gray-600">
                                    Personnel from the company needs to visit your home to assess the weight and capacity of your belongings so they can plan to bring adequate supplies and transport them accordingly. Agra Packers and Movers are available during Monday:- Open 24 Hrs, Tuesday: - Open 24 Hrs, Wednesday:- Open 24 Hrs, thu:- Open 24 Hrs, Friday:- Open 24 Hrs, Saturday:- Open 24 Hrs, Sunday:- Open 24 Hrs. So, schedule a house call accordingly.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>




                <div>

                    <div className="w-full max-w-md border border-solid border-gray-300 rounded-xl p-8">
                        <p className="text-2xl font-bold mb-4 text-center">Business Hours</p>
                        <p className="text-center text-gray-600 mb-6">Monday - Sunday, 9:00 AM to 10:00 PM</p>

                        <div className="mb-8">
                            <p className="text-xl font-semibold mb-4">Services</p>
                            <div className="flex items-center mb-2">
                                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                                <p className="text-gray-800">Logistic Services</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                                <p className="text-gray-800">Packers and Movers</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                                <p className="text-gray-800">Transportation</p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <p className="text-xl font-semibold mb-4">Mode of Payment</p>
                            <p className="text-gray-600">
                                Cash <br />
                                Master Card <br />
                                Visa Card <br />
                                Debit Cards <br />
                                American Express <br />
                                Credit Card
                            </p>
                        </div>
                    </div>



                    <div className="w-full md:max-w-screen-md border border-solid border-gray-300 rounded-xl p-8 mx-auto">
                        <div className="w-full bg-gray-100 rounded-md mb-4 py-2 px-4">
                            <span className="text-gray-700 text-base">Name</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-md mb-4 py-2 px-4">
                            <span className="text-gray-700 text-base text-center">Phone Number</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-md mb-4 py-2 px-4">
                            <span className="text-gray-700 text-base text-center">Email Id</span>
                        </div>
                        <div className="w-full bg-blue-500 rounded-md mb-4 py-2 px-4">
                            <span className="text-white text-base text-center font-bold">Submit</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-md mb-4 py-2 px-4">
                            <span className="text-gray-700 text-base text-center">Query</span>
                        </div>
                        <div className="w-full mb-4">
                            <p className="text-black text-xl font-semibold">Questions</p>
                        </div>
                    </div>
                </div>





            </div>

        </div>
    );
};
