import React, { useState } from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    FiChevronDown,
    FiClock,
    FiCode,
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
    BiDetail,
    BiLink,
    BiNavigation,
    BiQuestionMark,
} from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { useSelector } from "react-redux";


const BusinessRegister = () => {
    const navigate = useNavigate();

    const [address, setAddress] = useState('');

    const handleSelect = async (value) => {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      console.log('Selected Address:', value);
      console.log('Latitude and Longitude:', latLng);
    };

    const [businessDetails, setBusinessDetails] = useState({
        name: "",
        type: "",
        phone: "",
        email: "",
        description: "",
        mainCategory: "",
        subCategory: "",
        address: "",
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
        faqs: [{
            question: "",
            answer: ""
        }],
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
            extractedLink: ""
          },
        services : []
    });

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
        }))
    
    
      }


    const [service, setService] = useState("");

    const handleServicesChange = (e) => {
        setService(e.target.value);
    }

    const addService = () => {
        if(service === "") return;
        setBusinessDetails({
            ...businessDetails,
            services: [...businessDetails.services, service]
        })
        setService("");
    }

    const removeService = (index) => {
        const updatedServices = businessDetails.services.filter((_, i) => i !== index);
        setBusinessDetails({
            ...businessDetails,
            services: updatedServices
        })
    }

    console.log(businessDetails);

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
        const newFaqs = [...businessDetails.faqs, { question: '', answer: '' }];
        setBusinessDetails({ ...businessDetails, faqs: newFaqs });
    };

    const handleRemoveFaq = index => {
        const updatedFaqs = businessDetails.faqs.filter((_, i) => i !== index);
        setBusinessDetails({ ...businessDetails, faqs: updatedFaqs });
    };


    // handle categories
    const mainCategories = [
        "Food & Beverage",
        "Health & Wellness",
        "Fashion & Clothing",
        "Home & Decor",
        "Automotive",
        "Technology",
        "Beauty & Personal Care",
        "Sports & Fitness",
        "Travel & Tourism",
        "Education & Learning",
    ];

    // const categories = useSelector((state) => state.categories)

    // const mainCategories = categories.map((category) => category.title)

    // const subCategories = categories.map((category) => {
    //     const subCategory = category.subCategories
    //     const subCategoryList = 
    // })



    const subCategories = {
        "Food & Beverage": [
            "Restaurants",
            "Cafes",
            "Bakeries",
            "Bars",
            "Fast Food",
        ],
        "Health & Wellness": [
            "Gyms",
            "Yoga Studios",
            "Spas",
            "Nutritionists",
            "Fitness Classes",
        ],
        "Fashion & Clothing": [
            "Clothing Stores",
            "Shoe Stores",
            "Jewelry Stores",
            "Boutiques",
            "Accessories",
        ],
        "Home & Decor": [
            "Furniture Stores",
            "Home Improvement",
            "Appliances",
            "Interior Design",
            "Home Accessories",
        ],
        "Automotive": [
            "Car Dealerships",
            "Auto Repair",
            "Car Rental",
            "Motorcycle Dealerships",
            "Tire Shops",
        ],
        "Technology": [
            "Electronics Stores",
            "Computer Repair",
            "Gadgets",
            "Software Development",
            "IT Services",
        ],
        "Beauty & Personal Care": [
            "Hair Salons",
            "Spas",
            "Nail Salons",
            "Barber Shops",
            "Beauty Supply",
        ],
        "Sports & Fitness": [
            "Sporting Goods",
            "Fitness Centers",
            "Sports Clubs",
            "Outdoor Activities",
            "Yoga Studios",
        ],
        "Travel & Tourism": [
            "Hotels",
            "Travel Agencies",
            "Tourist Attractions",
            "Airline Companies",
            "Car Rental",
        ],
        "Education & Learning": [
            "Schools",
            "Tutoring Centers",
            "Colleges",
            "Language Schools",
            "Online Courses",
        ],
    };


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
        "06:00 AM",
        "07:00 AM",
        "08:00 AM",
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "01:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM",
        "06:00 PM",
        "07:00 PM",
        "08:00 PM",
        "09:00 PM",
        "10:00 PM",
        "11:00 PM",
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
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages((prevImages) => [...prevImages, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleImagesUpload = async () => {


        const promises = images.map(async (image) => {
            const imageRef = storage.ref().child(`images/${image.name}`);
            await imageRef.put(image);
            const url = await imageRef.getDownloadURL();
            return url;
        });

        const urls = await Promise.all(promises);
        console.log(urls);

    };


    // handle mode of payment
    const paymentModes = [
        "UPI",
        "Cash",
        "Credit Card",
        "Debit Card",
        "Net Banking",
        "EMI",
        "Wallet",
        "American Express",
    ];

    const handlModeOfPaymentClick = (option) => {
        if (businessDetails.modeOfPayment.includes(option)) {
          setBusinessDetails((prev) => ({
            ...prev,
            modeOfPayment: prev.modeOfPayment.filter((item) => item !== option),
          }));
        } else {
          setBusinessDetails((prev) => ({
            ...prev,
            modeOfPayment: [...prev.modeOfPayment, option],
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
                vendorName: vendorName
            }));

            const updatedBusinessDetails = { ...businessDetails, vendorId: vendorId, vendorName: vendorName };
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


    return (
        <div className="  flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className=" w-full justify-between flex flex-col">
                <div className="flex flex-col">
                    <div className="flex flex-col gap-6">
                        {/* BUSINESS DETAILS */}
                        <div className="mt-6 mb-6">
                            <div className="flex items-center gap-2">
                                <BiDetail className="w-6 h-6" />
                                <h2 className="text-xl font-semibold">
                                    Enter basic business details
                                </h2>
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
                                                >
                                                    <option value="" disabled className="">
                                                        -
                                                    </option>
                                                    <option value="service">Service</option>
                                                    <option value="manufacturing">Manufacturing</option>
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
                                        />
                                    </div>

                                    {/* BUSINESS EMAIL */}
                                    <div className="flex flex-col w-full">
                                        <label htmlFor="">Mail Id</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={businessDetails.number}
                                            onChange={handleBusinessDetailsChange}
                                            className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                    <div className="flex flex-col w-full">
                                        <label>About your business</label>
                                        <textarea name="description" value={businessDetails.description} id="" cols="30" rows="4" className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" onChange={handleBusinessDetailsChange}></textarea>
                                    </div>
                                    <div className="flex flex-col w-full">
                                            <label>What services you offer</label>
                                            <div className="flex items-center gap-4 mt-2">
                                                <input 
                                                    type="text" 
                                                    name="service" 
                                                    value={service}
                                                    id="" 
                                                    className="flex-[8] appearance-none rounded-md relative block w-full px-3 py-2 border  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                    onChange={handleServicesChange}
                                                />
                                                <button className="rounded-md bg-blue-500 text-white px-8 py-2 flex-[4]" onClick={addService}>Add</button>
                                            </div>

                                            <div className="mt-6 flex flex-wrap gap-4 w-full">
                                                {businessDetails.services.map((service, index) => (
                                                    <div className="relative flex items-center gap-4 mt-2">
                                                        <span className="px-4 py-2 border rounded-lg">{service}</span>
                                                        <FiXCircle className="bg-red-100 rounded-full text-red-500 absolute cursor-pointer -top-2 -right-2 w-5 h-5" onClick={() => removeService(index)}/>
                                                    </div>
                                                ))}
                                            </div>
                                    </div>
                            </div>
                        </div>

                        <hr className="border-1 border-gray-300" />

                        {/* BUSINESS CATEGORY # */}
                        <div className="mt-6 mb-6">
                            <div className="flex items-center gap-2">
                                <BiCategory className="w-6 h-6" />
                                <h2 className="text-xl font-semibold">
                                    Select you business category
                                </h2>
                            </div>
                            <div className="flex gap-4 mt-6 w-full">
                                {/* CATEGORY */}
                                <div className="flex flex-col w-full">
                                    <label htmlFor="">Category</label>

                                    <div className="relative mt-2">
                                        <select
                                            name="mainCategory"
                                            value={businessDetails.mainCategory}
                                            onChange={handleBusinessDetailsChange}
                                            className="appearance-none rounded-md relative block w-full px-3 py-2 border  border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 bg-white focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        >
                                            <option value="" disabled className="text-red">
                                                -
                                            </option>
                                            {mainCategories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>

                                        <div>
                                            <FiChevronDown className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm text-gray-500 w-6 h-6" />
                                        </div>
                                    </div>
                                </div>

                                {/* SUB CATEGORY */}
                                <div className="flex flex-col w-full">
                                    <label htmlFor="">Sub Category</label>

                                    <div className="relative mt-2">
                                        <select
                                            name="subCategory"
                                            value={businessDetails.subCategory}
                                            onChange={handleBusinessDetailsChange}
                                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 bg-white focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        >
                                            <option value="" disabled defaultChecked>
                                                -
                                            </option>
                                            {businessDetails.mainCategory &&
                                                subCategories[businessDetails.mainCategory].map((category) => (
                                                    <option key={category} value={category}>
                                                        {category}
                                                    </option>
                                                ))
                                            }
                                        </select>

                                        <div>
                                            <FiChevronDown className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm text-gray-500 w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="border-1 border-gray-300" />

                        {/* BUSINESS ADDRESS */}
                        <div className="mt-6 mb-6">
                            <div className="flex items-center gap-2">
                                <BiNavigation className="w-6 h-6" />
                                <h2 className="text-xl font-semibold">Add business address</h2>
                            </div>
                            <div className="flex flex-col gap-4 mt-6">
                                <div className="flex flex-col">
                                    <label htmlFor="">Address</label>
                                    <input
                                        type="text"
                                        className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="">
                                        Address Line 2{" "}
                                        <span className="text-gray-500 font-light text-sm">
                                            (optional)
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text"
                                    />
                                </div>

                                <div className="flex">
                                    <div className="flex flex-col">
                                        <label htmlFor="" className="">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="" className="">
                                            Zip Code
                                        </label>
                                        <input
                                            type="text"
                                            className="mt-2 ml-2 mappearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="mt-6 mb-6">
                            <div className="flex items-center gap-2">
                                <BiNavigation className="w-6 h-6" />
                                <h2 className="text-xl font-semibold">Add business address</h2>
                            </div>
                            <div className="flex flex-col gap-4 mt-6">
                                <div className="flex flex-col">
                                    <label htmlFor="">Address</label>
                                    <PlacesAutocomplete
                                        value={address}
                                        onChange={setAddress}
                                        onSelect={handleSelect}
                                    >
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                            <div>
                                                <input
                                                    {...getInputProps({
                                                        placeholder: 'Enter your address...',
                                                        className: 'location-search-input',
                                                    })}
                                                />
                                                <div>
                                                    {loading ? <div>Loading...</div> : null}

                                                    {suggestions.map((suggestion, index) => {
                                                        const style = {
                                                            backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                                                        };
                                                        return (
                                                            <div
                                                                {...getSuggestionItemProps(suggestion, { style })}
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
                                </div>
                                </div>

                                <hr className="border-1 border-gray-300" />

                                <div className="mt-6 mb-6">
                                    <div className="flex items-center gap-2">
                                        <FiCode className="w-6 h-6" />
                                        <h2 className="text-xl font-semibold">Enter google maps iframe HTML link</h2>
                                    </div>

                                    <div className="mt-6">
                                        <textarea
                                            className="w-full h-48 p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="Enter google maps iframe HTML link"
                                            name="iframe"
                                            onChange={handleIframeChange}
                                        />
                                    </div>
                                </div>



                                <hr className="border-1 border-gray-300" />

                                {/* BUSINESS LINKS # */}
                                <div className="mt-6 mb-6">
                                    <div className="flex items-center gap-2">
                                        <BiLink className="w-6 h-6" />
                                        <h2 className="text-xl font-semibold">Add social links</h2>
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
                                                    />
                                                    {link.icon}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <hr className="border-1 border-gray-300" />

                                {/* Business Faqs # */}
                                <div className="mt-6 mb-6">
                                    <div className="flex items-center gap-2">
                                        <BiQuestionMark className="w-6 h-6" />
                                        <h2 className="text-xl font-semibold">Add FAQ's</h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-8 mt-6">
                                        {businessDetails.faqs.map((faq, index) => (
                                            <div key={index}>
                                                <div>
                                                    <div className=" flex justify-start gap-4 items-center mb-2">
                                                        <span className="font-medium text-lg">Faq {index + 1}</span>
                                                        <FiTrash2 className="w-5 h-5 text-red-500 cursor-pointer" onClick={() => handleRemoveFaq(index)}
                                                        />
                                                    </div>
                                                    <label className="block text-gray-700">Question</label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            value={faq.question}
                                                            onChange={e => handleFaqChange(index, 'question', e.target.value)}
                                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 mt-2">Answer</label>
                                                    <div className="mt-2">
                                                        <textarea
                                                            value={faq.answer}
                                                            onChange={e => handleFaqChange(index, 'answer', e.target.value)}
                                                            rows={2}
                                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>
                                                {/* <button
              onClick={() => handleRemoveFaq(index)}
              className="mt-2 py-1 px-2 bg-red-500 text-white rounded-md shadow focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Cancel
            </button> */}
                                            </div>
                                        ))}
                                        <button
                                            onClick={handleAddFaq}
                                            className=" py-2 px-4 bg-blue-500 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                                        >
                                            Add FAQ
                                        </button>
                                    </div>
                                </div>

                                <hr className="border-1 border-gray-300" />

                                {/* Mode of Payment # */}
                                <div className="mt-6 mb-6">
                                    <div className="flex items-center gap-2">
                                        <MdPayment className="w-6 h-6" />
                                        <h2 className="text-xl font-semibold">Mode of Payment</h2>
                                    </div>

                                    <div className="flex flex-wrap gap-4 mt-6">
                                        {paymentModes.map((mode, index) => (
                                            <span
                                                className={`px-4 py-2 border rounded-lg cursor-pointer  ${businessDetails.modeOfPayment.includes(mode)
                                                    ? "border-blue-500 text-blue-600"
                                                    : "border-gray-300"
                                                    }`}
                                                onClick={() => {
                                                    handlModeOfPaymentClick(mode);
                                                }}
                                                key={index}
                                            >
                                                {mode}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <hr className="border-1 border-gray-300" />

                                {/* Business Hours # */}
                                <div className="mt-6 mb-6">
                                    <div className="flex items-center gap-2">
                                        <FiClock className="w-6 h-6" />
                                        <h2 className="text-xl font-semibold">Business Hours</h2>
                                    </div>

                                    <div className="mt-6">
                                        <div className="flex flex-col gap-4">
                                            {daysOfWeek.map((day, index) => (
                                                <div className="flex flex-col items-start gap-4" key={day}>
                                                    <div className="flex gap-6 justify-start items-center">
                                                        <input
                                                            type="checkbox"
                                                            id={day}
                                                            name={day}
                                                            className="form-checkbox accent-green-600 h-5 w-5 text-blue-500"
                                                            checked={businessDetails.timing[index].isOpen}
                                                            onChange={(e) =>
                                                                handleBusinessHoursChange(index, e.target.checked)
                                                            }
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

                                <hr className="border-1 border-gray-300" />

                                {/* photos upload with cloudinary */}

                                <div className="mt-6 mb-6">
                                    <div className="flex items-center gap-2">
                                        <FiImage className="w-6 h-6" />
                                        <h2 className="text-xl font-semibold">Gallery Images</h2>
                                    </div>

                                    <div className="mt-6">
                                        <div className="flex flex-col items-start">
                                            {images.length > 0 && (
                                                <span>{images.length} Images Added</span>
                                            )}

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

                                            <div className="mb-4 grid grid-cols-3 w-full gap-4 mt-6">
                                                {images.map((image, index) => (
                                                    <div className="relative rounded-xl w-full" key={index}>
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
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                            {images.length > 0 && (
                                                <button className="mt-2 py-2 px-4 bg-blue-500 flex gap-4 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleImagesUpload}>
                                                    <FiUploadCloud className="w-6 h-6" />
                                                    Upload All Images
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="mt-6 py-2 px-4 bg-blue-500 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleSubmit}>
                                Register Business
                            </button>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
                );
};


                export default BusinessRegister;
