import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { API_URL } from '../utils/util';
import axios from 'axios'

const EnquiryForm = ({ onClose, business, categoryId }) => {
  const [enquiry, setEnquiry] = useState({
    name: '',
    phone: '',
    message: '',
    category: categoryId,
  });

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();

    try {
        const enquiryToSend = {
            ...enquiry
        }
        if(business){
            enquiryToSend.business = business._id
        }
        const res = await axios.post(`${API_URL}/api/enquiry/create`, enquiryToSend)
        console.log(res)
        onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormChange = (e) => {
    setEnquiry({
      ...enquiry,
      [e.target.id]: e.target.value,
    });
  };

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
              <FiX className='w-5 h-5 cursor-pointer' onClick={onClose} />
            </div>
          </div>
          <form
            onSubmit={handleEnquirySubmit}
            className='flex flex-col gap-4'
          >
            <div className='flex flex-col gap-1'>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                id='name'
                name='name'
                value={enquiry.name}
                className='rounded-md border text-base border-gray-300 w-full py-3 px-4 text-gray-600 focus:outline-none focus:border-blue-500'
                onChange={(e) => handleFormChange(e)}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='phone'>Phone</label>
              <input
                type='number'
                id='phone'
                name='phone'
                value={enquiry.phone}
                className='rounded-md border text-base border-gray-300 w-full py-3 px-4 text-gray-600 focus:outline-none focus:border-blue-500'
                onChange={(e) => handleFormChange(e)}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='message'>
                Message <span className='text-sm'>(optional)</span>
              </label>
              <input
                type='text'
                id='message'
                name='message'
                value={enquiry.message}
                className='rounded-md border text-base border-gray-300 w-full py-3 px-4 text-gray-600 focus:outline-none focus:border-blue-500'
                onChange={(e) => handleFormChange(e)}
              />
            </div>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded-md'
            >
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquiryForm;
