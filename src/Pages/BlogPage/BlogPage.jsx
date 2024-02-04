import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { API_URL } from '../../utils/util'

const BlogPage = () => {
    const {blogId} = useParams()
    const [blog, setBlog] = useState(null)


    const fetchBlog = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/blog/${blogId}`)
            setBlog(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {


        fetchBlog()
    }, [])
  return (
    <div className='w-full flex items-center justify-center'>
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