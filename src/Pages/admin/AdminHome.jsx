import { useSelector } from "react-redux";

const AdminHome = () => {
  const categoriesFromState = useSelector((state) => state.categories);
  return (
    <div>
      <div>
        <h1 className="text-2xl font-medium mb-5">
          WELCOME TO THE ADMIN PANEL
        </h1>
      </div>
    </div>
  );
};

export default AdminHome;
