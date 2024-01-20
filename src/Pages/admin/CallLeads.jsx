import React, { useEffect, useState } from 'react'
import { API_URL } from '../../utils/util'
import axios from 'axios'

const CallLeads = ({callLeads}) => {


    const tableHeaders = [
        "Date",
        "Name",
        "Phone",
        "Business",
    ]
  return (
    <div>

        <table className='table table-auto w-full'>
            <thead className='bg-gray-300'>
            <tr>
                {
                    tableHeaders.map((header, index) => (
                        <th key={index} className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>{header}</th>
                    ))
                }

            </tr>
            </thead>

            <tbody className='bg-white divide-y divide-gray-200'>
            {
                [...callLeads].reverse().map((callLead, index) => (
                    <tr key={index}>
                                      <td className='px-6 py-3 text-left '>{new Date( callLead.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}</td>

                        <td className='px-6 py-4 whitespace-nowrap'>{callLead.name}</td>
                        <td className='px-6 py-4 whitespace-nowrap'>{callLead.phone}</td>
                        <td className='px-6 py-4 whitespace-nowrap'>{callLead.business.name}</td>
                    </tr>
                ))
            }
            </tbody>
            
        </table>
    </div>
  )
}

export default CallLeads