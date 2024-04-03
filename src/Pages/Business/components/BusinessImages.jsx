import { FiImage } from "react-icons/fi";

const Images = ({ business }) => {
  return (
    <div
      id="photos"
      className=" w-full border-b pb-4 md:pb-10 border-b-gray-300"
    >
      <div className="flex items-center gap-3 md:gap-4">
        <FiImage className="text-black w-5 h-5 md:w-6 md:h-6" />
        <h2 className="text-lg md:text-2xl font-bold text-black">Photos</h2>
      </div>

      <div className="relative">
        <div className="overflow-x-auto flex w-[calc(100%-10px)] custom-scrollbar">
          {/* <img
                      src="https://media.istockphoto.com/id/1023612090/photo/interior-of-clothing-store.jpg?s=612x612&w=0&k=20&c=84NciWwU43Zyzmxph6bCVTG9WRO9rxDGUYtYnUqpTt8="
                      alt=""
                      className="rounded-lg m-2 w-64"
                  /> */}

          {business.images?.gallery.map((image) => (
            <img
              loading="lazy"
              key={image}
              src={image}
              alt=""
              className="rounded-lg m-2 w-64 h-44 object-cover"
            />
          ))}
        </div>
        <div className=" md:gradient-overlay-right" />
      </div>

      {/* <div className="flex items-center justify-start gap-4 mt-4">
        <button
          className="flex items-center gap-2 p-2 px-4 bg-[#E9F5FE] rounded-full"
          style={{ border: "2px solid #C9E0F2" }}
        >
          <FiUploadCloud className="text-gray-700 w-6 h-6" />
          <p className="text-blue-500 text-md font-medium">Upload Photos</p>
        </button>
      </div> */}
    </div>
  );
};

export default Images;
