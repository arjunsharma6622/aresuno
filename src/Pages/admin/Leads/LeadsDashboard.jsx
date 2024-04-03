import Enquiries from "./Enquiries";
import CallLeads from "./CallLeads";

const LeadsDashboard = ({ enquiries, callLeads, subField }) => {
  return (
    <div>
      {subField == "Call Leads" && <CallLeads callLeads={callLeads} />}
      {subField == "Enquiry Leads" && <Enquiries enquiries={enquiries} />}
    </div>
  );
};

export default LeadsDashboard;
