import React, { useEffect, useState } from 'react'
import { Axios } from '../../../../Api/Axios'
import { TOP_RATED } from '../../../../Api/Api'
import TopRated from './TopRated'
import SkeletonShow from '../../../Skeleton/Skeleton'

const ShowTopRated = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Axios.get(`${TOP_RATED}`)
            .then( (res)=> setProducts(res.data) )
            .finally( ()=> setLoading(false) )
    }, [])

    const productsShow = products.map( (product, idx)=> (
        <TopRated key={idx} id={product.id} title={product.title} description={product.description} img={require('../../../../Assets/images/3126552.png')} sale price={product.price} discount={product.discount} rating={product.rating} />
        // <TopRated key={idx} id={product.id} title={product.title} description={product.description} img={product.images[0].image} sale price={product.price} discount={product.discount} rating={product.rating} />
        ))
    

    return (
        <div className='col-md-6 col-12' style={{ border: '2px solid #0D6EFD' }}>
            <h1 className='text-center m-0 p-3 bg-primary text-white'>Top Rate</h1>
            <div className='p-5'>
            {loading? (
                        <SkeletonShow length='1' height='700px' classes='col-12' />
                    ):(
                        productsShow
                    )}
            </div>
        </div>
    )
}

export default ShowTopRated