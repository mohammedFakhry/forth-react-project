import { useEffect, useState } from "react"
import { Axios } from "../../../../Api/Axios"
import { LATEST } from "../../../../Api/Api"
import Product from "../SaleProducts/SaleProducts"
import SkeletonShow from "../../../Skeleton/Skeleton"

export default function ShowLatestProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Axios.get(`${LATEST}`).then( (res)=> setProducts(res.data) ).finally( ()=> setLoading(false) )
    }, [])

    
    // const productsShow = products.map( (item, idx)=> <Product key={idx} id={item.id} title={item.title} image={item.images[0].image} description={item.description} sale price={item.price} discount={item.discount} rating={item.rating} col='6' /> )
    const productsShow = products.map( (item, idx)=> <Product key={idx} id={item.id} title={item.title} description={item.description} sale price={item.price} discount={item.discount} rating={item.rating} col='6' /> )
    
    return (
        <div className='col-md-6 col-12'>
            <div className='ms-md-3'>
                <h1>Latest Products</h1>
                <div className='d-flex align-items-stretch justify-content-center flex-wrap mt-5 row-gap'>
                    {loading? (
                        <SkeletonShow length='5' height='200px' classes='col-md-6 col-12' />
                    ):(
                        productsShow
                    )}
                </div>
            </div>
        </div>
    )
}