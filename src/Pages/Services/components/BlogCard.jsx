import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

const BlogCard = ({ blog }) => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <Link
          to={`/blog/${blog._id}`}
          className="text-xl font-bold w-full h-full"
        >
          <img src={blog.image} alt="" className="w-full h-full rounded-lg" />
        </Link>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 inline-flex gap-2">
            <FaUserCircle className="w-5 h-5" />
            {blog.author}
          </span>
          <span className="text-sm text-gray-500">
            {dateFormat(blog.createdAt, "mmmm dS, yyyy")}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            to={`/blog/${blog._id}`}
            className="text-lg font-semibold blog-title"
          >
            {blog.title}
          </Link>

          <Link to={`/blog/${blog._id}`}>
            <div
              className="blog-description text-sm blog-page-description"
              key={blog._id}
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
