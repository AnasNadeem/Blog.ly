import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPostId, updatePost } from '../Api'
import { useNavigate } from 'react-router-dom'


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
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-gray-700 dark:text-gray-200">Edit Post</h1>
      <form onSubmit={handleEdit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
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
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Edit Post
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditPost