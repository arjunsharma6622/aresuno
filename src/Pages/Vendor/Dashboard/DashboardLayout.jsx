import Sidebar from "./components/Sidebar";

const DashboardLayout = ({ user, children }) => {
  return (
    <div className="flex flex-col md:flex-row md:h-screen">
      <Sidebar user={user} />
      <div className="md:flex-[10] md:bg-gray-100 md:p-10 overflow-y-scroll h-screen w-[90%] m-auto">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
