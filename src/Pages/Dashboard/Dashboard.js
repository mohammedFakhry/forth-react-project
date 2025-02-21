import React from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from '../../Css/components/Dashboard/TopBar'
import SideBar from '../../Css/components/Dashboard/SideBar'
import './dashboard.css'

const Dashboard = () => {
    return (
        <div className='dashboard position-relative'>
            <div className='d-flex gap-3'>
                <SideBar />
                {/* <div className='pg-danger' style={{ marginTop: '80px', left: '24%' }}> */}
                <div className='d-flex flex-column gap-3 w-100' style={{ marginRight: '1%' }}>
                    <TopBar />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard