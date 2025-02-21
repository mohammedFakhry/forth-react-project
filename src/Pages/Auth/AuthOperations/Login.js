import React, { useEffect, useRef, useState, } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOGIN, baseURL } from '../../../Api/Api';
import axios from 'axios';
import LoadingSubmit from '../../../Components/Loading/Loading';
import Cookie from 'cookie-universal';
import { Form } from 'react-bootstrap';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const focusInput = useRef('')

    useEffect(() => {
        focusInput.current.focus()
    }, [])
    

    const cookie = Cookie();
    const navigate = useNavigate();

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${baseURL}/${LOGIN}`, { email: form.email, password: form.password });
            setLoading(false)
            console.log(res);
            const token = res.data.token;
            const role = res.data.user.role;
            const go = role === '1995'? 'users': 'writer';
            cookie.set('e-commerce', token)
            window.location.pathname = `/dashboard/${go}`
            // navigate('/dashboard/users', { replace: true })
        } catch (error) {
            setLoading(false)
            if ( error.response.status === 401 ) {
                setError('wrong email or password')
            } else {
                setError('internal server error');
            }
        }
    }

return (
    <>
        { loading && <LoadingSubmit /> }
        <div className='container'>
            <div className='row' style={{ height: '100vh' }}>
                <Form className='form' onSubmit={handleSubmit}>
                    <div className='custum-form'>
                        <h2 className='mb-3'>Login</h2>

                        <Form.Group className='mb-3 form-control-custom' controlId='exampleForm.ControlInput1'>
                            <Form.Control value={form.email} onChange={handleChange} name='email' type='email' placeholder='enter your email' ref={focusInput} required/>
                            <Form.Label>Email: </Form.Label>
                        </Form.Group>    
                        <Form.Group className='mb-3 form-control-custom' controlId='exampleForm.ControlInput2'>
                            <Form.Control value={form.password} onChange={handleChange} minLength='4' name='password' type='text' placeholder='enter your password'required/>
                            <Form.Label>Password: </Form.Label>
                        </Form.Group>    
                        <button className='btn btn-primary'>submit</button>
                        <div className='google-btn'>
                            <a href='http://127.0.0.1:8000/login-google'>
                                <div className='google-icon-wrapper'>
                                    <img className='google-icon' src='http://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22g%22_Logo.svg' alt='sigin in with google' />
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

export default Login