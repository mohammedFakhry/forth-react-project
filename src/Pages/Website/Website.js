import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../../Components/Website/NavBar/NavBar'

const Website = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    )
}

export default Website