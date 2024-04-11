const SelectCategory = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    { name: "Service", icon: "service.png" },
    { name: "Doctor", icon: "doctor.png" },
    { name: "Manufacturer", icon: "product.png" },
  ];
  return (
    <div className="">
      <h1 className="text-center mb-4">
        What Category your business fall under?
      </h1>

      <div className="flex items-center justify-between max-w-3xl gap-6 mx-auto">
        {categories.map((category, index) => (
          <div
            key={category + index}
            className={`${selectedCategory.name === category.name ? "bg-blue-500 text-white" : "bg-gray-100 "} p-4 cursor-pointer flex flex- gap-3 items-center justify-start rounded-lg w-full`}
            onClick={() => setSelectedCategory(category)}
          >
            <img
              src={`/assets/images/${category.icon}`}
              alt={category.name}
              className="w-14 h-14"
            />
            <p className="text-lg">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;
