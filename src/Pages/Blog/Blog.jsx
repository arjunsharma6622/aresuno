import React, { useEffect, useState } from 'react'
import { API_URL } from '../../utils/util';
import BlogCard from './BlogCard';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import keyword_extractor from 'keyword-extractor';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllCategories } from '../../state/slices/categoriesSlice';
import { setAllCategoryTitle } from '../../state/slices/categoriestitleSlice';

const Blog = ({categoryBlogPage}) => {
    const [allBlogs, setAllBlogs] = useState([])
    const {categoryName} = useParams()
    const dispatch = useDispatch();
    const fetchAllCategoryBlogs = async () => {
        try{
            const response = await axios.get(`${API_URL}/api/blog/category/${categoryName}`);
            setAllBlogs(response.data);
            console.log(response.data)
        }
        catch(err){
            console.log(err)
        }
    }

    const fetchAllBlogs = async () => {
        try{
            const response = await axios.get(`${API_URL}/api/blog/`);
            setAllBlogs(response.data);
            console.log(response.data)
        }
        catch(err){
            console.log(err)
        }
    }

    const fetchAllCategories = async () => {
        try {
          console.log('fetching........')
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
        if(!categoryBlogPage){
            fetchAllBlogs();
        }
        else{
        fetchAllCategoryBlogs();
        }
    }, [])

    const blogsSchema = 
    
    {
        "@context": "https://schema.org/",
        "@type": "Blog",
        "@id": `https://aresuno.com/blog`,
        "mainEntityOfPage": "https://aresuno.com/blog",
        "name": "Aresuno - Blog",
        "description": "Aresuno - Blog",
        "publisher": {
            "@type": "Organization",
            "@id": "https://aresuno.com",
            "name": "Aresuno",
        },
        "blogPost" : [
            allBlogs.map((blog) => {
                return {
                
                        "@type": "BlogPosting",
                        "@id": `https://aresuno.com/blog/${blog._id}`,
                        "mainEntityOfPage": "https://aresuno.com/blog",
                        "headline": blog.title,
                        "name": blog.title,
                        "description": blog.description.replace(/<[^>]+>/g, ''),
                        "datePublished": blog.createdAt,
                        "dateModified": blog.updatedAt,
                        "author": {
                            "@type": "Person",
                            "@id": "https://aresuno.com",
                            "name": "Aresuno"
                        },
                        "image": {
                            "@type": "ImageObject",
                            "@id": blog.image,
                            "url": blog.image,
                        },
                        "url": `https://aresuno.com/blog/${blog._id}`,
                        "keywords": [
                            blog.title,
                            keyword_extractor.extract(blog.description, {
                                language: "english",
                                remove_digits: true,
                                return_changed_case: true,
                                remove_duplicates: true,
                            })
                        ]
                
                }
            })
        ]

    }
    

  return (
    <div className='flex w-full justify-center items-center'>
    <Helmet>
    <title>Aresuno - Blog</title>
    <meta name="description" content="Aresuno - Blog" />
    <meta name='title' content='Aresuno - Blog'/>
    <link rel="canonical" href="https://www.aresuno.com/blog" />
    <script type='application/ld+json'>
        {
            JSON.stringify(blogsSchema)
        }
    </script>

    <meta property="og:locale" content="en_US" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Aresuno - Blog" />
  <meta property="og:description"
    content="Aresuno - Blog" />
  <meta property="og:url" content="https://aresuno.com/blog" />
  <meta property="og:site_name" content="Aresuno" />
  </Helmet>
    <div className='w-[75%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>

        {
            allBlogs.map((blog) => {
                return <BlogCard blog={blog} key={blog._id} categoryName={categoryName}/>
            })
        }

    </div>
    </div>
  )
}

export default Blog