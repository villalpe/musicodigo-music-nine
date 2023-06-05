import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SearchBoxProject from '../components/SearchBoxProject';
import { listTopics, listTopicDetails, createTopic } from '../actions/topicActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import Topic from '../components/Topic';



function TopicScreen({ match }) {
    const [toggle, setToggle] = useState(null);
    const dispatch = useDispatch()
    
    /*const blogList = useSelector(state => state.blogList)
    const {error, loading, blogs} = blogList*/

    const topicList = useSelector(state => state.topicList)
    const {error, loading, topics} = topicList
   
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    /*const blogDetailCreate = useSelector(state => state.blogDetailCreate)
    const {error: errorBlogDetail, loading: loadingBlogDetail, success: successBlogDetail} = blogDetailCreate*/
  
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
       dispatch(listTopics(keyword))

       window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
       
    }, [dispatch, keyword])

    /*const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createBlogDetail(id, {
            rating,
            comment
        }))
    }*/

    return (
      <div className="section1 container-fluid">
          <Link className='btn btn-light m-1 section1' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} to='/login' >Go Back</Link>
              {loading ? 
                <Loader /> 
                : error ? <Message variant='danger'>{error}</Message>
                :
                <div>
                  <Row>
                    <Col lg={6} className='d-flex justify-content-start align-items-center'>
                      <h1 className='mx-3 my-4' style={{ fontFamily: 'rm_typerighter'}}>Blogs en musicodigo</h1>                  
                    </Col>
                    <Col lg={6} className='d-flex justify-content-end align-items-center'>
                      <h5 className='px-1' style={{ fontFamily: 'rm_typerighter'}}>Buscar un blog:</h5>
                      <SearchBoxProject />                  
                    </Col>
                  </Row>                    
                  <Row className='mx-1'>
                  {topics.length === 0 ? <h4 style={{ fontFamily: 'rm_typerighter'}}><b>No existen Blogs actualmente</b></h4> : ''}
                    {topics.map(topic => (
                       <Col key={topic._id} lg={3}>
                        <Topic handleToggle={handleToggle} toggle={toggle} topic={topic} />
                       </Col>                        
                  ))}

                  </Row>

                </div>
              }
          </div>
            )

        }


export default TopicScreen
