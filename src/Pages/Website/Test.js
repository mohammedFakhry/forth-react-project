import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'

const Test = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' })

    // handle form change
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.valur })
    }

    const focusInput = useRef(null)
    
    useEffect(() => {
        focusInput.current.focus()
    }, [])
    
    // ---------------------------------------
    const [click, setClick] = useState('')
    const count = useRef(0)

    useEffect(() => {
        count.current = count.current + 1;
    })
    

    return (
        <div className='container'>
            <div className='row'>
                <Form>
                    <div>
                        <h1 className='mb-5'>Register</h1>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type='text' name='name' onChange={handleChange} value={form.name} placeholder='your name ...' ref={focusInput} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type='text' name='email' onChange={handleChange} value={form.email} placeholder='your email ...' required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type='password' name='password' onChange={handleChange} value={form.password} placeholder='password' required />
                        </Form.Group>
                    </div>
                </Form>
            </div>

            <div className='row mt-5'>
                <input value={click} onChange={ (e)=> setClick(e.target.value) } />
                <p>count: {count.current}</p>
            </div>
        </div>
    )
}

export default Test
