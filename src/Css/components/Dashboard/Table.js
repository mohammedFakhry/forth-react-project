import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table as TableBootstrab, Form } from 'react-bootstrap'
import PaginatedItems from './pagination/Pagination'
import { Axios } from '../../../Api/Axios'
import TransformDate from '../../../helpers/TransformDate'

const Table = ({ header, data, handleDelete, currentUser, paginationLimit, page, setpage, setPaginationLimit, loading, totalData, searchColumn, searchLink }) => {
    const currentUser_ = currentUser || { name: '' };
    const [search, setSearch] = useState('')
    const [date, setDate] = useState('')
    const [filterdData, setFilterdData] = useState([])
    const [searchLoading, setsearchLoading] = useState(false)

    const filteredDataByDate = date.length !== 0? data.filter(
        (item) => TransformDate(item.created_at) === date
    ): data;

    const filteredSearchaByDate = date.length !== 0? filterdData.filter( 
        (item) => TransformDate(item.created_at) === date
    ): filterdData;

    const showWhichData = search.length > 0? filteredSearchaByDate: filteredDataByDate;
    // const showWhichData = search.length > 0? filterdData: filteredDataByDate;
    // const showWhichData = search.length > 0? filterdData: data;

    const headerShow = header.map( (item, idx)=> <th key={idx}>{item.name}</th>  )


    // const start = (page - 1) * paginationLimit;
    // const end = Number(start) + Number(paginationLimit);
    // const final = data.slice(start, end);

    // const dataShow = data.map( (item, idx) => (
    // const dataShow = final.map( (item, idx) => (
    
    // const searchedData = data.filter( (item)=> item[searchColumn].toLowerCase().includes(search.toLowerCase()) )

    // const handleSearch = (e)=>{
    //     setSearch(e.target.value)
    // }

    // const dataShow = searchedData.map( (item, idx) => (
    // const dataShow = data.map( (item, idx) => (
    const dataShow = showWhichData.map( (item, idx) => (
            <tr key={idx}>
                <td key={idx}>{item.id}</td>
                {
                    header.map( (itm, idx) => (<td key={idx}>{
                        itm.key === 'image'? (
                            <img src={item[itm.key]} width='50px' alt='' />
                        ) : itm.key === 'images'? (
                            <div className='d-flex align-items-center justify-content-start gap-2 flex-wrap'>
                                {item[itm.key].map( (img, idx)=> <img src={img.image} width='50px' key={idx} /> )}
                            </div>
                        ): itm.key === 'created_at' || itm.key === 'updated_at'? (
                            TransformDate(item[itm.key])
                        ): item[itm.key] === '1995'?
                        'admin':
                        item[itm.key] === '2001'?
                        'user':
                        item[itm.key] === '1996'?
                        'writer':
                        item[itm.key] === '1999'?
                        'product manager':
                        item[itm.key]
                    }
                    { currentUser_ && item[itm.key] === currentUser_.name && ' (you)' }
                </td> ))
                }
                <td>
                    <div className='d-flex align-item-center gap-2'>
                        <Link to={`${item.id}`}>
                        <FontAwesomeIcon fontSize={'19px'} icon={faPenToSquare} />
                        </Link>
                        { currentUser_.name !== item.name && <FontAwesomeIcon fontSize={'19px'} onClick={ () => handleDelete(item.id) } icon={faTrash} color='red' cursor={'pointer'} /> }
                    </div>
                </td>
            </tr>
        ) 
    )

    async function getSearchData() {
        try {
            const res = await Axios.post(`${searchLink}/search?title=${search}`);
            search.length > 0? setFilterdData(res.data): setsearchLoading(false);
            // setFilterdData(res.data)
            // console.log(res)
        } catch (err) {
            console.log(err)
        } finally {
            setsearchLoading(false)
        }
    }

    useEffect(() => {
        const debounce = setTimeout(() => {
            getSearchData();
        }, 800);

        return ()=> clearTimeout(debounce)
    }, [search])

    return (
        <>
            <div className='col-4'>
                <Form.Control
                    type='search'
                    aria-label='input example'
                    className='my-2'
                    placeholder='search from front'
                    // onChange={handleSearch}
                    onChange={ (e)=> {
                        setSearch(e.target.value)
                        setsearchLoading(true)
                    } }
                />
            </div>
            <div className='col-5'>
                <Form.Control
                    type='date'
                    aria-label='input example'
                    className='my-2'
                    placeholder='search from front'
                    // onChange={handleSearch}
                    onChange={ (e)=> {
                        setDate(e.target.value)
                        // setsearchLoading(true)
                    } }
                />
            </div>

            <TableBootstrab striped bordered hover responsive>
                <thead variant="dark">
                    <tr className='text-center'>
                        <th>id</th>
                        {headerShow}
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? <tr className='text-center'><td colSpan={12}>Loading ...</td></tr>: searchLoading? <tr className='text-center'><td colSpan={12}>Searching ...</td></tr>: dataShow}
                    {/* {data.length === 0 && <tr className='text-center'><td colSpan={12}>Loading ...</td></tr>} */}

                    {/* {dataShow} */}
                    {/* { users.length === 0? <tr><td colSpan={12} className='text-center'>loading ...</td></tr>: users.length === 0 && noUsers? <tr><td colSpan={12} className='text-center'>No User Found</td></tr>: usersShow } */}
                </tbody>
            </TableBootstrab>

            <div className='d-flex align-items-center justify-content-end flex-wrap'>
                <div className='col-1'>
                    <Form.Select onChange={ (e)=> setPaginationLimit(e.target.value) } aria-label='default select example' className='mb-3'>
                        <option value={3}>3</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </Form.Select>
                </div>

                <PaginatedItems itemsPerPage={paginationLimit} data={data} setpage={setpage} totalData={totalData} />
            </div>
        </>
    )
}

export default Table