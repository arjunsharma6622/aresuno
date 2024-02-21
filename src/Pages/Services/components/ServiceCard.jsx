import React, { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai';
import { FiExternalLink, FiMapPin, FiMessageCircle, FiMessageSquare, FiPhoneCall } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { API_URL } from '../../../utils/util';
import axios from "axios"
import CallClick from '../../../Components/CallClickForm';
import { useSelector } from 'react-redux';
import EnquiryForm from '../../../Components/EnquiryForm';

const ServiceCard = ({ business }) => {

    const user = useSelector((state) => state.user)

    const [ratings, setRatings] = useState([]);
    const [callClick, setCallClick] = useState(false);
    const [showEnquiryForm, setShowEnquiryForm] = useState(false);
    const [avgRating, setAvgRating] = useState(0);
    const [totalRatings, setTotalRatings] = useState(0);


    


    const openingHours = business.timing?.map(hour => {
        if (hour.isOpen) {
            return `${hour.day.slice(0, 2)} ${hour.from}-${hour.to}`; // Assuming 17:00 as a fixed closing time
        } else {
            return `${hour.day.slice(0, 2)} Closed`;
        }
    });

    const businessStrDataStructure = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "address": {
          "@type": "PostalAddress",
          "streetAddress" : business.address?.street ? business.address?.street : business.address?.landmark ? business.address?.landmark : "",
          "addressLocality": business.address?.district,
          "addressRegion": business.address?.state,
          "postalCode": business.address?.pincode,
          "addressCountry": "IN"
        },
        "geo" : {
            "@type": "GeoCoordinates",
            "latitude": business.address?.coordinates[1],
            "longitude": business.address?.coordinates[0]
        },
        "description": business.description,
        "name": business.name,
        "telephone": business.phone,
        "openingHours": openingHours,
        "email": business.email,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": avgRating,
            "reviewCount": business.ratings?.length
        },
      }




      useEffect( () => {
        const fetchRatings = async () => {
        const ratingsRes = await axios.get(
            `${API_URL}/api/rating/${business._id}`
        );
        setRatings(ratingsRes.data.filteredRatings);
        setAvgRating(parseInt(ratingsRes.data.avgRating));
        setTotalRatings(ratingsRes.data.totalRatings);
        }
        fetchRatings()

    }, [])


    const handleCallClick = async () => {
        if(user.name){
            try{
                const res = await axios.post(
                    `${API_URL}/api/call-lead/createLoggedInLead`,
                    {
                        name : user.name,
                        phone : user.phone ? user.phone : '-',
                        business : business._id
                    }
                )

                console.log(res.data)

                window.location.href = `tel:${business.phone}`


            }catch(err){
                console.log(err)
            }

        }
        else{
            setCallClick(true)
        }
    }

    const onClose = () => {
        setCallClick(false)
    }


    return (
        <div className='flex flex-col' key={business._id}>

<script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessStrDataStructure),
        }}
      />


            <div className='flex-[4] md:flex-[4] relative'>
                <Link to={`/business/${business.name.split(" ").join("-").toLowerCase()}`}>

                <img loading='lazy' src={business.images.cover} alt="" className='h-20 w-full object-cover rounded-tl-lg rounded-bl-lg' />
                <div className='absolute left-4 -bottom-6'>
                            <img loading='lazy' src={business.images.logo} alt="test img" className='md:w-12 w-8 h-8 md:h-12 object-cover rounded-full' />
                        </div>

                </Link>
            </div>


            <div className='bg-white flex-[10] md:flex-[8] pt-2 w-full rounded-tr-lg rounded-br-lg border flex flex-col gap-2 md:gap-4'>
                <div className='px-4 flex flex-col gap-3'>
                        <div className='mt-4 text-sm md:text-base font-medium border-gray-300'>{business.name}</div>

                    <div className='flex  gap-1 md:gap-2 items-center'>
                        <p className='text-sm truncated-description'>{business.description}</p>
                        </div>

                    <div className='flex flex-col gap-2 md:gap-3'>

                    <div className='flex gap-2 items-center'>
                            <span className='text-sm'>{avgRating ? avgRating : "No Ratings"}</span>

                            {avgRating ?

                                <div className="flex gap-4">
                                    <div className="flex items-center">
                                        {[...Array(Math.round(avgRating))].map((_, index) => (
                                            <AiFillStar key={index} className="text-yellow-500" />
                                        ))}
                                        {[...Array(5 - Math.round(avgRating))].map((_, index) => (
                                            <AiFillStar className="text-gray-300" key={index} />
                                        ))}

                                    </div>
                                </div>

                                :

                                null

                            }


                        </div>

                        <div className='flex gap-2 flex-wrap'>
                            {business.services?.slice(0, 4).map((service, index) => (

                                <span key={index} className='text-xs px-3 py-[2px] bg-gray-200 rounded-full'>{service}</span>
                                ))}
                        </div>


                    </div>


                </div>


                <div className='flex w-full'>
                    <button className='w-full px-2 py-[6px] border-t-[1px] border-gray-200  text-blue-500' onClick={handleCallClick}>

                        <a className='flex text-sm items-center gap-3 justify-center'>
                            <FiPhoneCall className='w-4 h-4 md:w-5 md:h-5' />
                            Call Now
                        </a>

                    </button>
                    <button onClick={() => setShowEnquiryForm(true)} className='w-full text-sm px-2 py-[6px] text-white bg-blue-500 flex items-center justify-center gap-3 rounded-br-lg'>
                        <FiMessageSquare className='w-4 h-4 md:w-5 md:h-5' /> 
                        Enquire
                    </button>
                </div>

                {
                    showEnquiryForm && <EnquiryForm business={business} onClose={() => setShowEnquiryForm(false)} categoryId={business.category}/>
                }


                {callClick && !user.name && <CallClick onClose={onClose} business={business}/>}
            </div>
        </div>
    )
}

export default ServiceCard