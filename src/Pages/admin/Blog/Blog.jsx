import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { FiChevronDown, FiLink2, FiXCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import EasyCrop from "../../Vendor/Dashboard/components/EasyCrop";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { API_URL, ToastParams } from "../../../utils/util";
import BlogCard from "./BlogCard";
import { toast } from "react-toastify";

const Blog = ({ blogs }) => {
  const [image, setImage] = useState(null);
  const [imageToShow, setImageToShow] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [post, setPost] = useState({
    image: "",
    description: "",
    category: "",
    title: "",
  });

  const [allBlogs, setAllBlogs] = useState(blogs);

  const handleImage = async () => {
    try {
      setIsLoading(true);
      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append("upload_preset", "ml_default");
      imageData.append("folder", "aresuno/blogs"); // Add this line

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
      await axios.post(`${API_URL}/api/blog/create`, {
        title: post.title,
        image: imageUrl,
        description: post.description,
        category: post.category,
      });

      toast.success("Post Created", ToastParams);
      setIsLoading(false);
      setPost({
        image: "",
        description: "",
        category: "",
      });
      setImageUrl("");
      setImage(null);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", ToastParams);
      setIsLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageToShow(URL.createObjectURL(file));
    setImage(file);
  };

  const handleCroppedImage = (croppedImage) => {
    setImage(croppedImage);
  };

  const categories = useSelector((state) => state.categories);
  return (
    <div className="w-full flex flex-col items-start gap-4">
      <div className="w-full flex items-start gap-4">
        <div className="flex-[8] mx-auto rounded-lg bg-white border border-gray-200 shadow-lg md:pb-8 md:p-6 md:py-5">
          <h2 className=" md:mb-4 text-xl font-medium mb-2">Add new post</h2>

          <div className="flex flex-col gap-4 mb-4  rounded-lg">
            {image && (
              <div>
                <div className="w-fit relative">
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
            <div className="flex flex-col gap-3">
              <p>Blog Title</p>
              <div>
                <input
                  type="text"
                  placeholder="Blog Title"
                  className="w-full p-2 rounded border focus:outline-none "
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p>Blog Description</p>

              <ReactQuill
                theme="snow"
                value={post.description}
                onChange={(value) => setPost({ ...post, description: value })}
                modules={modules}
              />
            </div>

            <div className="flex flex-col gap-3">
              <p>Blog Category</p>
              <div className="flex gap-6 justify-between items-center">
                <div className="relative flex-[2]">
                  <select
                    name=""
                    id=""
                    className=" w-full text-sm md:text-base appearance-none cursor-pointer px-3  py-2 border rounded bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) =>
                      setPost({ ...post, category: e.target.value })
                    }
                    placeholder="Blog Category"
                    value={post.category}
                  >
                    <option disabled value={""}>
                      -
                    </option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
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

        <div className="flex-[4] ml-10">
          {/* <h1 className='text-2xl font-bold'>Show on home</h1>
            {
                allBlogs?.map((blog) => (
                    // <CategoryCard category={category}/>
                    <div>
                        <div className="flex flex-col">
                            <div className="text-lg font-bold">{blog.title}</div>
                            <span>{new Date( blog.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        </div>
                    </div>
                ))
            } */}
        </div>
      </div>

      <div className="flex-[4]">
        <h1 className="text-2xl font-bold">All Blogs</h1>
        <div className="grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allBlogs?.map((blog, i) => (
            <BlogCard blog={blog} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
