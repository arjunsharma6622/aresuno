import React, { useEffect, useState } from 'react'
import { API_URL } from '../../utils/util';
import BlogCard from '../admin/BlogCard';
import axios from 'axios';

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
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>

        {
            allBlogs.map((blog) => {
                return <BlogCard blog={blog} />
            })
        }

    </div>
  )
}

export default Blog