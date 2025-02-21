import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { Container } from 'react-bootstrap'
import StringSlice from '../../../../helpers/StringSlice'
import { NavLink } from 'react-router-dom'

const Product = (props) => {
    const roundStar = Math.round( props.rating, 5 );
    const stars = Math.min( roundStar, 5 );

    const showGoldStars = Array.from({length: stars}).map( (_, idx)=> (
        <FontAwesomeIcon style={{ color: 'gold' }} icon={solidStar} key={idx} />
    ) )

    const showEmptyStars = Array.from({length: 5-stars}).map( (_, idx)=> (
        <FontAwesomeIcon icon={regularStar} key={idx} />
    ) )


    return (
        <NavLink to={`/product/${props.id}`} className={`col-lg-${props.col} col-md-6 col-12 mt-3`}>
            <div className='m-1 rounded border p-3 h-100'>
                <div className='border-bottom pb-3'>
                    <p className='text-truncate' style={{ color: 'gray' }}>{props.title}</p>
                    <p className='text-black text-truncate'>{props.description}</p>

                    <div className='px-5 py-4 position-relative'>
                        { props.sale && <p style={{ width: '50px', height: '50px', lineHeight: '50px' }} className='m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block text-center'>Sale</p>}
                        <img src={require('../../../../Assets/images/3126552.png')} alt='' className='img-fluid' />
                        {/* <img src={props.image} alt='' className='img-fluid' /> */}
                    </div>
                </div>

                <div className='d-flex align-items-center justify-content-between mt-2'>
                    <div>
                        {showGoldStars}
                        {showEmptyStars}
                        {/* <FontAwesomeIcon icon={solidStar} /> */}
                        {/* <FontAwesomeIcon icon={regularStar} /> */}
                        <div className='d-flex align-items-center gap-3'>
                            <h5 className='text-primary m-0'>{props.discount}$</h5>
                            <h6 style={{ color: 'gray', textDecoration: 'line-through' }} className='m-0'>{props.price}$</h6>
                        </div>
                    </div>
                    <div className='border p-2 rounded'>
                        <img src={require('../../../../Assets/images/3126552.png')} alt='cart' width='20px' />
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default Product
//  Product page