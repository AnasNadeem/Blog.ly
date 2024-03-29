import React, { useState } from 'react'
import { createPost } from '../Api'
import { useNavigate } from 'react-router-dom'
import Navbar from './Components/Navbar'

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
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-lg">

          <h2 className="text-2xl font-semibold mb-6">Create New Post</h2>

          <form onSubmit={handleSubmit}>
          {error && <p className="text-center text-red-500 text-xs italic mb-2">{error}</p>}
            <div className="mb-4">
              <label for="title" className="block text-sm font-medium text-gray-600 mb-2">Title</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                id="title"
                type="text"
                placeholder="Blog Title"
              />
            </div>

            <div className="mb-6">
              <label for="body" className="block text-sm font-medium text-gray-600 mb-2">Body</label>
              <textarea
                onChange={(e) => setBody(e.target.value)}
                value={body}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                id="body"
                type="text"
                rows={4}
              />
            </div>

            <button type="submit" class="bg-gray-800 text-white py-2 w-full rounded-md hover:bg-gray-700 focus:outline-none">
              Create Post
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default NewPost