import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Axios } from '../../../Api/Axios'
import { CATEGORY } from '../../../Api/Api'
import { Form } from 'react-bootstrap'
import LoadingSubmit from '../../../Components/Loading/Loading'


const Category = () => {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [disabledButton, setDisabledButton] = useState(true)
    const [loadingPage, setLoadingPage] = useState(false)
    const navigate = useNavigate()

    // const id = Number(window.location.pathname.replace('/dashboard/categories/', ''))
    const { id } = useParams()

    useEffect(() => {
        setLoadingPage(true)
        Axios.get(`${CATEGORY}/${id}`)
        .then( (data) => {
            setTitle(data.data.title)
            setLoadingPage(false)
            } )
                .then( () => setDisabledButton(false) )
                .catch( () => navigate('/dashboard/categories/page/404', {replace: true}) );
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        setLoadingPage(true)

        const form = new FormData()
        form.append('title', title)
        form.append('image', image)

        try {
            const res = await Axios.post(`${CATEGORY}/edit/${id}`, form)
            window.location.pathname = '/dashboard/categories'
        } catch (error) {
            setLoadingPage(false)
            console.log(error)
        }
    }

    return (
        <Form className='bg-white w-100 mx-2 p-3' onSubmit={handleSubmit}>
            { loadingPage && <LoadingSubmit /> }
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                <Form.Label>Title</Form.Label>
                <Form.Control value={title} type='text' placeholder='title...' onChange={ (e)=>setTitle(e.target.value) }  />
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlInput2'>
                <Form.Label>Image</Form.Label>
                <Form.Control type='file' onChange={ (e)=>setImage(e.target.files.item(0)) }  />
            </Form.Group>

            <button className='btn btn-primary' disabled={disabledButton}>Save</button>
        </Form>
    )
}

export default Category