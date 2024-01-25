import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPostId, updatePost } from '../Api'
import { useNavigate } from 'react-router-dom'
import Navbar from './Components/Navbar'


const EditPost = () => {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault()
    if (!title || !body) {
      setError('Please fill out all fields')
      return
    }

    const data = {
      title,
      body,
    }
    updatePost(id, data)
    .then(res => {
      console.log('update', res)
      navigate(`/posts/${id}`)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getPostId(id)
    .then(res => {
      setTitle(res.data.title)
      setBody(res.data.body)
    })
    .catch(err => {
      console.log(err)
    })
  }
  , [id])

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-lg">

          <h2 className="text-2xl font-semibold mb-6">Edit Post</h2>

          <form onSubmit={handleEdit}>
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

            <button type="submit" className="bg-gray-800 text-white py-2 w-full rounded-md hover:bg-gray-700 focus:outline-none">
              Edit Post
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default EditPost