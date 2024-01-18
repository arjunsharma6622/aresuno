import React, { useState } from 'react'
import { FiPhoneCall, FiX } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { API_URL } from '../utils/util'
import axios from "axios"

const CallClickForm = ({onClose, business}) => {
    const [userDetails, setUserDetails] = useState({
        name: '',
        phone: '',
    })
    console.log(userDetails)

    const [showNumber, setShowNumber] = useState(false)

    const handleUserDetails = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleGetPhoneNumber = async (e) => {
        e.preventDefault();
        try{
            const callLeadToSend = {
                ...userDetails,
                business : business._id
            }
            const res = await axios.post(`${API_URL}/api/call-lead/create`, callLeadToSend)
            console.log(res)

            setUserDetails({
                name: '',
                phone: '',
            })

            setShowNumber(true)


        }
        catch(err){
            console.log(err)
        }


    }
  return (
    <div>
                <div className="z-[40] fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-sm">
                    { !showNumber ?
          <div className="bg-white p-6 rounded-xl w-[90%] md:w-[40%] md:px-10 md:py-10">
            <div className='flex justify-between items-start'>
                <div className=''>

            <h2 className="text-lg md:text-xl font-bold">Get Phone Number of <span className='text-blue-500'>{business.name.split(' ').slice(0, 2).join(' ')}{business.name?.length > 2 ? '' : '...'}</span></h2>
            <p className='text-xs md:text-sm text-gray-500 mt-1'>To get phone number either <Link to='/login' className='text-blue-500 underline'>Login</Link> or give your details</p>
            </div>
            <FiX className="w-6 h-6  cursor-pointer" onClick={onClose}/>
            </div>


            <form className='flex flex-col gap-4 mt-4 md:mt-6'>
              <div className="flex flex-col gap-1">
                <label
                  className="text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="rounded-md input border text-sm md:text-base border-gray-300 w-full py-3 md:px-4 px-3 text-gray-600 leading-tight focus:outline-none focus:border-blue-500"
                  onChange={(e) => handleUserDetails(e)}
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={userDetails.name}
                  name='name'
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className=" text-gray-700"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  className="rounded-md input border text-sm md:text-base border-gray-300 w-full py-3 md:px-4 px-3 text-gray-600 leading-tight focus:outline-none focus:border-blue-500"
                  onChange={(e) => handleUserDetails(e)}
                  id="phone"
                  type="number"
                  value={userDetails.phone}
                  placeholder="Enter your phone number"
                  name='phone'
                />
              </div>

              <div className="flex items-center justify-center w-full">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded focus:outline-none text-sm md:text-base focus:shadow-outline w-full"
                  type="submit"
                  onClick={handleGetPhoneNumber}
                >
                  Get Phone Number
                </button>
              </div>
            </form>

          </div>

            : <div className="bg-white p-6 rounded-xl w-[40%] px-10 py-10">
                <div className='flex justify-between items-start'>
                <div>
            <h2 className="text-xl font-bold"><span className='text-blue-500 mr-1'>{business.name} </span> Phone Number</h2>
            <p className=' text-gray-900 mt-1 text-lg font-medium'>{business.phone}</p>
            <p className='text-sm text-gray-500 mt-1'>Call this number to get more details about this business</p>
            <p className='text-sm text-gray-500 mt-1'>You can also visit this business by clicking on the <Link target='_blank'  to={`/business/${business.name.split(" ").join("-")}`} className='text-blue-500 underline cursor-pointer'>View</Link></p>
            </div>
            <FiX className="w-6 h-6  cursor-pointer" onClick={onClose}/>
            </div>




            <div className='flex items-center justify-center gap-6 w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => {
                window.location.href = `tel:${business.phone}`
            }}>
                <button className=''>Call Now {business.phone}</button>
            </div>
            </div>
          }
          </div>
    </div>
  )
}

export default CallClickForm