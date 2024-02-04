import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { API_URL } from '../../utils/util'
import { Helmet } from 'react-helmet-async'
import keyword_extractor from 'keyword-extractor'

const BlogPage = () => {
    const {blogId, categoryName} = useParams()
    const [blog, setBlog] = useState(null)


    const fetchBlog = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/blog/category/${categoryName}/${blogId}`)
            setBlog(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {


        fetchBlog()
    }, [])



    const blogPageSchema = {
        "@context": "https://schema.org/",
        "@type": "BlogPosting",
        "@id": `https://aresuno.com/blog/${categoryName}/${blogId}`,
        "mainEntityOfPage": "https://dataliberate.com/2019/05/14/library-metadata-evolution-final-mile/",
        "headline": `${blog?.title}`,
        "name": `${blog?.title}`,
        "description": `${blog?.description.replace(/<[^>]+>/g, '')}`,
        "datePublished": `${blog?.createdAt}`,
        "dateModified": `${blog?.updatedAt}`,
        "author": {
            "@type": "Person",
            "name": `${blog?.author}`,
        },
        "image": {
            "@type": "ImageObject",
            "@id": `${blog?.image}`,
            "url": `${blog?.image}`,

        },
        "url": `https://aresuno.com/blog/${categoryName}/${blogId}`,
        "wordCount": `${blog?.description.replace(/<[^>]+>/g, '').length}`,
        "keywords": [
            keyword_extractor.extract(blog?.description, {
                language: "english",
                remove_digits: true,
                return_changed_case: true,
                remove_duplicates: true,
            }) 
        ],
    }



  return (
    <div className='w-full flex items-center justify-center'>
        <Helmet>
            <meta name='twitter:title' content={blog?.title}/>
            <meta name='twitter:description' content={blog?.description.replace(/<[^>]+>/g, '')}/>
            <meta name='twitter:image' content={blog?.image}/>
            <meta name='keywords' content={                            keyword_extractor.extract(blog?.description, {
                                language: "english",
                                remove_digits: true,
                                return_changed_case: true,
                                remove_duplicates: true,
                            })}/>
            <script type="application/ld+json">{JSON.stringify(blogPageSchema)}</script>

            <meta property="og:locale" content="en_US" />
  <meta property="og:type" content="" />
  <meta property="og:title" content={blog?.title} />
  <meta property="og:description"
    content={blog?.description.replace(/<[^>]+>/g, '')} />
  <meta property="og:url" content={`https://aresuno.com/blog/${categoryName}/${blogId}`} />
  <meta property="og:site_name" content="Aresuno" />
        </Helmet>
        <div className='w-[60%] my-10 flex justify-center flex-col gap-10 items-center'>
            <div>
                <h1 className='text-3xl font-bold'>{blog?.title}</h1>
            </div>
            <div>
                <img src={blog?.image} alt="" />
            </div>

            <div className='blog-page-description text-base' key={blog?._id} dangerouslySetInnerHTML={{ __html: blog?.description }} />
        </div>
    </div>
  )
}

export default BlogPage