import axios from "axios";
import { useState } from "react";
import { FiImage, FiUploadCloud, FiXCircle } from "react-icons/fi";
import { MdOutlineCloudDone } from "react-icons/md";
import { toast } from "react-toastify";

const BusinessImages = ({ businessDetails, setBusinessDetails }) => {
  const [images, setImages] = useState([]);
  const [coverImage, setCoverImage] = useState(null); // [image, setImage
  const [logoImage, setLogoImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleImageChange = (e) => {
    setIsUploaded(false); // Reset isUploaded state to false

    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [...prevImages, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleLogoImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImagesUpload = async () => {
    setIsLoading(true);

    try {
      const uploadPromises = images.map(async (image) => {
        const imageData = new FormData();
        imageData.append("file", image);
        imageData.append(
          "folder",
          `aresuno/businessImages/${businessDetails.name}/gallery`,
        );
        imageData.append("upload_preset", "ml_default");

        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dexnb3wkw/image/upload",
          imageData,
        );

        return uploadResponse.data.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      const uploadedLogoImage = async () => {
        if (logoImage) {
          const logoImageData = new FormData();
          logoImageData.append("file", logoImage);
          logoImageData.append(
            "folder",
            `aresuno/businessImages/${businessDetails.name}/logo`,
          );
          logoImageData.append("upload_preset", "ml_default");

          const logoUploadResponse = await axios.post(
            "https://api.cloudinary.com/v1_1/dexnb3wkw/image/upload",
            logoImageData,
          );

          return logoUploadResponse.data.secure_url;
        }
      };

      const uploadedCoverImage = async () => {
        if (coverImage) {
          const coverImageData = new FormData();
          coverImageData.append("file", coverImage);
          coverImageData.append(
            "folder",
            `aresuno/businessImages/${businessDetails.name}/cover`,
          );
          coverImageData.append("upload_preset", "ml_default");

          const coverUploadResponse = await axios.post(
            "https://api.cloudinary.com/v1_1/dexnb3wkw/image/upload",
            coverImageData,
          );

          return coverUploadResponse.data.secure_url;
        }
      };

      const [logoImageUrl, coverImageUrl] = await Promise.all([
        uploadedLogoImage(),
        uploadedCoverImage(),
      ]);

      setBusinessDetails((prev) => ({
        ...prev,
        images: {
          ...prev.images,
          logo: logoImageUrl,
          cover: coverImageUrl,
          gallery: [...prev.images.gallery, ...uploadedUrls],
        },
      }));

      setIsUploaded(true);
      toast.success("Images uploaded successfully");
    } catch (err) {
      console.error("Error uploading images to Cloudinary:", err);
      toast.error("Error uploading images to Cloudinary");
    } finally {
      setIsLoading(false);
      setImages([]); // Clear selected images
    }
  };

  return (
    <div className="md:mt-6 md:mb-6">
      <div className="flex items-center gap-2">
        <FiImage className="w-5 h-5 md:w-6 md:h-6" />
        <h2 className="text-lg md:text-xl font-semibold">Images</h2>
      </div>

      <div className="w-full mt-4 flex flex-col gap-6">
        <div className="w-full mt-2 flex flex-col gap-4">
          <h1 className="text-lg font-semibold">Add your business Logo</h1>

          <div className="flex gap-6 flex-wrap">
            <div className="w-fit">
              <label htmlFor="logo" className="cursor-pointer w-24 h-24">
                <div className="flex justify-center items-center w-24 h-24 border-dashed border border-gray-500 rounded-md">
                  <span className="text-gray-500 text-sm">
                    {logoImage ? (
                      <MdOutlineCloudDone className="w-6 h-6" />
                    ) : (
                      <FiUploadCloud className="w-6 h-6" />
                    )}
                  </span>
                </div>
              </label>
              <input
                type="file"
                id="logo"
                accept="image/*"
                onChange={handleLogoImageChange}
                className=" hidden"
              />
            </div>
            {businessDetails.images.logo ? (
              <div className="relative rounded-md">
                <img
                  src={businessDetails.images.logo}
                  alt=""
                  className="w-24 h-24 rounded-md object-cover"
                />
              </div>
            ) : (
              logoImage && (
                <div className="relative rounded-md">
                  <img
                    src={logoImage}
                    alt=""
                    className="w-24 h-24 rounded-md object-cover"
                  />
                  <div className="absolute -top-2 -right-2 flex gap-2 items-center bg-white rounded-full">
                    <FiXCircle
                      className=" text-red-500 w-6 h-6 cursor-pointer"
                      onClick={() => setLogoImage(null)}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="w-full mt-2 flex flex-col gap-4">
          <h1 className="text-lg font-semibold">
            Add your business Cover Image
          </h1>
          <div className="flex gap-6 flex-wrap">
            <div className="w-fit">
              <label htmlFor="coverImage" className="cursor-pointer w-24 h-24">
                <div className="flex justify-center items-center w-[300px] h-[150px] border-dashed border border-gray-500 rounded-md">
                  <span className="text-gray-500">
                    {coverImage ? (
                      <MdOutlineCloudDone className="w-6 h-6" />
                    ) : (
                      <FiUploadCloud className="w-6 h-6" />
                    )}
                  </span>
                </div>
              </label>
              <input
                type="file"
                id="coverImage"
                accept="image/*"
                className=" hidden"
                onChange={handleCoverImageChange}
              />
            </div>
            {businessDetails.images.cover ? (
              <div className="relative shadow-lg rounded-lg">
                <img
                  src={businessDetails.images.cover}
                  alt=""
                  className="w-[300px] h-[150px] rounded-lg object-cover"
                />
              </div>
            ) : (
              coverImage && (
                <div className="relative shadow-lg rounded-lg">
                  <img
                    src={coverImage}
                    alt=""
                    className="w-[300px] h-[150px] rounded-lg object-cover"
                  />
                  <div className="absolute -top-2 -right-2 flex gap-2 items-center rounded-full bg-white">
                    <FiXCircle
                      className=" text-red-500 w-6 h-6 cursor-pointer"
                      onClick={() => setCoverImage(null)}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="w-full mt-2 flex flex-col gap-4">
          <h1 className="text-lg font-semibold">
            Add your business gallery images
          </h1>
          <div className="flex flex-col items-start">
            {images.length > 0 && <span>{images.length} Images Added</span>}

            <label
              htmlFor="image"
              className="cursor-pointer py-2 px-4 bg-blue-500 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            {businessDetails.images.gallery.length > 0 && images.length > 0 ? (
              <div className="mb-4 grid grid-cols-3 w-full gap-4 mt-6">
                {businessDetails.images?.gallery.map((image, index) => (
                  <div className="relative rounded-xl w-full" key={index}>
                    <img
                      key={index}
                      src={image}
                      alt={`Selected Image ${index}`}
                      className="object-cover aspect-[16/10] rounded-xl"
                    />
                  </div>
                ))}

                {images.map((image, index) => (
                  <div className="relative rounded-xl w-full" key={index}>
                    <img
                      key={index}
                      src={image}
                      alt={`Selected Image ${index}`}
                      className="object-cover aspect-[16/10] rounded-xl"
                    />
                    <div className="absolute -top-2 -right-2 flex gap-2 items-center bg-white rounded-full">
                      <FiXCircle
                        className=" text-red-500 w-6 h-6 cursor-pointer"
                        onClick={() =>
                          setImages((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : businessDetails.images.gallery.length > 0 ? (
              <div className="mb-4 grid grid-cols-3 w-full gap-4 mt-6">
                {businessDetails.images?.gallery.map((image, index) => (
                  <div className="relative rounded-xl w-full" key={index}>
                    <img
                      key={index}
                      src={image}
                      alt={`Selected Image ${index}`}
                      className="object-cover aspect-[16/10] rounded-xl"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-4 grid grid-cols-3 w-full gap-4 mt-6">
                {images.map((image, index) => (
                  <div className="relative rounded-xl w-full" key={index}>
                    <img
                      key={index}
                      src={image}
                      alt={`Selected Image ${index}`}
                      className="object-cover aspect-[16/10] rounded-xl"
                    />

                    <div className="absolute -top-2 -right-2 flex gap-2 items-center bg-white rounded-full">
                      <FiXCircle
                        className="w-6 h-6 text-red-500 cursor-pointer  rounded-full"
                        onClick={() => {
                          setImages((prev) =>
                            prev.filter((_, i) => i !== index),
                          );
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {images.length > 0 && (
              <button
                className={`mt-2 py-3 px-4 bg-blue-500 gap-4 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center ${
                  isLoading || isUploaded ? "opacity-50 cursor-not-allowed" : ""
                }`}
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
                {isLoading
                  ? "Uploading..."
                  : isUploaded
                    ? "Uploaded"
                    : "Upload Images"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessImages;
