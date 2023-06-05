import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SearchBoxRecording from '../components/SearchBoxRecording';
import { listByCategoryma, listByCategoryge, listByCategorygm, listByCategoryrm } from '../actions/recordingActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import Recording from '../components/Recording';
import { RECORDING_CREATE_DETAILS_RESET } from '../constants/recordingConstants'
import Moment from 'react-moment';


function RecordingScreen({ match }) {
    const [toggle, setToggle] = useState(null);
    const dispatch = useDispatch()
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
 
    const { id } = useParams();
    let navigate = useNavigate();
    let keyword = useLocation().search

    const recordingId = id
    const location = useLocation()
    let category1 = location.search.split('=')[1].split('%20')[0]
    let category2 = location.search.split('=')[1].split('%20')[1]

    console.log(category2)

    const [categoryval, setCategoryval] = useState(category2 === undefined ? category1.trim() : category1.trim() + ' ' + category2.trim())

    const recordingCategory = useSelector(state => state.recordingCategory)
    const { error, loading, recordings } = recordingCategory

    
    let handleToggle=(id)=>{
        if(toggle===id){
            setToggle(null);
            return false
        }
       setToggle(id)
       
    }
    
    useEffect(() => {
        if (categoryval === 'Muestras audio' || categoryval === 'Grabacion Muestras') {
            dispatch(listByCategoryma())
        }
        if (categoryval === 'Grabaciones estéreo' || categoryval === 'Grabacion Instrumentos') {
            dispatch(listByCategoryge())
        }
        if (categoryval === 'Grabaciones multicanal' || categoryval === 'Grabacion Multicanal') {
            dispatch(listByCategorygm())
        }
        if (categoryval === 'Remixes') {
            dispatch(listByCategoryrm())
        }

       window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
       
    }, [dispatch, keyword, categoryval])

    const maHandler = () => {
      dispatch(listByCategoryma())
      setCategoryval('Muestras audio')    
   }

   const geHandler = () => {
        dispatch(listByCategoryge())
        setCategoryval('Grabaciones estéreo')    
    }

   const gmHandler = () => {
      dispatch(listByCategorygm())
      setCategoryval('Grabaciones multicanal')    
   }

   const rmHandler = () => {
    dispatch(listByCategoryrm())
    setCategoryval('Remixes')    
 }


    return (
      <div className="section1 container-fluid">
          <Link className='btn btn-light m-1 section1 my-2 ms-3' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} to='/' >Go Back</Link>
          <div class="container-fluid">
          <div class="row">
              <div class="col-lg-3 ">
                  <h1 class="pb-3 text-center border-info border-bottom" style={{ fontFamily: 'rm_typerighter'}}>Categorias</h1>
                  <ul as='h2' class="list-unstyled templatemo-accordion border border-2 border-success">
                      <li class="pb-3 " >
                          <ul class="collapse show list-unstyled pl-3 mt-2 categoria mx-2">
                              <li><span as='h1'><a href={`/#/recordings/?category=${categoryval}`} onClick={() => maHandler()}><b className='h3'>Muestras audio</b></a></span></li>
                              <li><span as='h3'><a href={`/#/recordings/?category=${categoryval}`} onClick={() => geHandler()}><b className='h3'>Grabaciones estéreo</b></a></span></li>
                              <li><span as='h3'><a href={`/#/recordings/?category=${categoryval}`} onClick={() => gmHandler()}><b className='h3'>Grabaciones multicanal</b></a></span></li>
                              <li><span as='h3'><a href={`/#/recordings/?category=${categoryval}`} onClick={() => rmHandler()}><b className='h3'>Remixes</b></a></span></li>                              
                          </ul>
                      </li>
                  </ul>
              </div>
  
              <div class="col-lg-9 ">
                  <div class="row">
                      <div class="col-md-6 ">
                          <ul class="list-inline shop-top-menu mb-0">
                              <li class="list-inline-item">
                                  <h1 className='ms-3 border-info border-bottom px-1' style={{ fontFamily: 'rm_typerighter'}}>{categoryval}</h1>
                              </li>
                          </ul>
                      </div>
  
                  </div>
                 {
                      loading ? <Loader /> 
                      : error ? <Message variant='danger'>{error}</Message>
                        : <div>
                        <Row className='mx-1'>
                          {recordings.length === 0 ? <h4><b>No existen Grabaciones actualmente</b></h4> : ''}
                            {recordings.map(recording => (
                              <Col key={recording._id} sm={4}>
                                  <Recording handleToggle={handleToggle} toggle={toggle} recording={recording} />
                              </Col>                        
                            
                          ))}
                        </Row>
                        </div>
                  }
              </div>
  
          </div>
      </div>
            </div>
            )

        }


export default RecordingScreen
