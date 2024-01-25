import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deletePost, getPostId } from '../Api'
import Loader from './Components/Loader'


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
    <div className="flex flex-col justify-center items-center">
        {isLoading
        ? <Loader />
        : error
        ? <p>Error: {error.message}</p>
        : (
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold text-gray-700 dark:text-gray-200">{post.title}</h1>
                    <p className="text-gray-500 dark:text-gray-400">admin</p>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <a href={`/posts/${post.id}/edit`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</a>
                  <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <p className="text-gray-500 dark:text-gray-400">Published on {post.created_at}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <img className="w-full" src="https://source.unsplash.com/random" alt="random" />
                </div>

                <div className="flex flex-col justify-center items-center">
                    <p className="text-gray-500 dark:text-gray-400">{post.body}</p>
                </div>
            </div>
        )}
    </div>
  )
}

export default Post