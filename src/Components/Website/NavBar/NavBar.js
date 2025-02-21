import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Container, Modal, Button } from 'react-bootstrap'
import { Axios } from '../../../Api/Axios'
import { CATEGORIES } from '../../../Api/Api'
import './NavBar.css'
import StringSlice from '../../../helpers/StringSlice'
import SkeletonShow from '../../Skeleton/Skeleton'
import { faCartShopping, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Cart } from '../../../Context/CartChanger'
import PlusMinusBtn from '../Btns/PlusMinusBtn'

const NavBar = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const { isChange } = useContext(Cart)

    // console.log(isChange)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    useEffect(() => {
        // Axios.get(`${CATEGORIES}`).then( (res)=> console.log(res.data.slice(-8)))
        Axios.get(`${CATEGORIES}`).then( (res)=> setCategories(res.data.slice(-7)) ).finally( ()=> setLoading(false) )
    }, [])

    useEffect(() => {
        const getProduct = JSON.parse( localStorage.getItem('product') ) || [];
        setProducts(getProduct)
    }, [isChange])
    
    const categoriesShow = categories.map( (item, idx)=> (
        <Link to={`/category/${item.id}`} className='m-0 category-title text-black' key={idx}>{ StringSlice(item.title, 9) }</Link>
        // <p className='m-0' key={idx}>{ StringSlice(item.title, 10) }</p>
        // <p className='m-0' key={idx}>{ item.title.length > 15? item.title.slice(1, 40) + '...': item.title }</p>
    ) )

    const handleDeleteModal = (id) => {
        const filterProduct = products.filter( (product)=> product.id !== id );
        setProducts(filterProduct);
        localStorage.setItem('product', JSON.stringify(filterProduct))
    }
    
    const changeCount = (id, btnConut) => {
        const getProducts = JSON.parse( localStorage.getItem('product') ) || [];
        const findProduct = getProducts.find( (product)=> product.id === id );
        findProduct.count = count;
        localStorage.setItem('product', JSON.stringify(getProducts))
    }

    const productModalShow = products.map( (item, idx)=>(
        <div className='mb-4 position-relative' key={idx}>
            <div style={{ width: '20px', height: '20px', cursor: 'pointer' }} onClick={ ()=> handleDeleteModal(item.id) } className='position-absolute top-0 end-0 rounded-circle d-flex align-items-center justify-content-center bg-danger text-white'>
                <FontAwesomeIcon width='10px' icon={faXmark} />
            </div>
            <div className='d-flex align-items-start flex-wrap gap-2'>
                {/* <img src={item.images[0].image} height='80px' style={{ objectFit: 'cover' }} className='rounded col-12 col-sm-3' /> */}
                <img src={require('../../../Assets/images/3126552.png')} height='80px' style={{ objectFit: 'cover' }} className='rounded col-12 col-sm-3' />
                <div className='col-12 col-sm-6'>
                    <h6>{item.title}</h6>
                    <p className='m-0 text-truncate'>{item.description}</p>
                    <div className='d-flex align-items-center gap-3'>
                        <h5 className='m-0 text-primary'>{item.discount}$</h5>
                        <h6 className='m-0' style={{ color: 'gray', textDecoration: 'line-through' }}>{item.price}$</h6>
                    </div>
                </div>
                <PlusMinusBtn id={item.id} changeCount={changeCount} count={item.count || 1} setCount={setCount} />
            </div>
        </div>
    ) )


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>{productModalShow}</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>Close</Button>
                    <Button variant='primary' onClick={handleClose}>Checkout</Button>
                </Modal.Footer>
            </Modal>
            <nav className='py-3'>
                <Container>
                    <div className='d-flex align-items-center justify-content-betwen flex-wrap'>
                        <Link className='col-3' to='/'>
                            <img width='100px' src={require('../../../Assets/images/3126552.png')} alt='logo' />
                        </Link>

                        <div className='col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative'>
                            <Form.Control type='search' className='form-control custom-search py-3 rounded-0' placeholder='search product...' />
                            <h3 className='btn btn-primary position-absolute top-0 end-0 h-100 line-height m-0 px-4 rounded-0 d-flex align-items-center justify-content-center'>search</h3>
                        </div>

                        <div className='col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1'>
                            <div onClick={handleShow} className='' to='/cart'>
                                <FontAwesomeIcon icon={faCartShopping} size='2x' cursor='pointer' />
                                {/* <img width='30px' src={require('../../../Assets/images/3126552.png')} alt='cart' /> */}
                            </div>
                            <Link className='' to='/profile'>
                                <img width='30px' src={require('../../../Assets/images/3126552.png')} alt='profile' />
                            </Link>
                        </div>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex align-items-center justify-content-start gap-5'>
                            {loading? (
                                <>
                                    <SkeletonShow length='7' height='30px' width='80px' classess='col-3' />
                                </>
                            ):(
                                categoriesShow
                            )}
                            <Link to='/categories' className='text-black category-title'>show All</Link>
                        </div>
                    </div>
                </Container>
            </nav>
        </>
    )
}

export default NavBar
