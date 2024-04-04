import { useCallback, useState } from "react";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import ModalEdit from "./ModalEdit";
import SeeMore from "./SeeMore";
import { useDropzone } from "react-dropzone";
import { FiChevronDown, FiLink2, FiXCircle } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { getCroppedImg } from "./getCroppedImage";
import { BiImageAdd } from "react-icons/bi";
import EasyCrop from "./EasyCrop";
import { API_URL, ToastParams } from "../../../../utils/util";

const Posts = ({ posts, businesses }) => {
  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImages((prevImages) => [...prevImages, reader.result]);
      };
    });
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [image, setImage] = useState(null);
  const [imageToShow, setImageToShow] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [post, setPost] = useState({
    image: "",
    description: "",
    businessId: "",
  });

  const [isCropping, setIsCropping] = useState(false);

  const handleCroppedImage = (croppedImage) => {
    setImage(croppedImage);
    setIsCropping(false); // Exit cropping mode
  };

  // const onCropComplete = useCallback(
  //   async (croppedArea, croppedAreaPixels) => {
  //     try {
  //       const croppedImageBlob = await getCroppedImg(image, croppedAreaPixels);

  //       // Use the cropped image blob as needed (e.g., upload to server)
  //     } catch (error) {
  //       console.error("Error getting cropped image:", error);
  //     }
  //   },
  //   [image]
  // );

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageToShow(URL.createObjectURL(file));
    setImage(file);
  };

  const handleImage = async () => {
    try {
      setIsLoading(true);
      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append("upload_preset", "ml_default");
      imageData.append("folder", "aresuno/posts"); // Add this line

      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dexnb3wkw/image/upload",
        imageData,
      );

      const imageUrl = uploadResponse.data.secure_url;
      return imageUrl;
    } catch (err) {
      console.error("Error uploading image to Cloudinary:", err);
      setIsLoading(false);
    }
  };

  const handlePost = async () => {
    try {
      const imageUrl = await handleImage();
      const createPostResponse = await axios.post(
        `${API_URL}/api/post/create`,
        {
          image: imageUrl,
          description: post.description,
          businessId: post.businessId,
        },
      );

      toast.success("Post Created", ToastParams);
      setIsLoading(false);
      setPost({
        image: "",
        description: "",
        businessId: "",
      });
      setImageUrl("");
      setImage(null);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", ToastParams);
      setIsLoading(false);
    }
  };

  const RecentPosts = ({ post, businessName }) => (
    <div className="flex justify-center gap-4">
      <div className="">
        <img
          src={post.image}
          alt=""
          className="w-32 h-32 aspect-auto object-cover rounded-lg"
        />
      </div>

      <div className="flex-[8] flex flex-col justify-start gap-2">
        <div className="flex gap-2 items-center">
          <span className="text-base font-semibold">{businessName}</span>
          <span className="text-xs">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <SeeMore text={post.description} maxWords={30} />
      </div>
    </div>
  );

  return (
    <div className="overflow-x-auto">
      {showEditModal && (
        <ModalEdit
          onClose={() => setShowEditModal(false)}
          post={selectedPost}
        />
      )}

      <div className="mt-6">
        <h2 className="text-lg md:text-2xl font-semibold">Business Posts</h2>

        <div className="flex flex-col md:flex-row justify-between py-4 px-4  gap-6">
          <div className="flex-[6] w-full   rounded-lg bg-white border border-gray-200 shadow-lg md:pb-8 md:p-6 md:py-5">
            <h2 className=" md:mb-4 text-xl font-medium mb-2">Add new post</h2>

            <div className="flex flex-col gap-4 mb-4  rounded-lg">
              {image && (
                <div>
                  <div className="w-full relative">
                    {/* <img src={imageToShow} alt="" /> */}
                    <EasyCrop
                      image={imageToShow}
                      setImage={handleCroppedImage}
                      aspectRatio={2 / 1}
                      widthOfImg={"w-64"}
                    />
                    <FiXCircle
                      className="w-6 h-6 z-20 absolute top-2 right-2 cursor-pointer bg-red-200 rounded-full text-red-500 "
                      onClick={() => setImage(null)}
                    />
                  </div>
                </div>
              )}

              <textarea
                value={post.description}
                onChange={(e) =>
                  setPost({ ...post, description: e.target.value })
                }
                placeholder="Enter post description"
                className="w-full p-2 rounded border focus:outline-none resize-none text-sm md:text-base"
                rows="4"
              ></textarea>

              <div className="flex gap-6 justify-between items-center">
                <div className="relative flex-[2]">
                  <select
                    name=""
                    id=""
                    className=" w-full text-sm md:text-base appearance-none cursor-pointer px-3  py-2 border rounded bg-white"
                    onChange={(e) =>
                      setPost({ ...post, businessId: e.target.value })
                    }
                  >
                    <option value="">Select Business</option>
                    {businesses.map((business) => (
                      <option key={business._id} value={business._id}>
                        {business.name}
                      </option>
                    ))}
                  </select>

                  <div>
                    <FiChevronDown className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 text-sm text-gray-500 w-6 h-6" />
                  </div>
                </div>

                <label htmlFor="postImage" className="cursor-pointer">
                  <input
                    type="file"
                    id="postImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <BiImageAdd className="w-6 h-6" />
                </label>

                <label htmlFor="postImage" className="cursor-pointer">
                  <FiLink2 className="w-6 h-6" />
                </label>
              </div>

              <button
                onClick={handlePost}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full"
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
                  "Post"
                )}
              </button>
            </div>
          </div>

          {posts.length > 0 ? (
            <div className="flex-[6] w-full  rounded hidden md:block">
              <h2 className="mb-4 text-base font-semibold">Recent Posts</h2>

              <div className="relative">
                <div className=" flex flex-col gap-4 overflow-y-auto h-[400px]">
                  {posts.map((post, index) => {
                    const businessName = businesses.find(
                      (business) => business._id === post.businessId,
                    ).name;
                    return (
                      <RecentPosts
                        key={index}
                        post={post}
                        businessName={businessName}
                      />
                    );
                  })}
                </div>
                <div className="gradient-overlay-bottom"></div>
              </div>
            </div>
          ) : (
            <div className="border h-64 border-dashed border-black flex-[6] w-full items-center hidden md:flex justify-center rounded">
              <h2 className="text-2xl font-semibold">No Posts Yet!</h2>
            </div>
          )}
        </div>
      </div>

      {posts.length > 0 && (
        <div className="mt-6">
          <h1 className="text-lg md:text-2xl font-semibold mb-6">
            You have {posts.length === 0 ? "No" : posts.length} Posts
          </h1>
          {posts.length === 0 ? (
            <div className="">
              <button>Add Post</button>
            </div>
          ) : (
            <div className="min-w-full overflow-auto">
              <table className="w-full table-auto">
                <thead className="">
                  <tr className="bg-gray-300">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                      Posted In
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                      Last update
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-xs md:text-sm">
                  {businesses.map((business, topindex) =>
                    business.posts.map((post, index) => (
                      <tr key={index}>
                        {/* <td className="px-6 py-4 whitespace-nowrap">{post._id}</td> */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {business.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {post.image ? (
                            <img
                              src={post.image}
                              alt="post"
                              className="h-10 object-cover rounded-md"
                            />
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-wrap">
                          {/* <SeeMore text={post.description} maxWords={3} /> */}
                          {post.description.split(" ").slice(0, 3).join(" ")}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(post.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(post.updatedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-4">
                            <FiEdit3
                              className="text-gray-600 w-5 h-5 cursor-pointer"
                              onClick={() => {
                                setSelectedPost({
                                  ...post,
                                  businessName: business.name,
                                });
                                setShowEditModal(true);
                              }}
                            />
                            <FiTrash2 className="text-red-500 w-5 h-5 cursor-pointer" />
                          </div>
                        </td>
                      </tr>
                    )),
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Posts;
