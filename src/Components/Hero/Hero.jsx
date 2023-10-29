import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BusinessCard from '../../Pages/BusinessCard'
import axios from 'axios'
import BusinessCardSkeleton from './BusinessCardSkeleton'


const Hero = () => {
    const navigate = useNavigate()

    const [allBusinesses, setAllBusinesses] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        fetchAllBusinesses();
    }, []);



    const fetchAllBusinesses = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get('https://aresuno-server.vercel.app/api/business');
            setAllBusinesses(res.data);
            console.log(allBusinesses)
            setIsLoading(false)
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <div className=' flex flex-col items-center justify-center text-3xl mt-8'>
            <h1>Welcome to Aresuno</h1>
            <h1>Business Page is under construction <Link className='text-blue-500 underline' to={'/business'}>LINK</Link></h1>


            <div className='grid grid-cols-4 w-[90%] gap-8 mt-10'>

                {isLoading ?


                    [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => {
                        return (
                            <BusinessCardSkeleton key={index} />
                        )
                    })]




                    :
                    (
                        allBusinesses.map((business, index) => {
                            return (
                                <BusinessCard name={business.name} id={business._id} category={business.mainCategory} imageUrl={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHfp2-v0_mvOp5W9vUBpNKVMH4A-3M7oRidg&usqp=CAU'} rating={'4 star'} key={index}/>
                            )
                        })
                    )
                }


            </div>
        </div>
    )
}

export default Hero