import React, { useEffect, useState } from 'react'
import { PRODUCT, PRODUCTS } from '../../../Api/Api';
import { Axios } from '../../../Api/Axios';
import { Link } from 'react-router-dom';
import Table from '../../../Css/components/Dashboard/Table';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [page, setpage] = useState(1);
    const [paginationLimit, setPaginationLimit] = useState(5);
    const [loading, setloading] = useState(false);
    const [totalData, seTtotalData] = useState(false);

    // get all categories
    useEffect(() => {
        setloading(true)
        Axios.get(`/${PRODUCTS}?limit=${paginationLimit}&page=${page}`)
            .then( (data)=> {
                setProducts(data.data.data)
                seTtotalData(data.data.total)
            } )
            .catch( (err)=> console.log(err) )
            .finally( ()=> setloading(false) )
    }, [page, paginationLimit])

    const header = [
        {
            key: 'images',
            name: 'Images',
        },
        {
            key: 'title',
            name: 'title',
        },
        {
            key: 'description',
            name: 'Description'
        },
        {
            key: 'price',
            name: 'Price'
        },
        {
            key: 'rating',
            name: 'Rating'
        },
        {
            key: 'created_at',
            name: 'created'
        },
        {
            key: 'updated_at',
            name: 'updated'
        },
    ]

    async function handleDelete(id) {
        try {
            const res = await Axios.delete(`${PRODUCT}/${id}`)
            setProducts( (prev)=> prev.filter( (item)=> item.id !== id ) )
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='bg-white w-100 p-2 rounded-bottom shadow-sm' >
            <div className='d-flex align-items-center justify-content-between'>
                <h2>Products page</h2>
                <Link to='/dashboard/categories/add' className='btn btn-primary'>Add Product</Link>
            </div>

            <Table header={header} data={products} handleDelete={handleDelete} page={page} setpage={setpage} paginationLimit={paginationLimit} setPaginationLimit={setPaginationLimit} loading={loading} totalData={totalData} searchColumn='title' />
        </div>
    )
}

export default Products