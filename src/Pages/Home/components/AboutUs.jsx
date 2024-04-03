const AboutUs = () => {
  return (
    <div className="text-center">
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
              alt="about-us"
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
};

export default AboutUs;
