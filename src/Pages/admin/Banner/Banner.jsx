import axios from "axios";
import { useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiUploadCloud, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { ToastParams } from "../../../utils/util";

const Banner = () => {
  const [banner, setBanner] = useState({ image: { url: "" } });
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerImageToShow, setBannerImageToShow] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const fetchBanner = async () => {
    try {
      const res = await axios.get(
        "https://aresuno-server.vercel.app/api/banner",
      );
      setBanner(res.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    setBannerImage(file);
    setBannerImageToShow(URL.createObjectURL(file));
  };

  const handleBannerUpload = async () => {
    try {
      const imageData = new FormData();
      imageData.append("file", bannerImage);
      imageData.append("upload_preset", "ml_default");
      imageData.append("folder", "aresuno/banner");

      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dexnb3wkw/image/upload",
        imageData,
      );

      const bannerImageUrl = uploadResponse.data.secure_url;
      return bannerImageUrl;
    } catch (err) {
      console.error(err);
    }
  };

  const handleBannerSubmit = async () => {
    setIsLoading(true);

    const bannerImageUrl = await handleBannerUpload();

    try {
      const bannerData = {
        image: bannerImageUrl,
      };

      if (banner.image) {
        await axios.put(
          `https://aresuno-server.vercel.app/api/banner/${banner._id}`,
          { image: bannerImageUrl },
        );
      } else {
        const res = await axios.post(
          "https://aresuno-server.vercel.app/api/banner/add",
          bannerData,
        );
        console.error(res.data);
      }

      setIsLoading(false);
      toast.success("Banner uploaded successfully", ToastParams);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      toast.error("Banner upload failed", ToastParams);
    }
  };

  return (
    <div className=" bg-white p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-6">Banner</h2>

      <div>
        {!bannerImage && !banner.image && (
          <label
            htmlFor="bannerImage"
            className="flex flex-col gap-3 cursor-pointer text-white bg-blue-500 w-fit py-3 px-4 rounded-xl mb-6"
          >
            <div className="flex items-center gap-2">
              <FiPlus className="w-6 h-6" />
              Add banner
            </div>
            <input
              type="file"
              id="bannerImage"
              multiple={false}
              className="hidden"
              onChange={handleBannerImageChange}
            />
          </label>
        )}

        {(banner.image || bannerImage) && (
          <div className="relative">
            <img
              src={bannerImageToShow ? bannerImageToShow : banner.image}
              alt=""
              className="w-full h-auto object-cover aspect-[16/8] rounded-xl"
            />
            <div className="gradient-overlay-top rounded-xl"></div>
            <div className="flex gap-4 absolute z-[10] items-center top-3 right-3">
              <div className="cursor-pointer p-3 rounded-full bg-white">
                <label htmlFor="bannerImageEdit" className="cursor-pointer">
                  <FiEdit2 className="text-2xl" />
                  <input
                    type="file"
                    id="bannerImageEdit"
                    className="hidden"
                    onChange={handleBannerImageChange}
                  />
                </label>
              </div>

              {bannerImage && (
                <div
                  className="cursor-pointer p-3 rounded-full bg-white text-red-500"
                  onClick={() => {
                    setBannerImage(null);
                    setBannerImageToShow(null);
                  }}
                >
                  <FiX className="text-2xl" />
                </div>
              )}
            </div>
          </div>
        )}

        {bannerImage && (
          <button
            className="mt-2 py-2 px-4 bg-blue-500 flex items-center gap-4 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleBannerSubmit}
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
            ) : (
              <FiUploadCloud className="w-6 h-6" />
            )}

            {isLoading ? "Uploading..." : "Upload Banner"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Banner;
