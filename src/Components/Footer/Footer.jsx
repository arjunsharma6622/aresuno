import React from "react";

const Footer = () => {
  return (
    <div className="footer-container w-full py-10 flex flex-col items-center border-t-2 border-gray-300">
      <div className="flex justify-center items-top flex-col md:flex-row gap-20">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-blue-600">AreSuno</h1>
          <p className="text-lg text-gray-700 mt-2">India’s Fastest online services</p>
        </div>
        <div className="text-gray-600 text-base">
          <h2 className="text-lg font-medium text-gray-800">Popular Links</h2>
          <p>Contact Us</p>
          <p>Privacy Policy</p>
          <p>Terms Of Service</p>
        </div>
        <div className="text-gray-600 text-base">
          <h2 className="text-lg font-medium text-gray-800">Corporate</h2>
          <p>Contact Us</p>
          <p>Privacy Policy</p>
          <p>Terms Of Service</p>
        </div>
        <div className="text-gray-600">
          <h2 className="text-lg font-medium text-gray-800">Newsletter</h2>
          <p>Subscribe to our Newsletter for the latest offers</p>
          <div className="flex flex-col items-center mt-4">
            <input
              type="text"
              className="bg-gray-300 rounded-md w-full h-12 outline-none px-4 py-3"
              placeholder="Email"
            />
            <button className="bg-blue-600 text-white w-full h-12 rounded-md mt-3">Subscribe</button>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-8">© 2023 aresuno.com</p>
    </div>
  );
};

export default Footer;
