import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image, Col, Row, Card } from 'react-bootstrap'
import Loader from './Loader';
import Message from './Message'
import Moment from 'react-moment';

function UserCarousel( { handleToggle, toggle, profile }) {

    
    const profileList = useSelector(state => state.profileList)
    const { loading, error } = profileList

return (
    loading ? <Loader />
    : error ? <Message variant='danger'>{error}</Message>
    : (

        <Card className='my-3 border border-success border-2 colorcrd rounded w-100 h-70'>

            <Card.Header >
            {profile.image && (
                <Card.Img src={profile.image} class="card-img-top rounded-0 img-fluid border-secondary imageprofile mx-auto w-100" alt='fotoP' style={{maxWidth: 320, maxHeight: 370}}/>
            )}            
                <Card.Title>
                    <span className='h4 fw-bolder text-decoration-none d-flex justify-content-center align-items-center mt-2' style={{ color: '#00FFCE ', fontFamily: 'rm_typerighter'}}>{profile.name}</span>
                </Card.Title>
        
            </Card.Header>
            <Card.Body onClick={()=>handleToggle(profile._id)} style={{cursor:"pointer"}}>
                <Row>
                    <Col md={12} style={{ color: '#00DDFF '}}>
                        <span style={{ color: '#00FFCE ', fontFamily: 'rm_typerighter'}} className='h4'>Bio</span>
                        <h5 style={{ fontFamily: 'rm_typerighter'}} className='my-2'><b>{profile.bio}</b></h5>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <h5 style={{ fontFamily: 'rm_typerighter'}}>{(profile._id===toggle)?'-':'+'} <strong ><b>Mas info. de {profile.name}</b></strong></h5>
                    {(profile._id===toggle)?
                        <Col md={12} style={{ color: '#00DDFF '}} className='mt-2 mb-2'>
                        <span style={{ color: '#00FFCE '}} className='h4'>Aficiones</span>
                        <h5 style={{ fontFamily: 'rm_typerighter'}} className='my-2'><b>{profile.comment}</b></h5>
                        </Col>  
                        : ''}
                </Row>
            </Card.Body>
            <Card.Footer className='mt-3'>
                <h5 className='my-2' style={{ fontFamily: 'rm_typerighter'}}><b>Miembro desde: <Moment format="DD/MM/YYYY hh:mm:ss">{profile.createdAt}</Moment></b></h5>
            </Card.Footer>
    </Card>

))

  
}

export default UserCarousel