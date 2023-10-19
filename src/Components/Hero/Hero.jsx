import React from 'react'

const Hero = () => {
    return (
        <div className='h-[100vh] flex flex-col items-center justify-center text-3xl'>
            <h1>Welcome to Aresuno</h1>
            <p>Check The business Register page <span className='text-blue-500 underline'><a href="/business">here</a></span></p>
        </div>
    )
}

export default Hero