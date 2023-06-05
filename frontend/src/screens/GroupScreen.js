import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useParams, useNavigate } from 'react-router-dom';
import SearchBox from '../components/SearchBoxResource';
import { listGrupoDetails } from '../actions/grupoActions'
import Loader from '../components/Loader';
import Message from '../components/Message';



function GroupScreen({ match }) {
    /*const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')*/
    const dispatch = useDispatch()
    const grupoDetails = useSelector(state => state.grupoDetails)
    const {error, loading, grupo} = grupoDetails    
  
    const { id } = useParams();
    let navigate = useNavigate();

    
    useEffect(() => {
      dispatch(listGrupoDetails(id))
    }, [dispatch, id])

    /*const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(id, {
            rating,
            comment
        }))
    }*/

    return (
    <div className="section1 container-fluid">
        <Link className='btn btn-light my-3' to='/'>Go Back</Link>
            {loading ? 
              <Loader /> 
              : error ? <Message variant='danger'>{error}</Message>
              :
              <div>
                <Row>
                    <Col md={6}>
                        <Image src={grupo.image} alt={grupo.name} fluid/>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h4>{grupo.name}</h4>
                            </ListGroup.Item>
        
                            <ListGroup.Item>
                                <Rating value={grupo.rating} text={`${grupo.numReviews} reviews`} color='#f8e825'/>
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                                {grupo.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                    <Col>
                                      Actividad
                                    </Col>
                                    </Row>
                                    <Row>
                                    <Col>
                                      Blogs
                                    </Col>
                                    </Row>
                                    <Row>
                                      <Col>
                                        Bookmarks
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col>
                                        Discuciones
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col>
                                        Archivos
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col>
                                        Páginas
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col>
                                        <hr />
                                      </Col>
                                    </Row>                                
                                    <Row>
                                    <Col>
                                      Buscar en este grupo
                                      <SearchBox />
                                    </Col>
                                  </Row>                                                              
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                        <Card className='my-3'>
                          <ListGroup>
                            Usuarios Conectados
                            <ListGroup.Item style={{color: "#00DDFF"}}>
                              No existen usuarios conectados
                            </ListGroup.Item>
                          </ListGroup>

                        </Card>
                    </Col>
                </Row>
                <Row className='my-3'>
                  <Col md={6}>
                    <Card>
                      <ListGroup>
                        Actividad
                        <ListGroup.Item style={{color: "#00DDFF"}}>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                          when an unknown printer took a galley of type and scrambled it to make a type 
                          specimen book.                          
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card>
                      <ListGroup>
                        Blogs
                        <ListGroup.Item style={{color: "#00DDFF"}}>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                          when an unknown printer took a galley of type and scrambled it to make a type 
                          specimen book.
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </Col>              
                </Row>
                <Row className='my-3'>
                  <Col md={6}>
                    <Card>
                      <ListGroup>
                        Discuciones
                        <ListGroup.Item style={{color: "#00DDFF"}}>
                          No existen registros de Discuciones
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card>
                      <ListGroup>
                        Archivos
                        <ListGroup.Item style={{color: "#00DDFF"}}>
                          No existen registros de Archivos
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </Col>              
                </Row>
                <Row className='my-3'>
                  <Col md={6}>
                    <Card>
                      <ListGroup>
                        Páginas
                        <ListGroup.Item style={{color: "#00DDFF"}}>
                          No existen registros de Páginas
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card>
                      <ListGroup>
                        Varios
                        <ListGroup.Item style={{color: "#00DDFF"}}>
                          No existen registros de Varios
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </Col>              
                </Row>              
              </div>
            }
        </div>
          )
        }


export default GroupScreen