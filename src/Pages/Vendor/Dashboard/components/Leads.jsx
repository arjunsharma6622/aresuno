import React from 'react'

const Leads = ({businesses}) => {
  return (
    <div className="mt-6">
    <h2 className="text-lg md:text-2xl font-semibold">Call Leads Generated</h2>
    <table className='table-auto items-start w-full mt-6'>
      <tr className='border bg-white'>
        <th className='px-6 py-3 text-left font-medium text-gray-500'>Date</th>
        <th className='px-6 py-3 text-left font-medium text-gray-500'>Name</th>
        <th className='px-6 py-3 text-left font-medium text-gray-500'>Phone</th>
        <th className='px-6 py-3 text-left font-medium text-gray-500'>Business</th>
      </tr>
      <tbody className='bg-white divide-y divide-gray-200 text-xs md:text-sm'>
        
      
      {
        businesses.map((business) => (
          [...business.callLeads].reverse().map((lead) => (
            <tr className='border '>
              <td className='px-6 py-3 text-left '>{new Date(lead.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</td>
              <td className='px-6 py-3 text-left '>{lead.name}</td>
              <td className='px-6 py-3 text-left '>{lead.phone}</td>
              <td className='px-6 py-3 text-left '>{business.name}</td>
            </tr>
          ))
        ))
      }

</tbody>
    </table>

    </div>
    )
}

export default Leads