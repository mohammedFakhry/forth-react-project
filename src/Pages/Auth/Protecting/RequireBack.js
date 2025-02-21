import React from 'react'
import { Outlet } from 'react-router-dom'
import Cookie from 'cookie-universal'

const RequireBack = () => {
    const cookie = Cookie();
    const token = cookie.get('e-commerce')

    return token? window.history.back(): <Outlet />
}

export default RequireBack