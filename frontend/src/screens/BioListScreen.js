import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col, Table, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProfiles, deleteProfile, createProfile } from '../actions/profileActions'
import Paginate from '../components/Paginate'
import Moment from 'react-moment';
import { PROFILE_CREATE_RESET } from '../constants/profileConstants'


function BioListScreen() {

    const [bio, setBio] = useState(true)

    const dispatch = useDispatch()
    let navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const profileList = useSelector(state => state.profileList)
    const {error: errorProfiles, loading: loadingProfiles, profiles, page, pages} = profileList

    const profileCreate = useSelector(state => state.profileCreate)
    const { loading: loadingCreate, success: successCreate, error: errorCreate, profile: createdProfile } = profileCreate

    const profileDelete = useSelector(state => state.profileDelete)
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = profileDelete

    let keyword = useLocation().search

    useEffect(() => {
        dispatch({ type: PROFILE_CREATE_RESET })
        if(!userInfo){
            navigate('/login')
        }

        if(successCreate){
            navigate(`/profile/${createdProfile._id}/edit`)
        }else{
          dispatch(listProfiles(keyword))
        }

        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    
      }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProfile, keyword])

    const deleteHandler = (id) => {
        if(window.confirm('Estas seguro de borrar este profile?')){
          dispatch(deleteProfile(id))
        }
      }

      const createPodcastHandler = () => {
        dispatch(createProfile())
      }

  return (
    <div className='section1 container'>
        <Row className='align-items-center'>
            <Col>
                <h1 style={{ fontFamily: 'rm_typerighter'}}>Comunidad musicodigo</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} onClick={createPodcastHandler}>
                    <i className='fas fa-plus'></i> Crear Nuevo Profile
                </Button>
            </Col>            
        </Row>
       <Row>
        <Col md={12}>

            {loadingProfiles ? (
                <Loader />
            ) : errorProfiles ? (
                <Message variant='danger'>{errorProfiles}</Message>
            ) : (
                <Table bordered hover responsive className='table-lg text-dark fs-6' style={{ backgroundColor: '#00DDFF', color: '#000'}}>
                    <thead className="table-primary">
                        <tr>
                            <th style={{ fontFamily: 'rm_typerighter'}}>DESDE</th>
                            <th style={{ fontFamily: 'rm_typerighter'}}>NOMBRE</th>
                            <th style={{ fontFamily: 'rm_typerighter'}}>BIO</th>
                            <th style={{ fontFamily: 'rm_typerighter'}}>DESCRIPCIóN</th>
                            <th></th>
                            <th></th>                            
                        </tr>
                    </thead>
                    <tbody>
                    {profiles.length === 0 ? <p className='text-danger fx-2'><b>No existen información actualmente</b></p> : ''}                    
                        {profiles.map(profile => (
                            user.userName !== profile.user && 
                                    
                            <tr key={profile._id}>
                                <td className='fw-bolder' style={{ fontFamily: 'rm_typerighter'}}><Moment format="DD/MM/YYYY hh:mm:ss">{profile.createdAt}</Moment></td>
                                <td style={{ fontFamily: 'rm_typerighter'}}>{profile.name}</td>
                                <td style={{ fontFamily: 'rm_typerighter'}}>{profile.bio}</td>
                                <td style={{ fontFamily: 'rm_typerighter'}}>{profile.comment}</td>                                
                                <td>
                                <LinkContainer to={`/profile/${profile._id}/edit`}>
                                  <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                  </Button>
                                </LinkContainer>
                                </td>
                                <td>  
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(profile._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>                    
                                </td>                            
                            </tr>
                            ))}
                    </tbody>
                </Table>
            )}
        </Col>
    
    </Row>

    </div>
  )
}

export default BioListScreen

