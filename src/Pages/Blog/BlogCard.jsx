import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { useSelector } from "react-redux";

const BlogCard = ({ type, blog, categoryName }) => {
  const categories = useSelector((state) => state.categories);
  const category = categories.find(
    (category) => category._id === blog.category,
  );
  const categoryNameFormatted = categoryName
    ? categoryName
    : category.name.toLowerCase().split(" ").join("-");

  return (
    <>
      {type === "main" ? (
        <div className="cursor-pointer rounded-xl transform duration-200 border border-zinc-200 hover:border-zinc-50 hover:shadow-[0px_4px_16px_rgba(17,17,26,0.06),_0px_8px_24px_rgba(17,17,26,0.03),_0px_16px_30px_rgba(17,17,26,0.03)]">
          <div className="flex flex-col gap-4">
            <Link
              to={`/blog/${categoryNameFormatted}/${blog._id}`}
              className="text-xl font-bold w-full h-full"
            >
              <img src={blog.image} alt="" className="w-full h-52 rounded-xl" />
            </Link>

            <div className="flex items-center justify-between p-3">
              <span className="text-xs text-red-500  inline-flex gap-2 bg-red-100 p-2 rounded-xl">
                <FaUserCircle className="w-4 h-4" />
                {blog.author}
              </span>
              <span className="text-xs text-yellow-500 font-semibold bg-orange-100 p-2 rounded-xl">
                {dateFormat(blog.createdAt, "mmmm dS, yyyy")}
              </span>
            </div>

            <div className="flex flex-col p-3 pt-0 pb-4">
              <Link
                to={`/blog/${categoryNameFormatted}/${blog._id}`}
                className="text-lg font-semibold blog-title"
              >
                {blog.title}
              </Link>

              <Link to={`/blog/${categoryNameFormatted}/${blog._id}`}>
                {/* <div
              className="blog-description text-sm blog-page-description"
              key={blog._id}
              dangerouslySetInnerHTML={{ __html: blog.description }}
            /> */}
                <button className="p-2 mt-3 flex justify-center items-center rounded-xl text-sm font-semibold bg-blue-500 text-white">
                  Read more
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 ">
          <Link
            to={`/blog/${categoryNameFormatted}/${blog._id}`}
            className="text-xl font-bold w-full h-full"
          >
            <img src={blog.image} alt="" className="w-full h-52 rounded-xl" />
          </Link>

          <div className="flex items-center justify-between px-4">
            <span className="text-xs text-red-500  inline-flex gap-2 bg-red-100 p-2 rounded-xl">
              <FaUserCircle className="w-4 h-4" />
              {blog.author}
            </span>
            <span className="text-xs text-yellow-500 font-semibold bg-orange-100 p-2 rounded-xl">
              {dateFormat(blog.createdAt, "mmmm dS, yyyy")}
            </span>
          </div>

          <div className="flex flex-col gap-2 px-4">
            <Link
              to={`/blog/${categoryNameFormatted}/${blog._id}`}
              className="text-lg font-semibold blog-title"
            >
              {blog.title}
            </Link>

            <Link to={`/blog/${categoryNameFormatted}/${blog._id}`}>
              {/* <div
                className="blog-description text-sm blog-page-description"
                key={blog._id}
                dangerouslySetInnerHTML={{ __html: blog.description }}
              /> */}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogCard;
