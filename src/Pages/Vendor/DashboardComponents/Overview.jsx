import React, { useState } from "react";
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
import { graphData } from "../../../data";
import { LuImagePlus } from "react-icons/lu";
import { FiChevronDown, FiExternalLink, FiLink, FiLink2, FiX, FiXCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import SeeMore from "./SeeMore";

const Overview = ({ businesses }) => {

  const [image, setImage] = useState(null);
  const [post, setPost] = useState({
    image: "",
    description: "",
    businessId: "",
  });

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(URL.createObjectURL(selectedImage));
  };

  const handlePost = () => {
    // Add logic to handle the post button click
  };

  const handleImageSubmit = () => {

  }


  const RecentPosts = () => (
    <div className="flex justify-center gap-4">
    <div className="">
      <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" className="w-32 h-32 aspect-auto object-cover rounded-lg" />
    </div>
    <div className="flex-[8] flex flex-col justify-start gap-2">
      <div className="flex gap-2 items-center">
        <span className="text-base font-semibold">Form Fix</span>
        <span className="text-xs">27, Aug 2023</span>
      </div>

      <SeeMore
        text={"This is a test post and it is really long. This post contains one image on the left side, and about post on the right side and there we have business name"}
        hiddenText={"this is the other part of the test post and i am writing this to test the see more feature of this post"}
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
                <div className="relative">
                  <img src={image} alt="Selected Image" className=" rounded" />
                  <FiXCircle className="w-6 h-6 absolute top-2 right-2 cursor-pointer bg-red-200 rounded-full text-red-500 " onClick={() => setImage(null)} />
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
                Post
              </button>
            </div>
          </div>



          <div className="flex-[6] w-full rounded">

            <h2 className="mb-4 text-base font-semibold">Recent Posts</h2>

<div className="relative">
            <div className=" flex flex-col gap-4 overflow-y-auto h-[400px]">


                      <RecentPosts />
                      <RecentPosts />
                      <RecentPosts />
                      <RecentPosts />
                      <RecentPosts />

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
