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
    // title, body, created_at, updated_at
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'body',
      header: 'Body',
    }
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

      {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Title
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Created At
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Updated At
                      </th>
                      <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Read More</span>
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Apple MacBook Pro 17"
                      </th>
                      <td className="px-6 py-4">
                          Silver
                      </td>
                      <td className="px-6 py-4">
                          Laptop
                      </td>
                      <td className="px-6 py-4 text-right">
                          <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            Read More
                          </a>
                      </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Microsoft Surface Pro
                      </th>
                      <td className="px-6 py-4">
                          White
                      </td>
                      <td className="px-6 py-4">
                          Laptop PC
                      </td>
                      <td className="px-6 py-4 text-right">
                          <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Read More</a>
                      </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Magic Mouse 2
                      </th>
                      <td className="px-6 py-4">
                          Black
                      </td>
                      <td className="px-6 py-4">
                          Accessories
                      </td>
                      <td className="px-6 py-4 text-right">
                          <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Read More</a>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div> */}
    </div>
  )
}

export default Home