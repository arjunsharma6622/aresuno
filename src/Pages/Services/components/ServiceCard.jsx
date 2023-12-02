import React from 'react'
import { AiFillStar } from 'react-icons/ai';
import { FiExternalLink, FiMapPin, FiMessageCircle, FiMessageSquare, FiPhoneCall } from 'react-icons/fi'
import { Link } from 'react-router-dom';

const ServiceCard = ({ business }) => {

    const businessRating = business.ratingsReviews?.reduce((acc, item) => acc + (item.rating || 0), 0) / business.ratingsReviews?.length;
    const roundedAvgRating = Number.isNaN(businessRating) ? 0 : Math.round(businessRating);

    


    console.log(businessRating)
    return (
        <div className='relative mb-40' key={business._id}>
            <div className=''>

                <img src="https://images.squarespace-cdn.com/content/v1/541eaa20e4b0eb59dead1cd7/1589303826107-DJ01MFBNKWL2MJWBQACF/4.jpg" alt="" className='w-full aspect-[2/1] object-cover rounded-xl' />
            </div>


            <div className='bg-white py-4 pb-0 w-full rounded-xl shadow-xl absolute top-[80%] overflow-hidden flex flex-col gap-4'>
                <div className='px-4'>

                    
                    <div className='flex gap-3 items-center border-b-[1px] border-gray-200 pb-4'>
                        <div>
                            <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png" alt="" className='w-6 h-6 object-cover' />
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
                            <FiMapPin className='w-4 h-4' />
                            <span className='text-sm'>Hitech city, Hyderabad</span>
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

                        </div>
                    </div>


                </div>


                <div className='flex w-full'>
                    <button className='w-full px-2 py-[10px] border-t-[1px] border-gray-200  text-blue-500 f'>

                        <a href={`tel:${business.phone}`} className='flex items-center gap-4 justify-center'>
                            <FiPhoneCall className=' w-5 h-5' />
                            Call Now
                        </a>

                    </button>
                    <button className='w-full px-2 py-[10px] text-white bg-blue-500 flex items-center justify-center gap-4'>
                        <FiMessageSquare className='w-5 h-5' /> 
                        Enquire
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard