import React from "react";

function HomeHero(props) {
  return (
    <div className="bg-white flex flex-col">
      <div className="justify-center items-center self-stretch flex w-full flex-col px-5 max-md:max-w-full">
 
      </div>
      <div className="flex-col overflow-hidden self-stretch relative flex min-h-[576px] w-full items-center px-5 py-12 max-md:max-w-full">
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/aa55cdf7-3d59-498c-9364-d7fe67095116?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/aa55cdf7-3d59-498c-9364-d7fe67095116?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/aa55cdf7-3d59-498c-9364-d7fe67095116?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/aa55cdf7-3d59-498c-9364-d7fe67095116?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/aa55cdf7-3d59-498c-9364-d7fe67095116?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/aa55cdf7-3d59-498c-9364-d7fe67095116?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/aa55cdf7-3d59-498c-9364-d7fe67095116?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/aa55cdf7-3d59-498c-9364-d7fe67095116?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
          className="absolute h-full w-full object-cover object-center inset-0"
        />
        <div className="relative flex w-full max-w-[1195px] flex-col mt-12 mb-10 max-md:max-w-full max-md:my-10">
          <div className="text-white text-4xl font-bold leading-[60px] tracking-wider self-center whitespace-nowrap max-md:max-w-full">
            India’s Largest Service Provider
          </div>
          <div className="text-white text-2xl leading-9 tracking-wider self-center whitespace-nowrap mt-3.5">
            Search from 1000+ Services
          </div>
          <div className="bg-white self-stretch flex w-full items-center justify-between gap-5 mt-20 pl-11 pr-6 py-3 rounded-[60px] max-md:max-w-full max-md:flex-wrap max-md:mt-10 max-md:px-5">
            <div className="flex items-stretch gap-5 my-auto">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/954d5432-db85-442a-8f54-5032e2138a2e?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                className="aspect-square object-contain object-center w-[30px] overflow-hidden shrink-0 max-w-full"
              />
              <div className="text-stone-500 text-lg leading-7 tracking-wide grow whitespace-nowrap mt-2 self-start">
                What are you looking for?
              </div>
            </div>
            <div className="self-stretch flex items-stretch justify-between gap-5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/baa2eb3c-49fc-4929-ae53-03628729bc9b?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                className="aspect-[0.04] object-contain object-center w-0.5 stroke-[2px] stroke-stone-500 overflow-hidden shrink-0 max-w-full"
              />
              <div className="items-stretch self-center flex gap-5 my-auto">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ba40d504-ea0d-4280-a215-e2e83426d53e?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                  className="aspect-square object-contain object-center w-[30px] overflow-hidden shrink-0 max-w-full"
                />
                <div className="text-stone-500 text-lg leading-7 tracking-wide grow whitespace-nowrap self-start">
                  Your Location
                </div>
              </div>
            </div>
            <div className="self-stretch flex items-center justify-between gap-5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a6a871c-22fb-4a21-aed6-2d26ca1d300f?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full my-auto"
              />
              <div className="text-white text-lg font-semibold leading-7 tracking-wide whitespace-nowrap justify-center items-center bg-blue-600 self-stretch grow px-5 py-5 rounded-[40px]">
                Search
              </div>
            </div>
          </div>
          <div className="justify-between items-stretch self-center flex w-full max-w-[1120px] gap-5 mt-12 max-md:max-w-full max-md:flex-wrap max-md:justify-center max-md:mt-10">
            <div className="text-white text-base font-semibold leading-6 tracking-wide whitespace-nowrap justify-center items-stretch bg-blue-600 grow px-5 py-2 rounded-[31px]">
              Car Repair Services
            </div>
            <div className="text-white text-base font-semibold leading-6 tracking-wide whitespace-nowrap justify-center items-stretch bg-blue-600 grow px-5 py-2 rounded-[31px]">
              AC Repairs
            </div>
            <div className="text-white text-base font-semibold leading-6 tracking-wide whitespace-nowrap justify-center items-stretch bg-blue-600 grow px-5 py-2 rounded-[31px]">
              Packers and Movers
            </div>
            <div className="text-white text-base font-semibold leading-6 tracking-wide whitespace-nowrap justify-center items-stretch bg-blue-600 grow px-5 py-2 rounded-[31px]">
              Interior Designers
            </div>
            <div className="text-white text-base font-semibold leading-6 tracking-wide whitespace-nowrap justify-center items-stretch bg-blue-600 grow px-5 py-2 rounded-[31px]">
              Photographer
            </div>
            <div className="text-white text-base font-semibold leading-6 tracking-wide whitespace-nowrap justify-center items-stretch bg-blue-600 grow px-5 py-2 rounded-[31px]">
              Photographer
            </div>
          </div>
          <div className="items-stretch self-center flex w-full max-w-[1051px] justify-between gap-5 mt-7 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
            <div className="text-white text-base font-semibold leading-6 tracking-wide whitespace-nowrap justify-center items-stretch bg-blue-600 grow px-5 py-2 rounded-[31px]">
              Wedding Card Printing
            </div>
            <div className="text-white text-base font-semibold leading-6 tracking-wide whitespace-nowrap justify-center items-stretch bg-blue-600 grow px-5 py-2 rounded-[31px]">
              Event Organizers
            </div>
            <div className="text-white text-base font-semibold leading-6 tracking-wide whitespace-nowrap justify-center items-stretch bg-blue-600 grow px-5 py-2 rounded-[31px]">
              Nutritionitists & Dieticians
            </div>
            <div className="text-white text-base font-semibold leading-6 tracking-wide whitespace-nowrap justify-center items-stretch bg-blue-600 grow px-5 py-2 rounded-[31px]">
              Banquet Halls
            </div>
            <div className="text-white text-base font-semibold leading-6 tracking-wide whitespace-nowrap justify-center items-stretch bg-blue-600 grow px-5 py-2 rounded-[31px]">
              CA for Business
            </div>
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
          <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
            <div className="justify-center items-center border flex grow flex-col w-full mx-auto px-9 py-8 rounded-xl border-solid border-zinc-300 max-md:max-w-full max-md:mt-10 max-md:px-5">
              <div className="text-black text-xl font-semibold leading-8 tracking-wide whitespace-nowrap">
                HOME SERVICES
              </div>
              <div className="self-stretch mt-10 max-md:max-w-full">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
                    <div className="justify-center items-stretch flex grow flex-col max-md:mt-10">
                      <div className="flex-col shadow-sm overflow-hidden relative flex aspect-[1.5235294117647058] w-full items-stretch">
                        <img
                          loading="lazy"
                          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b2fd037c-bef4-4d51-8947-4d8001f83d16?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b2fd037c-bef4-4d51-8947-4d8001f83d16?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b2fd037c-bef4-4d51-8947-4d8001f83d16?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b2fd037c-bef4-4d51-8947-4d8001f83d16?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b2fd037c-bef4-4d51-8947-4d8001f83d16?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b2fd037c-bef4-4d51-8947-4d8001f83d16?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b2fd037c-bef4-4d51-8947-4d8001f83d16?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b2fd037c-bef4-4d51-8947-4d8001f83d16?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                          className="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                        />
                        <div className="relative flex flex-col pt-12 pb-2 px-5 rounded-xl">
                          <div className="text-neutral-700 text-xs font-medium leading-4 tracking-normal whitespace-nowrap justify-center items-stretch bg-neutral-200 bg-opacity-80 w-[79px] max-w-full mt-24 p-2 rounded-md max-md:mr-0 max-md:mt-10">
                            30 Services
                          </div>
                        </div>
                      </div>
                      <div className="text-black text-sm leading-5 tracking-wide self-center whitespace-nowrap mt-3">
                        Cleaning Service
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
                    <div className="justify-center items-stretch flex grow flex-col max-md:mt-10">
                      <div className="flex-col shadow-sm overflow-hidden relative flex aspect-[1.5235294117647058] w-full items-stretch">
                        <img
                          loading="lazy"
                          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/dfd75959-5196-48fc-a25d-b718a4520635?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/dfd75959-5196-48fc-a25d-b718a4520635?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/dfd75959-5196-48fc-a25d-b718a4520635?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/dfd75959-5196-48fc-a25d-b718a4520635?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/dfd75959-5196-48fc-a25d-b718a4520635?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/dfd75959-5196-48fc-a25d-b718a4520635?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/dfd75959-5196-48fc-a25d-b718a4520635?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/dfd75959-5196-48fc-a25d-b718a4520635?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                          className="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                        />
                        <div className="relative flex flex-col pt-12 pb-2 px-5 rounded-xl">
                          <div className="text-neutral-700 text-xs font-medium leading-4 tracking-normal whitespace-nowrap justify-center items-stretch bg-neutral-200 bg-opacity-80 w-[79px] max-w-full mt-24 p-2 rounded-md max-md:mr-0 max-md:mt-10">
                            30 Services
                          </div>
                        </div>
                      </div>
                      <div className="text-black text-sm leading-5 tracking-wide self-center whitespace-nowrap mt-3">
                        Repair Service
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch mt-11 max-md:max-w-full max-md:mt-10">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
                    <div className="justify-center items-stretch flex grow flex-col max-md:mt-10">
                      <div className="flex-col shadow-sm overflow-hidden relative flex aspect-[1.5235294117647058] w-full items-stretch">
                        <img
                          loading="lazy"
                          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0d2744f2-9e2a-42d0-8190-274e3f8565d5?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/0d2744f2-9e2a-42d0-8190-274e3f8565d5?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0d2744f2-9e2a-42d0-8190-274e3f8565d5?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/0d2744f2-9e2a-42d0-8190-274e3f8565d5?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/0d2744f2-9e2a-42d0-8190-274e3f8565d5?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0d2744f2-9e2a-42d0-8190-274e3f8565d5?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/0d2744f2-9e2a-42d0-8190-274e3f8565d5?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/0d2744f2-9e2a-42d0-8190-274e3f8565d5?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                          className="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                        />
                        <div className="relative flex flex-col pt-12 pb-2 px-5 rounded-xl">
                          <div className="text-neutral-700 text-xs font-medium leading-4 tracking-normal whitespace-nowrap justify-center items-stretch bg-neutral-200 bg-opacity-80 w-[79px] max-w-full mt-24 p-2 rounded-md max-md:mr-0 max-md:mt-10">
                            30 Services
                          </div>
                        </div>
                      </div>
                      <div className="text-black text-sm leading-5 tracking-wide self-center whitespace-nowrap mt-3">
                        Decor Service
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
                    <div className="justify-center items-stretch flex grow flex-col max-md:mt-10">
                      <div className="flex-col shadow-sm overflow-hidden relative flex aspect-[1.5235294117647058] w-full items-stretch">
                        <img
                          loading="lazy"
                          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/976dacb9-78cf-4a35-a010-1fc6a8eceafe?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/976dacb9-78cf-4a35-a010-1fc6a8eceafe?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/976dacb9-78cf-4a35-a010-1fc6a8eceafe?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/976dacb9-78cf-4a35-a010-1fc6a8eceafe?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/976dacb9-78cf-4a35-a010-1fc6a8eceafe?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/976dacb9-78cf-4a35-a010-1fc6a8eceafe?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/976dacb9-78cf-4a35-a010-1fc6a8eceafe?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/976dacb9-78cf-4a35-a010-1fc6a8eceafe?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                          className="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                        />
                        <div className="relative flex flex-col pt-12 pb-2 px-5 rounded-xl">
                          <div className="text-neutral-700 text-xs font-medium leading-4 tracking-normal whitespace-nowrap justify-center items-stretch bg-neutral-200 bg-opacity-80 w-[79px] max-w-full mt-24 p-2 rounded-md max-md:mr-0 max-md:mt-10">
                            30 Services
                          </div>
                        </div>
                      </div>
                      <div className="text-black text-sm leading-5 tracking-wide self-center whitespace-nowrap mt-3">
                        Gardening Service
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
            <div className="justify-center items-center border flex grow flex-col w-full mx-auto px-9 py-8 rounded-xl border-solid border-zinc-300 max-md:max-w-full max-md:mt-10 max-md:px-5">
              <div className="text-black text-xl font-semibold leading-8 tracking-wide whitespace-nowrap">
                HEALTH & WELLNESS
              </div>
              <div className="self-stretch mt-10 max-md:max-w-full">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
                    <div className="justify-center items-stretch flex grow flex-col max-md:mt-10">
                      <div className="flex-col shadow-sm overflow-hidden relative flex aspect-[1.5235294117647058] w-full items-stretch">
                        <img
                          loading="lazy"
                          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/5437e93a-572d-4697-93cb-bb61ed63bf98?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/5437e93a-572d-4697-93cb-bb61ed63bf98?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/5437e93a-572d-4697-93cb-bb61ed63bf98?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/5437e93a-572d-4697-93cb-bb61ed63bf98?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/5437e93a-572d-4697-93cb-bb61ed63bf98?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/5437e93a-572d-4697-93cb-bb61ed63bf98?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/5437e93a-572d-4697-93cb-bb61ed63bf98?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/5437e93a-572d-4697-93cb-bb61ed63bf98?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                          className="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                        />
                        <div className="relative flex flex-col pt-12 pb-2 px-5 rounded-xl">
                          <div className="text-neutral-700 text-xs font-medium leading-4 tracking-normal whitespace-nowrap justify-center items-stretch bg-neutral-200 bg-opacity-80 w-[79px] max-w-full mt-24 p-2 rounded-md max-md:mr-0 max-md:mt-10">
                            30 Services
                          </div>
                        </div>
                      </div>
                      <div className="text-black text-sm leading-5 tracking-wide self-center whitespace-nowrap mt-3">
                        Gym
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
                    <div className="justify-center items-stretch flex grow flex-col max-md:mt-10">
                      <div className="flex-col shadow-sm overflow-hidden relative flex aspect-[1.5235294117647058] w-full items-stretch">
                        <img
                          loading="lazy"
                          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/2e6d4d08-9947-4549-9d4c-980d9ea22c73?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/2e6d4d08-9947-4549-9d4c-980d9ea22c73?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2e6d4d08-9947-4549-9d4c-980d9ea22c73?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/2e6d4d08-9947-4549-9d4c-980d9ea22c73?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/2e6d4d08-9947-4549-9d4c-980d9ea22c73?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2e6d4d08-9947-4549-9d4c-980d9ea22c73?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/2e6d4d08-9947-4549-9d4c-980d9ea22c73?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/2e6d4d08-9947-4549-9d4c-980d9ea22c73?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                          className="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                        />
                        <div className="relative flex flex-col pt-12 pb-2 px-5 rounded-xl">
                          <div className="text-neutral-700 text-xs font-medium leading-4 tracking-normal whitespace-nowrap justify-center items-stretch bg-neutral-200 bg-opacity-80 w-[79px] max-w-full mt-24 p-2 rounded-md max-md:mr-0 max-md:mt-10">
                            30 Services
                          </div>
                        </div>
                      </div>
                      <div className="text-black text-sm leading-5 tracking-wide self-center whitespace-nowrap mt-3">
                        Beauty Parlours
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch mt-11 max-md:max-w-full max-md:mt-10">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
                    <div className="justify-center items-stretch flex grow flex-col max-md:mt-10">
                      <div className="flex-col shadow-sm overflow-hidden relative flex aspect-[1.5235294117647058] w-full items-stretch">
                        <img
                          loading="lazy"
                          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/36414c2c-5606-46cc-ac95-b161317ba0ad?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/36414c2c-5606-46cc-ac95-b161317ba0ad?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/36414c2c-5606-46cc-ac95-b161317ba0ad?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/36414c2c-5606-46cc-ac95-b161317ba0ad?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/36414c2c-5606-46cc-ac95-b161317ba0ad?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/36414c2c-5606-46cc-ac95-b161317ba0ad?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/36414c2c-5606-46cc-ac95-b161317ba0ad?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/36414c2c-5606-46cc-ac95-b161317ba0ad?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                          className="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                        />
                        <div className="relative flex flex-col pt-12 pb-2 px-5 rounded-xl">
                          <div className="text-neutral-700 text-xs font-medium leading-4 tracking-normal whitespace-nowrap justify-center items-stretch bg-neutral-200 bg-opacity-80 w-[79px] max-w-full mt-24 p-2 rounded-md max-md:mr-0 max-md:mt-10">
                            30 Services
                          </div>
                        </div>
                      </div>
                      <div className="text-black text-sm leading-5 tracking-wide self-center whitespace-nowrap mt-3">
                        Ayurvedic Medicines
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
                    <div className="justify-center items-stretch flex grow flex-col max-md:mt-10">
                      <div className="flex-col shadow-sm overflow-hidden relative flex aspect-[1.5235294117647058] w-full items-stretch">
                        <img
                          loading="lazy"
                          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/bd8cecf9-be99-4751-a5cc-9416c15dd144?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/bd8cecf9-be99-4751-a5cc-9416c15dd144?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bd8cecf9-be99-4751-a5cc-9416c15dd144?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/bd8cecf9-be99-4751-a5cc-9416c15dd144?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/bd8cecf9-be99-4751-a5cc-9416c15dd144?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bd8cecf9-be99-4751-a5cc-9416c15dd144?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/bd8cecf9-be99-4751-a5cc-9416c15dd144?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/bd8cecf9-be99-4751-a5cc-9416c15dd144?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                          className="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                        />
                        <div className="relative flex flex-col pt-12 pb-2 px-5 rounded-xl">
                          <div className="text-neutral-700 text-xs font-medium leading-4 tracking-normal whitespace-nowrap justify-center items-stretch bg-neutral-200 bg-opacity-80 w-[79px] max-w-full mt-24 p-2 rounded-md max-md:mr-0 max-md:mt-10">
                            30 Services
                          </div>
                        </div>
                      </div>
                      <div className="text-black text-sm leading-5 tracking-wide self-center whitespace-nowrap mt-3">
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
      <div className="self-center w-full max-w-[1251px] mt-48 px-5 max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[49%] max-md:w-full max-md:ml-0">
            <div className="max-md:max-w-full max-md:mt-5">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                <div className="flex flex-col items-stretch w-[51%] max-md:w-full max-md:ml-0">
                  <div className="flex flex-col items-stretch mt-2 max-md:mt-10">
                    <div className="text-blue-600 text-3xl font-semibold leading-10 whitespace-nowrap">
                      AreSuno
                    </div>
                    <div className="text-zinc-700 text-base leading-6 whitespace-nowrap mt-3">
                      India’s Fastest online services
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-stretch w-[49%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="flex grow flex-col items-stretch max-md:mt-10">
                    <div className="text-black text-base font-bold leading-6 whitespace-nowrap">
                      Popular Links
                    </div>
                    <div className="text-black text-sm leading-5 whitespace-nowrap mt-4">
                      Packers and Movers in New Delhi
                    </div>
                    <div className="text-black text-sm leading-5 whitespace-nowrap mt-4">
                      Web Designers in New Delhi
                    </div>
                    <div className="text-black text-sm leading-5 whitespace-nowrap mt-3">
                      Pest Control in New Delhi
                    </div>
                    <div className="text-black text-sm leading-5 whitespace-nowrap mt-4">
                      Interior Decorators in New Delhi
                    </div>
                    <div className="text-black text-sm leading-5 whitespace-nowrap mt-4">
                      Wedding Caterers in New Delhi
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[18%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex flex-col items-stretch max-md:mt-6">
              <div className="text-black text-base font-bold leading-6 whitespace-nowrap">
                Corporate
              </div>
              <div className="text-black text-sm leading-5 whitespace-nowrap mt-4">
                About Us
              </div>
              <div className="text-black text-sm leading-5 whitespace-nowrap mt-4">
                Contact Us
              </div>
              <div className="text-black text-sm leading-5 whitespace-nowrap mt-4">
                Privacy Policy
              </div>
              <div className="text-black text-sm leading-5 whitespace-nowrap mt-3">
                Terms Of Service For Advertiser
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col items-stretch max-md:mt-6">
              <div className="flex flex-col pl-10 max-md:pl-5">
                <div className="text-black text-center text-xl font-semibold leading-8 whitespace-nowrap ml-2.5 self-start">
                  Newsletter
                </div>
                <div className="text-black text-center text-base leading-6 self-stretch whitespace-nowrap mt-6">
                  Subscribe our Newsletter for latest offers
                </div>
                <div className="text-zinc-500 text-sm leading-5 justify-center items-stretch bg-gray-200 self-stretch mt-5 px-5 py-4 rounded-xl">
                  Email
                </div>
                <div className="text-white text-center text-sm font-bold leading-5 whitespace-nowrap justify-center items-center bg-blue-600 self-stretch mt-5 px-5 py-4 rounded-xl">
                  Subscribe
                </div>
              </div>
              <div className="flex justify-between gap-4 mt-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3707d4d9-ab8e-47c0-b264-9d102f48c881?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                  className="aspect-[1.35] object-contain object-center w-[35px] overflow-hidden shrink-0 max-w-full"
                />
                <div className="items-stretch self-stretch flex justify-between gap-5 max-md:justify-center">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c5a5d6b-3db6-4b4d-8d5c-7672e3cb2ca4?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                    className="aspect-square object-contain object-center w-[30px] overflow-hidden shrink-0 max-w-full"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/04a109c3-a325-425b-a822-881e3fb043f2?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                    className="aspect-[0.53] object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a7c0c55-6f3c-4427-a774-51c4ea707f20?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                    className="aspect-square object-contain object-center w-[30px] overflow-hidden shrink-0 max-w-full"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/276f6b65-3ded-4015-af74-6fff6ad8da7d?apiKey=6cec7478ae1440e78dbfa80fa92a8aaa&"
                    className="aspect-square object-contain object-center w-[30px] overflow-hidden shrink-0 max-w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-stone-500 text-center text-sm leading-5 self-center whitespace-nowrap mt-20 mb-16 max-md:my-10">
        Copyright © 2023 aresuno.com
      </div>
    </div>
  );
}



export default HomeHero