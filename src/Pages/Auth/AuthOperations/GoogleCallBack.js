import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { baseURL, GOOGLE_CALL_BACK } from '../../../Api/Api';
import Cookie from 'cookie-universal'

const GoogleCallBack = () => {
    const location = useLocation();
    const cookie = Cookie();


    useEffect(() => {
        async function GoogleCall() {
            try {
                const res = await axios.get(`${baseURL}/${GOOGLE_CALL_BACK}${location.search}`);
                const token = res.data.access_token
                cookie.set('e-commerce', token)
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        GoogleCall();
    }, []);
    
    return (
        <div>
            <h2>GoogleCallBack</h2>
        </div>
    )
}

export default GoogleCallBack