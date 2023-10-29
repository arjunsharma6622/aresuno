import * as React from "react";

export default function ServiceListing(props) {
  return (
    <div className="bg-white flex flex-col">
      <div className="self-stretch flex w-full flex-col max-md:max-w-full">
        <div className="justify-center items-center self-stretch flex w-full flex-col px-5 py-5 border-b-zinc-300 border-b border-solid max-md:max-w-full">
          <div className="self-center flex w-full max-w-[1062px] items-start justify-between gap-5 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
            <div className="text-blue-600 text-4xl font-semibold my-auto">
              AreSuno
            </div>
            <div className="items-start self-center flex w-[313px] max-w-full justify-between gap-5 my-auto max-md:justify-center">
              <div className="justify-center text-blue-600 text-center text-sm font-medium">
                List Your Service
              </div>
              <div className="justify-center text-blue-600 text-center text-sm font-medium self-stretch">
                Contact Us
              </div>
              <div className="justify-center text-blue-600 text-center text-sm font-medium self-stretch">
                Signup
              </div>
            </div>
            <div className="items-center bg-zinc-300 self-stretch flex w-[261px] max-w-full flex-col px-5 py-3 rounded-[40px]">
              <div className="flex w-[133px] max-w-full items-start gap-5 self-start max-md:ml-1.5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3fe5f1d9-972d-424e-883e-4de83603252c?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                  className="aspect-square object-cover object-center w-3.5 fill-neutral-600 overflow-hidden self-center max-w-full my-auto"
                />
                <div className="text-neutral-600 text-sm tracking-wide">
                  Search...
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-col overflow-hidden self-stretch relative flex min-h-[576px] w-full pt-24 pb-24 px-5 max-md:max-w-full">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/287c4d57-e356-481b-b48e-9937af402c77?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/287c4d57-e356-481b-b48e-9937af402c77?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/287c4d57-e356-481b-b48e-9937af402c77?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/287c4d57-e356-481b-b48e-9937af402c77?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/287c4d57-e356-481b-b48e-9937af402c77?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/287c4d57-e356-481b-b48e-9937af402c77?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/287c4d57-e356-481b-b48e-9937af402c77?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/287c4d57-e356-481b-b48e-9937af402c77?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
            className="absolute z-[-1] h-full w-full object-cover object-center inset-0"
          />
          <div className="relative text-white text-4xl font-bold tracking-wider self-center whitespace-nowrap max-md:max-w-full">
            India’s Largest Service Provider
          </div>
          <div className="relative text-white text-2xl tracking-wide self-center mt-3.5 whitespace-nowrap">
            Search from 1000+ Services
          </div>
          <div className="relative bg-white self-center flex w-full max-w-[1195px] flex-col mt-20 px-5 py-3 rounded-[60px] max-md:max-w-full max-md:mt-10 max-sm:ml-px max-sm:mb-7">
            <div className="self-center flex w-full max-w-[1125px] items-start justify-between gap-5 max-md:max-w-full max-md:flex-wrap max-md:justify-center max-sm:mb-0">
              <div className="self-center flex items-start gap-5 my-auto">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4007c506-56dc-4afe-aaeb-b638476e0667?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                  className="aspect-square object-cover object-center w-[30px] overflow-hidden self-stretch max-w-full"
                />
                <div className="text-stone-500 text-lg tracking-wide self-center my-auto whitespace-nowrap">
                  What are you looking for?
                </div>
              </div>
              <div className="justify-center items-center bg-blue-600 self-stretch flex w-[167px] max-w-full flex-col px-5 py-5 rounded-[40px] max-sm:w-[104px] max-sm:hidden max-sm:-mt-px max-sm:pt-1.5 max-sm:pb-0.5">
                <div className="text-white text-lg font-semibold tracking-wide self-center whitespace-nowrap">
                  Search
                </div>
              </div>
              <div className="self-stretch flex w-[207px] max-w-full items-start justify-between gap-5 max-sm:hidden">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cd8d2831-7b67-47ff-b8c8-8cc5fee73338?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                  className="aspect-[0.04] object-cover object-center w-0.5 rotate-90 stroke-[2px] stroke-stone-500 overflow-hidden self-stretch max-w-full"
                />
                <div className="items-start self-center flex gap-5 my-auto">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ca463a3-9ddb-4b2a-88c5-4e51229f2ad4?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                    className="aspect-square object-cover object-center w-[30px] overflow-hidden self-stretch max-w-full max-sm:hidden"
                  />
                  <div className="text-stone-500 text-lg tracking-wide self-center my-auto whitespace-nowrap">
                    Your Location
                  </div>
                </div>
              </div>
              <div className="self-stretch flex w-[273px] max-w-full items-start justify-between gap-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a707b99-7c67-4b55-a6a8-785e51a2df52?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                  className="aspect-square object-cover object-center w-6 overflow-hidden self-center max-w-full my-auto max-sm:hidden"
                />
              </div>
            </div>
          </div>
          <div className="relative justify-between items-start self-center flex w-full max-w-[1120px] gap-5 mt-12 max-md:max-w-full max-md:flex-wrap max-md:justify-center max-md:mt-10">
            <div className="text-white text-base font-semibold tracking-wide self-stretch justify-center items-center bg-blue-600 w-48 max-w-full px-5 py-2 rounded-[31px] whitespace-nowrap">
              Car Repair Services
            </div>
            <div className="text-white text-base font-semibold tracking-wide self-stretch justify-center items-center bg-blue-600 w-[123px] max-w-full px-5 py-2 rounded-[31px] whitespace-nowrap">
              AC Repairs
            </div>
            <div className="text-white text-base font-semibold tracking-wide self-stretch justify-center items-center bg-blue-600 w-[196px] max-w-full px-5 py-2 rounded-[31px] whitespace-nowrap">
              Packers and Movers
            </div>
            <div className="text-white text-base font-semibold tracking-wide self-stretch justify-center items-center bg-blue-600 w-[177px] max-w-full px-5 py-2 rounded-[31px] whitespace-nowrap">
              Interior Designers
            </div>
            <div className="text-white text-base font-semibold tracking-wide self-stretch justify-center items-center bg-blue-600 w-[146px] max-w-full px-5 py-2 rounded-[31px] whitespace-nowrap">
              Photographer
            </div>
            <div className="text-white text-base font-semibold tracking-wide self-stretch justify-center items-center bg-blue-600 w-[146px] max-w-full px-5 py-2 rounded-[31px] whitespace-nowrap">
              Photographer
            </div>
          </div>
          <div className="relative items-start self-center flex w-full max-w-[1051px] justify-between gap-5 mt-7 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
            <div className="text-white text-base font-semibold tracking-wide self-stretch justify-center items-center bg-blue-600 w-[218px] max-w-full px-5 py-2 rounded-[31px] whitespace-nowrap">
              Wedding Card Printing
            </div>
            <div className="text-white text-base font-semibold tracking-wide self-stretch justify-center items-center bg-blue-600 w-[171px] max-w-full px-5 py-2 rounded-[31px] whitespace-nowrap">
              Event Organizers
            </div>
            <div className="text-white text-base font-semibold tracking-wide self-stretch justify-center items-center bg-blue-600 w-[244px] max-w-full px-5 py-2 rounded-[31px] whitespace-nowrap">
              Nutritionitists & Dieticians
            </div>
            <div className="text-white text-base font-semibold tracking-wide self-stretch justify-center items-center bg-blue-600 w-[147px] max-w-full px-5 py-2 rounded-[31px] whitespace-nowrap">
              Banquet Halls
            </div>
            <div className="text-white text-base font-semibold tracking-wide self-stretch justify-center items-center bg-blue-600 w-[159px] max-w-full px-5 py-2 rounded-[31px] whitespace-nowrap">
              CA for Business
            </div>
          </div>
        </div>
      </div>
      <div className="self-center flex w-full max-w-[1314px] flex-col mt-24 px-5 max-md:max-w-full max-md:mt-10">
        <div className="text-black text-center text-xl font-semibold self-center whitespace-nowrap">
          SERVICES
        </div>
        <div className="text-blue-600 text-center text-3xl font-bold self-center mt-6 whitespace-nowrap max-md:max-w-full">
          All the Categories of Services
        </div>
        <div className="text-neutral-500 text-center text-base self-center mt-5 whitespace-nowrap max-md:max-w-full">
          Elevating Your Service Experience with Increased Flexibility and a
          Wide Array of Options.
        </div>
        <div className="self-stretch mt-16 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
              <div className="justify-center items-center border flex grow flex-col w-full mx-auto px-5 py-8 rounded-xl border-solid border-zinc-300 max-md:max-w-full max-md:mt-10">
                <div className="text-black text-xl font-semibold tracking-wide self-center whitespace-nowrap">
                  HOME SERVICES
                </div>
                <div className="items-start content-start flex-wrap self-stretch flex flex-col mt-9 mx-2.5 p-1.5 max-md:max-w-full">
                  <div className="self-stretch max-md:max-w-full">
                    <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                      <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
                        <div className="justify-center items-center flex grow flex-col flex-1 max-md:mt-10">
                          <div className="flex-col shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden self-stretch relative flex aspect-[1.5235294117647058] w-full">
                            <img
                              loading="lazy"
                              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/89342749-8b36-41e6-8d2b-2ba600e06b4f?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/89342749-8b36-41e6-8d2b-2ba600e06b4f?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/89342749-8b36-41e6-8d2b-2ba600e06b4f?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/89342749-8b36-41e6-8d2b-2ba600e06b4f?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/89342749-8b36-41e6-8d2b-2ba600e06b4f?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/89342749-8b36-41e6-8d2b-2ba600e06b4f?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/89342749-8b36-41e6-8d2b-2ba600e06b4f?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/89342749-8b36-41e6-8d2b-2ba600e06b4f?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                              className="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                            />
                            <div className="relative self-stretch flex w-full grow flex-col pl-5 pr-3.5 pt-36 pb-2 rounded-xl">
                              <div className="text-neutral-700 text-xs font-medium tracking-normal justify-center items-center bg-neutral-200 bg-opacity-80 w-[79px] max-w-full p-2 rounded-md self-end whitespace-nowrap">
                                30 Services
                              </div>
                            </div>
                          </div>
                          <div className="text-black text-sm tracking-wide self-center mt-3 whitespace-nowrap">
                            Cleaning Service
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
                        <div className="justify-center items-center flex grow flex-col flex-1 max-md:mt-10">
                          <div className="flex-col shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden self-stretch relative flex aspect-[1.5235294117647058] w-full">
                            <img
                              loading="lazy"
                              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/fe9de671-ed2f-463b-a4c2-ae59d855718e?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/fe9de671-ed2f-463b-a4c2-ae59d855718e?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/fe9de671-ed2f-463b-a4c2-ae59d855718e?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/fe9de671-ed2f-463b-a4c2-ae59d855718e?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/fe9de671-ed2f-463b-a4c2-ae59d855718e?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/fe9de671-ed2f-463b-a4c2-ae59d855718e?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/fe9de671-ed2f-463b-a4c2-ae59d855718e?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/fe9de671-ed2f-463b-a4c2-ae59d855718e?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                              className="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                            />
                            <div className="relative self-stretch flex w-full grow flex-col pl-5 pr-3.5 pt-36 pb-2 rounded-xl">
                              <div className="text-neutral-700 text-xs font-medium tracking-normal justify-center items-center bg-neutral-200 bg-opacity-80 w-[79px] max-w-full p-2 rounded-md self-end whitespace-nowrap">
                                30 Services
                              </div>
                            </div>
                          </div>
                          <div className="text-black text-sm tracking-wide self-center mt-3 whitespace-nowrap">
                            Repair Service
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch mt-11 max-md:max-w-full max-md:mt-10">
                    <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                      <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
                        <div className="justify-center items-center flex grow flex-col flex-1 max-md:mt-10">
                          <div className="flex-col shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden self-stretch relative flex aspect-[1.5235294117647058] w-full">
                            <img
                              loading="lazy"
                              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/304c4f06-8395-45eb-950e-ab9f6ba905f6?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/304c4f06-8395-45eb-950e-ab9f6ba905f6?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/304c4f06-8395-45eb-950e-ab9f6ba905f6?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/304c4f06-8395-45eb-950e-ab9f6ba905f6?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/304c4f06-8395-45eb-950e-ab9f6ba905f6?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/304c4f06-8395-45eb-950e-ab9f6ba905f6?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/304c4f06-8395-45eb-950e-ab9f6ba905f6?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/304c4f06-8395-45eb-950e-ab9f6ba905f6?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                              className="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                            />
                            <div className="relative self-stretch flex w-full grow flex-col pl-5 pr-3.5 pt-36 pb-2 rounded-xl">
                              <div className="text-neutral-700 text-xs font-medium tracking-normal justify-center items-center bg-neutral-200 bg-opacity-80 w-[79px] max-w-full p-2 rounded-md self-end whitespace-nowrap">
                                30 Services
                              </div>
                            </div>
                          </div>
                          <div className="text-black text-sm tracking-wide self-center mt-3 whitespace-nowrap">
                            Decor Service
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
                        <div className="justify-center items-center flex grow flex-col flex-1 max-md:mt-10">
                          <div className="flex-col shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden self-stretch relative flex aspect-[1.5235294117647058] w-full">
                            <img
                              loading="lazy"
                              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0c10d42f-51ca-4297-831a-50eca5daa5cb?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c10d42f-51ca-4297-831a-50eca5daa5cb?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c10d42f-51ca-4297-831a-50eca5daa5cb?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c10d42f-51ca-4297-831a-50eca5daa5cb?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c10d42f-51ca-4297-831a-50eca5daa5cb?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c10d42f-51ca-4297-831a-50eca5daa5cb?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c10d42f-51ca-4297-831a-50eca5daa5cb?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c10d42f-51ca-4297-831a-50eca5daa5cb?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                              className="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                            />
                            <div className="relative self-stretch flex w-full grow flex-col pl-5 pr-3.5 pt-36 pb-2 rounded-xl">
                              <div className="text-neutral-700 text-xs font-medium tracking-normal justify-center items-center bg-neutral-200 bg-opacity-80 w-[79px] max-w-full p-2 rounded-md self-end whitespace-nowrap">
                                30 Services
                              </div>
                            </div>
                          </div>
                          <div className="text-black text-sm tracking-wide self-center mt-3 whitespace-nowrap">
                            Gardening Service
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
              <div className="justify-center items-center border flex grow flex-col w-full mx-auto px-5 py-8 rounded-xl border-solid border-zinc-300 max-md:max-w-full max-md:mt-10">
                <div className="text-black text-xl font-semibold tracking-wide self-center whitespace-nowrap">
                  HEALTH & WELLNESS
                </div>
                <div className="items-start content-start flex-wrap self-stretch flex flex-col mt-9 mx-2.5 p-1.5 max-md:max-w-full">
                  <div className="self-stretch max-md:max-w-full">
                    <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                      <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
                        <div className="justify-center items-center flex grow flex-col flex-1 max-md:mt-10">
                          <div className="flex-col shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden self-stretch relative flex aspect-[1.5235294117647058] w-full">
                            <img
                              loading="lazy"
                              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/584351c2-81ef-4379-a274-e81ddc4c66a7?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/584351c2-81ef-4379-a274-e81ddc4c66a7?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/584351c2-81ef-4379-a274-e81ddc4c66a7?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/584351c2-81ef-4379-a274-e81ddc4c66a7?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/584351c2-81ef-4379-a274-e81ddc4c66a7?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/584351c2-81ef-4379-a274-e81ddc4c66a7?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/584351c2-81ef-4379-a274-e81ddc4c66a7?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/584351c2-81ef-4379-a274-e81ddc4c66a7?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                              className="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                            />
                            <div className="relative self-stretch flex w-full grow flex-col pl-5 pr-3.5 pt-36 pb-2 rounded-xl">
                              <div className="text-neutral-700 text-xs font-medium tracking-normal justify-center items-center bg-neutral-200 bg-opacity-80 w-[79px] max-w-full p-2 rounded-md self-end whitespace-nowrap">
                                30 Services
                              </div>
                            </div>
                          </div>
                          <div className="text-black text-sm tracking-wide self-center mt-3 whitespace-nowrap">
                            Gym
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
                        <div className="justify-center items-center flex grow flex-col flex-1 max-md:mt-10">
                          <div className="flex-col shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden self-stretch relative flex aspect-[1.5235294117647058] w-full">
                            <img
                              loading="lazy"
                              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/2d8bf6c9-3f44-42aa-8e3b-66386c611061?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/2d8bf6c9-3f44-42aa-8e3b-66386c611061?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2d8bf6c9-3f44-42aa-8e3b-66386c611061?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/2d8bf6c9-3f44-42aa-8e3b-66386c611061?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/2d8bf6c9-3f44-42aa-8e3b-66386c611061?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2d8bf6c9-3f44-42aa-8e3b-66386c611061?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/2d8bf6c9-3f44-42aa-8e3b-66386c611061?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/2d8bf6c9-3f44-42aa-8e3b-66386c611061?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                              className="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                            />
                            <div className="relative self-stretch flex w-full grow flex-col pl-5 pr-3.5 pt-36 pb-2 rounded-xl">
                              <div className="text-neutral-700 text-xs font-medium tracking-normal justify-center items-center bg-neutral-200 bg-opacity-80 w-[79px] max-w-full p-2 rounded-md self-end whitespace-nowrap">
                                30 Services
                              </div>
                            </div>
                          </div>
                          <div className="text-black text-sm tracking-wide self-center mt-3 whitespace-nowrap">
                            Beauty Parlours
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch mt-11 max-md:max-w-full max-md:mt-10">
                    <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                      <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
                        <div className="justify-center items-center flex grow flex-col flex-1 max-md:mt-10">
                          <div className="flex-col shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden self-stretch relative flex aspect-[1.5235294117647058] w-full">
                            <img
                              loading="lazy"
                              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/3eb69703-0754-4546-81d0-2cd5296661c3?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/3eb69703-0754-4546-81d0-2cd5296661c3?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3eb69703-0754-4546-81d0-2cd5296661c3?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/3eb69703-0754-4546-81d0-2cd5296661c3?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/3eb69703-0754-4546-81d0-2cd5296661c3?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3eb69703-0754-4546-81d0-2cd5296661c3?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/3eb69703-0754-4546-81d0-2cd5296661c3?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/3eb69703-0754-4546-81d0-2cd5296661c3?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                              className="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                            />
                            <div className="relative self-stretch flex w-full grow flex-col pl-5 pr-3.5 pt-36 pb-2 rounded-xl">
                              <div className="text-neutral-700 text-xs font-medium tracking-normal justify-center items-center bg-neutral-200 bg-opacity-80 w-[79px] max-w-full p-2 rounded-md self-end whitespace-nowrap">
                                30 Services
                              </div>
                            </div>
                          </div>
                          <div className="text-black text-sm tracking-wide self-center mt-3 whitespace-nowrap">
                            Ayurvedic Medicines
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
                        <div className="justify-center items-center flex grow flex-col flex-1 max-md:mt-10">
                          <div className="flex-col shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden self-stretch relative flex aspect-[1.5235294117647058] w-full">
                            <img
                              loading="lazy"
                              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/59416b10-d52d-43d5-9171-630e9bd27d87?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/59416b10-d52d-43d5-9171-630e9bd27d87?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/59416b10-d52d-43d5-9171-630e9bd27d87?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/59416b10-d52d-43d5-9171-630e9bd27d87?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/59416b10-d52d-43d5-9171-630e9bd27d87?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/59416b10-d52d-43d5-9171-630e9bd27d87?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/59416b10-d52d-43d5-9171-630e9bd27d87?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/59416b10-d52d-43d5-9171-630e9bd27d87?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                              className="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                            />
                            <div className="relative self-stretch flex w-full grow flex-col pl-5 pr-3.5 pt-36 pb-2 rounded-xl">
                              <div className="text-neutral-700 text-xs font-medium tracking-normal justify-center items-center bg-neutral-200 bg-opacity-80 w-[79px] max-w-full p-2 rounded-md self-end whitespace-nowrap">
                                30 Services
                              </div>
                            </div>
                          </div>
                          <div className="text-black text-sm tracking-wide self-center mt-3 whitespace-nowrap">
                            Nutritionists
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-center flex w-full max-w-[1196px] flex-col mt-44 px-5 max-md:max-w-full max-md:mt-10">
        <div className="text-black text-center text-xl font-semibold self-center whitespace-nowrap">
          TESTIMONIALS
        </div>
        <div className="text-blue-600 text-center text-3xl font-bold self-center mt-6 whitespace-nowrap">
          What Clients Say
        </div>
        <div className="text-neutral-500 text-center text-base self-center max-w-[726px] mt-4 max-md:max-w-full">
          We place huge value on strong relationships and have seen the benefit
          they bring to our business. Customer feedback is vital in helping us
          to get it right.
        </div>
        <div className="self-stretch mt-14 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col flex-1 mt-1.5 max-md:mt-10">
                <div className="bg-neutral-100 self-stretch flex w-full grow flex-col pt-9 pb-8 px-5 rounded-3xl">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d645da30-d47f-4dfa-87be-b55e76a8551c?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                    className="aspect-square object-cover object-center w-24 overflow-hidden self-center max-w-full rounded-[50%]"
                  />
                  <div className="text-zinc-700 text-center text-sm self-center max-w-[277px] mt-12 max-md:mt-10">
                    We place huge value on strong relationships and have seen
                    the benefit they bring to our business. Customer feedback is
                    vital in helping us to get it right. Customer feedback is
                    vital in{" "}
                  </div>
                  <div className="text-blue-600 text-center text-base font-semibold self-center mt-11 whitespace-nowrap max-md:mt-10">
                    Rahul Verma
                  </div>
                  <div className="text-neutral-500 text-center text-sm self-center mt-3.5 whitespace-nowrap">
                    Designation
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col flex-1 mt-2 max-md:mt-10">
                <div className="bg-neutral-100 self-stretch flex w-full grow flex-col pt-9 pb-8 px-5 rounded-3xl">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b47e0036-3144-44e4-bbef-0b2002ab53d6?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                    className="aspect-square object-cover object-center w-24 overflow-hidden self-center max-w-full rounded-[50%]"
                  />
                  <div className="text-zinc-700 text-center text-sm self-center max-w-[277px] mt-12 max-md:mt-10">
                    We place huge value on strong relationships and have seen
                    the benefit they bring to our business. Customer feedback is
                    vital in helping us to get it right. Customer feedback is
                    vital in{" "}
                  </div>
                  <div className="text-blue-600 text-center text-base font-semibold self-center mt-11 whitespace-nowrap max-md:mt-10">
                    Arjun Sharma
                  </div>
                  <div className="text-neutral-500 text-center text-sm self-center mt-2.5 whitespace-nowrap">
                    Designation
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
              <div className="flex flex-col flex-1 max-md:mt-10">
                <div className="bg-neutral-100 self-stretch flex w-full grow flex-col pt-9 pb-8 px-5 rounded-3xl">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f36db594-8529-4280-9eb6-3a9316f0d4b9?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                    className="aspect-square object-cover object-center w-24 overflow-hidden self-center max-w-full rounded-[50%]"
                  />
                  <div className="text-zinc-700 text-center text-sm self-center max-w-[277px] mt-12 max-md:mt-10">
                    We place huge value on strong relationships and have seen
                    the benefit they bring to our business. Customer feedback is
                    vital in helping us to get it right. Customer feedback is
                    vital in{" "}
                  </div>
                  <div className="text-blue-600 text-center text-base font-semibold self-center mt-11 whitespace-nowrap max-md:mt-10">
                    Jeff Bezos
                  </div>
                  <div className="text-neutral-500 text-center text-sm self-center mt-3.5 whitespace-nowrap">
                    Designation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex w-full flex-col mt-44 px-5 max-md:max-w-full max-md:mt-10">
        <div className="text-black text-center text-xl font-semibold self-center whitespace-nowrap">
          ABOUT US
        </div>
        <div className="text-blue-600 text-center text-3xl font-bold self-center mt-7 whitespace-nowrap">
          Know About Us
        </div>
        <div className="text-neutral-500 text-center text-base self-center max-w-[726px] mt-7 max-md:max-w-full">
          Aresuno Brings You Pliability In Choosing The Right Services as You
          Want To Avail.
        </div>
        <div className="self-stretch w-full mt-20 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[41%] max-md:w-full max-md:ml-0">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/69b56e8e-e2b2-40e2-8c58-8192b2a50c8a?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/69b56e8e-e2b2-40e2-8c58-8192b2a50c8a?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/69b56e8e-e2b2-40e2-8c58-8192b2a50c8a?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/69b56e8e-e2b2-40e2-8c58-8192b2a50c8a?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/69b56e8e-e2b2-40e2-8c58-8192b2a50c8a?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/69b56e8e-e2b2-40e2-8c58-8192b2a50c8a?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/69b56e8e-e2b2-40e2-8c58-8192b2a50c8a?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/69b56e8e-e2b2-40e2-8c58-8192b2a50c8a?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                className="aspect-[1.22] object-cover object-center w-full overflow-hidden grow max-md:max-w-full"
              />
            </div>
            <div className="flex flex-col items-stretch w-[59%] ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-neutral-100 flex grow flex-col w-full mx-auto px-5 py-20 max-md:max-w-full">
                <div className="text-neutral-600 text-base leading-7 self-center w-[730px] max-w-full">
                  <span className="font-bold text-blue-600">At Aresuno</span>
                  <span className=" text-neutral-600">
                    , we believe in putting you in control of your service
                    experience. Our range of services and solutions is
                    meticulously crafted to cater to your comfort and
                    satisfaction. With an extensive array of options, you can
                    now select from a diverse range of services and enjoy
                    exceptional benefits. Aresuno takes pride in being a
                    professional on-demand services provider, guided by the
                    vision of becoming an indispensable asset.
                  </span>
                </div>
                <div className="text-neutral-600 text-base leading-7 self-center w-[730px] max-w-full mt-12 max-md:mt-10">
                  <span className="font-bold text-blue-600">Founded on</span>
                  <span className=" text-neutral-600">
                    {" "}
                    June 11th, 2018, Aresuno Info India Pvt. Ltd. has
                    established itself as a premier service provider in the
                    Delhi/NCR region. With a comprehensive portfolio of over 500
                    services, Aresuno Info India Pvt. Ltd. stands as a beacon of
                    excellence. Bolstered by the Aresuno ethos, our team of
                    seasoned professionals has been meticulously trained to
                    deliver top-tier service. This commitment translates into a
                    100% service guarantee for all our valued clients.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}


