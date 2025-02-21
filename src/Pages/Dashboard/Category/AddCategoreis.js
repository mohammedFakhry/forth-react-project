import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import { CATEGORY } from '../../../Api/Api'
import { Axios } from '../../../Api/Axios'
import LoadingSubmit from '../../../Components/Loading/Loading'

const AddCategoreis = () => {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [loadingPage, setLoadingPage] = useState(false)
    const focusInput = useRef('')

    useEffect(() => {
        focusInput.current.focus()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        setLoadingPage(true)
        const form = new FormData()
        form.append('title', title)
        form.append('image', image)
        try {
            const res = await Axios.post(`${CATEGORY}/add`, form)
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
                <Form.Control value={title} type='text' placeholder='title...' onChange={ (e)=>setTitle(e.target.value) } ref={focusInput} required />
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlInput2'>
                <Form.Label>Image</Form.Label>
                <Form.Control type='file' onChange={ (e)=>setImage(e.target.files.item(0)) }  />
            </Form.Group>

            <button className='btn btn-primary' disabled={title.length > 1? false: true}>Save</button>
        </Form>
    )
}

export default AddCategoreis
