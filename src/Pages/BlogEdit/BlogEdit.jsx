import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL, ToastParams } from "../../utils/util";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import { FiChevronDown, FiLink2 } from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";

const BlogEdit = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchBlog = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/blog/${blogId}`);
      setBlog(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

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

  const categories = useSelector((state) => state.categories);

  const handleBlogEdit = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/api/blog/${blogId}`, blog);
      toast.success(response.data.message, ToastParams);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.message, ToastParams);
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex-[8] mx-auto rounded-lg bg-white border border-gray-200 shadow-lg md:pb-8 md:p-6 md:py-5">
        <h2 className=" md:mb-4 text-xl font-medium mb-2">Add new blog</h2>

        <div className="flex flex-col gap-4 mb-4  rounded-lg">
          <div className="flex flex-col gap-3">
            <p>Blog Title</p>
            <div>
              <input
                type="text"
                placeholder="Blog Title"
                className="w-full p-2 rounded border focus:outline-none "
                value={blog?.title}
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p>Blog Description</p>

            <ReactQuill
              theme="snow"
              value={blog?.description}
              onChange={(value) => setBlog({ ...blog, description: value })}
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
                    setBlog({ ...blog, category: e.target.value })
                  }
                  placeholder="Blog Category"
                  value={blog?.category}
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

              <label htmlFor="blogImage" className="cursor-pointer">
                <input
                  type="file"
                  id="blogImage"
                  accept="image/*"
                  // onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <BiImageAdd className="w-6 h-6" />
              </label>

              <label htmlFor="blogImage" className="cursor-pointer">
                <FiLink2 className="w-6 h-6" />
              </label>
            </div>
          </div>

          <button
            onClick={handleBlogEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full"
          >
            {loading ? (
              <div
                className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            ) : (
              "Update Blog"
            )}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BlogEdit;
