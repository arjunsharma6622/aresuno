import React from 'react'
import { Helmet } from 'react-helmet-async'


const BlogCard = ({blog}) => {

  return (
    <div>
        <div className="flex flex-col gap-2">
            <div className="text-xl font-semibold blog-title">{blog.title}</div>
            <div className="text-xl font-bold w-full h-full">
                <img src={blog.image} alt="" className='w-full h-full'/>
            </div>
            <div className='blog-description' key={blog.id} dangerouslySetInnerHTML={{ __html: blog.description }} />
        </div>
    </div>
  )
}

export default BlogCard