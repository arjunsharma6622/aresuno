import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ServiceCard from './components/ServiceCard'

const Services = () => {

    const [allBusinesses, setAllBusinesses] = useState([])
    const { subCategoryName } = useParams()
    const extractedName = subCategoryName.split('-').join(' ')
    console.log(extractedName)



    const subCategoryId = useSelector((state) => {
        // Use flatMap to flatten the array of subcategories
        const allSubcategories = state.categories.flatMap(category => category.subcategories);
      
        // Find the subcategory with the matching name
        const matchingSubcategory = allSubcategories.find(subCategory => subCategory.name.toLowerCase() === extractedName);
      
        // Return the _id if a matching subcategory is found
        return matchingSubcategory ? matchingSubcategory._id : null;
      });

      console.log(subCategoryId)

    const fetchAllBusinessesByCategory = async () => {
        try {
            // setIsLoading(true)

            const res = await axios.get(`https://aresuno-server.vercel.app/api/business/getbusinessesbycategory/${subCategoryId}`);
            setAllBusinesses(res.data);
            console.log(res.data)
            // setIsLoading(false)
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchAllBusinessesByCategory();
    }, [])
    return (
        <div>

            <h1 className='text-3xl font-semibold text-center mt-10 mb-4'>Find the service you want</h1>
            <p className='mb-8 text-center '>Total of {allBusinesses.length} services available</p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-[85%] mx-auto mb-8'>

                {
                    allBusinesses.map((business) => (
                        <ServiceCard key={business._id} business={business} />
                    ))
                }

            </div>
        </div>
    )
}

export default Services