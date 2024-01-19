import React, { useState } from "react";
import { FiEdit2, FiImage, FiUploadCloud, FiX } from "react-icons/fi";
import { MdOutlineCloudDone } from "react-icons/md";

const BusinessImages = ({ businessDetails, setBusinessDetails }) => {
  //   handle image gallery
  const [images, setImages] = useState([]);
  const [imagesToShow, setImagesToShow] = useState([]);

  const [coverImage, setCoverImage] = useState(null); // [image, setImage
  const [logoImage, setLogoImage] = useState(null);

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setCoverImage(reader.result);
    };
  };

  const handleLogoImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setLogoImage(reader.result);
    };
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      setImages((prevImages) => [...prevImages, file]);
      reader.onloadend = () => {
        setImagesToShow((prevImages) => [...prevImages, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImagesUpload = async (e) => {
    e.preventDefault();

    try {
      const imageData = new FormData();

      images.forEach(async (image, index) => {
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

        // console.log("This is the business details", businessDetails)
      });

      // console.log(uploadResponse.data);
      // const imageUrls = uploadResponse.data.resources.map((resource) => resource.secure_url);
      // return imageUrls;
    } catch (err) {
      console.error("Error uploading images to Cloudinary:", err);
      setIsLoading(false);
    }
  };

  const [businessImagesUpdate, setBusinessImagesUpdate] = useState(true);
  return (
    <div className="mt-6 mb-6 ">
      <div className="flex justify-start gap-8 items-center">
        <div className="flex items-center gap-2">
          <FiImage className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Gallery Images</h2>
        </div>

        {businessImagesUpdate ? (
          <FiEdit2
            className="cursor-pointer w-5 h-5"
            onClick={() => setBusinessImagesUpdate(false)}
          />
        ) : (
          <FiX
            className="cursor-pointer w-5 h-5 text-red-500"
            onClick={() => setBusinessImagesUpdate(true)}
          />
        )}
      </div>

      <div className="mt-6 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Add your business Logo</h1>

          <div className="flex relative w-fit">
            {!businessImagesUpdate && (
              <div className="w-fit">
                <div>
                <label htmlFor="logo" className="cursor-pointer w-24 h-24">
                    <div className="bg-blue-500 absolute p-2 rounded-full -right-3 -bottom-3">
                    <FiEdit2 className="w-5 h-5 text-white" />
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
              </div>
            )}
            <div>
              <img
                src={logoImage ? logoImage : businessDetails.images?.logo}
                alt=""
                className="w-20 h-20 object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">
            Add your business Cover image
          </h1>

          <div className="w-[300px] relative">
            {!businessImagesUpdate && (
              <div className="w-fit">
                <label
                  htmlFor="coverImage"
                  className="cursor-pointer w-24 h-24"
                >
                    <div className="bg-blue-500 absolute p-2 rounded-full -right-3 -bottom-3">
                    <FiEdit2 className="w-5 h-5 text-white" />
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
            )}
            <div>
              {coverImage ? (
                <img
                  src={coverImage}
                  alt=""
                  className=" aspect-[2/1] object-cover rounded-xl"
                />
              ) : (
                <img
                  src={businessDetails.images?.cover}
                  alt=""
                  className="aspect-[2/1] object-cover rounded-xl"
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-start">
          <h1 className="text-lg font-semibold">Add your business gallery</h1>

          {images.length > 0 && <span>{images.length + businessDetails.images?.gallery?.length} Images Added</span>}

          <div className="mb-4 grid grid-cols-4 w-full gap-4">
            {businessDetails.images?.gallery?.map((image, index) => (
              <div className="relative rounded-xl w-full" key={index}>
                <img
                  key={index}
                  src={image}
                  alt={`Selected Image ${index}`}
                  className="object-cover h-full rounded-xl aspect-[16/10]"
                />

                {!businessImagesUpdate && (
                  <FiX
                    className="absolute -top-2 -right-2 w-6 h-6 text-white cursor-pointer bg-red-500 rounded-full p-1"
                    onClick={() => {
                      setBusinessDetails((prev) => ({
                        ...prev,
                        images: {
                          ...prev.images,
                          gallery: prev.images.gallery.filter(
                            (_, i) => i !== index
                          ),
                        },
                      }));
                    }}


                  />
                )}
              </div>
            ))}


            {images &&
              imagesToShow?.map((image, index) => (
                <div className="relative rounded-xl w-full" key={index}>
                  <img
                    key={index}
                    src={image}
                    alt={`Selected Image ${index}`}
                    className="object-cover h-full rounded-xl aspect-[16/10]"
                  />
                  { !businessImagesUpdate &&
                  <FiX
                    className="absolute -top-2 -right-2 w-6 h-6 text-white cursor-pointer bg-red-500 rounded-full p-1"
                    onClick={() => {
                      setImages((prev) => prev.filter((_, i) => i !== index));
                      setImagesToShow((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                    }}
                  />
                  }
                </div>
              ))}
          </div>

          {!businessImagesUpdate && (
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
          )}

          {images.length > 0 &&
              <button
                className="mt-2 py-2 px-4 bg-blue-500 flex gap-4 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleImagesUpload}
              >
                <FiUploadCloud className="w-6 h-6" />
                Upload All Images
              </button>
            }
        </div>
      </div>
    </div>
  );
};

export default BusinessImages;
