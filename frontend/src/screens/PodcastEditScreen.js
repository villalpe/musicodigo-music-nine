import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listPodcastDetails, updatePodcast } from '../actions/podcastActions';
import FormContainer from '../components/FormContainer'
import { PODCAST_UPDATE_RESET } from '../constants/podcastConstants'

function PodcastEditScreen() {

    const { id } = useParams()
    const podcastId = id

    const [name, setName] = useState('')
    const [image, setImage] = useState('')    
    const [author, setAuthor] = useState('')
    const [comment, setComment] = useState('')
    const [audio_file, setAudio_file] = useState('')
    const [time_pod, setTime_pod] = useState(0)
    const [transcription, setTranscription] = useState('')        
        
    const [uploading, setUploading] = useState(false)    
                    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //const location = useLocation()

    const podcastDetails = useSelector(state => state.podcastDetails)
    const { loading, podcast, error } = podcastDetails

    const podcastUpdate = useSelector(state => state.podcastUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = podcastUpdate    

    useEffect(() => {

        if(successUpdate){
            dispatch({ type: PODCAST_UPDATE_RESET })
            navigate(`/podcastlist`)
        }else{
            if(!podcast.name || podcast._id !== Number(podcastId)){
                dispatch(listPodcastDetails(podcastId))
            }else{
                setName(podcast.name)
                setImage(podcast.image)
                setAuthor(podcast.author)
                setComment(podcast.comment)
                setAudio_file(podcast.audio_file)
                setTime_pod(podcast.time_pod)
                setTranscription(podcast.transcription)
            }
        }
    }, [podcast, podcastId, dispatch, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updatePodcast({
            _id: podcastId,
            name,
            author,
            image,
            comment,
            audio_file,
            time_pod,
            transcription,
        }))
    }

    const uploadImageHandler = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('podcast_id', podcastId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/podcasts/upload/', formData, config)


            setImage(data)
            setUploading(false)
            

        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }

    const uploadFileHandler = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('audio_file', file)
        formData.append('podcast_id', podcastId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/podcasts/uploadfile/', formData, config)


            setAudio_file(data)
            setUploading(false)
            

        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }
    
  return (
    <div className='section1 container'>
    <Link to='/podcastlist' className='btn btn-light m-2' style={{ backgroundColor: '#27365A', color: '#00DDFF'}}>
       Go Back
    </Link>
    <FormContainer>
      <h1 style={{ fontFamily: 'rm_typerighter'}}>Editar Podcast</h1>
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
                <Form.Label><h4 style={{ fontFamily: 'rm_typerighter'}}>Autor</h4></Form.Label>
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
                   onChange={uploadImageHandler}
               >
               
               </Form.Control>
               {uploading && <Loader />}                    
           </Form.Group>
           
           <Form.Group controlId='comment' className='my-2'>
                <Form.Label><h4 style={{ fontFamily: 'rm_typerighter'}}>Comentarios</h4></Form.Label>
                <Form.Control
                    as='textarea'
                    rows = {4}
                    placeholder='Ingresa los comentarios'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className='fs-5'
                >
                </Form.Control>
            </Form.Group>

            <Form.Group className='my-2'>
                <Form.Label><h4 style={{ fontFamily: 'rm_typerighter'}}>Archivo de Audio</h4></Form.Label>
                <Form.Text><p className='fw-bolder text-warning fs-5'><b>Formato mp3, m4a menor a 40MB</b></p></Form.Text>
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

                <Form.Group controlId='time_pod'>
                    <Form.Label><h4 style={{ fontFamily: 'rm_typerighter'}}>Duración Podcast</h4></Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Ingresa la duración'
                        value={time_pod}
                        onChange={(e) => setTime_pod(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId='transcription' className='my-2'>
                <Form.Label><h4 style={{ fontFamily: 'rm_typerighter'}}>Información</h4></Form.Label>
                    <Form.Control
                        as='textarea'
                        rows = {4}
                        placeholder='Ingresa la transcripción'
                        value={transcription}
                        onChange={(e) => setTranscription(e.target.value)}
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

export default PodcastEditScreen
