import React, {useState, useEffect} from 'react';


export default function PaginationComponent({currentPage, pageChangeHandler, limit, totalCount}) {
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoNext, setCanGoNext] = useState(true);

    const noOfPages = Math.ceil(totalCount / limit);
    const pagesArr = [...new Array(noOfPages)];

    const onNextPage = () => pageChangeHandler(currentPage + 1);
    const onPrevPage = () => pageChangeHandler(currentPage - 1);
    const onPageSelect = (pageNo) => pageChangeHandler(pageNo);

    useEffect(() => {
        setCanGoBack(currentPage > 1);
        setCanGoNext(currentPage < noOfPages);
        pageChangeHandler(currentPage);
    }, [currentPage]);

    return (
        <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
                <div className="flex gap-2">
                    {canGoBack && (
                        <button
                            type="button"
                            onClick={onPrevPage}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Previous
                        </button>
                    )}
                    {pagesArr.map((page, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => onPageSelect(index + 1)}
                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-200 ${currentPage === (index + 1) ? 'bg-gray-200' : ''}`}>
                            {index + 1}
                        </button>
                    ))}
                    {canGoNext && (
                        <button
                            type="button"
                            onClick={onNextPage}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Next
                        </button>
                    )}
                </div>
            </div>
            <div>
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(currentPage - 1) * limit + 1}</span> to{" "}
                    <span className="font-medium">{currentPage * limit}</span> of{" "}
                    <span className="font-medium">{totalCount}</span> results
                </p>
            </div>
        </div>
    )
}