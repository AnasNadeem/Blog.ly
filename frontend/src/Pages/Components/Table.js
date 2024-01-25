import React, { useMemo } from 'react'
import { flexRender, useReactTable, getCoreRowModel } from "@tanstack/react-table";
import Loader from './Loader';


const Table = ({ columns, data, isLoading=false, manualPagination=false}) => {
    const finalColumns = useMemo(() => columns, [columns])
    const finalData = useMemo(() => data, [data])

    const tableInstance = useReactTable({
        columns: finalColumns,
        data: finalData,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: manualPagination,
    })

    return (
        <>
        {isLoading
        ? <Loader />
        : (
            <div
                className="shadow border-b border-gray-200 sm:rounded-lg max-h-[32rem] overflow-y-auto overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        {tableInstance.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}
                                className="px-6 py-3">
                                    {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 ">
                        {tableInstance.getRowModel().rows.map(row => (     
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
        </>
    )
}
export default Table;