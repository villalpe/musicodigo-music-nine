import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listRecordingDetails, updateRecording } from '../actions/recordingActions';
import FormContainer from '../components/FormContainer'
import { RECORDING_UPDATE_RESET } from '../constants/recordingConstants'

function RecordingEditScreen() {

    const { id } = useParams()
    const recordingId = id

    const [name, setName] = useState('')
   
    const [author, setAuthor] = useState('')
    const [category, setCategory] = useState('')
    const [licencia, setLicencia] = useState('')
    const [comment, setComment] = useState('')
    const [audio_file, setAudio_file] = useState('')
    const [zip_file, setZip_file] = useState('')
    const [time_rec, setTime_rec] = useState(0)

        
        
    const [uploading, setUploading] = useState(false)    
                    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //const location = useLocation()

    const recordingDetails = useSelector(state => state.recordingDetails)
    const { loading, recording, error } = recordingDetails

    const recordingUpdate = useSelector(state => state.recordingUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = recordingUpdate   

    useEffect(() => {

        if(successUpdate){
            dispatch({ type: RECORDING_UPDATE_RESET })
            navigate(`/recordinglist`)
        }else{
            if(!recording.name || recording._id !== Number(recordingId)){
                dispatch(listRecordingDetails(recordingId))
            }else{
                setName(recording.name)
                setAuthor(recording.author)
                setCategory(recording.category)
                setLicencia(recording.licencia)
                setComment(recording.comment)
                setAudio_file(recording.audio_file)
                setZip_file(recording.zip_file)
                setTime_rec(recording.time_rec)
            }
        }
    }, [recording, recordingId, dispatch, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateRecording({
            _id: recordingId,
            name,
            author,
            category,
            licencia,
            comment,
            audio_file,
            zip_file,
            time_rec,
        }))
    }

    const uploadFileHandler = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('audio_file', file)
        formData.append('recording_id', recordingId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/recordings/uploadfile/', formData, config)


            setAudio_file(data)
            setUploading(false)
            

        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }

    const uploadZipHandler = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('zip_file', file)
        formData.append('recording_id', recordingId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/recordings/uploadzip/', formData, config)


            setAudio_file(data)
            setUploading(false)
            

        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }
    
  return (
    <div className='section1 container'>
    <Link to='/recordinglist' className='btn btn-light m-2' style={{ backgroundColor: '#27365A', color: '#00DDFF'}}>
       Go Back
    </Link>
    <FormContainer>
      <h1 style={{ fontFamily: 'rm_typerighter'}}>Editar Grabación</h1>
         {loadingUpdate && <Loader />}
         {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}  
         {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
         (
           <Form onSubmit={submitHandler}>
           <Form.Group controlId='name' className='my-2'>
               <Form.Label><h3 style={{ fontFamily: 'rm_typerighter'}}>Nombre</h3></Form.Label>
               <Form.Control
                   type='text'
                   className='h3'
                   placeholder='Ingresa el nombre'
                   value={name}
                   onChange={(e) => setName(e.target.value)}
               >
               </Form.Control>
           </Form.Group>
          
            <Form.Group controlId='author' className='my-2'>
                <Form.Label><h3 className='mt-1' style={{ fontFamily: 'rm_typerighter'}}>Autor</h3></Form.Label>
                <Form.Text><p className='fw-bolder text-warning fs-5'><b>Nombre que aparece en la comunidad musicodigo</b></p></Form.Text>
                <Form.Control
                    type='text'
                    className='h3'
                    placeholder={'Ingresa el Autor'}
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
            <Form.Label className='mt-1' style={{ fontFamily: 'rm_typerighter'}}><h3 style={{ fontFamily: 'rm_typerighter'}}>Categoria</h3></Form.Label>
            <Form.Select
                type='select'
                className='h3'
                placeholder='Ingresa la Categoría'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ fontFamily: 'rm_typerighter'}}
            >
                <option><b>Seleccione una opción</b></option>
                <option><b>Muestras audio</b></option>
                <option><b>Grabaciones estéreo</b></option>
                <option><b>Grabaciones multicanal</b></option>
                <option><b>Remixes</b></option>
            </Form.Select>
            </Form.Group>

            <Form.Group controlId='licencia'>
                <Form.Label className='mt-1'><h3 style={{ fontFamily: 'rm_typerighter'}}>Licencia Creative Commons</h3></Form.Label>
                <Form.Select
                    type='select'
                    className='h3'
                    placeholder='Ingresa la Licencia'
                    value={licencia}
                    onChange={(e) => setLicencia(e.target.value)}
                    style={{ fontFamily: 'rm_typerighter'}}
                >
                    <option><b>Seleccione una opción</b></option>
                    <option><b>Dominio público</b></option>
                    <option><b>Atribución</b></option>
                    <option><b>Obras derivadas</b></option>
                    <option><b>Compartir igual</b></option>
                    <option><b>No comercial</b></option>
                </Form.Select>
            </Form.Group>
          
           <Form.Group controlId='comment' className='my-2'>
                <Form.Label><h3 style={{ fontFamily: 'rm_typerighter'}}>Comentarios</h3></Form.Label>
                <Form.Control
                    as='textarea'
                    className='h3'
                    rows = {5}
                    placeholder='Ingresa los comentarios'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group className='my-3'>
                <Form.Label><h3 style={{ fontFamily: 'rm_typerighter'}}>Archivo de Audio</h3></Form.Label>
                <Form.Text><p className='fw-bolder text-warning fs-5'><b>Formato mp3, m4a, flac no mayor a 5GB de tamaño</b></p></Form.Text>
                <Form.Control
                    type='text'
                    className='h3'
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

                <Form.Group className='my-2'>
                    <Form.Label><h3 style={{ fontFamily: 'rm_typerighter'}}>Archivo Zip</h3></Form.Label>
                    <Form.Text><p className='fw-bolder text-warning fs-5'>(Importante: SOLO EN GRABACION MULTICANAL)</p></Form.Text>
                    <Form.Text><p className='fw-bolder text-warning fs-5'><b>Formato zip no mayor a 5GB de tamaño</b></p></Form.Text>
                    <Form.Control
                        type='text'
                        placeholder='Ingresa Archivo Zip'
                        value={zip_file}
                        onChange={(e) => setZip_file(e.target.value)}
                    >
                    </Form.Control>

                    <Form.Control
                        type='file'
                        id='zip-file'
                        label='Choose File'
                        custom
                        onChange={uploadZipHandler}
                    >
                    
                    </Form.Control>
                    {uploading && <Loader />}                    
                </Form.Group>

                <Form.Group controlId='time_rec' className='my-2'>
                    <Form.Label><h3 style={{ fontFamily: 'rm_typerighter'}}>Duración Grabación</h3></Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Ingresa la duración'
                        value={time_rec}
                        onChange={(e) => setTime_rec(e.target.value)}
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

export default RecordingEditScreen
