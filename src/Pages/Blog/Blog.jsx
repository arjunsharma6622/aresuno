import React, { useEffect, useState } from "react";
import { API_URL } from "../../utils/util";
import BlogCard from "./BlogCard";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import keyword_extractor from "keyword-extractor";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllCategories } from "../../state/slices/categoriesSlice";
import { setAllCategoryTitle } from "../../state/slices/categoriestitleSlice";
import { IoMdSearch } from "react-icons/io";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const Blog = ({ categoryBlogPage }) => {
  const [allBlogs, setAllBlogs] = useState([]);
  const { categoryName } = useParams();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("science");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const fetchAllCategoryBlogs = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/blog/category/${categoryName}`
      );
      setAllBlogs(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/blog/`);
      setAllBlogs(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllCategories = async () => {
    try {
      console.log("fetching........");
      const res = await axios.get(`${API_URL}/api/category/`);
      const resTitles = await axios.get(`${API_URL}/api/category-title/`);
      dispatch(setAllCategories(res.data));
      dispatch(setAllCategoryTitle(resTitles.data));
      console.log("Categories fetched:", res.data);
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

  const blogsSchema = {
    "@context": "https://schema.org/",
    "@type": "Blog",
    "@id": `https://aresuno.com/blog`,
    mainEntityOfPage: "https://aresuno.com/blog",
    name: "Aresuno - Blog",
    description: "Aresuno - Blog",
    publisher: {
      "@type": "Organization",
      "@id": "https://aresuno.com",
      name: "Aresuno",
    },
    blogPost: [
      allBlogs.map((blog) => {
        return {
          "@type": "BlogPosting",
          "@id": `https://aresuno.com/blog/${blog._id}`,
          mainEntityOfPage: "https://aresuno.com/blog",
          headline: blog.title,
          name: blog.title,
          description: blog.description.replace(/<[^>]+>/g, ""),
          datePublished: blog.createdAt,
          dateModified: blog.updatedAt,
          author: {
            "@type": "Person",
            "@id": "https://aresuno.com",
            name: "Aresuno",
          },
          image: {
            "@type": "ImageObject",
            "@id": blog.image,
            url: blog.image,
          },
          url: `https://aresuno.com/blog/${blog._id}`,
          keywords: [
            blog.title,
            keyword_extractor.extract(blog.description, {
              language: "english",
              remove_digits: true,
              return_changed_case: true,
              remove_duplicates: true,
            }),
          ],
        };
      }),
    ],
  };

  return (
    <div className="flex flex-col w-full my-8 md:gap-8 gap-5 justify-center items-center">
      <Helmet>
        <title>Aresuno - Blog</title>
        <meta name="description" content="Aresuno - Blog" />
        <meta name="title" content="Aresuno - Blog" />
        <link rel="canonical" href="https://www.aresuno.com/blog" />
        <script type="application/ld+json">
          {JSON.stringify(blogsSchema)}
        </script>

        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Aresuno - Blog" />
        <meta property="og:description" content="Aresuno - Blog" />
        <meta property="og:url" content="https://aresuno.com/blog" />
        <meta property="og:site_name" content="Aresuno" />
      </Helmet>

      <div>
        <h1 className="text-3xl font-semibold">Recent Blogs</h1>
      </div>

      <div className="md:w-full w-[90%] flex justify-center items-center ">
        <input
          type="text"
          className=" border-zinc-400 border outline-none w-[90%] md:w-2/5 h-12 rounded-xl rounded-r-none p-2 px-8"
          placeholder="search blogs"
        />
        <button className="flex justify-center items-center bg-red-500 rounded-r-xl text-white h-12 px-8">
          <IoMdSearch className="h-7 w-7" />
        </button>
      </div>

      <div className="flex justify-center gap-6 items-center">
        <div>
          <FaChevronCircleLeft className="h-7 w-7 text-blue-500 cursor-pointer" />
        </div>
        <div className="">
          <img
            src="https://images.unsplash.com/photo-1620783770629-122b7f187703?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FkZ2V0c3xlbnwwfHwwfHx8MA%3D%3D"
            alt=""
            className="h-40 rounded-lg cursor-pointer"
          />
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1677296860360-cde4366468d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cG90cmFpdCUyMGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D"
            alt=""
            className="h-40 rounded-lg cursor-pointer"
          />
        </div>
        <div className="">
          <img
            src="https://images.unsplash.com/photo-1676264542565-a6343f36eb8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fHBvdHJhaXQlMjBhZXN0aGV0aWN8ZW58MHx8MHx8fDA%3D"
            alt=""
            className="h-40 rounded-lg cursor-pointer"
          />
        </div>
        <div className="hidden md:flex">
          <img
            src="https://images.unsplash.com/photo-1696350929275-fdc99e1274c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHBvdHJhaXQlMjBhZXN0aGV0aWN8ZW58MHx8MHx8fDA%3D"
            alt=""
            className="h-40 rounded-lg cursor-pointer"
          />
        </div>
        <div className="hidden md:flex">
          <img
            src="https://images.unsplash.com/photo-1677296860511-540ffaabaf2b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fHBvdHJhaXQlMjBhZXN0aGV0aWN8ZW58MHx8MHx8fDA%3D"
            alt=""
            className="h-40 rounded-lg cursor-pointer"
          />
        </div>
        <div className="hidden md:flex">
          <img
            src="https://images.unsplash.com/photo-1706978789424-1e498d4cdf39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBvdHJhaXQlMjBhZXN0aGV0aWN8ZW58MHx8MHx8fDA%3D"
            alt=""
            className="h-40 rounded-lg cursor-pointer"
          />
        </div>
        <div className="hidden md:flex">
          <img
            src="https://images.unsplash.com/photo-1676265014693-789205f9c87d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBvdHJhaXQlMjBhZXN0aGV0aWN8ZW58MHx8MHx8fDA%3D"
            alt=""
            className="h-40 rounded-lg cursor-pointer"
          />
        </div>
        <div className="hidden md:flex">
          <img
            src="https://images.unsplash.com/photo-1676264542445-aae51f7ca793?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBvdHJhaXQlMjBhZXN0aGV0aWN8ZW58MHx8MHx8fDA%3D"
            alt=""
            className="h-40 rounded-lg cursor-pointer"
          />
        </div>
        <div className="hidden md:flex">
          <img
            src="https://images.unsplash.com/photo-1620783770629-122b7f187703?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FkZ2V0c3xlbnwwfHwwfHx8MA%3D%3D"
            alt=""
            className="h-40 rounded-lg cursor-pointer"
          />
        </div>
        <div className="hidden md:flex">
          <img
            src="https://images.unsplash.com/photo-1656311829263-e001b6e93855?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cG90cmFpdCUyMGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D"
            alt=""
            className="h-40 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <FaChevronCircleRight className="h-7 w-7 text-blue-500 cursor-pointer" />
        </div>
      </div>

      <div className="  md:w-[80%] w-[90%] hidden md:flex gap-16 justify-center items-center  ">
        <button
          className={`px-3 p-2 w-40 font-semibold duration-200 transition ${
            activeTab === "science" ? "bg-red-500 rounded-xl text-white" : ""
          }`}
          onClick={() => handleTabClick("science")}
        >
          science
        </button>
        <button
          className={`px-3 p-2 w-40 hover:bg-red-500 font-semibold rounded-xl hover:text-white duration-200 transition ${
            activeTab === "arts" ? "bg-red-500 text-white" : ""
          }`}
          onClick={() => handleTabClick("arts")}
        >
          arts
        </button>
        <button
          className={`px-3 p-2 w-40 hover:bg-red-500 font-semibold rounded-xl hover:text-white duration-200 transition ${
            activeTab === "technology" ? "bg-red-500 text-white" : ""
          }`}
          onClick={() => handleTabClick("technology")}
        >
          technology
        </button>
        <button
          className={`px-3 p-2 w-40 hover:bg-red-500 font-semibold rounded-xl hover:text-white duration-200 transition ${
            activeTab === "finance" ? "bg-red-500 text-white" : ""
          }`}
          onClick={() => handleTabClick("finance")}
        >
          finance
        </button>
        <button
          className={`px-3 p-2 w-40 hover:bg-red-500 font-semibold rounded-xl hover:text-white duration-200 transition ${
            activeTab === "socials" ? "bg-red-500 text-white" : ""
          }`}
          onClick={() => handleTabClick("socials")}
        >
          socials
        </button>
        <button
          className={`px-3 p-2 w-40 hover:bg-red-500 font-semibold rounded-xl hover:text-white duration-200 transition ${
            activeTab === "sports" ? "bg-red-500 text-white" : ""
          }`}
          onClick={() => handleTabClick("sports")}
        >
          sports
        </button>
      </div>

      <div className="w-[90%] md:w-[80%] flex flex-col md:hidden mt-4">
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
          <option value="science">Science</option>
          <option value="arts">Arts</option>
          <option value="technology">Technology</option>
          <option value="finance">Finance</option>
          <option value="socials">Socials</option>
          <option value="sports">Sports</option>
        </select>
      </div>

      <div className="w-[90%] md:w-[80%] mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allBlogs.map((blog) => {
          return (
            <BlogCard
              type="main"
              blog={blog}
              key={blog._id}
              categoryName={categoryName}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
