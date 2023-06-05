import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listTopics, deleteTopic, createTopic } from '../actions/topicActions'
import { TOPIC_CREATE_RESET } from '../constants/topicConstants'
import Moment from 'react-moment';

function TopicListScreen() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const topicList = useSelector(state => state.topicList)
  const { loading, error, topics } = topicList

  const topicDelete = useSelector(state => state.topicDelete)
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = topicDelete

  const topicCreate = useSelector(state => state.topicCreate)
  const { loading: loadingCreate, success: successCreate, error: errorCreate, topic: createdTopic } = topicCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  let keyword = useLocation().search

  useEffect(() => {
    dispatch({ type: TOPIC_CREATE_RESET })
    if(!userInfo){
      navigate('/login')
    }

    if(successCreate){
        console.log(createdTopic._id)
        navigate(`/topic/${createdTopic._id}/edit`)
    }else{
      dispatch(listTopics(keyword))
    }

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdTopic, keyword])

  const deleteHandler = (id) => {
    if(window.confirm('Estas seguro de borrar este blog?')){
      dispatch(deleteTopic(id))
    }
  }

  const createTopicHandler = () => {
    dispatch(createTopic())
  }
  
  return (
    <div className='section1'>
        <Row className='align-items-center'>
            <Col>
                <h1 className='text-dark-50' style={{ fontFamily: 'rm_typerighter'}}>Blog</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} onClick={createTopicHandler}>
                    <i className='fas fa-plus'></i> Crear Blog
                </Button>
            </Col>            
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}        

        {loading ? 
          (<Loader />)
        : error ?
          (<Message variant='danger'>{error}</Message>)
        : (
          <div>
            <Table bordered hover responsive className='table-lg text-dark fs-6' style={{ backgroundColor: '#00DDFF', color: '#000'}}>
              <thead className="table-primary">
              <tr>
                <th style={{ fontFamily: 'rm_typerighter'}}>ID</th>
                <th style={{ fontFamily: 'rm_typerighter'}}>NOMBRE</th>
                <th style={{ fontFamily: 'rm_typerighter'}}>AUTOR</th>
                <th style={{ fontFamily: 'rm_typerighter'}}>FECHA</th>
                <th style={{ fontFamily: 'rm_typerighter'}}>COMENTARIOS</th>
                <th></th>
                <th></th>                            
              </tr>
            </thead>
            <tbody>
            {topics.length === 0 ? <p className='text-danger fx-2'><b>No existen Blogs actualmente</b></p> : ''}
              {topics.map(topic => (
                <tr key={topic._id} style={{ fontFamily: 'rm_typerighter'}}>
                  <td style={{ fontFamily: 'rm_typerighter'}}>{topic._id}</td>
                  <td style={{ fontFamily: 'rm_typerighter'}}>{topic.name}</td>
                  <td style={{ fontFamily: 'rm_typerighter'}}>{topic.author}</td>
                  <td style={{ fontFamily: 'rm_typerighter'}}><Moment format="DD/MM/YYYY hh:mm:ss">{topic.createdAt}</Moment></td>
                  <td style={{ fontFamily: 'rm_typerighter'}}>{topic.comment}</td>                  
                  <td>
                    <LinkContainer to={`/topic/${topic._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>  
                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(topic._id)}>
                      <i className='fas fa-trash'></i>
                    </Button>                    
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
        )  
      }
    </div>
  )
}

export default TopicListScreen
