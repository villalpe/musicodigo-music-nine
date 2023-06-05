import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image, Col, Card, Row } from 'react-bootstrap'
import Loader from './Loader';
import Message from './Message'
import { listForums } from '../actions/forumActions'

function ForumCarousel() {

    const dispatch = useDispatch()
    const forumList = useSelector(state => state.forumList)
    const { forums, loading, error } = forumList

    useEffect(() => {
        dispatch(listForums())
    }, [dispatch])


  return (
    loading ? <Loader />
    : error ? <Message variant='danger'>{error}</Message>
    : (
        <Carousel pause='hover' className='colormc'>

              <Carousel.Item>
                    <Col lg={3}>
                        <Card className='my-3 p-3 rounded colorcrd'>
                        <Card.Header>
                            <h2>Proyectos</h2>
                        </Card.Header>
                
                        <Card.Body>
            
                                <Card.Title as='div' >
                                    <h3>Proyectos</h3>
                                </Card.Title>
                            <Card.Text as='div'>
                                <div className='my-3'>
                                <h5>Proyectos Personales. Subelos a la plataforma...</h5>
                                </div>
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </Col>
            </Carousel.Item>
            <Carousel.Item>
            <Col lg={3}>
                <Card className='my-3 p-3 rounded colorcrd'>
                <Card.Header>
                    <h2>Blogs</h2>
                </Card.Header>
        
                <Card.Body>
    
                        <Card.Title as='div' >
                            <h3>Blogs</h3>
                        </Card.Title>
                    <Card.Text as='div'>
                        <div className='my-3'>
                        <h5>Blogs musicales... Participa</h5>
                        </div>
                    </Card.Text>
                </Card.Body>
                </Card>
            </Col>
        </Carousel.Item>            
        </Carousel>
    )
  )
}

export default ForumCarousel