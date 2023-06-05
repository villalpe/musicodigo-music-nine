import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Player } from 'video-react'
import { listRadios, deleteRadio, createRadio } from '../actions/radioActions'
import { RADIO_CREATE_RESET } from '../constants/radioConstants'
import Moment from 'react-moment';


function RadioListScreen() {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [quickFilter, setQuickFilter] = useState("");
  
  const radioList = useSelector(state => state.radioList)
  const { loading, error, radios } = radioList

  const radioDelete = useSelector(state => state.radioDelete)
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = radioDelete

  const radioCreate = useSelector(state => state.radioCreate)
  const { loading: loadingCreate, success: successCreate, error: errorCreate, radio: createdRadio } = radioCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  let keyword = useLocation().search

  useEffect(() => {
    dispatch({ type: RADIO_CREATE_RESET })
    if(!userInfo){
      navigate('/login')
    }
    
    if(successCreate){
        navigate(`/radio/${createdRadio._id}/edit`)
    }else{
      dispatch(listRadios(keyword))
    }

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdRadio, keyword])

  const deleteHandler = (id) => {
    if(window.confirm('Estas seguro de borrar este podcast?')){
      dispatch(deleteRadio(id))
    }
  }

  const createRadioHandler = () => {
    dispatch(createRadio())
  }

  return (
    <div className='section1 container'>
        <Row className='align-items-center'>
            <Col>
                <h1 className='text-dark-50' style={{ fontFamily: 'rm_typerighter'}}>Radio</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} onClick={createRadioHandler}>
                    <i className='fas fa-plus'></i> Crear Nuevo Radio
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
                <th style={{ fontFamily: 'rm_typerighter'}}>GRABACION</th>                
                <th></th>
                <th></th>                           
              </tr>
            </thead>
            <tbody>
            {radios.length === 0 ? <p className='text-danger fx-2'><b>No existen Radios actualmente</b></p> : ''}
              {radios.map(radio => (
                <tr key={radio._id}>
                  <td style={{ fontFamily: 'rm_typerighter'}}>{radio.name}</td>
                  <td style={{ fontFamily: 'rm_typerighter'}}>{radio.author}</td>
                  <td style={{ fontFamily: 'rm_typerighter'}}>{radio.comment}</td>
                  <td style={{ fontFamily: 'rm_typerighter'}}><Moment format="DD/MM/YYYY hh:mm:ss">{radio.createdAt}</Moment></td>                                    
                  <td>
                    <audio controls preload="none" 
                    >
                      <source src={radio.audio_file} type="audio/mpeg" />
                    </audio>                  
                  </td>
                  <td>
                    <LinkContainer to={`/radio/${radio._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>  
                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(radio._id)}>
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

export default RadioListScreen
