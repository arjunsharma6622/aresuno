import React, { useEffect, useState } from 'react'
import { API_URL } from '../../utils/util';
import BlogCard from './BlogCard';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import keyword_extractor from 'keyword-extractor';

const Blog = () => {
    const [allBlogs, setAllBlogs] = useState([])

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
    useEffect(() => {
        fetchAllBlogs();
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
                            "Blog",
                            "Aresuno",
                            "Blog Post",
                            "Blog Page",
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
    <div>
    <Helmet>
    <title>Aresuno - Blog</title>
    <link rel="canonical" href="https://www.aresuno.com/blog" />
    <script type='application/ld+json'>
        {
            JSON.stringify(blogsSchema)
        }
    </script>
  </Helmet>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>

        {
            allBlogs.map((blog) => {
                return <BlogCard blog={blog} />
            })
        }

    </div>
    </div>
  )
}

export default Blog