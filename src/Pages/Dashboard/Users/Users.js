import React, { useEffect, useState } from 'react'
import { USER, USERS } from '../../../Api/Api'
import  Table from '../../../Css/components/Dashboard/Table'
import { Axios } from '../../../Api/Axios'
import { Link } from 'react-router-dom'

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isDeleteuser, setIsDeleteUser] = useState(false);
    // const [noUsers, setNoUsers] = useState(false);
    const [currentUser, setcurrentUser] = useState('');
    const [page, setpage] = useState(1);
    const [paginationLimit, setPaginationLimit] = useState(5);
    const [loading, setloading] = useState(false);
    const [totalData, seTtotalData] = useState(false);

    useEffect(() => {
        Axios.get(`${USER}?limit=${paginationLimit}&page=${page}`)
        .then( (res) => setcurrentUser(res.data) )
    }, [])
    
    // axios.get(`${baseURL}/${USERS}`, { headers: {Authorization: 'Bearer ' + cookie.get('e-commerce'),}, } )
    useEffect(() => {
        setloading(true)
        Axios.get(`/${USERS}`)
        .then( (data)=> {
            setUsers(data.data.data)
            seTtotalData(data.data.total)
        } )
        .catch( (err)=> console.log(err) )
        .finally( ()=> setloading(false) )
    }, [isDeleteuser, page, paginationLimit])

    const header = [
        {
            key: 'name',
            name: 'user name'
        },
        {
            key: 'email',
            name: 'email'
        },
        {
            key: 'role',
            name: 'role'
        },
        {
            key: 'created_at',
            name: 'created'
        },
        {
            key: 'updated_at',
            name: 'last login'
        },
    ]

    async function handleDelete(id) {
        try {
            const res = await Axios.delete(`${USER}/${id}`)
            setUsers( (prev)=> prev.filter( (item)=> item.id !== id ) )
        } catch (err) {
            console.log(err)
        }
    }


    // filter user from all user
    // const userFilter = users.filter( (user) => user.id !== currentUser.id )
    

    // const usersShow = userFilter.map( (user, idx) => (
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
    //             const res = await Axios.delete(`${USER}/${id}`)
    //             setIsDeleteUser( (prev) => !prev )
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    // }

    return (
        <div className='bg-white w-100 p-2' >
            <div className='d-flex align-items-center justify-content-between'>
                <h2>User page</h2>
                <Link to='/dashboard/user/add' className='btn btn-primary'>Add User</Link>
            </div>

            <Table header={header} data={users} handleDelete={handleDelete} currentUser={currentUser} page={page} setpage={setpage} paginationLimit={paginationLimit} setPaginationLimit={setPaginationLimit} loading={loading} totalData={totalData} searchColumn='name' />
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

export default Users