import { useState } from "react";

const Leads = ({ businesses }) => {
  const callLeadFilter = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Today",
      value: "today",
    },
    {
      label: "Yesterday",
      value: "yesterday",
    },
    {
      label: "Last 7 days",
      value: "last 7 days",
    },
    {
      label: "Last 30 days",
      value: "last 30 days",
    },
    {
      label: "This Year",
      value: "this year",
    },
  ];

  const enquiryFilter = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Today",
      value: "today",
    },
    {
      label: "Yesterday",
      value: "yesterday",
    },
    {
      label: "Last 7 days",
      value: "last 7 days",
    },
    {
      label: "Last 30 days",
      value: "last 30 days",
    },
    {
      label: "This Year",
      value: "this year",
    },
  ];

  const [allCallLeads, setAllCallLeads] = useState(
    businesses.flatMap((business) =>
      business.callLeads.map((callLead) => ({
        ...callLead,
        business: business.name,
      })),
    ),
  );

  const [allEnquiries, setAllEnquiries] = useState(
    businesses.flatMap((business) =>
      business.enquiries.map((enquiry) => ({
        ...enquiry,
        business: business.name,
      })),
    ),
  );

  const handleFilterCallLeads = (filter) => {
    setAllCallLeads(
      businesses.flatMap((business) =>
        business.callLeads
          .filter((lead) => {
            if (filter.value === "all") {
              return true;
            }
            if (filter.value === "today") {
              return (
                new Date(lead.createdAt).toDateString() ===
                new Date().toDateString()
              );
            }
            if (filter.value === "yesterday") {
              return (
                new Date(lead.createdAt).toDateString() ===
                new Date(
                  new Date().setDate(new Date().getDate() - 1),
                ).toDateString()
              );
            }
            if (filter.value === "last 7 days") {
              return (
                new Date(lead.createdAt).getDate() >= new Date().getDate() - 7
              );
            }
            if (filter.value === "last 30 days") {
              return (
                new Date(lead.createdAt).getMonth() === new Date().getMonth()
              );
            }
            if (filter.value === "this year") {
              return (
                new Date(lead.createdAt).getFullYear() ===
                new Date().getFullYear()
              );
            }
          })
          .map((lead) => ({ ...lead, business: business.name })),
      ),
    );
  };

  const handleFilterEnquiries = (filter) => {
    setAllEnquiries(
      businesses.flatMap((business) =>
        business.enquiries
          .filter((enquiry) => {
            if (filter.value === "all") {
              return true;
            }
            if (filter.value === "today") {
              return (
                new Date(enquiry.createdAt).toDateString() ===
                new Date().toDateString()
              );
            }
            if (filter.value === "yesterday") {
              return (
                new Date(enquiry.createdAt).toDateString() ===
                new Date(
                  new Date().setDate(new Date().getDate() - 1),
                ).toDateString()
              );
            }
            if (filter.value === "last 7 days") {
              return (
                new Date(enquiry.createdAt).getDate() >=
                new Date().getDate() - 7
              );
            }
            if (filter.value === "last 30 days") {
              return (
                new Date(enquiry.createdAt).getMonth() === new Date().getMonth()
              );
            }
            if (filter.value === "this year") {
              return (
                new Date(enquiry.createdAt).getFullYear() ===
                new Date().getFullYear()
              );
            }
          })
          .map((enquiry) => ({ ...enquiry, business: business.name })),
      ),
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="mt-6">
        <h2 className="text-lg md:text-2xl font-semibold">
          Call Leads Generated
        </h2>

        <div className="mt-6 flex flex-col gap-5">
          <div className="">
            <div className="flex gap-5">
              {callLeadFilter.map((filter, index) => (
                <div className="flex items-center gap-3" key={index}>
                  <input
                    type="radio"
                    name="call lead filter"
                    id={`${filter.value}`}
                    onChange={() => handleFilterCallLeads(filter)}
                    value={filter.value}
                  />
                  <label htmlFor={filter.value}>{filter.label}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <table className=" table-auto items-start w-full">
              <tr className="border bg-white">
                <th className="px-6 py-3 text-left font-medium text-gray-500">
                  Date
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">
                  Phone
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">
                  Business
                </th>
              </tr>
              <tbody className="bg-white divide-y divide-gray-200 text-xs md:text-sm">
                {[...allCallLeads].reverse().map((lead, index) => (
                  <tr className="border" key={index}>
                    <td className="px-6 py-3 text-left ">
                      {new Date(lead.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-3 text-left ">{lead.name}</td>
                    <td className="px-6 py-3 text-left ">{lead.phone}</td>
                    <td className="px-6 py-3 text-left ">{lead.business}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <hr className="w-full bg-black" />

      <div className="mt-6">
        <h2 className="text-lg md:text-2xl font-semibold">Enquiries you got</h2>

        <div className="mt-6 flex flex-col gap-5">
          <div>
            <div className="flex gap-5">
              {enquiryFilter.map((filter, index) => (
                <div className="flex items-center gap-3" key={index}>
                  <input
                    type="radio"
                    name="enquiry filter"
                    id={`${filter.value}`}
                    onChange={() => handleFilterEnquiries(filter)}
                    value={filter.value}
                  />
                  <label htmlFor={filter.value}>{filter.label}</label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <table className="table-auto items-start w-full mt-6">
              <tr className="border bg-white">
                <th className="px-6 py-3 text-left font-medium text-gray-500">
                  Date
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">
                  Phone
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">
                  Business
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">
                  Message
                </th>
              </tr>
              <tbody className="bg-white divide-y divide-gray-200 text-xs md:text-sm">
                {
                  // businesses.map((business) => {

                  //   return(
                  //   [...business.enquiries].reverse().map((enquiry) => (
                  //     <tr className='border '>
                  //       <td className='px-6 py-3 text-left '>{new Date(enquiry.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                  //       <td className='px-6 py-3 text-left '>{enquiry.name}</td>
                  //       <td className='px-6 py-3 text-left '>{enquiry.phone}</td>
                  //       <td className='px-6 py-3 text-left '>{business.name}</td>
                  //       <td className='px-6 py-3 text-left w-20 h-3 overflow-y-auto'>{enquiry.message}</td>
                  //     </tr>
                  //   ))
                  // )

                  //   })

                  [...allEnquiries].reverse().map((enquiry, index) => (
                    <tr className="border" key={index}>
                      <td className="px-6 py-3 text-left ">
                        {new Date(enquiry.createdAt).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" },
                        )}
                      </td>
                      <td className="px-6 py-3 text-left ">{enquiry.name}</td>
                      <td className="px-6 py-3 text-left ">{enquiry.phone}</td>
                      <td className="px-6 py-3 text-left ">
                        {enquiry.business}
                      </td>
                      <td className="px-6 py-3 text-left w-20 h-3 overflow-y-auto">
                        {enquiry.message}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads;
