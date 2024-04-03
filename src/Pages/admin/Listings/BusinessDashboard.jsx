import BusinessRegister from "../../BusinessRegister/BusinessRegister";
import AllBusinesses from "./AllBusinesses";
import AdminListings from "./AdminListings";

const BusinessDashboard = ({
  businesses,
  categories,
  subField,
  adminBusinesses,
}) => {
  return (
    <div>
      {subField == "Add Listing" && <BusinessRegister />}
      {subField == "Admin Businesses" && (
        <AdminListings businesses={adminBusinesses} />
      )}
      {subField == "All Businesses" && (
        <AllBusinesses businesses={businesses} categories={categories} />
      )}
    </div>
  );
};

export default BusinessDashboard;
