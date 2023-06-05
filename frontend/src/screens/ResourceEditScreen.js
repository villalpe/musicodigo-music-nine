import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listResourceDetails, updateResource } from '../actions/resourceActions';
import FormContainer from '../components/FormContainer'
import { RESOURCE_UPDATE_RESET } from '../constants/resourceConstants'

function ResourceEditScreen() {

    const { id } = useParams()
    const resourceId = id

    const [name, setName] = useState('')
   
    const [author, setAuthor] = useState('')
    const [comment, setComment] = useState('')
    const [video_file, setVideo_file] = useState('')
    const [time_proj, setTime_proj] = useState(0)
        
        
    const [uploading, setUploading] = useState(false)    
                    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //const location = useLocation()

    const resourceDetails = useSelector(state => state.resourceDetails)
    const { loading, resource, error } = resourceDetails

    const resourceUpdate = useSelector(state => state.resourceUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = resourceUpdate   

    useEffect(() => {

        if(successUpdate){
            dispatch({ type: RESOURCE_UPDATE_RESET })
            navigate(`/resourcelist`)
        }else{
            if(!resource.name || resource._id !== Number(resourceId)){
                dispatch(listResourceDetails(resourceId))
            }else{
                setName(resource.name)
                setAuthor(resource.author)
                setComment(resource.comment)
                setVideo_file(resource.video_file)
                setTime_proj(resource.time_proj)
            }
        }
    }, [resource, resourceId, dispatch, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateResource({
            _id: resourceId,
            name,
            author,
            comment,
            video_file,
            time_proj,
        }))
    }

    const uploadFileHandler = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('video_file', file)
        formData.append('resource_id', resourceId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/resources/uploadfile/', formData, config)


            setVideo_file(data)
            setUploading(false)
            //console.log(data)
            return data

        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }
    
    /*const getPresignedUrl = async (file) => {
        const {data } = await axios.post(
            'http://localhost:8000/api/resources/uploadfile/',
            {
                body: {
                    fileName : file.name
                }
            }
        )
        return data
    }*/

    /*async function uploadToS3(signedUrl, file) {
        console.log("URL " + signedUrl)
        console.log("Archivo a subir a S3 " + file)
        await fetch(signedUrl, {
            method: 'PUT',
            headers: {'Content-Type': file.type},
            body: file 
        })
        return signedUrl.split('?')[0]
    }

    const uploadFile = (file) => {
        console.log("Arccchivo" + file.name)
        uploadFileHandler(file).then((response) => {
            console.log(response)
            if (response) {
                uploadToS3(response, file.name).then((response) => {
                    console.log(response)
                })
            }
        })
    }*/

    
  return (
    <div className='section1 container'>
    <Link to='/resourcelist' className='btn btn-light m-2' style={{ backgroundColor: '#27365A', color: '#00DDFF'}}>
       Go Back
    </Link>
    <FormContainer>
      <h1 style={{ fontFamily: 'rm_typerighter'}}>Editar Recurso</h1>
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
                    rows = {5}
                    placeholder='Ingresa los comentarios'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className='fs-5'
                >
                </Form.Control>
            </Form.Group>

            <Form.Group className='my-2'>
                <Form.Label><h3 style={{ fontFamily: 'rm_typerighter'}}>Archivo de Video</h3></Form.Label>
                <Form.Text><p className='fw-bolder text-warning fs-5'><b>Formato mp4 menor a 100MB 480p 25fps y no mayor a 5GB</b></p></Form.Text>
                <Form.Control
                    type='text'
                    placeholder='Ingresa Archivo de Video'
                    value={video_file}
                    onChange={(e) => setVideo_file(e.target.value)}
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


                <Form.Group controlId='time_rec' className='my-2'>
                    <Form.Label><h3 style={{ fontFamily: 'rm_typerighter'}}>Duración Grabación</h3></Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Ingresa la duración'
                        value={time_proj}
                        onChange={(e) => setTime_proj(e.target.value)}
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

export default ResourceEditScreen
