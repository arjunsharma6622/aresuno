import { useEffect, useState } from "react";
import { API_URL } from "../../utils/util";
import BlogCard from "./BlogCard";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import keyword_extractor from "keyword-extractor";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAllCategories } from "../../state/slices/categoriesSlice";
import { setAllCategoryTitle } from "../../state/slices/categoriestitleSlice";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

// place holder data.
const blogCategories = [
  {
    image_src:
      "https://images.unsplash.com/photo-1620783770629-122b7f187703?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FkZ2V0c3xlbnwwfHwwfHx8MA%3D%3D",
    alt: "foodj",
    title: "Food",
  },
  {
    image_src:
      "https://images.unsplash.com/photo-1676264542565-a6343f36eb8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fHBvdHJhaXQlMjBhZXN0aGV0aWN8ZW58MHx8MHx8fDA%3D",
    alt: "travel",
    title: "Travel",
  },
  {
    image_src:
      "https://images.unsplash.com/photo-1696350929275-fdc99e1274c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHBvdHJhaXQlMjBhZXN0aGV0aWN8ZW58MHx8MHx8fDA%3D",
    alt: "travel",
    title: "Travel",
  },
  {
    image_src:
      "https://images.unsplash.com/photo-1696350929275-fdc99e1274c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHBvdHJhaXQlMjBhZXN0aGV0aWN8ZW58MHx8MHx8fDA%3D",
    alt: "travel",
    title: "Travel",
  },
  {
    image_src:
      "https://images.unsplash.com/photo-1696350929275-fdc99e1274c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHBvdHJhaXQlMjBhZXN0aGV0aWN8ZW58MHx8MHx8fDA%3D",
    alt: "travel",
    title: "Travel",
  },
];

const buttonCategories = [
  "science",
  "arts",
  "technology",
  "finance",
  "socials",
  "sports",
];

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

      <div className="md:w-full w-[90%] flex justify-center items-center ">
        <input
          type="text"
          className=" shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]  outline-none w-[90%] md:w-2/5 h-10 rounded-md rounded-r-none p-2 px-3"
          placeholder="search blogs"
        />
        <button className="flex shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] justify-center items-center bg-blue-500 rounded-r-md text-white  h-10 px-8">
          <IoMdSearch className="h-6 w-6" />
        </button>
      </div>

      <Swiper
        modules={[Navigation]}
        slidesPerView={4}
        spaceBetween={30}
        autoHeight={true}
        pagination={{ clickable: true, dynamicBullets: true }}
        className="py-3 w-full px-10"
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {blogCategories?.map((blog_category, index) => (
          <SwiperSlide key={index} className="">
            <Link
              to={``}
              className="w-full flex flex-col items-center max-md:w-full max-md:ml-0"
            >
              <div className="w-full flex flex-col items-stretch max-md:w-full max-md:ml-0">
                <div className="justify-start items-start flex grow flex-col">
                  <div className="flex-col relative shadow-sm overflow-hidden flex aspect-[1.5235294117647058] w-full items-stretch justify-start rounded-lg">
                    <img
                      loading="lazy"
                      src={blog_category.image_src}
                      alt={blog_category.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="text-neutral-700 bottom-2 left-3 absolute text-xs font-medium justify-center bg-neutral-200 bg-opacity-80 px-[10px] py-[6px] rounded-md">
                      {blog_category.title}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="md:w-[80%] w-[90%] hidden md:flex gap-16 justify-center items-center px-10">
        {buttonCategories.map((category, index) => {
          return (
            <button
              key={index}
              className={`px-3 p-2 w-40 font-semibold transition ${
                activeTab === category
                  ? "bg-red-500 rounded-md text-white"
                  : "rounded-md"
              }`}
              onClick={() => handleTabClick(category)}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="w-[90%] flex flex-col md:hidden mt-4 rounded-md pr-4 text-zinc-500 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] outline-none">
        <select className="w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500">
          {buttonCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="w-[90%] md:w-[80%] mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:px-10">
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
