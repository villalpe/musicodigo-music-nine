import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams, useNavigate } from 'react-router-dom';
import { listBlogDetails, createBlogDetail } from '../actions/blogActions'
import { listProfiles } from '../actions/profileActions'
import { BLOG_CREATE_DETAILS_RESET } from '../constants/blogConstants'
import Moment from 'react-moment';

function BlogDetailScreen({ match }) {
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')    

    const { id } = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const blogDetails = useSelector(state => state.blogDetails)
    const { error, loading, blog } = blogDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const profileList = useSelector(state => state.profileList)
    const {profiles} = profileList
      
    let keyword = useLocation().search

    const blogDetailCreate = useSelector(state => state.blogDetailCreate)
    const { error: errorBlogReview, loading: loadingBlogReview, success: successBlogReview } = blogDetailCreate

    useEffect(() => {
        if(successBlogReview){
            setRating(5)
            setComment('')
            dispatch({type: BLOG_CREATE_DETAILS_RESET})
        }

        dispatch(listBlogDetails(id))
        dispatch(listProfiles(keyword))

        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        
    }, [dispatch, id, successBlogReview, keyword])

 
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createBlogDetail(id, {
            rating,
            comment
        }))
    }

  return (
    <div className="section1 container">
        <Link className='btn btn-light m-1 section1' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} to='/blogs'>Go Back</Link>
        {
            loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
            : (
            <div>
            {blog.image && (
            <div class='row'>
                <div class='col-sm-12 d-flex justify-content-center align-items-center'>
                    <Image src={blog.image} alt={blog.name} className="card-img-top my-2 img-fluid w-50 " style={{ maxWidth: 500, maxHeight: 550}}/>
                </div>
            </div>
            )}
            <div class='row'>
                <div class='col-sm-12 d-flex justify-content-center align-items-center mb-1'>
                    <h2 className='my-1' style={{ fontFamily: 'rm_typerighter'}}><b>{blog.name}</b></h2> 
                </div>
            </div>
            <div class="d-flex flex-row bd-highlight justify-content-center align-items-center">
            <div class="p-2 bd-highlight align-items-center"><h6 style={{ fontFamily: 'rm_typerighter'}}><b>Creado por: {blog.author}</b></h6></div>
            {blog.author && (
                profiles.map(profile => (
                    profile.name.trim() === blog.author.trim() ? <div class="p-2 bd-highlight"><Image className='rounded-circle' src={profile.image} style={{ width: 65, maxHeight: 50}}/></div> : ''     
                ))
            )}
            <div class="p-2 bd-highlight align-items-center"><h6 style={{ fontFamily: 'rm_typerighter'}}><b><Moment format="DD/MM/YYYY hh:mm:ss">{blog.createdAt}</Moment></b></h6></div>
            </div>    
            <Row>
                <Col lg={3}></Col>
                <Col lg={6} className='d-flex justify-content-center align-items-center'>
                    <span className='my-2 forocoment h4' style={{ fontFamily: 'rm_typerighter'}}><b>{blog.comment}</b></span>
                </Col>
                <Col lg={3}></Col>
            </Row>
            <div class='row'>
                <div class='col-sm-12 d-flex justify-content-center align-items-center mb-1'>
                    <span className='mb-3 mt-2 text-warning h5 ' style={{ fontFamily: 'rm_typerighter'}}><b>Quieres participar... por favor deja tus comentarios</b></span>
                </div>
            </div>

            <div class='row'>
                        {blog.reviews.length === 0 && <Message variant='info'>No hay comentarios</Message>}
                        {blog.reviews.map((review) => (
                        <div class='d-flex flex-row bd-highlight justify-content-center align-items-center'>
                             <div class="col-lg-4">
                                {profiles.map(profile => (
                                    profile.name.trim() === review.name.trim() ? <div class="p-2 bd-highlight"><Image className='rounded-circle' src={profile.image} style={{ maxWidth: 45, maxHeight: 45}}/></div> : ''     
                                ))}
                                <div class="p-2 bd-highlight align-items-center"><h6 style={{ fontFamily: 'rm_typerighter'}}><b>Por: {review.name}</b></h6></div>
                                <div class="p-2 bd-highlight align-items-center "><span className='text-dark fs-5 fw-bolder' style={{ fontFamily: 'rm_typerighter'}}><b>{review.comment}</b></span></div>
                                <div class="p-2 bd-highlight align-items-center"><h6 style={{ fontFamily: 'rm_typerighter'}}><b><Moment format="DD/MM/YYYY hh:mm:ss">{review.createdAt}</Moment></b></h6></div>
                                <strong><hr /></strong>
                            </div>
                        </div>
                        ))}
            </div>

            <div class='row'>
            <div class='col-sm-12 '>
                    <ListGroup.Item className='colorMenu'>
                    <h4>Escribe un comentario</h4>

                    {loadingBlogReview && <Loader />}
                    {successBlogReview && <Message variant='success'>Comentario Enviado</Message>}
                    {errorBlogReview && <Message variant='danger'>{errorBlogReview}</Message>}

                    {userInfo ? (
                        <Form onSubmit={submitHandler} >
                            <Form.Group controlId='comment'>
                                <Form.Control
                                    as='textarea'
                                    row='5'
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    style={{ fontFamily: 'rm_typerighter'}}
                                >
                                </Form.Control>                               
                            </Form.Group>
                            <Button
                                disabled={loadingBlogReview}
                                type='submit'
                                variant='warning'
                                className='btn-md my-2 text-dark mt-3'
                                style={{ fontFamily: 'rm_typerighter'}}
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
                </div>
            </div>

        </div>
          )
        }
    </div>
  )
}


export default BlogDetailScreen