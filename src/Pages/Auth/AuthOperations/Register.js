import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { REGISTER, baseURL } from '../../../Api/Api'
import LoadingSubmit from '../../../Components/Loading/Loading';
import Cookie from 'cookie-universal';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Rsgister = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const cookie = Cookie();
    const focusInput = useRef('')

    useEffect(() => {
        focusInput.current.focus()
    }, [])

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await axios.post(`${baseURL}/${REGISTER}`, form);
            setLoading(false)
            const token = res.data.token;
            cookie.set('e-commerce', token)
            // window.location.pathname = '/users';
            navigate('/dashboard/users', { replace: true })
        } catch (err) {
            setLoading(false);
            if ( err.response.status === 422 ) {
                setError('email is alredy been taken');
            } else {
                console.log(err)
                setError('internal server error');
            }
        }
    }

    // console.log(baseURL)
return (
    <>
    { loading && <LoadingSubmit /> } 
    <div className='container'>
        <div className='row' style={{ height: '100vh' }}>
            <Form className='form' onSubmit={handleSubmit}>
                <div className='custum-form'>
                    <h2 className='mb-3'>Register Now</h2>
                    <Form.Group className='form-control-custom'>
                        <Form.Control value={form.name} onChange={handleChange} id='name' name='name' type='text' placeholder='enter your name' ref={focusInput} required/>
                        <Form.Label htmlFor='name'>Name: </Form.Label>
                    </Form.Group>    
                    <Form.Group className='form-control-custom'>
                        <Form.Control value={form.email} onChange={handleChange} id='email' name='email' type='text' placeholder='enter your email'required/>
                        <Form.Label htmlFor='email'>Email: </Form.Label>
                    </Form.Group>    
                    <Form.Group className='form-control-custom'>
                        <Form.Control value={form.password} onChange={handleChange} minLength='4' id='password' name='password' type='text' placeholder='enter your password'required/>
                        <Form.Label htmlFor='password'>Password: </Form.Label>
                    </Form.Group>    
                    <button className='btn btn-primary'>submit</button>
                    <div className='google-btn'>
                        <a href='http://127.0.0.1:8000/login-google'>
                            <div className='google-icon-wrapper'>
                                <img className='google-icon' src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' alt='sigin in with google' />
                            </div>
                            <p className='btn-text'><b>sign in with google</b></p>
                        </a>
                    </div>
                    { error !== '' && <span className='error'>{error}</span> }
                </div>
            </Form>
        </div>
    </div>
    </>
)
}

export default Rsgister
