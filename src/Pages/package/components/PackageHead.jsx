import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const PackageHead = () => {
  const infoToCustomer = [
    {
      name: "Create an Account",
      icon: "signup.png",
    },
    {
      name: "List Your Business",
      icon: "business.png",
    },
    {
      name: "Get Instant Leads",
      icon: "leads.png",
    },
    {
      name: "Grow Your Business",
      icon: "grow.png",
    },
  ];

  const sliderImages = [
    "https://www.hourmaid.com/wp-content/uploads/2017/12/cleaning-services-1024x682.jpeg",
    "https://5.imimg.com/data5/SELLER/Default/2023/3/HO/ST/EC/98516312/housekeeping-services-for-company.jpg",
    "https://t4.ftcdn.net/jpg/05/21/93/17/360_F_521931702_TXOHZBa3tLVISome894Zc061ceab4Txm.jpg",
    "https://bhopalservicecentre.com/wp-content/uploads/2020/02/ac-repair-service-bhopal.jpg",
  ];
  return (
    <div className="flex w-full items-end gap-10 mx-auto">
      <div className="flex-[6] w-0">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper rounded-2xl"
        >
          {sliderImages.map((sliderImage) => (
            <SwiperSlide className="rounded-2xl h-96">
              <img src={sliderImage} alt="" className="rounded-2xl h-96" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex-[7] flex flex-col justify-start gap-10">
        <h1 className="text-3xl leading-relaxed font-medium">
          <span className="underline text-4xl font-semibold">
            Transform Your Business
          </span>{" "}
          with India's Leading Online Marketplace: List Today!
        </h1>
        <div className="w-full flex items-center rounded-lg h-14 border border-blue-500">
          <input
            type="text"
            placeholder="Enter your Number"
            className="px-4 rounded-lg py-2 focus:outline-none h-full w-full"
          />
          <button className=" w-60 h-full px-4 bg-blue-500 text-white rounded-tr-lg rounded-br-lg flex items-center gap-2">
            Create a Listing <FiArrowRight />
          </button>
        </div>

        <div className="flex items-center justify-between gap-6">
          {infoToCustomer.map((info) => (
            <div className="flex items-center gap-2 flex-col">
              <div className="p-4 bg-blue-100 rounded-full">
                <img
                  src={`./assets/images/${info.icon}`}
                  alt=""
                  className="w-12"
                />
              </div>
              <p>{info.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageHead;
