import { useState } from "react";
import { BiLink } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import {
  FiEdit2,
  FiFacebook,
  FiGlobe,
  FiInstagram,
  FiTwitter,
  FiX,
  FiYoutube,
} from "react-icons/fi";

const BusinessLinks = ({ businessDetails, setBusinessDetails }) => {
  const [businessSocialLinksUpdate, setBusinessSocialLinksUpdate] =
    useState(true);
  //   handle social links
  const socialLinks = [
    {
      name: "website",
      icon: (
        <FiGlobe className="z-10 h-5 w-5 absolute right-2 top-1/2 transform -translate-y-1/2" />
      ),
    },
    {
      name: "instagram",
      icon: (
        <FiInstagram className="z-10 h-5 w-5 absolute right-2 top-1/2 transform -translate-y-1/2" />
      ),
    },
    {
      name: "whatsapp",
      icon: (
        <FaWhatsapp className="z-10 h-5 w-5 absolute right-2 top-1/2 transform -translate-y-1/2" />
      ),
    },
    {
      name: "twitter",
      icon: (
        <FiTwitter className="z-10 h-5 w-5 absolute right-2 top-1/2 transform -translate-y-1/2" />
      ),
    },
    {
      name: "facebook",
      icon: (
        <FiFacebook className="z-10 h-6 w-6 absolute right-2 top-1/2 transform -translate-y-1/2" />
      ),
    },
    {
      name: "youtube",
      icon: (
        <FiYoutube className="z-10 h-5 w-5 absolute right-2 top-1/2 transform -translate-y-1/2" />
      ),
    },
  ];

  const handleSocialLinksChange = (e) => {
    const { name, value } = e.target;
    setBusinessDetails((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }));
  };
  return (
    <div className="mt-6 mb-6">
      <div className="flex justify-start gap-8 items-center">
        <div className="flex items-center gap-2">
          <BiLink className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Add social links</h2>
        </div>
        {businessSocialLinksUpdate ? (
          <FiEdit2
            className="cursor-pointer w-5 h-5"
            onClick={() => setBusinessSocialLinksUpdate(false)}
          />
        ) : (
          <FiX
            className="cursor-pointer w-5 h-5 text-red-500"
            onClick={() => setBusinessSocialLinksUpdate(true)}
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* website link */}

        {socialLinks.map((link, index) => (
          <div className="flex flex-col" key={index}>
            <label className="flex gap-2 items-center mb-2 capitalize">
              {link.name} Link
            </label>

            <div className="relative">
              <input
                type="text"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10"
                name={link.name}
                onChange={handleSocialLinksChange}
                value={businessDetails.socialLinks[link.name]}
                disabled={businessSocialLinksUpdate}
              />
              {link.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessLinks;
