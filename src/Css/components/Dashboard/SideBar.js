import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu } from '../../../Context/MenuContext'
import { WindowSize } from '../../../Context/WindowContext'
import { USER } from '../../../Api/Api'
import { Axios } from '../../../Api/Axios'
import { Links } from './NavLinks'

const SideBar = () => {
    const menu = useContext(Menu);
    const windowSizeContext = useContext(WindowSize);
    const windowSize = windowSizeContext.windowSize
    const isOpen = menu.isOpen
    const navigate = useNavigate()
    const [user, setUser] = useState('');
    
    useEffect(() => {
        Axios.get(`/${USER}`)
        .then( (data) => setUser(data.data) )
        .catch( () => navigate('/login', {replace: true}) )
    }, [])
    
    // console.log(isOpen)
    // console.log(windowSize)

    return (
        <>
            <div style={{
                position: 'fixed',
                width: '100%',
                height: '100vh',
                top: '0',
                left: '0',
                backgroundColor: 'rgb(179 170 170 / 82%)',
                display: windowSize<'768' && isOpen? 'block': 'none'
            }}>
            </div>
                    
            <div className='side-bar border-right shadow'
                style={{
                    left: windowSize<'768'? (isOpen? '0': '-100%'): 0,
                    width: isOpen? '24%': 'fit-content',
                    position: windowSize<'768'? 'fixed': 'sticky',
                }}
            >
                { Links.map( (link, idx) => (
                    link.role.includes(user.role) && (
                        <NavLink key={idx} to={link.path} className='d-flex align-items-center gap-2 side-bar-link'>
                            <FontAwesomeIcon icon={link.icon} style={{ padding: isOpen? '10px 8px 10px 15px': '10px' }} />
                            <span style={{ display: isOpen? 'block': 'none' }}>{link.name}</span>
                        </NavLink>
                    )
                ) ) }
            </div>
        </>
    )
}

export default SideBar