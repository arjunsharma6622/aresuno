import { BiLink } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import {
  FiFacebook,
  FiGlobe,
  FiInstagram,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";

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

const InputWithIcon = ({ name, onChange, value }) => {
  const link = socialLinks.find((item) => item.name === name);

  return (
    <div className="flex flex-col" key={name}>
      <label className="flex gap-2 items-center mb-2 capitalize">
        {name !== "whatsapp"
          ? `${name} Link`
          : "Whatsapp Link / 10 digit Number"}
      </label>

      <div className="relative">
        <input
          type="text"
          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10"
          name={name}
          onChange={onChange}
          value={value}
        />
        {link && link.icon}
      </div>
    </div>
  );
};

const BusinessLinks = ({ businessDetails, setBusinessDetails }) => {
  const handleSocialLinksChange = (e) => {
    const { name, value } = e.target;

    // Check if the link type is WhatsApp and transform if it's a number
    if (name === "whatsapp" && /^\d+$/.test(value)) {
      setBusinessDetails((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          whatsapp: value && `https://wa.me/${value}`,
        },
      }));
    } else {
      setBusinessDetails((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [name]: value,
        },
      }));
    }
  };

  return (
    <div className="md:mt-6 md:mb-6">
      <div className="flex items-center gap-2">
        <BiLink className="w-5 h-5 md:w-6 md:h-6" />
        <h2 className="text-lg md:text-xl font-semibold">Add social links</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {socialLinks.map((link) => (
          <InputWithIcon
            key={link.name}
            name={link.name}
            onChange={handleSocialLinksChange}
            value={businessDetails.socialLinks[link.name]}
          />
        ))}
      </div>
    </div>
  );
};

export default BusinessLinks;
