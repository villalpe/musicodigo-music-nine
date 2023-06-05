import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listForums, deleteForum, createForum } from '../actions/forumActions'
import { FORUM_CREATE_RESET } from '../constants/forumConstants'
import Moment from 'react-moment';

function ForumListScreen() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const forumList = useSelector(state => state.forumList)
  const { loading, error, forums } = forumList

  const forumDelete = useSelector(state => state.forumDelete)
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = forumDelete

  const forumCreate = useSelector(state => state.forumCreate)
  const { loading: loadingCreate, success: successCreate, error: errorCreate, forum: createdForum } = forumCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  let keyword = useLocation().search

  useEffect(() => {
    dispatch({ type: FORUM_CREATE_RESET })
    if(!userInfo){
      navigate('/login')
    }

    if(successCreate){
        navigate(`/forum/${createdForum._id}/edit`)
    }else{
      dispatch(listForums(keyword))
    }

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdForum, keyword])

  const deleteHandler = (id) => {
    if(window.confirm('Estas seguro de borrar este anuncio?')){
      dispatch(deleteForum(id))
    }
  }

  const createForumHandler = () => {
    dispatch(createForum())
  }
  
  return (
    <div className='section1 container'>
        <Row className='align-items-center'>
            <Col>
                <h1 className='text-dark-50' style={{ fontFamily: 'rm_typerighter'}}>Anuncios</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} onClick={createForumHandler}>
                    <i className='fas fa-plus'></i> Crear Nuevo Anuncio
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
                <th style={{ fontFamily: 'rm_typerighter'}}>NOMBRE</th>
                <th style={{ fontFamily: 'rm_typerighter'}}>AUTOR</th>
                <th style={{ fontFamily: 'rm_typerighter'}}>FECHA</th>
                <th style={{ fontFamily: 'rm_typerighter'}}>COMENTARIOS</th>
                <th></th>
                <th></th>                            
              </tr>
            </thead>
            <tbody>
            {forums.length === 0 ? <p className='text-danger fx-2'><b>No existen Anuncios actualmente</b></p> : ''}
              {forums.map(forum => (
                <tr key={forum._id}>
                  <td style={{ fontFamily: 'rm_typerighter'}}>{forum.name}</td>
                  <td style={{ fontFamily: 'rm_typerighter'}}>{forum.author}</td>
                  <td style={{ fontFamily: 'rm_typerighter'}}><Moment format="DD/MM/YYYY hh:mm:ss">{forum.createdAt}</Moment></td>
                  <td style={{ fontFamily: 'rm_typerighter'}}>{forum.comment}</td>                  
                  <td>
                    <LinkContainer to={`/forum/${forum._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>  
                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(forum._id)}>
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

export default ForumListScreen
