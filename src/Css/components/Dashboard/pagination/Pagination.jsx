import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import './pagination.css'


const PaginatedItems = ({ itemsPerPage, data, setpage, totalData })=> {
    // const pageCount = data.length / itemsPerPage;
    const pageCount = totalData / itemsPerPage;
    
    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                onPageChange={ (e)=> setpage(e.selected + 1) }
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="<<"
                renderOnZeroPageCount={null}
                containerClassName='custom-pagitation d-flex align-items-center justify-content-end flex-wrap'
                pageLinkClassName='pagination-tag-anchor text-center mx-2 px-2 rounded-circle'
                activeLinkClassName='text-white bg-primary'
            />
        </>
    )
}

export default PaginatedItems
