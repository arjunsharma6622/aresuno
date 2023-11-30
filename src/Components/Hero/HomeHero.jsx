import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiCrosshair, FiHardDrive, FiNavigation } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getBanner } from "../../bannerSlice";
import { Link } from "react-router-dom";

function HomeHero(props) {

  const dispatch = useDispatch();

  const categories = useSelector(state => state.categories)
  console.log(categories)


  const [banner, setBanner] = useState({ image: "" });



  const bannerUrl = useSelector(state => state.banner.url)


  const fetchBanner = async () => {
    try {
      const res = await axios.get("https://aresuno-server.vercel.app/api/banner")
      console.log(res.data[0].image)
      setBanner(res.data[0])
      dispatch(getBanner(res.data[0].image))
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchBanner()
  }, [])
9







  return (
    <div className="bg-white flex flex-col">

      <div className="justify-center items-center self-stretch flex w-full flex-col px-5 max-md:max-w-full">

      </div>



      <div className="relative flex-col overflow-hidden self-stretch flex min-h-[576px] w-full items-center px-5 py-12 max-md:max-w-full">

        <div className="gradient-overlay-top h-48 z[-1]"></div>
        <img
          loading="lazy"
          src={bannerUrl}
          className="absolute h-full w-full object-cover object-center inset-0"
        />
        <div className="relative z-[10] flex w-full max-w-[1195px] flex-col mt-12 mb-10 max-md:max-w-full max-md:my-10">
          <div className="text-white text-4xl font-bold leading-[60px] tracking-wider self-center whitespace-nowrap max-md:max-w-full">
            India’s Largest Service Provider
          </div>
          <div className="text-white text-2xl leading-9 tracking-wider self-center whitespace-nowrap mt-3.5">
            Search from 1000+ Services
          </div>
          <div className="bg-white self-stretch flex w-full items-center justify-between gap-5 mt-20 pl-11 pr-6 py-3 rounded-[60px] max-md:max-w-full max-md:flex-wrap max-md:mt-10 max-md:px-5">

            <div className="w-full flex px-5 py-3 rounded-full items-center gap-5">
              <FiHardDrive />
              <input className="text-stone-500 focus:outline-none text-base" placeholder="What are you looking for?
"/>
            </div>
            <div className="w-full flex px-5 py-3 rounded-full items-center gap-5">
              <FiNavigation />
              <input className="text-stone-500 focus:outline-none text-base" placeholder="Your location
"/>
              <FiCrosshair className="w-6 h-6 text-gray-500" />
            </div>

            <div className="flex items-center">
              <button className="text-base py-4 text-white rounded-full px-10 bg-blue-600">
                Search
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center flex-wrap gap-5 mt-10">
            {
              categories.map((category, index) => (
                <div key={index} className="text-white text-center text-base font-semibold bg-blue-600 px-5 py-2 rounded-full">
                  {category.title}
                </div>
              ))
            }
          </div>

        </div>
      </div>
      <div className="text-black text-center text-xl font-semibold leading-8 self-center whitespace-nowrap mt-24 max-md:mt-10">
        SERVICES
      </div>
      <div className="text-blue-600 text-center text-3xl font-bold leading-10 self-center whitespace-nowrap mt-6 max-md:max-w-full">
        All the Categories of Services
      </div>
      <div className="text-neutral-500 text-center text-base leading-6 self-center whitespace-nowrap mt-5 max-md:max-w-full">
        Elevating Your Service Experience with Increased Flexibility and a Wide
        Array of Options.
      </div>
      <div className="self-center w-full max-w-[1314px] mt-16 max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">


          {
            categories.map((category, index) => (

              <div key={index} className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
                <div className="justify-center items-center flex grow flex-col w-full mx-auto px-9 py-8 rounded-xl border-solid border-zinc-300 max-md:max-w-full max-md:mt-10 max-md:px-5">
                  <div className="text-black text-xl font-semibold uppercase leading-8 tracking-wide whitespace-nowrap">
                    {category.title}
                  </div>
                  <div className="w-full self-stretch mt-10 max-md:max-w-full">
                    <div className="grid grid-cols-2 w-full gap-4 gap-y-7">

                      {category.subcategories.map((subCategory, index) => (

                        <Link to={`/${subCategory.name.replace(/\s+/g, '-').toLowerCase()}`} key={index} className="w-full flex flex-col items-stretch max-md:w-full max-md:ml-0">

                        <div key={index} className="w-full flex flex-col items-stretch max-md:w-full max-md:ml-0">
                          <div className="justify-center items-stretch flex grow flex-col max-md:mt-10">
                            <div className="flex-col relative shadow-sm overflow-hidden flex aspect-[1.5235294117647058] w-full items-stretch rounded-lg">
                              <img
                                loading="lazy"
                                src={subCategory.image.url}
                                alt={subCategory.image.altTag}
                                className="w-full h-full object-cover"
                              />
                              <div className="text-neutral-700 bottom-2 left-3 absolute text-xs font-medium justify-center bg-neutral-200 bg-opacity-80 px-[10px] py-[6px] rounded-md">
                                {subCategory.businesses.length} Services
                              </div>
                            </div>
                            <div className="text-black text-sm leading-5 tracking-wide self-center whitespace-nowrap mt-3">
                              {subCategory.name}
                            </div>
                          </div>
                        </div>

                        </Link>

                      ))}









                    </div>
                  </div>

                </div>
              </div>

            ))
          }

        </div>
      </div>
      <div className="text-black text-center text-xl font-semibold leading-8 self-center whitespace-nowrap mt-44 max-md:mt-10">
        TESTIMONIALS
      </div>
      <div className="text-blue-600 text-center text-3xl font-bold leading-10 self-center whitespace-nowrap mt-6">
        What Clients Say
      </div>
      <div className="text-neutral-500 text-center text-base leading-6 self-center max-w-[726px] mt-4 max-md:max-w-full">
        We place huge value on strong relationships and have seen the benefit
        they bring to our business. Customer feedback is vital in helping us to
        get it right.
      </div>
      <div className="self-center w-full max-w-[1196px] mt-14 px-5 max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col items-stretch mt-1.5 max-md:mt-10">
              <div className="bg-neutral-100 flex flex-col pt-9 pb-8 px-9 rounded-3xl max-md:px-5">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/545a31c2-3bf7-4e89-9180-705fa2d0a2c0?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/545a31c2-3bf7-4e89-9180-705fa2d0a2c0?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/545a31c2-3bf7-4e89-9180-705fa2d0a2c0?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/545a31c2-3bf7-4e89-9180-705fa2d0a2c0?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/545a31c2-3bf7-4e89-9180-705fa2d0a2c0?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/545a31c2-3bf7-4e89-9180-705fa2d0a2c0?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/545a31c2-3bf7-4e89-9180-705fa2d0a2c0?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/545a31c2-3bf7-4e89-9180-705fa2d0a2c0?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                  className="aspect-square object-contain object-center w-24 overflow-hidden self-center max-w-full rounded-[50%]"
                />
                <div className="text-zinc-700 text-center text-sm leading-5 self-stretch mt-12 max-md:mt-10">
                  We place huge value on strong relationships and have seen the
                  benefit they bring to our business. Customer feedback is vital
                  in helping us to get it right. Customer feedback is vital in{" "}
                </div>
                <div className="text-blue-600 text-center text-base font-semibold leading-6 self-center whitespace-nowrap mt-11 max-md:mt-10">
                  Rahul Verma
                </div>
                <div className="text-neutral-500 text-center text-sm leading-5 self-center whitespace-nowrap mt-3.5">
                  Designation
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col items-stretch mt-2 max-md:mt-10">
              <div className="bg-neutral-100 flex flex-col pt-9 pb-8 px-9 rounded-3xl max-md:px-5">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/c8c81659-c1e3-4c8f-9299-73074403df74?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8c81659-c1e3-4c8f-9299-73074403df74?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8c81659-c1e3-4c8f-9299-73074403df74?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8c81659-c1e3-4c8f-9299-73074403df74?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8c81659-c1e3-4c8f-9299-73074403df74?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8c81659-c1e3-4c8f-9299-73074403df74?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8c81659-c1e3-4c8f-9299-73074403df74?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/c8c81659-c1e3-4c8f-9299-73074403df74?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                  className="aspect-square object-contain object-center w-24 overflow-hidden self-center max-w-full rounded-[50%]"
                />
                <div className="text-zinc-700 text-center text-sm leading-5 self-stretch mt-12 max-md:mt-10">
                  We place huge value on strong relationships and have seen the
                  benefit they bring to our business. Customer feedback is vital
                  in helping us to get it right. Customer feedback is vital in{" "}
                </div>
                <div className="text-blue-600 text-center text-base font-semibold leading-6 self-center whitespace-nowrap mt-11 max-md:mt-10">
                  Arjun Sharma
                </div>
                <div className="text-neutral-500 text-center text-sm leading-5 self-center whitespace-nowrap mt-2.5">
                  Designation
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex flex-col items-stretch max-md:mt-10">
              <div className="bg-neutral-100 flex flex-col pt-9 pb-8 px-9 rounded-3xl max-md:px-5">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/73bca71a-03c3-4d68-8290-3e477dcde5d2?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/73bca71a-03c3-4d68-8290-3e477dcde5d2?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/73bca71a-03c3-4d68-8290-3e477dcde5d2?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/73bca71a-03c3-4d68-8290-3e477dcde5d2?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/73bca71a-03c3-4d68-8290-3e477dcde5d2?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/73bca71a-03c3-4d68-8290-3e477dcde5d2?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/73bca71a-03c3-4d68-8290-3e477dcde5d2?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/73bca71a-03c3-4d68-8290-3e477dcde5d2?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                  className="aspect-square object-contain object-center w-24 overflow-hidden self-center max-w-full rounded-[50%]"
                />
                <div className="text-zinc-700 text-center text-sm leading-5 self-stretch mt-12 max-md:mt-10">
                  We place huge value on strong relationships and have seen the
                  benefit they bring to our business. Customer feedback is vital
                  in helping us to get it right. Customer feedback is vital in{" "}
                </div>
                <div className="text-blue-600 text-center text-base font-semibold leading-6 self-center whitespace-nowrap mt-11 max-md:mt-10">
                  Jeff Bezos
                </div>
                <div className="text-neutral-500 text-center text-sm leading-5 self-center whitespace-nowrap mt-3.5">
                  Designation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-black text-center text-xl font-semibold leading-8 self-center whitespace-nowrap mt-44 max-md:mt-10">
        ABOUT US
      </div>
      <div className="text-blue-600 text-center text-3xl font-bold leading-10 self-center whitespace-nowrap mt-7">
        Know About Us
      </div>
      <div className="text-neutral-500 text-center text-base leading-6 self-center max-w-[726px] mt-7 max-md:max-w-full">
        Aresuno Brings You Pliability In Choosing The Right Services as You Want
        To Avail.
      </div>
      <div className="self-stretch w-full mt-20 max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[41%] max-md:w-full max-md:ml-0">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/6b5bcd7e-25c3-40be-8e27-085db9f6d6f6?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b5bcd7e-25c3-40be-8e27-085db9f6d6f6?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b5bcd7e-25c3-40be-8e27-085db9f6d6f6?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b5bcd7e-25c3-40be-8e27-085db9f6d6f6?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b5bcd7e-25c3-40be-8e27-085db9f6d6f6?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b5bcd7e-25c3-40be-8e27-085db9f6d6f6?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b5bcd7e-25c3-40be-8e27-085db9f6d6f6?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b5bcd7e-25c3-40be-8e27-085db9f6d6f6?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
              className="aspect-[1.22] object-contain object-center w-full overflow-hidden grow max-md:max-w-full"
            />
          </div>
          <div className="flex flex-col items-stretch w-[59%] ml-5 max-md:w-full max-md:ml-0">
            <div className="bg-neutral-100 flex grow flex-col items-stretch w-full mx-auto px-16 py-12 max-md:max-w-full max-md:px-5">
              <div className="text-neutral-600 text-base leading-7 mt-5 max-md:max-w-full">
                <span className="font-bold text-blue-600">At Aresuno</span>
                <span className=" text-neutral-600">
                  , we believe in putting you in control of your service
                  experience. Our range of services and solutions is
                  meticulously crafted to cater to your comfort and
                  satisfaction. With an extensive array of options, you can now
                  select from a diverse range of services and enjoy exceptional
                  benefits. Aresuno takes pride in being a professional
                  on-demand services provider, guided by the vision of becoming
                  an indispensable asset.
                </span>
              </div>
              <div className="text-neutral-600 text-base leading-7 mt-12 mb-7 max-md:max-w-full max-md:mt-10">
                <span className="font-bold text-blue-600">Founded on</span>
                <span className=" text-neutral-600">
                  {" "}
                  June 11th, 2018, Aresuno Info India Pvt. Ltd. has established
                  itself as a premier service provider in the Delhi/NCR region.
                  With a comprehensive portfolio of over 500 services, Aresuno
                  Info India Pvt. Ltd. stands as a beacon of excellence.
                  Bolstered by the Aresuno ethos, our team of seasoned
                  professionals has been meticulously trained to deliver
                  top-tier service. This commitment translates into a 100%
                  service guarantee for all our valued clients.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}



export default HomeHero