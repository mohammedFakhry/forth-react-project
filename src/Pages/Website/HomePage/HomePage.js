import React from 'react'
import { Container } from 'react-bootstrap'
import Landing from '../../../Components/Website/Landing/Landing'
import Product from '../../../Components/Website/Product/SaleProducts/SaleProducts'
import LatestSaleProducts from '../../../Components/Website/Product/SaleProducts/ShowLatestSaleProducts'
import './HomePage.css'
import ShowLatestProducts from '../../../Components/Website/Product/LatestProducts/ShowLatestProducts'
import ShowTopRated from '../../../Components/Website/Product/TopRated/ShowTopRated'

const HomePage = () => {
return (
    <div>
        <Landing />
        <LatestSaleProducts />
        <Container>
            <div className='d-flex align-items-start flex-wrap mt-5'>
                <ShowTopRated />
                <ShowLatestProducts />
            </div>
        </Container>
        <Product />
    </div>
)
}

export default HomePage
