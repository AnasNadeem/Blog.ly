import React, { useState } from 'react'
import { createPost } from '../Api'
import { useNavigate } from 'react-router-dom'

const NewPost = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !body) {
      setError('Please fill out all fields')
      return
    }

    const data = {
      title,
      body,
    }
    createPost(data)
    .then(res => {
      console.log(res)
      navigate(`/posts/${res.data.id}`)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-gray-700 dark:text-gray-200">New Post</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
            Body
          </label>
          <textarea
            onChange={(e) => setBody(e.target.value)}
            value={body}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="body"
            type="text"
            placeholder="Body"
            rows={10}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewPost