import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './bars.css'
import { Menu } from '../../../Context/MenuContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { LOGOUT, USER } from '../../../Api/Api';
import { Axios } from '../../../Api/Axios';
import { DropdownButton, Dropdown } from 'react-bootstrap';

const TopBar = () => {
    const [name, setName] = useState('');

    const menu = useContext(Menu);
    const setIsOpen = menu.setIsOpen;

    const navigate = useNavigate()

    useEffect(() => {
        Axios.get(`/${USER}`)
            .then( (data) => setName(data.data.name) )
            .catch( () => navigate('/login', {replace: true}) )
    }, [])

    async function handleLogOut() {
        try {
            const res = await Axios.get(`/${LOGOUT}`)
            window.location.pathname = '/login'
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <div className='top-bar mt-1 border rounded-top shadow-sm'>
            <div className='d-flex align-items-center justify-content-between h-100'>
                <div className='d-flex align-items-center gap-5'>
                    <p className='m-0'>E-commerce</p>
                    <FontAwesomeIcon onClick={ () => setIsOpen( (prev)=> !prev ) } icon={faBars} cursor={'pointer'}/>
                </div>
                <div>
                    <DropdownButton id='dropdown-basic-button' title={name}>
                        <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
        </div>
    )
}

export default TopBar