import React, { useState } from 'react'
import { FiEdit, FiX } from "react-icons/fi";







const BusinessEdit = () => {
    const [focusedField, setFocusedField] = useState(null);

    const [edit, setEdit] = useState(true)



    const handleFocus = (fieldName) => {
        setFocusedField(fieldName);
      };
    
      const handleBlur = () => {
        setFocusedField(null);
      };
    
    const inputItems = ['Business Name', 'Business Email', 'Business Phone', 'Category', 'Sub Category']
    return (
        <div className='width-full'>

            <div className='flex justify-between items-center'>


                <h2 className='text-lg font-medium'>Update Business Details</h2>
                {
                    edit ? (
                        <FiEdit className='text-gray-500 cursor-pointer w-6 h-6' onClick={() => { setEdit(!edit) }} />

                    ) :
                        <FiX className='text-red-500 cursor-pointer w-6 h-6' onClick={() => {
                            setEdit(!edit)
                        }} />

                }

            </div>

            <div className=''>

                <form className={`flex flex-col gap-2 mt-6`}>

                    {inputItems.map((item, index) => (
                        <div className='relative'>
                            <span
                                className={`bg-white pointer-events-none px-2 z-10  absolute transform -translate-y-1/2 left-3  transition-all duration-75 ease-in ${focusedField === "password"
                                        ? "top-0 scale-90 text-sm"
                                        : "text-gray-400 top-1/2  text-base"
                                    } ${focusedField === "password"
                                        ? "text-blue-500"
                                        : "text-gray-500"
                                    }`}
                                onFocus={handleFocus}
                                onBeforeInput={handleBlur}
                            >
                                {item}
                            </span>
                            <input type="text" disabled={edit} className=' border-gray-400 border-[1px] rounded-sm px-5 py-2 focus:outline-none w-full' />
                        </div>
                    ))}

                    <button type='submit' className='bg-blue-500 rounded-sm py-2 px-5 text-white'>Update Business</button>


                </form>

            </div>
        </div>
    )
}

export default BusinessEdit