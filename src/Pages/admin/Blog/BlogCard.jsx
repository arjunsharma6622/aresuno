import { FiEdit2, FiExternalLink, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { API_URL, ToastParams } from "../../../utils/util";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const BlogCard = ({ blog }) => {
  const handleBlogDelete = async () => {
    try {
      const userConfirmed = window.confirm(
        "Are you sure you want to delete this blog?",
      );

      // Check if the user clicked "OK"
      if (userConfirmed) {
        const response = await axios.delete(`${API_URL}/api/blog/${blog._id}`);
        toast.success(response.data.message, ToastParams);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting blog", ToastParams);
    }
  };

  return (
    <div className=" py-2 rounded-lg border-gray-400 ">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-bold w-full h-full">
          <img src={blog.image} alt="" className="rounded-md w-full h-full" />
        </div>
        <div className="text-lg font-semibold blog-title">{blog.title}</div>
        <div
          className="blog-description text-sm"
          key={blog.id}
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </div>
      <div className="flex justify-between items-center mt-4">
        <Link
          to={`/blog/${blog._id}`}
          className="inline-flex items-center gap-2 text-blue-500"
        >
          View <FiExternalLink className="w-4 h-4" />
        </Link>
        <Link
          to={`/blog/edit/${blog._id}`}
          className="inline-flex items-center gap-2 text-gray-500"
        >
          Edit <FiEdit2 className="w-4 h-4" />
        </Link>
        <button
          onClick={handleBlogDelete}
          className="inline-flex items-center gap-2 text-red-500"
        >
          Delete <FiTrash2 className="w-4 h-4" />
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BlogCard;
