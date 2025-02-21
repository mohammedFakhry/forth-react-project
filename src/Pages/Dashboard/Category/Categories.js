import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { CATEGORY, CATEGORIES } from '../../../Api/Api'
import { Axios } from '../../../Api/Axios';
import { Link } from 'react-router-dom';
import Table from '../../../Css/components/Dashboard/Table';
import PaginatedItems from '../../../Css/components/Dashboard/pagination/Pagination';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [page, setpage] = useState(1);
    const [paginationLimit, setPaginationLimit] = useState(5);
    const [loading, setloading] = useState(false);
    const [totalData, settotalData] = useState(false);
    // const [search, setSearch] = useState('');
    const [debonceData, setDebonceData] = useState(false);

    // get all categories
    useEffect(() => {
        setloading(true)
        Axios.get(`/${CATEGORIES}?limit=${paginationLimit}&page=${page}`)
            .then( (data)=> {
                setCategories(data.data.data)
                settotalData(data.data.total)
            } )
            .catch( (err)=> console.log(err) )
            .finally( ()=> setloading(false) )
    }, [page, paginationLimit])

    const header = [
        {
            key: 'title',
            name: 'title',
        },
        {
            key: 'image',
            name: 'image'
        },
        {
            key: 'created_at',
            name: 'created'
        },
        {
            key: 'updated_at',
            name: 'updated'
        },
    ]

    async function handleDelete(id) {
        try {
            const res = await Axios.delete(`${CATEGORY}/${id}`)
            setCategories( (prev)=> prev.filter( (item)=> item.id !== id ) )
        } catch (err) {
            console.log(err)
        }
    }
    
    // async function getSearchData() {
    //     try {
    //         const res = await Axios.post(`${CATEGORY}/search?title=${search}`)
    //         console.log(res)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // useEffect(() => {
    //     const debounce = setTimeout(() => {
    //         getSearchData();
    //     }, 800);

    //     return ()=> clearTimeout(debounce)
    // }, [search])
    

    // const usersShow = users.map( (user, idx) => (
    //     <tr key={idx}>
    //         <td>{user.id}</td>
    //         <td>{user.name === currentUser.name? user.name + 'you': user.name }</td>
    //         <td>{user.email}</td>
    //         <td>{user.role === '1995'? 'admin': user.role === '2001'? 'user': user.role === '1999'? 'product manger': 'writer'}</td>
    //         <td>
    //             <div className='d-flex align-item-center gap-2'>
    //                 <Link to={`${user.id}`}>
    //                     { currentUser.name !== user.name && <FontAwesomeIcon fontSize={'19px'} icon={faPenToSquare} /> }
    //                 </Link>
    //                 <FontAwesomeIcon fontSize={'19px'} icon={faTrash} color='red' onClick={ () => handleDelete(user.id) } cursor={'pointer'} />
    //             </div>
    //         </td>
    //     </tr>
    // ) )

    // async function handleDelete(id) {
    //     if (currentUser.id !== id) {
    //         try {
    //             const res = await Axios.delete(`${CATEGORIES}/${id}`)
    //             setIsDeleteUser( (prev) => !prev )
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    // }

    return (
        <div className='bg-white w-100 p-2' >
            <div className='d-flex align-items-center justify-content-between'>
                <h2>Categories page</h2>
                <Link to='/dashboard/categories/add' className='btn btn-primary'>Add Category</Link>
            </div>

            {/* <Form.Control
                type='search'
                aria-label='input example'
                className='my-2'
                placeholder='search from back'
                value={search}
                // onChange={(e)=> setSearch(e.target.value)}
                onChange={ (e)=> setSearch(e.target.value) }
            /> */}
            {/* <button onClick={getSearchData}>search</button> */}

            <Table header={header} data={categories} handleDelete={handleDelete} paginationLimit={paginationLimit} page={page} setpage={setpage} setPaginationLimit={setPaginationLimit} loading={loading} totalData={totalData} searchColumn='title' searchLink={CATEGORY} />
            {/* <PaginatedItems itemsPerPage={5} data={categories} setpage={setpage} /> */}
            {/* <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>id</th>
                        <th>user name</th>
                        <th>email</th>
                        <th>role</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    { users.length === 0? <tr><td colSpan={12} className='text-center'>loading ...</td></tr>: users.length === 0 && noUsers? <tr><td colSpan={12} className='text-center'>No User Found</td></tr>: usersShow }
                </tbody>
            </Table> */}
        </div>
    )
}

export default Categories
