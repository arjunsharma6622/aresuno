import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const CallLeads = ({ callLeads }) => {
  const tableHeaders = ["Date", "Name", "Phone", "Verified", "Business"];
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
          {[...callLeads].reverse().map((callLead, index) => (
            <tr key={index}>
              <td className="px-6 py-3 text-left ">
                {new Date(callLead.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">{callLead.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{callLead.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {callLead.verified ? (
                  <div className="flex items-center gap-2">
                    <FiCheckCircle className="w-5 h-5 text-green-500" />
                    <span>Yes</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <FiXCircle className="w-5 h-5 text-red-500" />
                    <span>No</span>
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {callLead.business?.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CallLeads;
