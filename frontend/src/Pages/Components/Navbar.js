import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono" role="navigation">
        <Link to="/" className="pl-8">Blog.ly</Link>
        <div className="px-4 cursor-pointer md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </div>
        <div className="pr-8 md:block hidden">
            <Link
                to="/new-post"
                className="p-2 bg-gray-800 text-white py-2 w-full rounded-md hover:bg-gray-700 focus:outline-none"
            >
                New Post
            </Link>
        </div>
    </nav>
  )
}

export default Navbar