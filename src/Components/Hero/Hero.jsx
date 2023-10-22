import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='h-[80vh] flex flex-col items-center justify-center text-3xl'>
            <h1>Welcome to Aresuno</h1>
            <h1>Business Page is under construction <Link className='text-blue-500 underline' to={'/business'}>LINK</Link></h1>
        </div>
    )
}

export default Hero