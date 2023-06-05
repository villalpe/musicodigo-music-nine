import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getProfileDetails, updateProfile } from '../actions/profileActions';
import FormContainer from '../components/FormContainer'
import { PROFILE_UPDATE_RESET } from '../constants/profileConstants'

function BioEditScreen() {

    const { id } = useParams()
    const profileId = id

    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [image, setImage] = useState('') 
    const [comment, setComment] = useState('')
        
    const [uploading, setUploading] = useState(false)    
                    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //const location = useLocation()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const profileDetails = useSelector(state => state.profileDetails)
    const { loading, profile, error } = profileDetails

    const profileUpdate = useSelector(state => state.profileUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = profileUpdate    

    useEffect(() => {

        if(!userInfo){
            navigate('/login')
        }

        if(successUpdate){
            dispatch({ type: PROFILE_UPDATE_RESET })
            navigate(`/profilelist`)
        }else{
            if(!profile.name || profile._id !== Number(profileId)){
                dispatch(getProfileDetails(profileId))
            }else{
                setName(profile.name)
                setBio(profile.bio)
                setImage(profile.image)
                setComment(profile.comment)
            }
        }

        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        
    }, [profile, profileId, dispatch, navigate, successUpdate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProfile({
            _id: profileId,
            name,
            bio,
            image,
            comment,
        }))
    }

    const uploadFileHandler = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('profile_id', profileId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/profiles/upload/', formData, config)


            setImage(data)
            setUploading(false)
            

        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }
    
  return (
    <div className='section1 container'>
    <Link to='/profilelist' className='btn btn-light m-1' style={{ backgroundColor: '#27365A', color: '#00DDFF'}}>
       Go Back
    </Link>
    <FormContainer>
      <h1 style={{ fontFamily: 'rm_typerighter'}}>Editar Profile</h1>
         {loadingUpdate && <Loader />}
         {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}  
         {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
         (
           <Form onSubmit={submitHandler}>
           <Form.Group controlId='name' className='my-1'>
               <Form.Label><h3 style={{ fontFamily: 'rm_typerighter'}}>Nombre</h3></Form.Label>
               <Form.Text><p className='fw-bolder text-warning fs-6' style={{ fontFamily: 'rm_typerighter'}}>(Nombre y Apellido)</p></Form.Text>
               <Form.Control
                   type='name'
                   placeholder='Ingresa el nombre'
                   value={name}
                   onChange={(e) => setName(e.target.value)}
               >
               </Form.Control>
           </Form.Group>

            <Form.Group controlId='bio' className='my-3 form-outline w-100'>
                <Form.Label><h3 style={{ fontFamily: 'rm_typerighter'}}>Bio</h3></Form.Label>
                <Form.Control
                    as='textarea'
                    rows = {8}
                    placeholder={'Ingresa tu Bio'}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className='fs-5'
                >
                </Form.Control>
            </Form.Group>
           
           <Form.Group className='my-3'>
               
               <Form.Label><h3 style={{ fontFamily: 'rm_typerighter'}}>Avatar</h3></Form.Label>
               <Form.Text><p><a className='fw-bolder text-warning fs-5' target="_blank" href='https://www.simpleimageresizer.com/upload'>Para cambiar el tamaño de la imagen</a></p></Form.Text>
               <Form.Text><p className='fw-bolder text-warning fs-5'><b>Importante: avatar 640x425 - peso +- 80k</b></p></Form.Text>
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
                   class="form-control-file"
               >
               
               </Form.Control>
               {uploading && <Loader />}                    
           </Form.Group>
           
           <Form.Group controlId='comment' className='my-1'>
                <Form.Label><h3 style={{ fontFamily: 'rm_typerighter'}}>Tu descripción</h3></Form.Label>
                <Form.Control
                    as='textarea'
                    rows = {8}
                    placeholder='Ingresa tu Descripción'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
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

export default BioEditScreen
