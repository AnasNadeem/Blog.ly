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
                className="shadow border-b border-gray-200 sm:rounded-lg max-h-[25rem] overflow-y-auto overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        {tableInstance.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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