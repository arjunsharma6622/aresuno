const Inquiries = ({ Enquiries }) => {
  const extract6Words = (text) => {
    const words = text.split(" ");
    return words.slice(0, 30).join(" ");
  };
  return (
    <div>
      <h1 className="text-lg md:text-2xl font-semibold mt-6 md:mt-0 mb-3 md:mb-6">
        All Inquiries
      </h1>

      <div className="bg-white rounded-xl overflow-auto">
        <table className="md:w-full ">
          <thead className="">
            <tr className="bg-blue-500">
              <th className="px-6 py-3 text-left text-xs font-medium text-white">
                S.no
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white">
                name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white">
                phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white">
                message
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-white">
                Status
              </th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-xs md:text-sm">
            {Enquiries.map((enquiry, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{enquiry.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{enquiry.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{enquiry.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2 items-center">
                    {extract6Words(enquiry.message)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inquiries;
