import React from 'react'
import { AiOutlineAppstore } from 'react-icons/ai'
import { BiCategory, BiImage } from 'react-icons/bi'
import { FaGripLines } from 'react-icons/fa'
import { FiHome, FiMessageSquare, FiPhoneCall, FiPlus, FiPlusCircle, FiUsers } from 'react-icons/fi'
import { LuLayoutDashboard } from 'react-icons/lu'
import { MdOutlineArticle } from 'react-icons/md'

const Sidebar = ({handleSelectedField, selectedField}) => {
    const sidebarItems = [
        {
            name : "Home",
            icon : <FiHome className="w-6 h-6" />
        },
        {
            name : "Add Listing",
            icon : <FiPlusCircle className="w-6 h-6" />
        },
        {
            name : "My Listings",
            icon : <AiOutlineAppstore className="w-6 h-6" />
        },
        {
            name : "Banner",
            icon : <BiImage className="w-6 h-6" />
        },
        {
            name : "Blogs",
            icon : <MdOutlineArticle className="w-6 h-6" />
        },
        {
            name : "Categories",
            icon : <BiCategory className="w-6 h-6" />
        },
        {
            name : "Enquiries",
            icon : <FiMessageSquare className="w-6 h-6" />
        },
        {
            name : "Call Leads",
            icon : <FiPhoneCall className="w-6 h-6" />
        },
        {
            name : "Businesses",
            icon : <LuLayoutDashboard className="w-6 h-6" />
        },
        {
            name : "Users",
            icon : <FiUsers className="w-6 h-6" />
        },
        {
            name : "Vendors",
            icon : <FiUsers className="w-6 h-6" />
        },

        
    ]
  return (
                <div className="flex my-4 mt-6 flex-col gap-8 justify-start items-start h-full overflow-y-scroll w-full">



                    { sidebarItems.map(({name, icon}, index) => (


                    <div className="text-sm flex flex-col gap-6 w-full">
                        <div
                            className={`flex items-center cursor-pointer gap-2 ${selectedField === name
                                ? "text-blue-500"
                                : "text-gray-700"
                                }`}
                            onClick={() => handleSelectedField(name)}
                        >
                            {icon}
                            <span className="">{name}</span>
                        </div>


                    </div>
                    ))
}

                </div>
  )
}

export default Sidebar