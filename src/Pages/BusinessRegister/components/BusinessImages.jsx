import axios from "axios";
import React, { useState } from "react";
import { FiImage, FiUploadCloud, FiX } from "react-icons/fi";
import { MdOutlineCloudDone } from "react-icons/md";
import { toast } from "react-toastify";
import EasyCrop from "../../Vendor/Dashboard/components/EasyCrop";

const BusinessImages = ({ businessDetails, setBusinessDetails }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [...prevImages, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImagesUpload = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const imageData = new FormData();
      const uploadPromises = images.map(async (image, index) => {
        imageData.append(`file`, image);
        imageData.append(
          "folder",
          `aresuno/businessImages/${businessDetails.name}/gallery`
        );
        imageData.append("upload_preset", "ml_default");

        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dexnb3wkw/image/upload",
          imageData
        );

        console.log(uploadResponse.data.secure_url);
        setBusinessDetails((prev) => ({
          ...prev,
          photosGallery: [
            ...prev.photosGallery,
            uploadResponse.data.secure_url,
          ],
        }));
      });

      await Promise.all(uploadPromises);
      setIsUploaded(true);
      toast.success("Images uploaded successfully");
    } catch (err) {
      console.error("Error uploading images to Cloudinary:", err);
      toast.error("Error uploading images to Cloudinary");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:mt-6 md:mb-6">
      <div className="flex items-center gap-2">
        <FiImage className="w-5 h-5 md:w-6 md:h-6" />
        <h2 className="text-lg md:text-xl font-semibold">Gallery Images</h2>
      </div>



      <div className="mt-6">
        <div className="flex flex-col items-start">
          {images.length > 0 && <span>{images.length} Images Added</span>}

          <label
            htmlFor="image"
            className="cursor-pointer mt-2 py-2 px-4 bg-blue-500 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              multiple
              className=" py-2 px-4 bg-gray-200 text-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ display: "none" }}
            />
            {images.length > 0 ? "Add Another" : "Add Image"}
          </label>

          <div className="mb-4 grid grid-cols-3 w-full gap-4 mt-6">
            {images.map((image, index) => (
              <div className="relative rounded-xl w-full" key={index}>
                <img
                  key={index}
                  src={image}
                  alt={`Selected Image ${index}`}
                  className="object-cover h-full rounded-xl"
                />
                                {/* <EasyCrop image={image} setImages={setImages} aspectRatio={16/10} widthOfImg={"w-full"}/> */}

                <FiX
                  className="absolute -top-2 -right-2 w-6 h-6 text-white cursor-pointer bg-red-500 rounded-full p-1"
                  onClick={() => {
                    setImages((prev) => prev.filter((_, i) => i !== index));
                  }}
                />

              </div>
            ))}
          </div>

          {images.length > 0 && (
            <button
              className={`mt-2 py-3 px-4 bg-blue-500 gap-4 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center ${isLoading || isUploaded ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handleImagesUpload}
              disabled={isLoading || isUploaded}
            >
              {isLoading ? (
                <div
                  className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : isUploaded ? (
                <MdOutlineCloudDone className="w-6 h-6" />
              ) : (
                <FiUploadCloud className="w-6 h-6" />
              )}
              {isLoading ? "Uploading..." : isUploaded ? "Uploaded" : "Upload Images"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessImages;
