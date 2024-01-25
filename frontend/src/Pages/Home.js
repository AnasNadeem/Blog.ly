import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from './Components/Table'
import { BASE_URL } from '../Api'
import Navbar from './Components/Navbar'
import { dateTimeFormatter } from '../Utils'
import PaginationComponent from './Components/Pagination'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  // {total: int, posts: [], limit: int, offset: int}
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  // Filtering
  const [search, setSearch] = useState('')

  const navigate = useNavigate()
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
          <Link
          to={`/posts/${data.row.original.id}`}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Read More
            <i className="fas fa-arrow-right ml-1"></i>
          </Link>
        )
      }
    },

  ]

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Calculate offset on the basis of current page
        const offset = (currentPage - 1) * limit
        const fetchUrl = search ? `${BASE_URL}?limit=${limit}&offset=${offset}&search=${search}` : `${BASE_URL}?limit=${limit}&offset=${offset}`
        const { data } = await axios.get(fetchUrl)
        setPosts(data.posts)
        setTotal(data.total)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPosts()
  }
  , [currentPage, limit, search])

  return (
    <div>
      <Navbar />
      <div className="container mt-3 mx-auto px-4 md:px-12">
        <div className="flex justify-between items-center mb-3">
          <div className="relative w-full max-w-sm">
            <input
              className="border border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-md py-1 pl-10 pr-4 block w-full appearance-none leading-normal focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Search Title..."
              type="search"
              id='search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="absolute top-0 mt-1 left-0 ml-4"
              >
                <i className="fas fa-search"></i>
                <span className="sr-only">Search</span>
            </button>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <label htmlFor="limit" className="text-sm font-medium text-gray-700">Rows per page</label>
            <select
              id="limit"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
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