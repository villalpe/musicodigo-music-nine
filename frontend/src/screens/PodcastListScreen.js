import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listPodcasts, deletePodcast, createPodcast } from '../actions/podcastActions'
import { PODCAST_CREATE_RESET } from '../constants/podcastConstants'
import Moment from 'react-moment';

function PodcastListScreen() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const podcastList = useSelector(state => state.podcastList)
  const { loading, error, podcasts } = podcastList

  const podcastDelete = useSelector(state => state.podcastDelete)
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = podcastDelete

  const podcastCreate = useSelector(state => state.podcastCreate)
  const { loading: loadingCreate, success: successCreate, error: errorCreate, podcast: createdPodcast } = podcastCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  let keyword = useLocation().search

  useEffect(() => {
    dispatch({ type: PODCAST_CREATE_RESET })
    if(!userInfo){
      navigate('/login')
    }

    if(successCreate){
        navigate(`/podcast/${createdPodcast._id}/edit`)
    }else{
      dispatch(listPodcasts(keyword))
    }

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdPodcast, keyword])

  const deleteHandler = (id) => {
    if(window.confirm('Estas seguro de borrar este podcast?')){
      dispatch(deletePodcast(id))
    }
  }

  const createPodcastHandler = () => {
    dispatch(createPodcast())
  }
  
  return (
    <div className='section1 container'>
        <Row className='align-items-center'>
            <Col>
                <h1 className='text-dark-50' style={{ fontFamily: 'rm_typerighter'}}>Podcast</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3'  style={{ backgroundColor: '#27365A', color: '#00DDFF'}} onClick={createPodcastHandler}>
                    <i className='fas fa-plus'></i> Crear Nuevo Podcast
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
                <th style={{ fontFamily: 'rm_typerighter'}}>COMENTARIOS</th>
                <th style={{ fontFamily: 'rm_typerighter'}}>FECHA</th>
                <th style={{ fontFamily: 'rm_typerighter'}}>DURACION</th>
                <th></th>
                <th></th>            
              </tr>
            </thead>
            <tbody>
            {podcasts.length === 0 ? <p className='text-danger fx-2'><b>No existen Podcasts actualmente</b></p> : ''}
              {podcasts.map(podcast => (
                <tr key={podcast._id}>
                  <td style={{ fontFamily: 'rm_typerighter'}}>{podcast.name}</td>
                  <td style={{ fontFamily: 'rm_typerighter'}}>{podcast.author}</td>
                  <td style={{ fontFamily: 'rm_typerighter'}}>{podcast.comment}</td>
                  <td style={{ fontFamily: 'rm_typerighter'}}><Moment format="DD/MM/YYYY hh:mm:ss">{podcast.createdAt}</Moment></td>
                  <td style={{ fontFamily: 'rm_typerighter'}}>{podcast.time_pod}</td>
                  <td>
                    <LinkContainer to={`/podcast/${podcast._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                   </td>
                   <td> 
                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(podcast._id)}>
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

export default PodcastListScreen
