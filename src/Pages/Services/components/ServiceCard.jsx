import React, { useEffect, useState } from 'react'
import { AiFillStar, AiOutlineWhatsApp } from 'react-icons/ai';
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
        <div className='flex md:flex-row flex-col border rounded-lg relative overflow-hidden' key={business._id}>

<script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessStrDataStructure),
        }}
      />


            <div className='flex-[3.5] relative'>
                <Link to={`/business/${business.name.split(" ").join("-").toLowerCase()}`}>

                <img loading='lazy' src={business.images.cover} alt="" className='w-full h-44 md:h-52 object-cover rounded-tl-lg rounded-bl-lg' />

                </Link>
            </div>


            <div className='bg-white flex-[8.5] py-2 md:flex-[8] w-full rounded-tr-lg rounded-br-lg flex flex-col justify-between gap-6 md:gap-4'>
                <div className='flex px-4 flex-col gap-2'>
                        <div className='text-base md:text-lg font-medium items-center gap-4 border-gray-300'>
                            {business.name}
                            <div className='flex gap-2 text-sm font-normal items-center'>
                        <FiMapPin className='' />

                            <span className='text-sm font-normal'>{business.address?.district}</span>
                        </div>
                        </div>



                        <div className='flex flex-col gap-2 md:gap-3'>

<div className='flex gap-1 items-center'>
    {avgRating ? 
        <span className='text-base font-medium'>{avgRating}</span>

        :
        <span className='text-sm'>No Ratings</span>
    }



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

            <span key={index} className='text-xs px-3 py-[5px] bg-gray-200 rounded-full'>{service}</span>
            ))}
    </div>


</div>


                </div>


                <div className='flex gap-3 px-4 justify-start items-center w-full'>

                    <button className='w-fit h-fit px-3 py-2 md:px-4  md:py-2 bg-blue-500 text-white rounded-lg' onClick={handleCallClick}>

                        <a className='flex text-sm items-center gap-3 justify-center'>
                            <FiPhoneCall className='w-4 h-4 md:w-5 md:h-5' />
                            Call Now
                        </a>

                    </button>
                    <button onClick={() => setShowEnquiryForm(true)} className='w-fit h-fit text-sm  md:px-4 px-3 py-2  md:py-2 text-white bg-blue-500 flex items-center justify-center gap-3 rounded-lg'>
                        <FiMessageSquare className='w-4 h-4 md:w-5 md:h-5' /> 
                        Enquire
                    </button>

                    { business.socialLinks?.whatsapp &&
                    <button className='w-fit h-fit px-1 py-1 bg-green-500 rounded-full text-white'>
                        <a href={`${business.socialLinks.whatsapp}`} target='_blank'>
                        <AiOutlineWhatsApp className='w-6 h-6 md:w-6 md:h-6' />
                        </a>
                    </button>
}





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