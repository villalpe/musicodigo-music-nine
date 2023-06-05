import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listTopicDetails, updateTopic } from '../actions/topicActions';
import FormContainer from '../components/FormContainer'
import { TOPIC_UPDATE_RESET } from '../constants/topicConstants'

function TopicEditScreen() {

    const { id } = useParams()
    const topicId = id

    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [comment, setComment] = useState('')
        
        
    const [uploading, setUploading] = useState(false)    
                    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //const location = useLocation()

    const topicDetails = useSelector(state => state.topicDetails)
    const { loading, topic, error } = topicDetails

    const topicUpdate = useSelector(state => state.topicUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = topicUpdate   

    useEffect(() => {

        if(successUpdate){
            dispatch({ type: TOPIC_UPDATE_RESET })
            navigate(`/topiclist`)
        }else{
            if(!topic.name || topic._id !== Number(topicId)){
                dispatch(listTopicDetails(topicId))
            }else{
                setName(topic.name)
                setAuthor(topic.author)
                setComment(topic.comment)
            }
        }
    }, [topic, topicId, dispatch, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateTopic({
            _id: topicId,
            name,
            author,
            comment,
         }))
    }
    
  return (
    <div className='section1'>
    <Link to='/topiclist' className='btn btn-light m-2' style={{ backgroundColor: '#27365A', color: '#00DDFF'}}>
       Go Back
    </Link>
    <FormContainer>
      <h1 style={{ fontFamily: 'rm_typerighter'}}>Editar Blog</h1>
         {loadingUpdate && <Loader />}
         {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}  
         {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
         (
           <Form onSubmit={submitHandler}>
           <Form.Group controlId='name' className='my-2'>
               <Form.Label><h3 style={{ fontFamily: 'rm_typerighter'}}>Nombre</h3></Form.Label>
               <Form.Control
                   type='text'
                   placeholder='Ingresa el nombre'
                   value={name}
                   onChange={(e) => setName(e.target.value)}
               >
               </Form.Control>
           </Form.Group>
          
            <Form.Group controlId='author' className='my-2'>
                <Form.Label><h3 style={{ fontFamily: 'rm_typerighter'}}>Autor</h3></Form.Label>
                <Form.Text><p className='fw-bolder text-warning fs-5'><b>Nombre que aparece en la comunidad musicodigo</b></p></Form.Text>
                <Form.Control
                    type='text'
                    placeholder={'Ingresa el Autor'}
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
          
           <Form.Group controlId='comment' className='my-2'>
                <Form.Label><h3 style={{ fontFamily: 'rm_typerighter'}}>Comentarios</h3></Form.Label>
                <Form.Control
                    as='textarea'
                    rows = {8}
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

export default TopicEditScreen
