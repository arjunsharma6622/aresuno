import React, { useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiChevronDown,
  FiClock,
  FiCode,
  FiEdit2,
  FiEdit3,
  FiFacebook,
  FiGlobe,
  FiImage,
  FiInstagram,
  FiTrash2,
  FiTwitter,
  FiUploadCloud,
  FiX,
  FiXCircle,
  FiYoutube,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import {
  BiCategory,
  BiCreditCard,
  BiDetail,
  BiLink,
  BiNavigation,
  BiQuestionMark,
} from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { useSelector } from "react-redux";
import { API_URL } from "../../utils/util";

const BusinessEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [address, setAddress] = useState("");

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    console.log("Selected Address:", value);
    console.log("Latitude and Longitude:", latLng);
    setAddress(value);
    setBusinessDetails((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        coordinates: [latLng.lng, latLng.lat],
        place: value,
      },
    }));
  };

  const [currentSection, setCurrentSection] = useState("Basic Details");

  const [businessDetails, setBusinessDetails] = useState({
    name: "",
    type: "",
    phone: "",
    email: "",
    description: "",
    category: "",
    address: {
      place: "",
      city: "",
      pincode: null,
      coordinates: [],
    },
    phone: "",
    timing: [
      { day: "Monday", from: "", to: "", isOpen: false },
      { day: "Tuesday", from: "", to: "", isOpen: false },
      { day: "Wednesday", from: "", to: "", isOpen: false },
      { day: "Thursday", from: "", to: "", isOpen: false },
      { day: "Friday", from: "", to: "", isOpen: false },
      { day: "Saturday", from: "", to: "", isOpen: false },
      { day: "Sunday", from: "", to: "", isOpen: false },
    ],
    faqs: [
      {
        question: "",
        answer: "",
      },
    ],
    socialLinks: {
      website: "",
      instagram: "",
      whatsapp: "",
      twitter: "",
      facebook: "",
      youtube: "",
    },
    modeOfPayment: [],
    iframe: {
      embedLink: "",
      extractedLink: "",
    },
    foundedIn: "YYYY-MM-DD",
    services: [],
    photosGallery: [],
  });

  const [isBusinessUpdating, setIsBusinessUpdating] = useState(false);

  const handleIframeChange = (e) => {
    const { value } = e.target;
    function extractSrcLink(iframeTag) {
      const srcRegex = /src="(.*?)"/;
      const match = iframeTag.match(srcRegex);
      if (match) {
        return match[1];
      } else {
        return null;
      }
    }
    const extractedLink = extractSrcLink(value);
    setBusinessDetails((prev) => ({
      ...prev,
      iframe: {
        embedLink: value,
        extractedLink: extractedLink,
      },
    }));
  };

  const [service, setService] = useState("");

  const handleServicesChange = (e) => {
    setService(e.target.value);
  };

  const addService = () => {
    if (service === "") return;
    setBusinessDetails({
      ...businessDetails,
      services: [...businessDetails.services, service],
    });
    setService("");
  };

  const removeService = (index) => {
    const updatedServices = businessDetails.services.filter(
      (_, i) => i !== index
    );
    setBusinessDetails({
      ...businessDetails,
      services: updatedServices,
    });
  };

  const handleBusinessDetailsChange = (e) => {
    const { name, value } = e.target;
    setBusinessDetails((prev) => ({ ...prev, [name]: value }));
  };

  // handle faqs
  const handleFaqChange = (index, type, value) => {
    const updatedFaqs = [...businessDetails.faqs];
    updatedFaqs[index][type] = value;
    setBusinessDetails({ ...businessDetails, faqs: updatedFaqs });
  };

  const handleAddFaq = () => {
    const newFaqs = [...businessDetails.faqs, { question: "", answer: "" }];
    setBusinessDetails({ ...businessDetails, faqs: newFaqs });
  };

  const handleRemoveFaq = (index) => {
    const updatedFaqs = businessDetails.faqs.filter((_, i) => i !== index);
    setBusinessDetails({ ...businessDetails, faqs: updatedFaqs });
  };

  const categories = useSelector((state) => state.categories);

  // console.log('sub categories', subCategories);

  // handle phone number
  const handlePhoneChange = (value) => {
    setBusinessDetails((prev) => ({
      ...prev,
      phone: value,
    }));
  };

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

  //   handle business timings
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const timeOptions = [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  const handleBusinessHoursChange = (index, isChecked) => {
    const updatedBusinessHours = [...businessDetails.timing];
    updatedBusinessHours[index].isOpen = isChecked;
    if (!isChecked) {
      updatedBusinessHours[index].from = "";
      updatedBusinessHours[index].to = "";
    }
    setBusinessDetails((prev) => ({
      ...prev,
      timing: updatedBusinessHours,
    }));
  };

  const handleBusinessHoursFromChange = (index, value) => {
    const updatedBusinessHours = [...businessDetails.timing];
    updatedBusinessHours[index].from = value;
    setBusinessDetails((prev) => ({
      ...prev,
      timing: updatedBusinessHours,
    }));
  };

  const handleBusinessHoursToChange = (index, value) => {
    const updatedBusinessHours = [...businessDetails.timing];
    updatedBusinessHours[index].to = value;
    setBusinessDetails((prev) => ({
      ...prev,
      timing: updatedBusinessHours,
    }));
  };

  //   handle image gallery
  const [images, setImages] = useState([]);
  const [imagesToShow, setImagesToShow] = useState([]);
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      setImages((prevImages) => [...prevImages, file]);
      reader.onloadend = () => {
        setImagesToShow((prevImages) => [...prevImages, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  // console.log("The images are", images)
  // console.log("The images to show are", imagesToShow)

  const handleImagesUpload = async (e) => {
    e.preventDefault();

    try {
      const imageData = new FormData();

      images.forEach(async (image, index) => {
        imageData.append(`file`, image);
        imageData.append(
          "folder",
          `aresuno/businessImages/${businessDetails.name}/gallery`
        );
        imageData.append("upload_preset", "ml_default");

        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dexnb3wkw/image/upload",
          imageData
        );

        console.log(uploadResponse.data.secure_url);
        setBusinessDetails((prev) => ({
          ...prev,
          photosGallery: [
            ...prev.photosGallery,
            uploadResponse.data.secure_url,
          ],
        }));

        // console.log("This is the business details", businessDetails)
      });

      // console.log(uploadResponse.data);
      // const imageUrls = uploadResponse.data.resources.map((resource) => resource.secure_url);
      // return imageUrls;
    } catch (err) {
      console.error("Error uploading images to Cloudinary:", err);
      setIsLoading(false);
    }
  };

  console.log(businessDetails);

  // handle mode of payment
  const paymentModes = [
    {
    name : "Cash",
    icon : "https://cdn-icons-png.flaticon.com/512/3566/3566403.png"
    },
    {
    name : "Card",
    icon : "https://cdn-icons-png.flaticon.com/512/6963/6963703.png"
    },
    {
    name : "Visa",
    icon : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
    },
    {
    name : "Rupay",
    icon : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Rupay-Logo.png/1200px-Rupay-Logo.png"
    },
    {
    name : "Mastercard",
    icon : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/2560px-Mastercard-logo.svg.png"
    },
    {
    name : "UPI",
    icon : "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1024px-UPI-Logo-vector.svg.png"
    },
    {
    name : "Google Pay",
    icon : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1200px-Google_Pay_Logo.svg.png"
    },
    {
      name : "PhonePe",
      icon : "https://seeklogo.com/images/P/phonepe-logo-B9E7D6F75F-seeklogo.com.png"
    },
    {
      name : "Patym",
      icon : "https://cdn.iconscout.com/icon/free/png-256/free-paytm-226448.png"
    },
    {
      name : "Apple Pay",
      icon : "https://cdn.iconscout.com/icon/free/png-256/free-applepay-226446.png"
    },
    {
      name : "Razorpay",
      icon : "https://cdn.iconscout.com/icon/free/png-256/free-razorpay-1649771-1399875.png"
    },
    {
      name : "American Express",
      icon : "https://cdn.iconscout.com/icon/free/png-256/free-american-express-7-711815.png"
    },
  ];

  const handleModeOfPaymentClick = (option, icon) => {
    const isOptionIncluded = businessDetails.modeOfPayment.some(
      (item) => item.name === option
    );

    if (isOptionIncluded) {
      setBusinessDetails((prev) => ({
        ...prev,
        modeOfPayment: prev.modeOfPayment.filter(
          (item) => item.name !== option
        ),
      }));
    } else {
      setBusinessDetails((prev) => ({
        ...prev,
        modeOfPayment: [...prev.modeOfPayment, { name: option, icon: icon }],
      }));
    }
  };

  // handle address
  const handleAddressSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      setBusinessDetails((prev) => ({
        ...prev,
        address: address,
        coordinates: [latLng.lng, latLng.lat],
      }));
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const vendorRes = await axios.get(
        "https://aresuno-server.vercel.app/api/vendor/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const vendorId = vendorRes.data._id;
      const vendorName = vendorRes.data.name;
      console.log(vendorId);

      setBusinessDetails((prev) => ({
        ...prev,
        vendorId: vendorId,
        vendorName: vendorName,
      }));

      const updatedBusinessDetails = {
        ...businessDetails,
        vendorId: vendorId,
        vendorName: vendorName,
      };
      console.log(updatedBusinessDetails);

      const res = await axios.post(
        "https://aresuno-server.vercel.app/api/business/register",
        updatedBusinessDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Business Registered");
      window.location.reload();

      navigate("/vendor/dashboard");

      console.log(res.data);
    } catch (error) {
      console.error("Error", error);
      toast.error("Business Registration Failed");
    }
  };

  const [basicBusinessDetailsUpdate, setBasicBusinessDetailsUpdate] =
    useState(true);
  const [businessCategoryUpdate, setBusinessCategoryUpdate] = useState(true);
  const [businessSocialLinksUpdate, setBusinessSocialLinksUpdate] =
    useState(true);
  const [businessFaqUpdate, setBusinessFaqUpdate] = useState(true);
  const [businessModeOfPaymentUpdate, setBusinessModeOfPaymentUpdate] =
    useState(true);
  const [businessIframeUpdate, setBusinessIframeUpdate] = useState(true);
  const [businessTimingsUpdate, setBusinessTimingsUpdate] = useState(true);
  const [businessImagesUpdate, setBusinessImagesUpdate] = useState(true);

  console.log(businessDetails);

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${API_URL}/api/business/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBusinessDetails(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchBusinessDetails();
  }, []);

  const handleUpdate = async () => {
    try {
      console.log(id);
      setIsBusinessUpdating(true);

      const res = await axios.put(
        `${API_URL}/api/business/${id}`,
        businessDetails
      );
      console.log(res);
      toast.success("Business Details Updated");
      setIsBusinessUpdating(false);
    } catch (err) {
      setIsBusinessUpdating(false);
      console.log(err);
      toast.error("Business Update Failed");
    }
  };

  const convertISODateToInputFormat = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const sidebarElements = [
    { name: "Basic Details",
      icon : <BiDetail className="w-5 h-5" />
    },
    {
      name : "Category",
      icon : <BiCategory className="w-5 h-5" />
    },
    {
      name : "Address",
      icon : <BiNavigation className="w-5 h-5" />
    },
    {
      name : "Iframe",
      icon : <FiCode className="w-5 h-5" />
    },
    {
      name : "Social Links",
      icon : <BiLink className="w-5 h-5" />
    },
    {
      name : "FAQ",
      icon : <BiQuestionMark className="w-5 h-5" />
    },
    {
      name : "Mode of Payment",
      icon : <MdPayment className="w-5 h-5" />
    },
    {
      name : "Timings",
      icon : <FiClock className="w-5 h-5" />
    },
    {
      name : "Images",
      icon : <FiImage className="w-5 h-5" />
    }
  ]



  return (
    <div className="h-screen overflow-y-scroll  flex items-start justify-center mx-8">
      <div className="flex gap-10 h-screen w-full">

        

<div className="flex-[3] border w-full flex items-start py-6 flex-col gap-12">

  <div className="w-full flex flex-col gap-4">
    <div className="flex gap-4 items-center justify-start px-5 cursor-pointer" onClick={() => navigate(-1)}>
      <FiArrowLeft className="w-5 h-5 "  />
      <span>Go Back</span>
    </div>
      <div className="flex flex-col gap-2 items-start w-full px-5 py-2">

<div className="flex gap-4 items-center justify-start ">
<div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-100">
      <FiEdit3 className="h-6 w-6 text-gray-600" />
    </div>            
    <span className="text-xl font-semibold">
      Edit Business
    </span>
</div>

<p>Edit Your <span className="font-medium"> {businessDetails.name} </span> business</p>

</div>
</div>



        <div className="flex w-full flex-col gap-4">



{ sidebarElements.map(({name, icon}, index) => (
          <div
            className={`flex items-center gap-2 cursor-pointer w-full px-5 py-2 ${currentSection === name && 'bg-gray-200'}`}
            onClick={() => setCurrentSection(name)}
          >
            {icon}
            <h2 className="text-base font-medium">{name}</h2>
          </div>

))

}


        </div>

        </div>



        <div className="px-4 py-6 flex-[9] w-full h-screen overflow-y-scroll justify-start flex flex-col">
          <div className="flex flex-col">

            <div className="flex flex-col gap-6">

              {currentSection === "Basic Details" && (
                <div className="mt-6 mb-6">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <BiDetail className="w-6 h-6" />
                      <h2 className="text-xl font-semibold">
                        Basic business details
                      </h2>
                    </div>
                    {basicBusinessDetailsUpdate ? (
                      <FiEdit2
                        className="cursor-pointer w-5 h-5"
                        onClick={() => setBasicBusinessDetailsUpdate(false)}
                      />
                    ) : (
                      <FiX
                        className="cursor-pointer w-5 h-5 text-red-500"
                        onClick={() => setBasicBusinessDetailsUpdate(true)}
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-4 mt-6">
                    <div className="flex w-full gap-3">
                      {/* BUSINESS NAME */}
                      <div className="flex flex-col w-full">
                        <label htmlFor="">Business Name</label>
                        <input
                          type="text"
                          name="name"
                          value={businessDetails.name}
                          onChange={handleBusinessDetailsChange}
                          className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          disabled={basicBusinessDetailsUpdate}
                        />
                      </div>

                      {/* BUSINESS TYPE */}
                      <div className="flex flex-col w-full">
                        <label htmlFor="">Business Type</label>

                        <div className="flex items-center justify-center mt-2 h-full">
                          <div className="relative w-full">
                            <select
                              name="type"
                              value={businessDetails.type}
                              className="appearance-none rounded-md relative block w-full px-3 py-2 h-full border  border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 bg-white focus:border-indigo-500 focus:z-10 sm:text-sm"
                              onChange={handleBusinessDetailsChange}
                              disabled={basicBusinessDetailsUpdate}
                            >
                              <option value="" disabled className="">
                                -
                              </option>
                              <option value="service">Service</option>
                              <option value="manufacturing">
                                Manufacturing
                              </option>
                            </select>

                            <div>
                              <FiChevronDown className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm text-gray-500 w-6 h-6" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex w-full gap-3">
                      {/* PHONE NUMBER */}
                      <div className="flex flex-col w-full">
                        <label htmlFor="phone">Phone Number</label>
                        <PhoneInput
                          international
                          defaultCountry="in"
                          value={businessDetails.phone}
                          onChange={handlePhoneChange}
                          className="mt-2 appearance-none rounded-md w-full px-3 py-2 border  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          style={{
                            width: "100%",
                            height: "39px",
                            padding: "0px",
                            border: "none",
                          }}
                          inputStyle={{
                            width: "100%",
                            height: "100%",
                          }}
                          countrySelectorStyleProps={{
                            width: "100%",
                            height: "100%",
                          }}
                          dialCodePreviewStyleProps={{
                            width: "100%",
                            height: "100%",
                          }}
                          disabled={basicBusinessDetailsUpdate}
                        />
                      </div>

                      {/* BUSINESS EMAIL */}
                      <div className="flex flex-col w-full">
                        <label htmlFor="">Mail Id</label>
                        <input
                          type="email"
                          name="email"
                          value={businessDetails.email}
                          onChange={handleBusinessDetailsChange}
                          className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          disabled={basicBusinessDetailsUpdate}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col w-full">
                      <label>About your business</label>
                      <textarea
                        name="description"
                        value={businessDetails.description}
                        id=""
                        cols="30"
                        rows="4"
                        className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        onChange={handleBusinessDetailsChange}
                        disabled={basicBusinessDetailsUpdate}
                      ></textarea>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-[3] w-full">
                        <label>Founded In</label>
                        <div className="flex items-center gap-4 mt-2">
                          <input
                            type="date"
                            name="foundedIn"
                            value={convertISODateToInputFormat(
                              businessDetails.foundedIn
                            )}
                            id=""
                            placeholder="When was your business found"
                            className=" flex-[8] rounded-md input border text-base border-gray-300 w-full py-3 px-4 text-gray-600 leading-tight focus:outline-none"
                            onChange={handleBusinessDetailsChange}
                            disabled={basicBusinessDetailsUpdate}
                          />
                        </div>
                      </div>
                      <div className="flex-[9] flex flex-col w-full">
                        <label>What services you offer</label>
                        {!basicBusinessDetailsUpdate && (
                          <div className="flex items-center gap-4">
                            <input
                              type="text"
                              name="service"
                              value={service}
                              id=""
                              className="flex-[8] appearance-none rounded-md relative block w-full px-3 py-2 border  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              onChange={handleServicesChange}
                              disabled={basicBusinessDetailsUpdate}
                            />
                            <button
                              className="rounded-md bg-blue-500 text-white px-8 py-2 flex-[4]"
                              onClick={addService}
                            >
                              Add
                            </button>
                          </div>
                        )}

                        <div className=" flex flex-wrap gap-4 w-full">
                          {businessDetails.services.map((service, index) => (
                            <div
                              key={index}
                              className="relative flex items-center gap-4 mt-2"
                            >
                              <span className="px-4 py-2 border rounded-lg">
                                {service}
                              </span>
                              {!basicBusinessDetailsUpdate && (
                                <FiXCircle
                                  className="bg-red-100 rounded-full text-red-500 absolute cursor-pointer -top-2 -right-2 w-5 h-5"
                                  onClick={() => removeService(index)}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentSection === "Category" && (
                <div className="mt-6 mb-6">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <BiCategory className="w-6 h-6" />
                      <h2 className="text-xl font-semibold">
                        Select you business category
                      </h2>
                    </div>
                    {businessCategoryUpdate ? (
                      <FiEdit2
                        className="cursor-pointer w-5 h-5"
                        onClick={() => setBusinessCategoryUpdate(false)}
                      />
                    ) : (
                      <FiX
                        className="cursor-pointer w-5 h-5 text-red-500"
                        onClick={() => setBusinessCategoryUpdate(true)}
                      />
                    )}
                  </div>

                  <div className="flex gap-4 mt-6 w-full">
                    {/* CATEGORY */}
                    <div className="flex flex-col w-full">
                      <label htmlFor="">Category</label>

                      <div className="relative mt-2">
                        <select
                          name="category"
                          value={businessDetails.category}
                          onChange={handleBusinessDetailsChange}
                          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 bg-white focus:border-indigo-500 focus:z-10 sm:text-sm"
                          disabled={businessCategoryUpdate}
                        >
                          <option value="" disabled defaultChecked>
                            -
                          </option>
                          {businessDetails.category &&
                            categories.map((category) => (
                              <option key={category.name} value={category._id}>
                                {category.name}
                              </option>
                            ))}
                        </select>

                        <div>
                          <FiChevronDown className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm text-gray-500 w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentSection === "Address" && (
                <div className="mt-6 mb-6">
                  <div className="flex items-center gap-2">
                    <BiNavigation className="w-6 h-6" />
                    <h2 className="text-xl font-semibold">
                      Add business address
                    </h2>
                  </div>

                  <div className="flex flex-col gap-4 mt-6">
                    <div className="flex flex-col">
                      <label htmlFor="">Address</label>

                      <PlacesAutocomplete
                        value={
                          address ? address : businessDetails.address?.place
                        }
                        onChange={setAddress}
                        onSelect={handleSelect}
                      >
                        {({
                          getInputProps,
                          suggestions,
                          getSuggestionItemProps,
                          loading,
                        }) => (
                          <div>
                            <input
                              {...getInputProps({
                                placeholder: "Enter your address...",
                                className: "location-search-input",
                              })}
                              className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text"
                            />
                            <div className="bg-gray-200">
                              {loading ? <div>Loading...</div> : null}

                              {suggestions.map((suggestion, index) => {
                                const style = {
                                  backgroundColor: suggestion.active
                                    ? "#fafafa"
                                    : "",
                                  cursor: suggestion.active ? "pointer" : "",
                                  padding: "12px",
                                  borderRadius: "10px",
                                };
                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      style,
                                    })}
                                    key={index}
                                  >
                                    {suggestion.description}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>
                    </div>

                    <div className="flex">
                      <div className="flex flex-col">
                        <label htmlFor="" className="">
                          City
                        </label>
                        <input
                          type="text"
                          className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          onChange={(e) =>
                            setBusinessDetails((prev) => ({
                              ...prev,
                              address: {
                                ...prev.address,
                                city: e.target.value,
                              },
                            }))
                          }
                          value={businessDetails.address?.city}
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="" className="">
                          Zip Code
                        </label>
                        <input
                          type="number"
                          maxLength={6}
                          className="mt-2 ml-2 mappearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          value={businessDetails.address?.pincode}
                          onChange={(e) =>
                            setBusinessDetails((prev) => ({
                              ...prev,
                              address: {
                                ...prev.address,
                                pincode: e.target.value,
                              },
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentSection === "Iframe" && (
                <div className="mt-6 mb-6">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <FiCode className="w-6 h-6" />
                      <h2 className="text-xl font-semibold">
                        Enter google maps iframe HTML link
                      </h2>
                    </div>
                    {businessIframeUpdate ? (
                      <FiEdit2
                        className="cursor-pointer w-5 h-5"
                        onClick={() => setBusinessIframeUpdate(false)}
                      />
                    ) : (
                      <FiX
                        className="cursor-pointer w-5 h-5 text-red-500"
                        onClick={() => setBusinessIframeUpdate(true)}
                      />
                    )}
                  </div>

                  <div className="mt-6">
                    <textarea
                      className="w-full h-48 p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter google maps iframe HTML link"
                      name="iframe"
                      onChange={handleIframeChange}
                      value={businessDetails.iframe.embedLink}
                      disabled={businessIframeUpdate}
                    />
                  </div>
                </div>
              )}

              {currentSection === "Social Links" && (
                <div className="mt-6 mb-6">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <BiLink className="w-6 h-6" />
                      <h2 className="text-xl font-semibold">
                        Add social links
                      </h2>
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
              )}

              {currentSection === "FAQ" && (
                <div className="mt-6 mb-6">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <BiQuestionMark className="w-6 h-6" />
                      <h2 className="text-xl font-semibold">Add FAQ's</h2>
                    </div>
                    {businessFaqUpdate ? (
                      <FiEdit2
                        className="cursor-pointer w-5 h-5"
                        onClick={() => setBusinessFaqUpdate(false)}
                      />
                    ) : (
                      <FiX
                        className="cursor-pointer w-5 h-5 text-red-500"
                        onClick={() => setBusinessFaqUpdate(true)}
                      />
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-8 mt-6">
                    {businessDetails.faqs.map((faq, index) => (
                      <div key={index}>
                        <div>
                          <div className=" flex justify-start gap-4 items-center mb-2">
                            <span className="font-medium text-lg">
                              Faq {index + 1}
                            </span>
                            {!businessFaqUpdate && (
                              <FiTrash2
                                className="w-5 h-5 text-red-500 cursor-pointer"
                                onClick={() => handleRemoveFaq(index)}
                              />
                            )}
                          </div>
                          <label className="block text-gray-700">
                            Question
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) =>
                                handleFaqChange(
                                  index,
                                  "question",
                                  e.target.value
                                )
                              }
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              disabled={businessFaqUpdate}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-700 mt-2">
                            Answer
                          </label>
                          <div className="mt-2">
                            <textarea
                              value={faq.answer}
                              onChange={(e) =>
                                handleFaqChange(index, "answer", e.target.value)
                              }
                              rows={4}
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              disabled={businessFaqUpdate}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={handleAddFaq}
                      className=" py-2 px-4 bg-blue-500 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                      disabled={businessFaqUpdate}
                    >
                      Add FAQ
                    </button>
                  </div>
                </div>
              )}

              {currentSection === "Mode of Payment" && (
                <div className="mt-6 mb-6">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <MdPayment className="w-6 h-6" />
                      <h2 className="text-xl font-semibold">Mode of Payment</h2>
                    </div>
                    {businessModeOfPaymentUpdate ? (
                      <FiEdit2
                        className="cursor-pointer w-5 h-5"
                        onClick={() => setBusinessModeOfPaymentUpdate(false)}
                      />
                    ) : (
                      <FiX
                        className="cursor-pointer w-5 h-5 text-red-500"
                        onClick={() => setBusinessModeOfPaymentUpdate(true)}
                      />
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 mt-6">

{paymentModes.map(({ name, icon }, index) => (
              <span
                className={`flex flex-col items-start border-[1.5px] rounded-lg md:px-3 px-2 py-1 md:py-2  text-sm md:text-base  ${
                  businessDetails.modeOfPayment.some(
                    (item) => item.name === name
                  )
                    ? 'border-blue-500 text-blue-600'
                    : 'border-gray-300'
                } ${!businessModeOfPaymentUpdate && "cursor-pointer"}`}
                onClick={() => {
                  !businessModeOfPaymentUpdate &&
                  handleModeOfPaymentClick(name, icon);
                }}
                key={index}
              >
                <div>
                  <img
                    src={icon}
                    alt={name}
                    className="w-20 h-20 inline-block object-contain"
                  />
                </div>
              </span>
            ))}
                  </div>
                </div>
              )}

              {currentSection === "Timings" && (
                <div className="mt-6 mb-6">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <FiClock className="w-6 h-6" />
                      <h2 className="text-xl font-semibold">Business Hours</h2>
                    </div>
                    {businessTimingsUpdate ? (
                      <FiEdit2
                        className="cursor-pointer w-5 h-5"
                        onClick={() => setBusinessTimingsUpdate(false)}
                      />
                    ) : (
                      <FiX
                        className="cursor-pointer w-5 h-5 text-red-500"
                        onClick={() => setBusinessTimingsUpdate(true)}
                      />
                    )}
                  </div>

                  <div className="mt-6">
                    <div className="flex flex-col gap-4">
                      {daysOfWeek.map((day, index) => (
                        <div
                          className="flex flex-col items-start gap-4"
                          key={day}
                        >
                          <div className="flex gap-6 justify-start items-center">
                            <input
                              type="checkbox"
                              id={day}
                              name={day}
                              className="form-checkbox accent-green-600 h-5 w-5 text-blue-500"
                              checked={businessDetails.timing[index].isOpen}
                              onChange={(e) =>
                                handleBusinessHoursChange(
                                  index,
                                  e.target.checked
                                )
                              }
                              disabled={businessTimingsUpdate}
                            />
                            <label
                              htmlFor={day}
                              className="block text-base text-gray-700"
                            >
                              {day}
                            </label>
                          </div>
                          {businessDetails.timing[index].isOpen && (
                            <div className="flex gap-4 items-center">
                              <div className="relative">
                                <select
                                  className="appearance-none py-2 px-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                  value={businessDetails.timing[index].from}
                                  onChange={(e) =>
                                    handleBusinessHoursFromChange(
                                      index,
                                      e.target.value
                                    )
                                  }
                                  disabled={businessTimingsUpdate}
                                >
                                  <option value="" disabled defaultChecked>
                                    -
                                  </option>

                                  {timeOptions.map((time) => (
                                    <option key={time} value={time}>
                                      {time}
                                    </option>
                                  ))}
                                </select>

                                <FiChevronDown className="w-5 h-5 pointer-events-none absolute right-3 transform -translate-y-1/2 top-1/2" />
                              </div>

                              <span className="text-gray-600">to</span>

                              <div className="relative">
                                <select
                                  className="appearance-none py-2 px-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                  value={businessDetails.timing[index].to}
                                  onChange={(e) =>
                                    handleBusinessHoursToChange(
                                      index,
                                      e.target.value
                                    )
                                  }
                                  disabled={businessTimingsUpdate}
                                >
                                  <option value="" disabled defaultChecked>
                                    -
                                  </option>

                                  {timeOptions
                                    .filter(
                                      (time) =>
                                        new Date(`01/01/2000 ${time}`) >
                                        new Date(
                                          `01/01/2000 ${businessDetails.timing[index].from}`
                                        )
                                    )
                                    .map((time) => (
                                      <option key={time} value={time}>
                                        {time}
                                      </option>
                                    ))}
                                </select>

                                <FiChevronDown className="w-5 h-5 pointer-events-none absolute right-3 transform -translate-y-1/2 top-1/2" />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentSection === "Images" && (
                <div className="mt-6 mb-6">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <FiImage className="w-6 h-6" />
                      <h2 className="text-xl font-semibold">Gallery Images</h2>
                    </div>

                    {businessImagesUpdate ? (
                      <FiEdit2
                        className="cursor-pointer w-5 h-5"
                        onClick={() => setBusinessImagesUpdate(false)}
                      />
                    ) : (
                      <FiX
                        className="cursor-pointer w-5 h-5 text-red-500"
                        onClick={() => setBusinessImagesUpdate(true)}
                      />
                    )}
                  </div>

                  <div className="mt-6">
                    <div className="flex flex-col items-start">
                      {images.length > 0 && (
                        <span>{images.length} Images Added</span>
                      )}

                      <div className="mb-4 grid grid-cols-3 w-full gap-4 mt-6">
                        {businessDetails.photosGallery.map((image, index) => (
                          <div
                            className="relative rounded-xl w-full"
                            key={index}
                          >
                            <img
                              key={index}
                              src={image}
                              alt={`Selected Image ${index}`}
                              className="object-cover h-full rounded-xl"
                            />

                            {!businessImagesUpdate && (
                              <FiX
                                className="absolute -top-2 -right-2 w-6 h-6 text-white cursor-pointer bg-red-500 rounded-full p-1"
                                onClick={() => {
                                  setImages((prev) =>
                                    prev.filter((_, i) => i !== index)
                                  );
                                  setImagesToShow((prev) =>
                                    prev.filter((_, i) => i !== index)
                                  );
                                }}
                              />
                            )}
                          </div>
                        ))}
                        {images &&
                          imagesToShow.map((image, index) => (
                            <div
                              className="relative rounded-xl w-full"
                              key={index}
                            >
                              <img
                                key={index}
                                src={image}
                                alt={`Selected Image ${index}`}
                                className="object-cover h-full rounded-xl"
                              />
                              <FiX
                                className="absolute -top-2 -right-2 w-6 h-6 text-white cursor-pointer bg-red-500 rounded-full p-1"
                                onClick={() => {
                                  setImages((prev) =>
                                    prev.filter((_, i) => i !== index)
                                  );
                                  setImagesToShow((prev) =>
                                    prev.filter((_, i) => i !== index)
                                  );
                                }}
                              />
                            </div>
                          ))}
                      </div>

                      {!businessImagesUpdate && (
                        <label
                          htmlFor="image"
                          className="cursor-pointer mt-2 py-2 px-4 bg-blue-500 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            multiple
                            className=" py-2 px-4 bg-gray-200 text-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                            style={{ display: "none" }}
                          />
                          {images.length > 0 ? "Add Another" : "Add Image"}
                        </label>
                      )}

                      {images.length > 0 && (
                        <button
                          className="mt-2 py-2 px-4 bg-blue-500 flex gap-4 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onClick={handleImagesUpload}
                        >
                          <FiUploadCloud className="w-6 h-6" />
                          Upload All Images
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="flex gap-4 items-center justify-center mt-6 py-2 px-4 bg-blue-500 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleUpdate}
            >
              {isBusinessUpdating ? "Saving business" : "Save business"}


              {isBusinessUpdating && 
                                <div
                                className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status"
                              >
                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                  Loading...
                                </span>
                              </div>}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default BusinessEdit;
