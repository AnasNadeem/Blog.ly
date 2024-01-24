import React from 'react'

const Table = () => {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" class="px-6 py-3">
                      Title
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Created At
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Updated At
                  </th>
                  <th scope="col" class="px-6 py-3">
                      <span class="sr-only">Read More</span>
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Apple MacBook Pro 17"
                  </th>
                  <td class="px-6 py-4">
                      Silver
                  </td>
                  <td class="px-6 py-4">
                      Laptop
                  </td>
                  <td class="px-6 py-4 text-right">
                      <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        Read More
                      </a>
                  </td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Microsoft Surface Pro
                  </th>
                  <td class="px-6 py-4">
                      White
                  </td>
                  <td class="px-6 py-4">
                      Laptop PC
                  </td>
                  <td class="px-6 py-4 text-right">
                      <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Read More</a>
                  </td>
              </tr>
              <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Magic Mouse 2
                  </th>
                  <td class="px-6 py-4">
                      Black
                  </td>
                  <td class="px-6 py-4">
                      Accessories
                  </td>
                  <td class="px-6 py-4 text-right">
                      <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Read More</a>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
  )
}

export default Table