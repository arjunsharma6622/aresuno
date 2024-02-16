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



    const businessRating = business.ratings?.reduce((acc, item) => acc + (item.rating || 0), 0) / business.ratings?.length;
    const roundedAvgRating = Number.isNaN(businessRating) ? 0 : Math.round(businessRating);
    const [ratings, setRatings] = useState([]);
    const [callClick, setCallClick] = useState(false);
    const [showEnquiryForm, setShowEnquiryForm] = useState(false);


    
    console.log(businessRating)

    const avgRating = ratings?.reduce((acc, item) => acc + (item.rating || 0), 0) / ratings?.length;

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
        setRatings(ratingsRes.data);
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
        <div className='' key={business._id}>

<script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessStrDataStructure),
        }}
      />


            <div className=''>

                <img loading='lazy' src={business.images.cover} alt="" className='w-full aspect-[2/1] object-cover rounded-xl' />
            </div>


            <div className='bg-white py-4 pb-0 w-full rounded-xl shadow-xl flex flex-col gap-4'>
                <div className='px-4'>

                    
                    <div className='flex gap-3 items-center border-b-[1px] border-gray-200 pb-4'>
                        <div>
                            <img loading='lazy' src={business.images.logo} alt="test img" className='w-12 h-12 object-cover rounded-full' />
                        </div>
                        <div className='border-l-[1.4px] border-gray-300 pl-2'>{business.name}</div>
                        <div className='ml-2'>
                            <Link to={`/business/${business.name.split(" ").join("-").toLowerCase()}`} className='flex items-center gap-2 text-sm text-blue-500'>
                            <FiExternalLink className='w-4 h-4' />
                            Visit
                            </Link>
                        </div>
                    </div>



                    <div className='flex gap-2 items-center mt-4'>
                            <FiMapPin className='w-4 h-4 text-blue-500' />
                            <span className='text-sm'>{business.address.city}</span>
                        </div>

                    <div className='flex flex-col gap-3 mt-4'>
                        {/* <div>{business.description}</div> */}

                        <div className='flex gap-2 flex-wrap'>
                            {business.services.map((service, index) => (

                                <span key={index} className='text-xs px-3 py-[4px] bg-gray-200 rounded-full'>{service}</span>
                                ))}
                        </div>

                        <div className='flex gap-2 items-center'>
                            <span className='text-sm'>{businessRating ? businessRating.toFixed(1) : "No Ratings"}</span>

                            {businessRating ?

                                <div className="flex gap-4">
                                    <div className="flex items-center">
                                        {[...Array(Math.round(roundedAvgRating))].map((_, index) => (
                                            <AiFillStar key={index} className="text-yellow-500" />
                                        ))}
                                        {[...Array(5 - Math.round(roundedAvgRating))].map((_, index) => (
                                            <AiFillStar className="text-gray-300" key={index} />
                                        ))}

                                    </div>
                                </div>

                                :

                                null

                            }

{ businessRating ?
                            <span className='text-xs ml-2'>{business.ratings?.length} ratings</span>

                            :
                            null

}

                        </div>
                    </div>


                </div>


                <div className='flex w-full'>
                    <button className='w-full px-2 py-[10px] border-t-[1px] border-gray-200  text-blue-500' onClick={handleCallClick}>

                        <a className='flex items-center gap-4 justify-center'>
                            <FiPhoneCall className=' w-5 h-5' />
                            Call Now
                        </a>

                    </button>
                    <button onClick={() => setShowEnquiryForm(true)} className='w-full px-2 py-[10px] text-white bg-blue-500 flex items-center justify-center gap-4 rounded-br-lg'>
                        <FiMessageSquare className='w-5 h-5' /> 
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