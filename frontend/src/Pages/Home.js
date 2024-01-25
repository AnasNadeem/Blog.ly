import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from './Components/Table'
import { BASE_URL } from '../Api'
import Navbar from './Components/Navbar'
import { dateTimeFormatter } from '../Utils'
import PaginationComponent from './Components/Pagination'

const Home = () => {
  // {total: int, posts: [], limit: int, offset: int}
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const columns = [
    // title, created_at, updated_at, Read More
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorFn: (row) => dateTimeFormatter(row.created_at),
      header: 'Created At',
    },
    {
      accessorFn: (row) => dateTimeFormatter(row.updated_at),
      header: 'Updated At',
    },
    {
      header: 'Actions',
      cell: (data) => {
        return (
          <a href={`/posts/${data.row.original.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Read More
            <i className="fas fa-arrow-right ml-1"></i>
          </a>
        )
      }
    },

  ]

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Calculate offset on the basis of current page
        const offset = (currentPage - 1) * limit
        const { data } = await axios.get(`${BASE_URL}?limit=${limit}&offset=${offset}`)
        setPosts(data.posts)
        setTotal(data.total)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPosts()
  }
  , [currentPage])

  return (
    <div>
      <Navbar />
      <div className="container mt-3 mx-auto px-4 md:px-12">
        <Table
          columns={columns}
          data={posts}
          isLoading={isLoading}
        />
        {total > 0 && (
          <PaginationComponent
            currentPage={currentPage}
            pageChangeHandler={setCurrentPage}
            limit={limit}
            totalCount={total}
          />
        )}
      </div>
    </div>
  )
}

export default Home