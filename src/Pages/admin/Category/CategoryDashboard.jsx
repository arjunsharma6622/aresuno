import AllCategories from "./AllCategories";
import AddCategories from "./AddCategories";

const CategoryDashboard = ({ subField }) => {
  return (
    <div>
      {subField == "All Categories" && <AllCategories />}
      {subField == "Add Categories" && <AddCategories />}
    </div>
  );
};

export default CategoryDashboard;
