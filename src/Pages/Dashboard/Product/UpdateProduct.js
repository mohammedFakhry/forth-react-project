import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import LoadingSubmit from '../../../Components/Loading/Loading'
import { CATEGORIES, PRODUCT } from '../../../Api/Api'
import { Axios } from '../../../Api/Axios'


const UpdateProduct = () => {
    const [form, setForm] = useState({ category: 'Select Category', title: '', description: '', price: '', discount: '', About: '' })
    const [images, setImages] = useState([])
    const [categories, setCategories] = useState([])
    const [loadingPage, setLoadingPage] = useState(false)
    const [isSend, setIsSend] = useState(false)
    const [imagesFromServer, setImagesFromServer] = useState([])
    const [idsimagesDeleteFromServer, setidsImagesDeleteFromServer] = useState([])

    const { id } = useParams()

    const focusInput = useRef('');
    const openUploadImages = useRef(null);
    const progressImages = useRef([]);
    const ids = useRef([]);

    const navigate = useNavigate()
    

    useEffect(() => {
        focusInput.current.focus()
    }, [])

    // get data
    useEffect(() => {
        Axios.get(`/${PRODUCT}/${id}`)
        .then( (data)=> {
            setForm(data.data[0])
            setImagesFromServer(data.data[0].images)
        } )
        .then( (err)=> console.log(err) )
    }, [])

    function handleOpenUploadImages() {
        openUploadImages.current.click()
    }

    // get all categories
    useEffect(() => {
        Axios.get(`/${CATEGORIES}`)
            .then( (data)=> setCategories(data.data) )
            .catch( (err)=> console.log(err) )
    }, [])


    async function handleEdit(e) {
        e.preventDefault();
        setLoadingPage(true)
        
        try {
            for (let i = 0; i < idsimagesDeleteFromServer.length; i++) {
                await Axios.delete(`product-img/${idsimagesDeleteFromServer[i]}`)
                .then( (data)=> console.log(data) )
            }

            await Axios.post(`${PRODUCT}/edit/${id}`, form)
            navigate('/dashboard/products')
        } catch (error) {
            setLoadingPage(false)
            console.log(error)
        }
    }

    // setProductId(res.data.id);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleImageDelete(id, img) {
        const findId = ids.current[id]
        try {
            const res = await Axios.delete(`product-img/${findId}`)
            setImages( (prev) => prev.filter( (image)=> image !== img ) )
            ids.current = ids.current.filter( (id)=> id !== findId )
            j.current--
        } catch (error) {
            console.log(error);
        }
    }

    async function handleImageFromServerDelete(id) {
        setImagesFromServer( (prev)=> prev.filter( (img)=> img.id !== id ) )
        setidsImagesDeleteFromServer( (prev)=> {
            return [...prev, id]
        } )
        // try {
        //     await Axios.delete(`product-img/${id}`)
        //     .then( (data)=> console.log(data) )
        // } catch (error) {
        //     console.log(error);
        // }
    }

    const j = useRef(-1)

    async function handleImagesChange(e) {
        setImages( (prev)=> [...prev, ...e.target.files] )
        const imagesAsFiles = e.target.files;
        const imagesData = new FormData()
        for (let i = 0; i < imagesAsFiles.length; i++) {
            j.current++;
            imagesData.append('image', imagesAsFiles[i])
            imagesData.append('product_id', id)
            try {
                const res = await Axios.post('/product-img/add', imagesData, {
                    onUploadProgress: (progressEvent)=>{
                        const { loaded, total } = progressEvent;
                        const precent = Math.floor((loaded*100)/total)
                        if ( precent % 10 === 0 ) {
                            progressImages.current[j.current].style.width = `${precent}%`
                            progressImages.current[j.current].setAttribute('percent', `${precent}%`)
                        }
                    }
                })
                ids.current[j.current] = res.data.id
            } catch (error) {
                console.log(error);
            }
        }
    }

    const categoriesShow = categories.map( (item, idx)=> <option value={item.id} key={idx}>{item.title}</option> )

    const imageShow = images.map( (item, idx)=> (
        <div key={idx} className='border w-100 p-2'>
            <div className='d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center justify-content-start gap-2'>
                    <img src={URL.createObjectURL(item)} width='150px' />
                    <div>
                        <p className='mb-1'>{item.name}</p>
                        <p>{item.size / 1024 < 900? (item.size/1024).toFixed(2) + 'KB': (item.size/(1024*1024)).toFixed(2) + 'MB'}</p>
                    </div>
                </div>
                <Button onClick={ () => handleImageDelete(idx, item) } variant='danger'>x</Button>
            </div>
            <div className='custem-progress mt-3 w-100'>
                <span className='inner-progress'
                    ref={ (e)=> (progressImages.current[idx] = e) }
                >
                </span>
            </div>
        </div>
    ) )

    const imagesFromServerShow = imagesFromServer.map( (item, idx)=> (
        <div key={idx} className='border col-2 position-relative p-2 gap-2'>
            <div className='d-flex align-items-center justify-content-start gap-2'>
                <img src={item.image} className='w-100' alt='' />
            </div>
            <div className='position-absolute top-0 end-0 bg-danger rounded text-white' style={{ cursor: 'pointer' }}>
                <p className='py-1 px-2 m-0' onClick={ () => handleImageFromServerDelete(item.id) }>x</p>
            </div>
        </div>
    ) )

    return (
        <Form className='bg-white w-100 mx-2 p-3' onSubmit={handleEdit}>
            { loadingPage && <LoadingSubmit /> }
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput0'>
                <Form.Label>Category</Form.Label>
                <Form.Select name='category' value={form.category} placeholder='category...' onChange={handleChange} ref={focusInput}>
                    <option disabled>Select Category</option>
                    {categoriesShow}
                </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                <Form.Label>Title</Form.Label>
                <Form.Control name='title' value={form.title} type='text' placeholder='title...' onChange={handleChange} required />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput2'>
                <Form.Label>Description</Form.Label>
                <Form.Control name='description' value={form.description} type='text' placeholder='description...' onChange={handleChange} required />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput3'>
                <Form.Label>Price</Form.Label>
                <Form.Control name='price' value={form.price} type='number' placeholder='price...' onChange={handleChange} required />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput4'>
                <Form.Label>Discount</Form.Label>
                <Form.Control name='discount' value={form.discount} type='number' placeholder='discount...' onChange={handleChange} required />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput5'>
                <Form.Label>About</Form.Label>
                <Form.Control name='About' value={form.About} type='text' placeholder='about...' onChange={handleChange} required />
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlInput6'>
                <Form.Label>Images</Form.Label>
                <Form.Control type='file' onChange={handleImagesChange} ref={openUploadImages} multiple hidden />
            </Form.Group>
            <div onClick={handleOpenUploadImages} className='d-flex align-items-center justify-content-center gap-2 mb-3 py-3 rounded w-100 flex-column' style={{ border: '2px dashed #0086fe', cursor: isSend && 'pointer' }}>
                <img src={require('../../../Assets/images/photo1.jpg')} alt='upload here' width='100px' style={{ filter: !isSend && 'grayscale(1)' }} />
                <p className='fw-bold mb-0' style={{ color: !isSend? 'gray': '#0086fe' }}>Upload images</p>
            </div>

            <div className='d-flex align-items-start flex-wrap gap-2 mb-3'>{imagesFromServerShow}</div>
            <div className='d-flex align-items-start flex-column gap-2 mb-3'>{imageShow}</div>

            <button className='btn btn-primary' disabled={form.title.length > 1? false: true}>Save</button>
        </Form>
    )
}

export default UpdateProduct