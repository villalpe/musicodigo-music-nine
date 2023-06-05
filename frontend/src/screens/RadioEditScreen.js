import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listRadioDetails, updateRadio } from '../actions/radioActions';
import FormContainer from '../components/FormContainer'
import { RADIO_UPDATE_RESET } from '../constants/radioConstants'

function RadioEditScreen() {

    const { id } = useParams()
    const radioId = id

    const [name, setName] = useState('')
   
    const [author, setAuthor] = useState('')
    const [comment, setComment] = useState('')
    const [audio_file, setAudio_file] = useState('')
        
        
    const [uploading, setUploading] = useState(false)    
                    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //const location = useLocation()

    const radioDetails = useSelector(state => state.radioDetails)
    const { loading, radio, error } = radioDetails

    const radioUpdate = useSelector(state => state.radioUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = radioUpdate   

    useEffect(() => {

        if(successUpdate){
            dispatch({ type: RADIO_UPDATE_RESET })
            navigate(`/radiolist`)
        }else{
            if(!radio.name || radio._id !== Number(radioId)){
                dispatch(listRadioDetails(radioId))
            }else{
                setName(radio.name)
                setAuthor(radio.author)
                setComment(radio.comment)
                setAudio_file(radio.audio_file)
            }
        }
    }, [radio, radioId, dispatch, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateRadio({
            _id: radioId,
            name,
            author,
            comment,
            audio_file,
        }))
    }

    const uploadFileHandler = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('audio_file', file)
        formData.append('radio_id', radioId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/radios/uploadfile/', formData, config)


            setAudio_file(data)
            setUploading(false)
            

        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }

  return (
    <div className='container'>
    <Link to='/radiolist' className='btn btn-light m-2' style={{ backgroundColor: '#27365A', color: '#00DDFF'}}>
       Go Back
    </Link>
    <FormContainer>
      <h1 style={{ fontFamily: 'rm_typerighter'}}>Editar Radio</h1>
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

            <Form.Group className='my-2'>
                <Form.Label><h3 style={{ fontFamily: 'rm_typerighter'}}>Archivo de Audio</h3></Form.Label>
                <Form.Text><p className='fw-bolder text-warning fs-5'><b>Formato mp3, m4a, flac no mayor a 5GB de tamaño</b></p></Form.Text>
                <Form.Control
                    type='text'
                    placeholder='Ingresa Archivo Audio'
                    value={audio_file}
                    onChange={(e) => setAudio_file(e.target.value)}
                >
                </Form.Control>

                <Form.Control
                    type='file'
                    id='audio-file'
                    label='Choose File'
                    custom
                    onChange={uploadFileHandler}
                >
                
                </Form.Control>
                {uploading && <Loader />}                    
            </Form.Group>

           <Form.Group controlId='comment' className='my-2'>
                <Form.Label><h3 style={{ fontFamily: 'rm_typerighter'}}>Comentarios</h3></Form.Label>
                <Form.Control
                    as='textarea'
                    rows = {5}
                    placeholder='Ingresa los comentarios'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className='fs-5'
                >
                </Form.Control>
            </Form.Group>

 
           
           <Button type='submit' className='btn btn-light m-2' style={{ backgroundColor: '#27365A', color: '#00DDFF'}}>Actualizar</Button>
       </Form>
     )} 
 </FormContainer>      
</div>
  )
}

export default RadioEditScreen
