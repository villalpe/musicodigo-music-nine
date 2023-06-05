import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SearchBoxBlog from '../components/SearchBoxBlog';
import { listBlogs, listBlogDetails, createBlogDetail } from '../actions/blogActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import Blog from '../components/Blog';
import { BLOG_CREATE_DETAILS_RESET } from '../constants/blogConstants'


function BlogScreen({ match }) {
    const [toggle, setToggle] = useState(null);
    const dispatch = useDispatch()
    
    /*const blogList = useSelector(state => state.blogList)
    const {error, loading, blogs} = blogList*/

    const blogList = useSelector(state => state.blogList)
    const {error, loading, blogs} = blogList
   
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
       dispatch(listBlogs(keyword))

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
          <Link className='btn btn-light m-1 section1' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} to='/' >Go Back</Link>
              {loading ? 
                <Loader /> 
                : error ? <Message variant='danger'>{error}</Message>
                :
                <div>
                  <Row>
                    <Col lg={6} className='d-flex justify-content-start align-items-center'>
                      <h1 className='my-1' style={{ fontFamily: 'rm_typerighter'}}>Foro musicodigo</h1>                  
                    </Col>
                    <Col lg={6} className='d-flex justify-content-end align-items-center'>
                      <h4 className='me-3' style={{ fontFamily: 'rm_typerighter'}}>Buscar un foro:</h4>
                      <SearchBoxBlog />                  
                    </Col>
                  </Row>                    
                  <Row className='mb-2 pt-1'>
                  {blogs.length === 0 ? <h4><b>No existen Foros actualmente</b></h4> : ''}
                    {blogs.map(blog => (
                       <Col key={blog._id} lg={4}>
                          <Blog handleToggle={handleToggle} toggle={toggle} blog={blog} />
                       </Col>                        
                     
                  ))}

                  </Row>

                </div>
              }
          </div>
            )

        }


export default BlogScreen