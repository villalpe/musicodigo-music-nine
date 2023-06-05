import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col,  } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer'

function RegisterScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    let navigate = useNavigate()
    const location = useLocation()

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userRegister = useSelector(state => state.userRegister)
    const { loading, userInfo, error } = userRegister

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }

        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        
    }, [navigate, redirect, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(register(name, email, password))            
        }
    }
    
  return (
    <FormContainer>
        <h1 className="section1 container">Registrarse a musicodigo</h1>
        {message && <Message variant='danger'>{message}</Message>}        
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}  
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label><h5>Nombre</h5></Form.Label>
                <Form.Control
                    required
                    type='name'
                    placeholder='Enter your Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label className='mt-2'><h5>Email Address</h5></Form.Label>
                <Form.Control
                    required
                    type='email'
                    placeholder='Enter your Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
            <Form.Label className='mt-2'><h5>Password</h5></Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='passwordConfirm'>
            <Form.Label className='mt-2'><h5>Confirm Password</h5></Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Enter your password again'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Button type='submit' className='btn btn-light mt-3' style={{ backgroundColor: '#27365A', color: '#00DDFF'}}>Registrarse</Button>
        </Form>
        <Row className='py-3'>
            <Col>
                Ya estas registrado? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className='fw-bolder' style={{color: '#090D3A'}}>Ingresar</Link>
            </Col>
        </Row>     
    </FormContainer>
  )
}

export default RegisterScreen