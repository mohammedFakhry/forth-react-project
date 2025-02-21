import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import ImageGallery from "react-image-gallery";
import { Axios } from '../../../Api/Axios';
import { CART, PRODUCT } from '../../../Api/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import SkeletonShow from '../../../Components/Skeleton/Skeleton';
import { Cart } from '../../../Context/CartChanger';
import PlusMinusBtn from '../../../Components/Website/Btns/PlusMinusBtn';

const SingleProduct = () => {
    const [product, setProduct] = useState({})
    const [productImages, setProductImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState(5)
    const [error, setError] = useState('')
    const [loadingCart, setLoadingCart] = useState(false)
    const { id } = useParams();
    const { setIsChange } = useContext(Cart)


    const roundStar = Math.round( product.rating, 5 );
    const stars = Math.min( roundStar, 5 );

    const showGoldStars = Array.from({length: stars}).map( (_, idx)=> (
        <FontAwesomeIcon style={{ color: 'gold' }} icon={solidStar} key={idx} />
    ) )

    const showEmptyStars = Array.from({length: 5-stars}).map( (_, idx)=> (
        <FontAwesomeIcon icon={regularStar} key={idx} />
    ) )


    useEffect(() => {
        Axios.get(`${PRODUCT}/${id}`)
            .then( (res)=> {
                setProductImages( 
                    res.data[0].images.map( (img)=> { 
                        return { original: img.image, thumbnail: img.image }
                } )
            )
            setProduct(res.data[0])
        })
        .finally( ()=> setLoading(false) )
    }, [])

    const checkStock = async ()=> {
        try {
            setLoadingCart(true);

            const getItems = JSON.parse( localStorage.getItem('product') ) || [];
            const productCount = getItems.filter( (itm)=> itm.id == id )?.[0]?.count;

            await Axios.post( `${CART}/check`, {product_id: product.id, count: count} );

            return true
        } catch (error) {
            console.log(error)
            return false
        } finally {
            setLoadingCart(false)
        }
    }

    const handleSave = async ()=> {
        const check = await checkStock();
        if (check) {
            const getItems = JSON.parse( localStorage.getItem('product') ) || [];

            const productExist = getItems.findIndex( (product)=> product.id == id );
            // console.log(productExist);

            if (productExist !== -1) {
                if (getItems[productExist].count) {
                    getItems[productExist].count += count;
                } else {
                    getItems[productExist].count = count;
                }
            } else {
                if (count > 1) {
                    product.count = count;
                }
                getItems.push(product);
            }

            localStorage.setItem('product', JSON.stringify(getItems));
            setIsChange( (prev) => !prev )
        }
    }
    

    return (
        <Container className='my-5'>
            <div className='d-flex align-items-start flex-wrap row-gap-5'>
                { loading? (
                    <>
                        <div className='col-lg-4 col-md-6 col-12'>
                            <SkeletonShow height='250px' length='1' classess='col-12' />{" "}
                            <div className='col-12 d-flex mt-1'>
                                <SkeletonShow height='100px' length='1' classess='col-4' />
                                <SkeletonShow height='100px' length='1' classess='col-4' />
                                <SkeletonShow height='100px' length='1' classess='col-4' />
                            </div>
                        </div>
                        <div className='col-lg-8 col-md-6 col-12'>
                            <div className='ms-lg-5'>
                                <SkeletonShow height='20px' length='1' classess='col-lg-8 col-12' />{" "}
                                <SkeletonShow height='210px' length='1' classess='col-lg-8 col-12 mt-2' />{" "}
                                <hr className='col-lg-8 col-12 mt-2'/>
                                <div className='d-flex align-items-center justify-content-between col-lg-8 col-12'>
                                    <SkeletonShow height='20px' length='1' classess='col-4 mt-2' />{" "}
                                    <SkeletonShow height='20px' length='1' classess='col-4 mt-2' />{" "}
                                </div>
                            </div>
                        </div>
                    </>
                ) :
                    <>
                        <div className='col-lg-4 col-md-6 col-12'>
                            <ImageGallery items={productImages} />
                        </div>
                        <div className='col-lg-8 col-md-6 col-12'>
                            <div className='ms-4'>
                                <h2>{product.title}</h2>
                                <h2 style={{ color: 'gray' }}>{product.About}</h2>
                                <h2>{product.description}</h2>
                            </div>

                            <div className='d-flex align-items-center justify-content-between mt-2'>
                                <div>
                                    { product.stock === 1 && ( <p className='text-danger'>There is only one left</p> ) }
                                    {showGoldStars}
                                    {showEmptyStars}
                                    <div className='d-flex align-items-center gap-3'>
                                        <h5 className='text-primary m-0'>{product.discount}$</h5>
                                        <h6 style={{ color: 'gray', textDecoration: 'line-through' }} className='m-0'>{product.price}$</h6>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center gap-4'>
                                    <PlusMinusBtn setCount={ (data)=> setCount(data) } />
                                    <div onClick={handleSave} className='border p-2 rounded'>
                                        {
                                            loadingCart? (
                                                'loading ...'
                                            ):(
                                                <FontAwesomeIcon icon={faCartShopping} color='blue' cursor='pointer' />
                                            )
                                        }
                                        {/* <img src={require('../../../Assets/images/3126552.png')} alt='cart' width='20px' /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </Container>
    )
}

export default SingleProduct
