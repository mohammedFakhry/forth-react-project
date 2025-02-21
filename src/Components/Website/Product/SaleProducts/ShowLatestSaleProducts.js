import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { Axios } from "../../../../Api/Axios"
import { LATEST_SALE_PRODUCTS } from "../../../../Api/Api"
import Product from "./SaleProducts"
import SkeletonShow from "../../../Skeleton/Skeleton"

export default function LatestSaleProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Axios.get(`${LATEST_SALE_PRODUCTS}`).then( (res)=> setProducts(res.data) ).finally( ()=> setLoading(false) )
    }, [])

    
    // const productsShow = products.map( (item, idx)=> <Product title={item.title} description={item.description} image={item.images[0].image} sale price={item.price} discount={item.discount} /> )
    const productsShow = products.map( (item, idx)=> <Product key={idx} id={item.id} title={item.title} description={item.description} sale price={item.price} discount={item.discount} rating={item.rating} col='3' /> )
    
    return (
        <Container className='my-3'>
            <h1>Latest Sale Products</h1>
            <div className='d-flex align-items-stretch justify-content-center flex-wrap mt-5 row-gap'>
                {loading? (
                    <SkeletonShow length='5' height='200px' classes='col-lg-2 col-md-6 col-12' />
                ):(
                    productsShow
                )}
            </div>
        </Container>
    )
}
