import React from "react";
import Sidebar from "./components/Sidebar";

const DashboardLayout = ({
  user,
  children,
}) => {
  return (
    <div className="flex h-screen">
      <Sidebar
        user={user}
      />
      <div className="flex-[10] bg-gray-100 p-10 overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
