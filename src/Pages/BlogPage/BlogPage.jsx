import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllCategories } from "../../state/slices/categoriesSlice";
import { setAllCategoryTitle } from "../../state/slices/categoriestitleSlice";
import { API_URL } from "../../utils/util";
import { Helmet } from "react-helmet-async";
import keyword_extractor from "keyword-extractor";
import BlogCard from "../Blog/BlogCard";
import { FaUserCircle } from "react-icons/fa";
import dateFormat from "dateformat";
import { MdKeyboardArrowRight } from "react-icons/md";

const BlogPage = ({ categoryBlogPage }) => {
  const navigate = useNavigate();

  const [allBlogs, setAllBlogs] = useState([]);
  const { blogId, categoryName } = useParams();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    website: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      name: "",
      number: "",
      email: "",
      website: "",
      comment: "",
    });
  };

  const fetchAllCategoryBlogs = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/blog/category/${categoryName}`,
      );
      setAllBlogs(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/blog/`);
      setAllBlogs(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/category/`);
      const resTitles = await axios.get(`${API_URL}/api/category-title/`);
      dispatch(setAllCategories(res.data));
      dispatch(setAllCategoryTitle(resTitles.data));
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };
  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    if (!categoryBlogPage) {
      fetchAllBlogs();
    } else {
      fetchAllCategoryBlogs();
    }
  }, []);
  // const { blogId, categoryName } = useParams();
  const [blog, setBlog] = useState(null);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/blog/category/${categoryName}/${blogId}`,
      );
      setBlog(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  const blogPageSchema = {
    "@context": "https://schema.org/",
    "@type": "BlogPosting",
    "@id": `https://aresuno.com/blog/${categoryName}/${blogId}`,
    mainEntityOfPage:
      "https://dataliberate.com/2019/05/14/library-metadata-evolution-final-mile/",
    headline: `${blog?.title}`,
    name: `${blog?.title}`,
    description: `${blog?.description?.replace(/<[^>]+>/g, "")}`,
    datePublished: `${blog?.createdAt}`,
    dateModified: `${blog?.updatedAt}`,
    author: {
      "@type": "Person",
      name: `${blog?.author}`,
    },
    image: {
      "@type": "ImageObject",
      "@id": `${blog?.image}`,
      url: `${blog?.image}`,
    },
    url: `https://aresuno.com/blog/${categoryName}/${blogId}`,
    wordCount: `${blog?.description?.replace(/<[^>]+>/g, "").length}`,
    keywords: [
      keyword_extractor.extract(blog?.description, {
        language: "english",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true,
      }),
    ],
  };

  return (
    <>
      <Helmet>
        <title>{blog?.title}</title>
        <meta name="title" content={blog?.title} />
        <meta
          name="description"
          content={blog?.description?.replace(/<[^>]+>/g, "")}
        />
        <meta name="image" content={blog?.image} />

        <meta name="twitter:title" content={blog?.title} />
        <meta
          name="twitter:description"
          content={blog?.description?.replace(/<[^>]+>/g, "")}
        />
        <meta name="twitter:image" content={blog?.image} />
        <meta
          name="keywords"
          content={keyword_extractor.extract(blog?.description, {
            language: "english",
            remove_digits: true,
            return_changed_case: true,
            remove_duplicates: true,
          })}
        />
        <script type="application/ld+json">
          {JSON.stringify(blogPageSchema)}
        </script>

        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="" />
        <meta property="og:title" content={blog?.title} />
        <meta
          property="og:description"
          content={blog?.description?.replace(/<[^>]+>/g, "")}
        />
        <meta
          property="og:url"
          content={`https://aresuno.com/blog/${categoryName}/${blogId}`}
        />
        <meta property="og:site_name" content="Aresuno" />
      </Helmet>
      <div className="w-full flex justify-between border-zinc-300 px-28 pt-8">
        <div></div>
        <div
          className="hidden md:flex gap-2 justify-center items-center text-blue-500 font-semibold cursor-pointer"
          onClick={() => navigate("/blog")}
        >
          View All Post <MdKeyboardArrowRight />
        </div>
      </div>
      <div className="blog-page w-full flex flex-col md:flex-row md:py-8  md:px-16 md:pt-0 px-6 md:gap-0 gap-2">
        <div className="md:w-[65%] w-full md:my-10 my-0 flex  flex-col gap-6 flex-3 ">
          <div>
            <h1 className="md:text-3xl text-2xl font-bold">{blog?.title}</h1>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-red-500  inline-flex gap-2 bg-red-100 p-2 rounded-xl">
              <FaUserCircle className="w-4 h-4" />
              {blog?.author}
            </span>
            <span className="text-xs text-yellow-500 font-semibold bg-orange-100 p-2 rounded-xl">
              {dateFormat(blog?.createdAt, "mmmm dS, yyyy")}
            </span>
          </div>
          <div>
            <img src={blog?.image} alt="" />
          </div>

          <div
            className="blog-page-description text-base"
            key={blog?._id}
            dangerouslySetInnerHTML={{ __html: blog?.description }}
          />
          <div className="flex justify-center items-center w-full mb-12">
            <div className="mt-8 p-6 bg-gray-100 rounded-md w-full">
              <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 h-8"
                  />
                </div>
                <div className="flex flex-col md:flex-row md:gap-4 gap-2">
                  <div className="flex-1">
                    <label htmlFor="number" className="block font-medium">
                      Number
                    </label>
                    <input
                      type="tel"
                      id="number"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      className="mt-1 block w-full h-8 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="number" className="block font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full h-8 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="website" className="block font-medium">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="mt-1 h-8 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="comment" className="block font-medium">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300"
                >
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="flex flex-col my-6 md:my-24 flex-1">
          <div className="flex flex-col gap-4 md:px-10 px-2">
            <h1 className="text-lg mb-4 font-semibold">More like this</h1>
            {allBlogs.map((blog, index) => {
              return (
                <div
                  className="py-6 pt-0  rounded-xl border-zinc-300 hover:scale-105 transform duration-200 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
                  key={index}
                >
                  <BlogCard
                    blog={blog}
                    key={blog._id}
                    categoryName={categoryName}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center md:gap-12 gap-6 w-full md:py-8  md:px-16 md:pr-24 md:pt-0 px-6">
        <div className="flex flex-col shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] p-6 gap-4 h-72">
          <div className="font-semibold text-blue-500 bg-blue-100 rounded-full w-max p-1 px-3">
            1
          </div>
          <h1 className="font-semibold text-2xl md:text-3xl">
            Tell us What You Need
          </h1>
          <span className="font-semibold text-sm md:text-base text-zinc-500">
            We&apos;ll help you find Web Designers. Help us refine your search
            by telling us your requirements and we&apos;ll contact service
            providers in your area to help you.
          </span>
        </div>
        <div className="flex flex-col shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] p-6 gap-4 h-72">
          <div className="font-semibold text-blue-500 bg-blue-100 rounded-full w-max p-1 px-3">
            2
          </div>
          <h1 className="font-semibold text-2xl md:text-3xl">
            Recieve Free Quotes
          </h1>
          <span className="font-semibold text-sm md:text-base text-zinc-500">
            You will get free quotes from professionals and get quick
            notification via our website or app. We make sure we do the leg work
            for you
          </span>
        </div>
        <div className="flex flex-col shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] p-6 gap-4 h-72">
          <div className="font-semibold text-blue-500 bg-blue-100 rounded-full w-max p-1 px-3">
            3
          </div>
          <h1 className="font-semibold text-2xl md:text-3xl">
            Choose Your Vendor
          </h1>
          <span className="font-semibold text-sm md:text-base text-zinc-500">
            Pick from some of the best providers in your area . With easy access
            to reviews and direct contact with Web designers. You can be
            confident with your choice.
          </span>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
