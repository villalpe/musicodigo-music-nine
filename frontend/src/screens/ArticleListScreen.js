import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Player } from 'video-react'
import { listArticles, deleteArticle, createArticle } from '../actions/articleActions'
import { ARTICLE_CREATE_RESET } from '../constants/articleConstants'
import Moment from 'react-moment';


function ArticleListScreen() {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [quickFilter, setQuickFilter] = useState("");
  
  const articleList = useSelector(state => state.articleList)
  const { loading, error, articles } = articleList

  const articleDelete = useSelector(state => state.articleDelete)
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = articleDelete

  const articleCreate = useSelector(state => state.articleCreate)
  const { loading: loadingCreate, success: successCreate, error: errorCreate, radio: createdArticle } = articleCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  let keyword = useLocation().search

  useEffect(() => {
    dispatch({ type: ARTICLE_CREATE_RESET })
    if(!userInfo){
      navigate('/login')
    }
    
    dispatch(listArticles(keyword))

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdArticle, keyword])

  const deleteHandler = (id) => {
    if(window.confirm('Estas seguro de borrar este blog?')){
      dispatch(deleteArticle(id))
    }
  }

  const createArticleHandler = () => {
    dispatch(createArticle())
  }

  return (
    <div className='section1 container'>
        <div class='row'>
            <div class='col-sm-4 d-flex justify-content-start align-items-center'>
                <h1 className='text-dark-50 fs-1' style={{ fontFamily: 'rm_typerighter'}}>Blog</h1>
            </div>
            <div class='col-sm-3 d-flex justify-content-center align-items-center'>
                <Button className='my-3' style={{ backgroundColor: '#27365A', color: '#00DDFF', fontFamily: 'rm_typerighter'}} onClick={createArticleHandler}>
                    <i className='fas fa-plus'></i> Crear Nuevo Blog
                </Button>
            </div>
            <div class='col-sm-5 d-flex justify-content-center align-items-center'>
              <span className='text-center border border-danger border-2 p-1 text-warning fs-6' style={{ fontFamily: 'rm_typerighter'}}><b>Importante: En esta sección, si creas nuevo blog, para accesar, favor de editarlo</b></span>
            </div>           
        </div>
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
                  <th></th>
                  <th></th>                            
                </tr>
              </thead>
              <tbody>
              {articles.length === 0 ? <p className='text-danger fx-2'><b>No existen Blogs actualmente</b></p> : ''}
                {articles.map(article => (
                  <tr key={article._id}>
                    <td style={{ fontFamily: 'rm_typerighter'}}>{article.name}</td>
                    <td style={{ fontFamily: 'rm_typerighter'}}>{article.author}</td>
                    <td style={{ fontFamily: 'rm_typerighter'}}><Moment format="DD/MM/YYYY hh:mm:ss">{article.createdAt}</Moment></td>
                    <td>
                      <LinkContainer to={`/article/${article._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                    </td>
                    <td>  
                      <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(article._id)}>
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

export default ArticleListScreen
