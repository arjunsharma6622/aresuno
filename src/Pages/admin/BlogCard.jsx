import React from 'react'

const BlogCard = ({blog}) => {
  return (
    <div>
        <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold">{blog.title}</div>
            <div className="text-xl font-bold">
                <img src={blog.image} alt="" />
            </div>
            <div key={blog.id} dangerouslySetInnerHTML={{ __html: blog.description }} />
        </div>
    </div>
  )
}

export default BlogCard