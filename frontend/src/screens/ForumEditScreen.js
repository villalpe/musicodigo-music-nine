import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listForumDetails, updateForum } from '../actions/forumActions';
import FormContainer from '../components/FormContainer'
import { FORUM_UPDATE_RESET } from '../constants/forumConstants'

function ForumEditScreen() {

    const { id } = useParams()
    const forumId = id

    const [name, setName] = useState('')
    const [image, setImage] = useState('')    
    const [author, setAuthor] = useState('')
    const [comment, setComment] = useState('')
        
    const [uploading, setUploading] = useState(false)    
                    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //const location = useLocation()

    const forumDetails = useSelector(state => state.forumDetails)
    const { loading, forum, error } = forumDetails

    const forumUpdate = useSelector(state => state.forumUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = forumUpdate    

    useEffect(() => {

        if(successUpdate){
            dispatch({ type: FORUM_UPDATE_RESET })
            navigate(`/forumlist`)
        }else{
            if(!forum.name || forum._id !== Number(forumId)){
                dispatch(listForumDetails(forumId))
            }else{
                setName(forum.name)
                setImage(forum.image)
                setAuthor(forum.author)
                setComment(forum.comment)
            }
        }
    }, [forum, forumId, dispatch, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateForum({
            _id: forumId,
            name,
            author,
            image,
            comment,
        }))
    }

    const uploadFileHandler = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('forum_id', forumId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/forums/upload/', formData, config)


            setImage(data)
            setUploading(false)
            

        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }
    
  return (
    <div className='section1 container'>
    <Link to='/forumlist' className='btn btn-light m-2' style={{ backgroundColor: '#27365A', color: '#00DDFF'}}>
       Go Back
    </Link>
    <FormContainer>
      <h1 style={{ fontFamily: 'rm_typerighter'}}>Editar Anuncio</h1>
         {loadingUpdate && <Loader />}
         {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}  
         {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
         (
           <Form onSubmit={submitHandler}>
           <Form.Group controlId='name' className='my-2'>
               <Form.Label><h4 style={{ fontFamily: 'rm_typerighter'}}>Nombre</h4></Form.Label>
               <Form.Control
                   type='text'
                   placeholder='Ingresa el nombre'
                   value={name}
                   onChange={(e) => setName(e.target.value)}
               >
               </Form.Control>
           </Form.Group>

            <Form.Group controlId='author' className='my-2'>
                <Form.Label className='mt-2'><h4 style={{ fontFamily: 'rm_typerighter'}}>Autor</h4></Form.Label>
                <Form.Text><p className='fw-bolder text-warning fs-5'><b>Nombre que aparece en la comunidad musicodigo</b></p></Form.Text>
                <Form.Control
                    type='text'
                    placeholder={'Ingresa el Autor'}
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
           
           <Form.Group className='my-2'>
               <Form.Label><h4 style={{ fontFamily: 'rm_typerighter'}}>Imagen</h4></Form.Label>
               <Form.Text><p><a className='fw-bolder text-warning fs-5' target="_blank" href='https://www.simpleimageresizer.com/upload'>Para cambiar el tamaño de la imagen</a></p></Form.Text>
               <Form.Text><p className='fw-bolder text-warning fs-5'><b>Imagen 640x430px - peso +- 80k</b></p></Form.Text>
               <Form.Control
                   type='text'
                   placeholder='Ingresa la Imagen'
                   value={image}
                   onChange={(e) => setImage(e.target.value)}
               >
               </Form.Control>

               <Form.Control
                   type='file'
                   id='image-file'
                   label='Choose Image'
                   custom
                   onChange={uploadFileHandler}
               >
               
               </Form.Control>
               {uploading && <Loader />}                    
           </Form.Group>
           
           <Form.Group controlId='comment' className='my-2'>
                <Form.Label className='mt-2'><h4 style={{ fontFamily: 'rm_typerighter'}}>Comentarios</h4></Form.Label>
                <Form.Control
                    as='textarea'
                    rows = {3}
                    placeholder='Ingresa los comentarios'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className='fs-5'
                >
                </Form.Control>
            </Form.Group>
           
           <Button type='submit' className='btn btn-light mt-2' style={{ backgroundColor: '#27365A', color: '#00DDFF'}}>Actualizar</Button>
       </Form>
     )} 
 </FormContainer>      
</div>
  )
}

export default ForumEditScreen
