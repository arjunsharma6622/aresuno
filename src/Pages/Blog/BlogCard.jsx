import React from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const BlogCard = ({blog}) => {
  return (
    <div>
        <div className="flex flex-col gap-2">
            <div className="text-xl font-semibold blog-title">{blog.title}</div>
            <div className="text-xl font-bold w-full h-full">
                <img src={blog.image} alt="" className='w-full h-full'/>
            </div>
            <div className='blog-description blog-page-description' key={blog._id} dangerouslySetInnerHTML={{ __html: blog.description }} />
        </div>
            <Link to={`/blog/${blog._id}`} className="inline-flex items-center gap-2 text-blue-500">View <FiExternalLink className='w-4 h-4'/></Link>
    </div>
  )
}

export default BlogCard