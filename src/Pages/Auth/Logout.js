import React from 'react'
import { LOGOUT } from '../../Api/Api';
import { Axios } from '../../Api/Axios';

const Logout = () => {
    async function handleLogout() {
        try {
            const res = await Axios.get(`/${LOGOUT}`)
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <button onClick={handleLogout}>Logout</button>
    )
}

export default Logout