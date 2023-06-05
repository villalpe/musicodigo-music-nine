/*import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams, useNavigate } from 'react-router-dom';
import { listProductDetails, createProductReview } from '../actions/grupoActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

function ProductScreen({ match }) {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')    

    const { id } = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { error: errorProductReview, loading: loadingProductReview, success: successProductReview } = productReviewCreate

    useEffect(() => {
        if(successProductReview){
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }

        dispatch(listProductDetails(id))
    }, [dispatch, id, successProductReview])

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`);
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(id, {
            rating,
            comment
        }))
    }

    return (
    <div>
        <Link className='btn btn-light my-3' to='/'>Go Back</Link>
        {
            loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
            : (
            <div>
                <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
    
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color='#f8e825'/>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            Precio : ${product.price}
                        </ListGroup.Item> 
    
                        <ListGroup.Item>
                            {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Precio :
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>                                
                                </Row>
                            </ListGroup.Item>
    
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status :
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'En Stock' : 'Fuera de Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty :</Col>
                                        <Col xs='auto' className='my-1'>
                                            <Form.Control 
                                                as="select" 
                                                value={qty}
                                                onChange={(e) => setQty(e.target.value)}
                                            >
                                                {
                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={ x + 1 } value={ x + 1 }>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>    
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                           {!userInfo && <Message variant='info'>
                              Por favor <Link to='/login'>Ingresar</Link> para agregar a la compra
                            </Message>}                            
                                <Button 
                                    className='btn-lg btn-block' 
                                    disabled={product.countInStock === 0 || product.countInStock < 0 || !userInfo} 
                                    type='button'
                                    onClick={addToCartHandler}>
                                    Agregar a la Compra
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h4>Comentarios</h4>
                    {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}
                    <ListGroup variant='flush'>
                        {product.reviews.map((review) => (
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating} color='#f8e825' />
                                <p>{review.createdAt.substring(0, 10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <hr className='bg-danger border-2 border-top border-danger'/>                    
                    <ListGroup.Item>
                        <h4>Escribe un comentario</h4>

                         {loadingProductReview && <Loader />}
                         {successProductReview && <Message variant='success'>Comentario Enviado</Message>}
                         {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                        {userInfo ? (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='rating'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                        as='select'
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}                                    
                                    >
                                        <option value=''>Selecciona...</option>
                                        <option value='1'>1 - Pobre</option>
                                        <option value='2'>2 - Pasa</option>
                                        <option value='3'>3 - Bueno</option>
                                        <option value='4'>4 - Muy bueno</option>
                                        <option value='4'>5 - Excelente</option>                                                                                                                                                                                   
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='comment'>
                                    <Form.Label>Review</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        row='5'
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    >
                                    </Form.Control>                               
                                </Form.Group>
                                <Button
                                    disabled={loadingProductReview}
                                    type='submit'
                                    variant='primary'
                                    className='btn-md my-2'
                                >
                                    Enviar Comentario
                                </Button>
                            </Form>
                        ) : (
                            <Message variant='info'>
                                Por favor <Link to='/login'>Ingresar</Link> para escribir comentario
                            </Message>
                        )}
                    </ListGroup.Item>
                </Col>
            </Row>
        </div>
          )
        }
    </div>
  )
}

export default ProductScreen*/
