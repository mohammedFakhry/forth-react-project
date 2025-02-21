import React, { useEffect, useRef, useState } from 'react'
import { Axios } from '../../../Api/Axios'
import { USER } from '../../../Api/Api'
import { Form } from 'react-bootstrap'
import LoadingSubmit from '../../../Components/Loading/Loading'


const AddUser = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [loadingPage, setLoadingPage] = useState(false)
    const focusInput = useRef('')

    useEffect(() => {
        focusInput.current.focus()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        setLoadingPage(true)
        try {
            const res = await Axios.post(`${USER}/add`, { name: name, email: email, password: password, role: role })
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
                <Form.Control value={name} type='text' placeholder='name...' onChange={ (e)=>setName(e.target.value) } ref={focusInput} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlInput2'>
                <Form.Label>Email</Form.Label>
                <Form.Control value={email} type='email' placeholder='name@example.com' onChange={ (e)=>setEmail(e.target.value) }  />
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlInput3'>
                <Form.Label>Password</Form.Label>
                <Form.Control value={password} type='password' placeholder='password...' onChange={ (e)=>setPassword(e.target.value) }  />
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlInput4'>
                <Form.Label>Role</Form.Label>
                <Form.Select value={role} placeholder='name@example.com' onChange={ (e)=>setRole(e.target.value) }>
                    <option value='' disabled>select role</option>
                    <option value={1995}>Admin</option>
                    <option value={2001}>User</option>
                    <option value={1996}>Writer</option>
                    <option value={1999}>Product Manager</option>
                </Form.Select>
            </Form.Group>
            <button className='btn btn-primary' disabled={name.length > 1 && email.length > 1 && password.length > 6 && role !== '' ? false: true}>Save</button>
        </Form>
    )
}

export default AddUser