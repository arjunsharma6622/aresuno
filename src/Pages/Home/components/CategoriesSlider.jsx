import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

const CategoriesSlider = ({ categories, categoryTitle }) => {
  const [swiper, setSwiper] = useState(null);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const userLocationName = useSelector((state) => state.user.locationName);

  const handleSwiper = (swiperInstance) => {
    setSwiper(swiperInstance);
  };

  const handleSlideChange = () => {
    if (swiper) {
      setIsStart(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }
  };

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        slidesPerView={4}
        spaceBetween={30}
        navigation={{
          nextEl: `.arrow-right-${categoryTitle.title}`,
          prevEl: `.arrow-left-${categoryTitle.title}`,
        }}
        autoHeight={true}
        pagination={{ clickable: true, dynamicBullets: true }}
        onSwiper={handleSwiper}
        onSlideChange={handleSlideChange}
        className="py-3"
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {categories?.map((subCategory, index) => (
          <SwiperSlide key={index} className="">
            <Link
              to={`/${userLocationName.toLowerCase()}/${subCategory.name.replace(/\s+/g, "-").toLowerCase()}`}
              className="w-full flex flex-col items-center max-md:w-full max-md:ml-0"
            >
              <div
                key={index}
                className="w-full flex flex-col items-stretch max-md:w-full max-md:ml-0"
              >
                <div className="justify-start items-start flex grow flex-col">
                  <div className="flex-col relative shadow-sm overflow-hidden flex aspect-[1.5235294117647058] w-full items-stretch justify-start rounded-lg">
                    <img
                      loading="lazy"
                      src={subCategory.image.url.replace(
                        "/upload",
                        "/upload/c_scale,h_500",
                      )}
                      alt={subCategory.image.altTag}
                      className="w-full h-full object-cover"
                    />
                    <div className="text-neutral-700 bottom-2 left-3 absolute text-xs font-medium justify-center bg-neutral-200 bg-opacity-80 px-[10px] py-[6px] rounded-md">
                      {subCategory.businesses?.length} Services
                    </div>
                  </div>
                  <div className="text-black text-sm whitespace-nowrap mt-2">
                    {subCategory.name}
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {!isStart && (
        <button
          className={` arrow-right-${categoryTitle.title} arrow shadow-lg bg-gray-100/30 backdrop-blur-lg rounded-full p-[6px] absolute top-1/2 transform -translate-y-1/2 -left-4 z-[20] cursor-pointer `}
          onClick={() => swiper.slidePrev()}
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
      )}

      {!isEnd && (
        <button
          className={` arrow-left-${categoryTitle.title} arrow shadow-lg bg-gray-100/30 backdrop-blur-lg rounded-full p-[6px] absolute top-1/2 transform -translate-y-1/2 -right-4 z-[20] cursor-pointer`}
          onClick={() => swiper.slideNext()}
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default CategoriesSlider;
