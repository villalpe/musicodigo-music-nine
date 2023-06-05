import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer'
import { USER_UPDATE_RESET } from '../constants/userConstants'

function EditUserScreen() {

    const {id} = useParams()
    const userId = id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)    

    const dispatch = useDispatch()
    const navigate = useNavigate()
    //const location = useLocation()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, user, error } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = userUpdate    

    useEffect(() => {

        if(successUpdate){
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
        }else{
            if(!user.name || user._id !== Number(userId)){
                dispatch(getUserDetails(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)                        
            }
        }
    }, [user, userId, successUpdate, navigate, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({
            _id: user._id,
            name,
            email,
            isAdmin
        }))
    }
    
  return (
      <div className='section1 container'>
         <Link className='btn btn-light m-2' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} to='/admin/userlist'>
            Go Back
         </Link>
         <FormContainer>
           <h1 style={{ fontFamily: 'rm_typerighter'}}>Editar Usuario</h1>
             {loadingUpdate && <Loader />}
             {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

              {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
              (
                <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label><h5 style={{ fontFamily: 'rm_typerighter'}}>Name</h5></Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter your Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label className='mt-2'><h5 style={{ fontFamily: 'rm_typerighter'}}>Email Address</h5></Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter your Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='isadmin'>
                    <Form.Check
                        type='checkbox'
                        label='Is Admin'
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                        className='mt-2'
                    >
                    </Form.Check>
                </Form.Group>
                <Button type='submit' className='btn btn-light m-2' style={{ backgroundColor: '#27365A', color: '#00DDFF'}}>Update</Button>
            </Form>
          )} 
      </FormContainer>      
    </div>
  )
}

export default EditUserScreen
