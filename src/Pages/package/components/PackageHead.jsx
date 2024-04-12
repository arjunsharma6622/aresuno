import { Swiper, SwiperSlide } from "swiper/react";
import { useForm } from "react-hook-form";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const PackageHead = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

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
      <div className="flex-[6] hidden lg:block w-0 px-auto">
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
            <SwiperSlide key={sliderImage} className="rounded-2xl h-96">
              <img src={sliderImage} alt="" className="rounded-2xl h-96" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex-[7] flex flex-col justify-start gap-10">
        <h1 className="text-3xl leading-relaxed font-semi">
          <span className="text-4xl font-bold">Transform Your Business</span>{" "}
          with India&apos;s Leading Online Marketplace
        </h1>
        <div>
          <form
            className="w-full flex items-center rounded-lg h-14 border border-blue-500"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              placeholder="Enter your Number"
              className="px-2 rounded-lg py-2 focus:outline-none h-full w-full"
              {...register("number", {
                required: true,
                pattern:
                  /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm,
              })}
            />
            <input
              value={"Create listing"}
              className="w-min h-full p-2 cursor-pointer bg-blue-500 text-white rounded-tr-[5px] rounded-br-[5px] flex items-center gap-2"
              type="submit"
            />
          </form>

          {errors.number && (
            <span className="text-red-600 ml-1 text-xs">
              Invalid phone number
            </span>
          )}
        </div>
        <div className="flex justify-center items-start gap-1 md:gap-3 lg:gap-9">
          {" "}
          {infoToCustomer.map((info) => (
            <div
              key={info.name}
              className="max-w-[12rem] flex flex-col items-center text-center"
            >
              <div className="bg-blue-100 p-2 rounded-full max-w-[4rem] max-h-[4rem] aspect-square flex items-center justify-center">
                <img
                  src={`./assets/images/${info.icon}`}
                  alt=""
                  className="max-w-[2rem]"
                />
              </div>
              <div>
                <p>{info.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageHead;
