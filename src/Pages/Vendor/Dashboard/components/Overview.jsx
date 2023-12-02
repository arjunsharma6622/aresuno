import React, { useState, useCallback } from "react";
import { BiImageAdd, BiRupee, BiSolidBusiness } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { MdReviews } from "react-icons/md";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { graphData } from "../../../../data";
import { LuImagePlus } from "react-icons/lu";
import { FiChevronDown, FiExternalLink, FiLink, FiLink2, FiX, FiXCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import SeeMore from "./SeeMore";
import axios from "axios";
import { toast } from "react-toastify";
import Cropper from 'react-easy-crop'
import { getCroppedImg } from "./getCroppedImage";
// import getcropppe from 'react-easy-crop/utils'


const Overview = ({ businesses, posts }) => {


  const [image, setImage] = useState(null);
  const [imageToShow, setImageToShow] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [post, setPost] = useState({
    image: "",
    description: "",
    businessId: "",
  });

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  // const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    
  //   console.log(croppedArea, croppedAreaPixels)
  // }, [])


  const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
    try {
      const croppedImageBlob = await getCroppedImg(imageToShow, croppedAreaPixels);
      console.log(croppedImageBlob);
  
      // Use the cropped image blob as needed (e.g., upload to server)
    } catch (error) {
      console.error('Error getting cropped image:', error);
    }
  }, [image]);






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

      console.log(uploadResponse.data);
      const imageUrl = uploadResponse.data.secure_url;
      return imageUrl
    } catch (err) {
      console.error("Error uploading image to Cloudinary:", err);
      setIsLoading(false);
    }
  };

  console.log("The image url is" + imageUrl)




  const handlePost = async () => {
    try {
      const imageUrl = await handleImage();
      console.log("The image url is" + imageUrl)


      const createPostResponse = await axios.post(
        "https://aresuno-server.vercel.app/api/post/create",
        {
          image: imageUrl,
          description: post.description,
          businessId: post.businessId,
        }
      );

      console.log(createPostResponse.data);
      toast.success("Post Created");
      setIsLoading(false);
      setPost({
        image: "",
        description: "",
        businessId: "",
      })
      setImageUrl("");
      setImage(null);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  };





  const RecentPosts = ({ post, businessName }) => (
    <div className="flex justify-center gap-4">
      <div className="">
        <img src={post.image} alt="" className="w-32 h-32 aspect-auto object-cover rounded-lg" />
      </div>
      <div className="flex-[8] flex flex-col justify-start gap-2">
        <div className="flex gap-2 items-center">
          <span className="text-base font-semibold">{businessName}</span>
          <span className="text-xs">{
            new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          }</span>
        </div>

        <SeeMore
          text={post.description}
          maxWords={30}
        />

      </div>

    </div>
  )


  return (
    <div className="flex flex-col gap-16 my-4">





      <div className="">
        <h2 className="text-2xl font-semibold mb-6">Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

          <div className="bg-white flex justify-center gap-5 py-6 items-center rounded-lg">
            <div>
              <BiSolidBusiness className="w-12 h-12 text-gray-400" />
            </div>

            <div className="flex flex-col justify-center">
              <span>Businesses</span>
              <span>{businesses.length}</span>
            </div>
          </div>

          <div className="bg-white flex justify-center gap-5 py-6 items-center rounded-lg">
            <div>
              <MdReviews className="w-12 h-12 text-gray-400" />
            </div>

            <div className="flex flex-col justify-center">
              <span>Reviews</span>
              <span>{businesses.length}</span>
            </div>
          </div>

          <div className="bg-white flex justify-center gap-5 py-6 items-center rounded-lg">
            <div>
              <BiRupee className="w-12 h-12 text-gray-400" />
            </div>

            <div className="flex flex-col justify-center">
              <span>Credits Left</span>
              <span>{359}</span>
            </div>
          </div>

          <div className="bg-white flex justify-center gap-5 py-6 items-center rounded-lg">
            <div>
              <BsPeopleFill className="w-12 h-12 text-gray-400" />
            </div>

            <div className="flex flex-col justify-center">
              <span>Leads</span>
              <span>{businesses.length}</span>
            </div>
          </div>

        </div>
      </div>

      <div className="">
        <h2 className="text-2xl font-semibold mb-6">Posts</h2>



        <div className="flex justify-between gap-6">

          <div className="flex-[6] w-full  rounded">

            <h2 className="mb-4 text-base font-semibold">Add new post</h2>

            <div className="flex flex-col gap-4 mb-4 bg-white p-4 py-6 rounded-lg">

              {image && (

                <div>

                  <div className="relative">
                    {/* <img src={imageToShow} alt="Selected Image" className=" rounded" /> */}

                    <FiXCircle className="w-6 h-6 z-20 absolute top-2 right-2 cursor-pointer bg-red-200 rounded-full text-red-500 " onClick={() => setImage(null)} />
                  

                  <div className="flex justify-center w-full h-64">
                    <Cropper
                      image={imageToShow}
                      crop={crop}
                      zoom={zoom}
                      aspect={1 / 1}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  </div>

                  </div>

                </div>
              )}








              <textarea
                value={post.description}
                onChange={(e) => setPost({ ...post, description: e.target.value })}
                placeholder="Enter post description"
                className="w-full p-2 rounded border focus:outline-none resize-none"
                rows="4"

              ></textarea>


              <div className="flex gap-6 justify-between items-center">

                <div className="relative flex-[2]">

                  <select name="" id="" className=" w-full appearance-none cursor-pointer px-3  py-2 border rounded bg-white" onChange={(e) => setPost({ ...post, businessId: e.target.value })}>
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


          <div className="flex-[6] w-full rounded">

            <h2 className="mb-4 text-base font-semibold">Recent Posts</h2>

            <div className="relative">
              <div className=" flex flex-col gap-4 overflow-y-auto h-[400px]">

                {posts.map((post) => {
                  const businessName = businesses.find(business => business._id === post.businessId).name;
                  return (
                    <RecentPosts post={post} businessName={businessName} />

                  )
                })}

                <div className="flex items-center gap-2 mb-6 cursor-pointer text-blue-500">
                  <span>View all</span>
                  <FiExternalLink />
                </div>

              </div>
              <div className="gradient-overlay-bottom"></div>

            </div>

          </div>


        </div>



      </div>


      <div className="">
        <h2 className="text-2xl font-semibold mb-6">Leads History</h2>
        <ResponsiveContainer width="100%" aspect={4 / 1}>
          <LineChart data={graphData} className="text-sm font-light">
            <Line type="monotone" dataKey="Leads" stroke="#007bff" />
            <CartesianGrid stroke="#ddd" strokeDasharray="5 5" />
            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Overview;
