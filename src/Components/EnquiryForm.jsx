import React from 'react'
import { FiX, FiXCircle } from 'react-icons/fi'

const EnquiryForm = ({onClose}) => {
  return (
<div>
    <div className='z-[40] fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-sm'>

        <div className='w-[90%] md:w-[40%] bg-white p-8 flex flex-col gap-6 rounded-xl'>
        <div className='flex justify-between'>
            <div>
                <h1 className='text-xl font-semibold'>Enquiry</h1>
                <p>We will get back to you in some time</p>
            </div>
            <div>
                <FiX className='w-5 h-5 cursor-pointer' onClick={onClose}/>
            </div>
            
        </div>
        <form action="" className='flex flex-col gap-4'>

            <div className='flex flex-col gap-1'>
                <label htmlFor="name">Name</label>
                <input type="text" id='name' className=' rounded-md border text-base border-gray-300 w-full py-3 px-4 text-gray-600 focus:outline-none focus:border-blue-500'/>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="phone">Phone</label>
                <input type="number" id='phone' className=' rounded-md border text-base border-gray-300 w-full py-3 px-4 text-gray-600 focus:outline-none focus:border-blue-500'/>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="message">Message</label>
                <input type="text" id='message' className=' rounded-md border text-base border-gray-300 w-full py-3 px-4 text-gray-600 focus:outline-none focus:border-blue-500'/>
            </div>

            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>Submit Enquiry</button>
        </form>
        </div>
    </div>

    </div>
  )
}

export default EnquiryForm