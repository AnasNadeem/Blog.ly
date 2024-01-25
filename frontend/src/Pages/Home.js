import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from './Components/Table'
import { BASE_URL } from '../Api'

const Home = () => {
  // {total: int, posts: [], limit: int, offset: int}
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)

  const columns = [
    // title, created_at, updated_at, Read More
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorFn: (row) => {
        const date = new Date(row.created_at)
        return date.toLocaleDateString()
      },
      header: 'Created At',
    },
    {
      accessorFn: (row) => {
        const date = new Date(row.updated_at)
        return date.toLocaleDateString()
      },
      header: 'Updated At',
    },
    {
      header: 'Read More',
      cell: (data) => {
        return (
          <a href={`/posts/${data.row.original.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Read More
          </a>
        )
      }
    },

  ]

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}?limit=${limit}&offset=${offset}`)
        const { data } = response
        setPosts(data.posts)
        setTotal(data.total)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPosts()
  }, [limit, offset])

  return (
    <div className="container mt-3 mx-auto px-4 md:px-12">
      <Table
        columns={columns}
        data={posts}
        isLoading={isLoading}
      />
    </div>
  )
}

export default Home