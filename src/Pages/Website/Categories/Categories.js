import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { CATEGORIES } from '../../../Api/Api'
import { Axios } from '../../../Api/Axios'
import StringSlice from '../../../helpers/StringSlice'
import SkeletonShow from '../../../Components/Skeleton/Skeleton'

const WebsiteCategories = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Axios.get(`${CATEGORIES}`).then( (res)=> setCategories(res.data) ).finally( ()=> setLoading(false) )
    }, [])

    const showCategories = categories.map( (item, idx)=> (
        <div className='col-lg-2 col-md-6 col-12 bg-transparent border-0'>
            <div className='m-1 bg-white d-flex align-items-center justify-content-start gap-3 border rounded py-2 h-100'>
                <img src={item.image} alt='just an img' className='ms-3' width='50px' />
                <p className='m-0'>{ StringSlice(item.title, 15) }</p>
                {/* <p className='m-0'>{ item.title.length > 12? item.title.slice(1, 40) + '...': item.title }</p> */}
            </div>
        </div>
    ) )

    return (
        <>
            {/* <NavBar /> */}
            <div className='bg-secondary py-5'>
                <Container>
                    <div className='d-flex align-items-stretch justify-content-center flex-wrap row-gap-2'>
                        {loading? (
                            <SkeletonShow length='15' height='70px' />
                        ):(
                            showCategories
                        )}
                    </div>
                </Container>
            </div>
        </>
    )
}

export default WebsiteCategories