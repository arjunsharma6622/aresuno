// import React from "react";
// import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiYoutube } from "react-icons/fi";

// const Footer = () => {
//   return (

//             <div className="self-center w-full max-w-[1251px] mt-48 px-5 max-md:max-w-full max-md:mt-10">
//         <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
//           <div className="flex flex-col items-stretch w-[49%] max-md:w-full max-md:ml-0">
//             <div className="max-md:max-w-full max-md:mt-5">
//               <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
//                 <div className="flex flex-col items-stretch w-[51%] max-md:w-full max-md:ml-0">
//                   <div className="flex flex-col items-stretch mt-2 max-md:mt-10">
//                     <div className="text-blue-600 text-3xl font-semibold leading-10 whitespace-nowrap">
//                       AreSuno
//                     </div>
//                     <div className="text-zinc-700 text-base leading-6 whitespace-nowrap mt-3">
//                       India’s Fastest online services
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex flex-col items-stretch w-[49%] ml-5 max-md:w-full max-md:ml-0">
//                   <div className="flex grow flex-col items-stretch max-md:mt-10">
//                     <div className="text-black text-base font-bold leading-6 whitespace-nowrap">
//                       Popular Links
//                     </div>
//                     <div className="text-black text-sm leading-5 whitespace-nowrap mt-4">
//                       Packers and Movers in New Delhi
//                     </div>
//                     <div className="text-black text-sm leading-5 whitespace-nowrap mt-4">
//                       Web Designers in New Delhi
//                     </div>
//                     <div className="text-black text-sm leading-5 whitespace-nowrap mt-3">
//                       Pest Control in New Delhi
//                     </div>
//                     <div className="text-black text-sm leading-5 whitespace-nowrap mt-4">
//                       Interior Decorators in New Delhi
//                     </div>
//                     <div className="text-black text-sm leading-5 whitespace-nowrap mt-4">
//                       Wedding Caterers in New Delhi
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-stretch w-[18%] ml-5 max-md:w-full max-md:ml-0">
//             <div className="flex flex-col items-stretch max-md:mt-6">
//               <div className="text-black text-base font-bold leading-6 whitespace-nowrap">
//                 Corporate
//               </div>
//               <div className="text-black text-sm leading-5 whitespace-nowrap mt-4">
//                 About Us
//               </div>
//               <div className="text-black text-sm leading-5 whitespace-nowrap mt-4">
//                 Contact Us
//               </div>
//               <div className="text-black text-sm leading-5 whitespace-nowrap mt-4">
//                 Privacy Policy
//               </div>
//               <div className="text-black text-sm leading-5 whitespace-nowrap mt-3">
//                 Terms Of Service For Advertiser
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
//             <div className="flex grow flex-col items-stretch max-md:mt-6">
//               <div className="flex flex-col pl-10 max-md:pl-5">
//                 <div className="text-black text-center text-xl font-semibold leading-8 whitespace-nowrap ml-2.5 self-start">
//                   Newsletter
//                 </div>
//                 <div className="text-black text-center text-base leading-6 self-stretch whitespace-nowrap mt-6">
//                   Subscribe our Newsletter for latest offers
//                 </div>
//                 <div className="text-zinc-500 text-sm leading-5 justify-center items-stretch bg-gray-200 self-stretch mt-5 px-5 py-4 rounded-xl">
//                   Email
//                 </div>
//                 <div className="text-white text-center text-sm font-bold leading-5 whitespace-nowrap justify-center items-center bg-blue-600 self-stretch mt-5 px-5 py-4 rounded-xl">
//                   Subscribe
//                 </div>
//               </div>
//               <div className="flex justify-between gap-4 mt-5">
//                 <div className="items-stretch self-stretch flex justify-between gap-5 max-md:justify-center">
//                   <FiInstagram className="w-6 h-6 text-blue-600"/>
//                   <FiFacebook className="w-6 h-6 text-blue-600"/>
//                   <FiYoutube className="w-6 h-6 text-blue-600"/>
//                   <FiTwitter className="w-6 h-6 text-blue-600"/>
//                   <FiLinkedin className="w-6 h-6 text-blue-600"/>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="text-stone-500 text-center text-sm leading-5 self-center whitespace-nowrap mt-20 mb-16 max-md:my-10">
//         Copyright © 2023 aresuno.com
//       </div>
//       </div>

//   );
// };

// export default Footer;





import React from "react";
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiYoutube } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-black px-5 py-16 md:py-10 lg:py-16 border-t-[1px]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
        {/* Company Info */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <div className="text-3xl font-semibold leading-10 mb-3">
            <Link to="/">
              <img src="./assets/logo.png" alt="" className="w-24"/>
            </Link>
          </div>
          <p className="text-base leading-6 mb-5">India’s Fastest online service provider</p>
        </div>

        {/* Popular Links */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <div className="text-base font-bold leading-6 mb-3">Popular Links</div>
          <ul className="space-y-3">
            <li className="text-sm">Packers and Movers in New Delhi</li>
            <li className="text-sm">Web Designers in New Delhi</li>
            <li className="text-sm">Pest Control in New Delhi</li>
            <li className="text-sm">Interior Decorators in New Delhi</li>
            <li className="text-sm">Wedding Caterers in New Delhi</li>
          </ul>
        </div>

        {/* Corporate */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <div className="text-base font-bold leading-6 mb-3">Corporate</div>
          <ul className="space-y-3">
            <li className="text-sm">
            <Link to={"/about"}>              
              About Us
              
              </Link></li>
            <li className="text-sm">Contact Us</li>
            
            <li className="text-sm">
            <Link to={"/privacy"}>
              Privacy Policy
              </Link>
              </li>
            
            <li className="text-sm">
              <Link to={"/terms"}>
              Terms and Conditions
              </Link>
              </li>
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <div className="text-xl font-semibold leading-8 mb-2">Newsletter</div>
          <p className="text-base leading-6 mb-6">
            Subscribe our Newsletter for the latest offers
          </p>
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Email"
              className="text-sm leading-5 bg-gray-200 px-3 py-2 rounded-md w-full"
            />
            <button className="text-white text-sm font-bold leading-5 bg-blue-600 px-5 py-2 rounded-md">
              Subscribe
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <div className="text-xl font-semibold leading-8 mb-2">Follow Us</div>
          <div className="flex space-x-5">
            <Link to={"https://in.linkedin.com/company/aresuno"} target="_blank">
              <FiLinkedin className="w-6 h-6 text-blue-600" />
            </Link>
            <Link to={"https://www.instagram.com/aresuno.3/"} target="_blank">
              <FiInstagram className="w-6 h-6 text-blue-600" />
            </Link>
            <Link to={"https://www.facebook.com/people/Aresuno/100070231573790/"} target="_blank">
              <FiFacebook className="w-6 h-6 text-blue-600" />
            </Link>

          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto mt-16 text-center text-sm leading-5">
        Copyright © 2023 aresuno.com
      </div>
    </footer>
  );
};

export default Footer;
