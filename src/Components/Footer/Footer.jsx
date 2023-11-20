import React from "react";
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiYoutube } from "react-icons/fi";

const Footer = () => {
  return (
    // <div className="footer-container w-full py-10 flex flex-col items-center border-t rounded-3xl border-gray-300">
    //   <div className="flex justify-center items-top flex-col md:flex-row gap-20">
    //     <div className="text-center md:text-left">
    //       <h1 className="text-4xl font-bold text-blue-600">AreSuno</h1>
    //       <p className="text-lg text-gray-700 mt-2">India’s Fastest online services</p>
    //     </div>
    //     <div className="text-gray-600 text-base">
    //       <h2 className="text-lg font-medium text-gray-800">Popular Links</h2>
    //       <p>Contact Us</p>
    //       <p>Privacy Policy</p>
    //       <p>Terms Of Service</p>
    //     </div>
    //     <div className="text-gray-600 text-base">
    //       <h2 className="text-lg font-medium text-gray-800">Corporate</h2>
    //       <p>Contact Us</p>
    //       <p>Privacy Policy</p>
    //       <p>Terms Of Service</p>
    //     </div>
    //     <div className="text-gray-600">
    //       <h2 className="text-lg font-medium text-gray-800">Newsletter</h2>
    //       <p>Subscribe to our Newsletter for the latest offers</p>
    //       <div className="flex flex-col items-center mt-4">
    //         <input
    //           type="text"
    //           className="bg-gray-300 rounded-md w-full h-12 outline-none px-4 py-3"
    //           placeholder="Email"
    //         />
    //         <button className="bg-blue-600 text-white w-full h-12 rounded-md mt-3">Subscribe</button>
    //       </div>
    //     </div>
    //   </div>
    //   <p className="text-sm text-gray-500 mt-8">© 2023 aresuno.com</p>
    // </div>

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
                <div className="items-stretch self-stretch flex justify-between gap-5 max-md:justify-center">
                  <FiInstagram className="w-6 h-6 text-blue-600"/>
                  <FiFacebook className="w-6 h-6 text-blue-600"/>
                  <FiYoutube className="w-6 h-6 text-blue-600"/>
                  <FiTwitter className="w-6 h-6 text-blue-600"/>
                  <FiLinkedin className="w-6 h-6 text-blue-600"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-stone-500 text-center text-sm leading-5 self-center whitespace-nowrap mt-20 mb-16 max-md:my-10">
        Copyright © 2023 aresuno.com
      </div>
      </div>

    // </div>
  );
};

export default Footer;
