import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SearchBoxArticle from '../components/SearchBoxArticle';
import { listArticles, listArticleDetails, createArticle } from '../actions/articleActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import Article from '../components/Article';


function ArticleScreen({ match }) {
    const [toggle, setToggle] = useState(null);
    const dispatch = useDispatch()
    
    /*const blogList = useSelector(state => state.blogList)
    const {error, loading, blogs} = blogList*/

    const articleList = useSelector(state => state.articleList)
    const {error, loading, articles} = articleList
   
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
       dispatch(listArticles(keyword))

       window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
       
    }, [dispatch, keyword])


    return (
      <div className="section1 container">
          <Link className='btn btn-light m-1 section1' style={{ backgroundColor: '#27365A', color: '#00DDFF', fontFamily: 'rm_typerighter'}} to='/login' >Go Back</Link>
              {loading ? 
                <Loader /> 
                : error ? <Message variant='danger'>{error}</Message>
                :
                <div className='container'>
                  <Row>
                    <Col lg={6} className='d-flex justify-content-start align-items-center'>
                      <h1 className='my-4' style={{ fontFamily: 'rm_typerighter'}}>Blogs en musicodigo</h1>                  
                    </Col>
                    <Col lg={6} className='d-flex justify-content-end align-items-center'>
                      <h5 className='px-1' style={{ fontFamily: 'rm_typerighter'}}>Buscar un blog:</h5>
                      <SearchBoxArticle />                  
                    </Col>
                  </Row>                    
                  <Row className='mb-1 pt-1'>
                  {articles.length === 0 ? <h4 style={{ fontFamily: 'rm_typerighter'}}><b>No existen Blogs actualmente</b></h4> : ''}
                    {articles.map(article => (
                       <Col key={article._id} lg={4}>
                        <Article handleToggle={handleToggle} toggle={toggle} article={article} />
                       </Col>                        
                  ))}

                  </Row>

                </div>
              }
          </div>
            )
        }


export default ArticleScreen
