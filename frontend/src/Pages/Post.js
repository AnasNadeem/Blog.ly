import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deletePost, getPostId } from '../Api'
import Loader from './Components/Loader'
import Navbar from './Components/Navbar'
import { dateTimeFormatter } from '../Utils'

const Post = () => {
    const { id } = useParams()
    const [post, setPost] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        getPostId(id)
        .then(res => {
            setPost(res.data)
            setIsLoading(false)
        })
        .catch(err => {
            setError(err)
            setIsLoading(false)
        })
    }, [id])

    const handleDelete = () => {
      deletePost(id)
      .then(res => {
        console.log(res)
        navigate('/')
      })
      .catch(err => {
        console.log(err)
      }
      )
    }


return (
    // Blog page
    <div>
        <Navbar />
        <div className="flex flex-col justify-center items-center">
            {isLoading
            ? <Loader />
            : error
            ? <p>Error: {error.message}</p>
            : (
                <div className="container mx-auto mt-8">
                    <div className="max-w-3xl mx-auto bg-white p-8 rounded-md shadow-lg relative">

                    <div className="absolute top-4 right-4 flex space-x-2">
                        <a 
                        href={`/posts/${post.id}/edit`} 
                        className="text-blue-500 hover:text-blue-700">
                            <i className="fas fa-edit"></i> Edit
                        </a>
                        <a 
                        href="#"
                        onClick={handleDelete} 
                        className="text-red-500 hover:text-red-700">
                            <i className="fas fa-trash-alt"></i> Delete
                        </a>
                    </div>

                    <img src="https://source.unsplash.com/random" alt="Blog Post Image" className="w-full h-64 object-cover mb-6 mt-2 rounded-md" />

                    <h1 className="text-3xl font-semibold mb-4">{post.title}</h1>

                    <div className="text-gray-600 text-sm mb-4">
                        <span>By Anas Nadeem</span>
                        <span className="mx-2">•</span>
                        <span>Published on {dateTimeFormatter(post.created_at)}</span>
                    </div>

                    <div className="prose">
                        <p>{post.body}</p>
                    </div>

                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default Post