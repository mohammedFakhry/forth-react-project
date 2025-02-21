import React from 'react'
import '../Auth.css'
import { Link } from 'react-router-dom'

const Page403 = ({ role }) => {
    return (
        <div className='text-wrapper'>
            <div className='title'>
                403 - ACCESS DENIED
            </div>
            <div className='sub-title'>
                Oops, you don't have permission to assess this page
                <Link to={role === '1996'? '/dashboard/writer': '/'} className='d-block text-center btn btn-primary'>
                    {role === '1996'? 'go to writer page': 'go to home page'}
                </Link>
            </div>
        </div>
    )
}

export default Page403

