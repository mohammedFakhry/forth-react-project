import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Axios } from '../../../Api/Axios'
import { USER } from '../../../Api/Api'
import { Form } from 'react-bootstrap'
import LoadingSubmit from '../../../Components/Loading/Loading'

const User = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [disabledButton, setDisabledButton] = useState(true)
    const [loadingPage, setLoadingPage] = useState(false)
    const navigate = useNavigate()

    // const id = Number(window.location.pathname.replace('/dashboard/users/', ''))
    const { id } = useParams()

    useEffect(() => {
        setLoadingPage(true)
        Axios.get(`${USER}/${id}`)
        .then( (data) => {
            setName(data.data.name)
            setEmail(data.data.email)
            setRole(data.data.role)
            setLoadingPage(false)
            } )
                .then( () => setDisabledButton(false) )
                .catch( () => navigate('/dashboard/users/page/404', {replace: true}) );
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        setLoadingPage(true)
        try {
            const res = await Axios.post(`${USER}/edit/${id}`, { name: name, email: email, role: role })
            window.location.pathname = '/dashboard/users'
        } catch (error) {
            setLoadingPage(false)
            console.log(error)
        }
    }
    

    return (
        <Form className='bg-white w-100 mx-2 p-3' onSubmit={handleSubmit}>
            { loadingPage && <LoadingSubmit /> }
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                <Form.Label>User Name</Form.Label>
                <Form.Control value={name} type='text' placeholder='name...' onChange={ (e)=>setName(e.target.value) }  />
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlInput2'>
                <Form.Label>Email</Form.Label>
                <Form.Control value={email} type='email' placeholder='name@example.com' onChange={ (e)=>setEmail(e.target.value) }  />
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlInput3'>
                <Form.Label>Role</Form.Label>
                <Form.Select value={role} placeholder='name@example.com' onChange={ (e)=>setRole(e.target.value) }>
                    <option value='' disabled>select role</option>
                    <option value={1995}>Admin</option>
                    <option value={2001}>User</option>
                    <option value={1996}>Writer</option>
                    <option value={1999}>Product Manger</option>
                </Form.Select>
            </Form.Group>
            <button className='btn btn-primary' disabled={disabledButton}>Save</button>
        </Form>
    )
}

export default User