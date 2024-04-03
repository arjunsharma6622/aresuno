const Enquiries = ({ enquiries }) => {
  const tableHeaders = [
    "Date",
    "Name",
    "Phone",
    // "Message",
    "Category",
    "Business",
    // "Status"
  ];
  return (
    <div>
      <table className="table text-sm table-auto w-full">
        <thead className="bg-gray-300">
          <tr>
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {[...enquiries].reverse().map((enquiry, index) => (
            <tr key={index}>
              <td className="px-6 py-3 text-left ">
                {new Date(enquiry.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">{enquiry.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{enquiry.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {enquiry.category ? enquiry.category.name : "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {enquiry.business ? enquiry.business.name : "N/A"}
              </td>
              {/* <td className='px-6 py-4 whitespace-nowrap'>{enquiry.status}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Enquiries;
