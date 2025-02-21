import React, { useEffect, useState } from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import Cookie from 'cookie-universal'
import { USER } from '../../../Api/Api'
import LoadingSubmit from '../../../Components/Loading/Loading'
import { Axios } from '../../../Api/Axios'
import Page403 from '../Errors/403'

const RequireAuth = ({ allowedRole }) => {
    const [user, setUser] = useState('');
    const navigate = useNavigate()

    const cookie = Cookie();
    const token = cookie.get('e-commerce');

    useEffect(() => {
        Axios.get(`/${USER}`)
            .then( (data) => setUser(data.data) )
            .catch( () => navigate('/login', {replace: true}) )
    }, [])
    

    return token?
        user === ''? (
            <LoadingSubmit /> 
        ) : allowedRole.includes(user.role) ?(
            <Outlet />
        ) : (
            <Page403 role={user.role} />
        ) : (
        <Navigate to={'/login'} replace={true} />
        )
}

export default RequireAuth