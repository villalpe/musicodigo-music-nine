import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SearchBoxProject from '../components/SearchBoxProject';
import { listProjects, listProjectDetails, createProject } from '../actions/projectActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import Project from '../components/Project';
import { PROJECT_CREATE_DETAILS_RESET } from '../constants/projectConstants'


function ProjectScreen({ match }) {
    const [toggle, setToggle] = useState(null);
    const dispatch = useDispatch()
    
    /*const blogList = useSelector(state => state.blogList)
    const {error, loading, blogs} = blogList*/

    const projectList = useSelector(state => state.projectList)
    const {error, loading, projects} = projectList
   
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
       dispatch(listProjects(keyword))

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
      <div className="section1 container">
          <Link className='btn btn-light ms-3 section1' style={{ backgroundColor: '#27365A', color: '#00DDFF', fontFamily: 'rm_typerighter'}} to='/login' >Go Back</Link>
              {loading ? 
                <Loader /> 
                : error ? <Message variant='danger'>{error}</Message>
                :
                <div>
                  <div class='row'>
                    <div class='col-sm-6 d-flex justify-content-start align-items-center mt-2'>
                      <h1 className='mx-3 my-2' style={{ fontFamily: 'rm_typerighter'}}>Proyectos Producción Musical</h1>                  
                    </div>
                    <div class='col-sm-6 d-flex justify-content-center align-items-center mt-2'>
                      <h4 className='mx-1' style={{ fontFamily: 'rm_typerighter'}}>Buscar un proyecto:</h4>
                      <SearchBoxProject />                  
                    </div>
                  </div>                    
                  <Row className='mx-1'>
                  {projects.length === 0 ? <h4><b>No existen Proyectos actualmente</b></h4> : ''}
                    {projects.map(project => (
                       <Col key={project._id} lg={6}>
                          <Project handleToggle={handleToggle} toggle={toggle} project={project} />
                       </Col>                        
                     
                  ))}

                  </Row>

                </div>
              }
          </div>
            )

        }


export default ProjectScreen
