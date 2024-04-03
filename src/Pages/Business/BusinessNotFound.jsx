const BusinessNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h2 className="text-2xl font-bold mb-4">Business Not Found</h2>
      <p className="text-gray-500">
        The requested business could not be found. Please check the details and
        try again.
      </p>
    </div>
  );
};

export default BusinessNotFound;
