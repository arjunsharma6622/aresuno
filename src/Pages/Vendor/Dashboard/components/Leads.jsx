import React, { useState } from 'react'
import { FiClock } from 'react-icons/fi'

const Leads = ({businesses}) => {

  const callLeadFilter = [
    {
      label: "Today",
      value: "today"
    },
    {
      label: "Yesterday",
      value: "yesterday"
    },
    {
      label: "This Week",
      value: "this week"
    },
    {
      label: "This Month",
      value: "this month"
    },
    {
      label: "This Year",
      value: "this year"
    }
  ]


  const [allCallLeads, setAllCallLeads] = useState(businesses.flatMap((business) => business.callLeads));
  console.log(allCallLeads)

  


  return (
    <div className='flex flex-col gap-4'>
    <div className="mt-6">
    <h2 className="text-lg md:text-2xl font-semibold">Call Leads Generated</h2>

<div className='mt-6 flex flex-col gap-5'>
   <div className=''>
    <div className='flex flex-col gap-2'>
      { callLeadFilter.map((filter) => (
      <div className='flex items-center gap-3'>
      <input type="radio" name="call lead filter" id={`${filter.value}`}/>
      <label htmlFor={filter.value}>{filter.label}</label>
      </div>
      ))
}
    </div>
   </div>
    <div>
    <table className=' table-auto items-start w-full'>
      <tr className='border bg-white'>
        <th className='px-6 py-3 text-left font-medium text-gray-500'>Date</th>
        <th className='px-6 py-3 text-left font-medium text-gray-500'>Name</th>
        <th className='px-6 py-3 text-left font-medium text-gray-500'>Phone</th>
        <th className='px-6 py-3 text-left font-medium text-gray-500'>Business</th>
      </tr>
      <tbody className='bg-white divide-y divide-gray-200 text-xs md:text-sm'>
        
      
      {
        // businesses.map((business) => (
        //   [...business.callLeads].reverse().map((lead) => (
        //     <tr className='border '>
        //       <td className='px-6 py-3 text-left '>{new Date(lead.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</td>
        //       <td className='px-6 py-3 text-left '>{lead.name}</td>
        //       <td className='px-6 py-3 text-left '>{lead.phone}</td>
        //       <td className='px-6 py-3 text-left '>{business.name}</td>
        //     </tr>
        //   ))
        // ))

        allCallLeads.map((lead) => (
          <tr className='border '>
            <td className='px-6 py-3 text-left '>{new Date(lead.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</td>
            <td className='px-6 py-3 text-left '>{lead.name}</td>
            <td className='px-6 py-3 text-left '>{lead.phone}</td>
            <td className='px-6 py-3 text-left '>{lead.business}</td>
          </tr>
        ))
      }

</tbody>
    </table>
    </div>
    </div>

    </div>


<div className="mt-6">
<h2 className="text-lg md:text-2xl font-semibold">Enquiries you got</h2>
<table className='table-auto items-start w-full mt-6'>
  <tr className='border bg-white'>
    <th className='px-6 py-3 text-left font-medium text-gray-500'>Date</th>
    <th className='px-6 py-3 text-left font-medium text-gray-500'>Name</th>
    <th className='px-6 py-3 text-left font-medium text-gray-500'>Phone</th>
    <th className='px-6 py-3 text-left font-medium text-gray-500'>Business</th>
    <th className='px-6 py-3 text-left font-medium text-gray-500'>Message</th>
  </tr>
  <tbody className='bg-white divide-y divide-gray-200 text-xs md:text-sm'>
    
  
  {
    businesses.map((business) => { 
      
      
      
      return(
      [...business.enquiries].reverse().map((enquiry) => (
        <tr className='border '>
          <td className='px-6 py-3 text-left '>{new Date(enquiry.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</td>
          <td className='px-6 py-3 text-left '>{enquiry.name}</td>
          <td className='px-6 py-3 text-left '>{enquiry.phone}</td>
          <td className='px-6 py-3 text-left '>{business.name}</td>
          <td className='px-6 py-3 text-left w-20 h-3 overflow-y-auto'>{enquiry.message}</td>
        </tr>
      ))
    )
    
      })



  }

</tbody>
</table>

</div>

</div>
    )
}

export default Leads

