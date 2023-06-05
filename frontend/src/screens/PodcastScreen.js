import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SearchBoxPodcast from '../components/SearchBoxPodcast';
import { listPodcasts } from '../actions/podcastActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import Podcast from '../components/Podcast';



function PodcastScreen({ match }) {
    /*const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')*/
    const [toggle, setToggle] = useState(null);
    const dispatch = useDispatch()
    
    const podcastList = useSelector(state => state.podcastList)
    const {error, loading, podcasts} = podcastList    
  
    const { id } = useParams();
    let navigate = useNavigate();
    let keyword = useLocation().search

    
    let handleToggle=(id)=>{
        if(toggle===id){
            setToggle(null);
            return false
        }
       setToggle(id)
       
    }
    
    useEffect(() => {
      dispatch(listPodcasts(keyword))

      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      
    }, [dispatch, keyword])

    /*const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(id, {
            rating,
            comment
        }))
    }*/

    return (
    <div className='section1 container'>
        <Link className='btn btn-light m-1 section1' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} to='/'>Go Back</Link>
            {loading ? 
              <Loader /> 
              : error ? <Message variant='danger'>{error}</Message>
              :
              <div>
                <Row>
                  <Col lg={8}>
                    <h1 className='my-4 mx-1' style={{ fontFamily: 'rm_typerighter'}}>Pódcast musicodigo</h1>                  
                  </Col>
                  <Col lg={4}>
                    <h4 style={{ fontFamily: 'rm_typerighter'}}>Buscar un pódcast:</h4>
                    <SearchBoxPodcast />                  
                  </Col>
                </Row>  
                <Row >
                {podcasts.length === 0 ? <h4><b>No existen Pódcast actualmente</b></h4> : ''}
                {podcasts.map(podcast => (
                   <Col key={podcast._id} lg={4} className='my-2'>
                      <Podcast handleToggle={handleToggle} toggle={toggle} podcast={podcast} />
                   </Col>                        
              ))}
                </Row>              
              </div>
            }
        </div>
          )
        }


export default PodcastScreen
