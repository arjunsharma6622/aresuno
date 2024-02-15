import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllCategories } from "../../state/slices/categoriesSlice";
import { setAllCategoryTitle } from "../../state/slices/categoriestitleSlice";
import { API_URL } from "../../utils/util";
import { Helmet } from "react-helmet-async";
import keyword_extractor from "keyword-extractor";
import BlogCard from "../Blog/BlogCard";
import { FaUserCircle } from "react-icons/fa";
import dateFormat, { masks } from "dateformat";

const BlogPage = ({ categoryBlogPage }) => {
  const [allBlogs, setAllBlogs] = useState([]);
  const { blogId, categoryName } = useParams();
  const dispatch = useDispatch();
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
  // const { blogId, categoryName } = useParams();
  const [blog, setBlog] = useState(null);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/blog/category/${categoryName}/${blogId}`
      );
      setBlog(response.data);
    } catch (error) {
      console.log(error);
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

  console.log(allBlogs);

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

      <div className="blog-page w-full flex flex-col md:flex-row py-8  md:px-16 px-6 md:gap-20 gap-2">
        <div className="md:w-[60%] w-full md:my-10 my-0 flex  flex-col gap-6 flex-3 ">
          <div>
            <h1 className="text-3xl font-bold">{blog?.title}</h1>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 inline-flex gap-2">
              <FaUserCircle className="w-5 h-5" />
              {blog?.author}
            </span>
            <span className="text-sm text-gray-500">
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
        </div>

        <div className="flex flex-col my-16 flex-1">
          <div className="flex flex-col gap-12 px-8">
            <h1 className="text-xl font-semibold">More like this</h1>
            {allBlogs.map((blog) => {
              return (
                <BlogCard
                  blog={blog}
                  key={blog._id}
                  categoryName={categoryName}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
