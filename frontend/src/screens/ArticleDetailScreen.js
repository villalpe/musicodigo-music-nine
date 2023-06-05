import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams, useNavigate } from 'react-router-dom';
import { listArticleDetails, createArticleDetail } from '../actions/articleActions'
import { listProfiles } from '../actions/profileActions'
import { ARTICLE_CREATE_DETAILS_RESET } from '../constants/articleConstants'
import Moment from 'react-moment';
//import EditorToolbar, { modules, formats } from "./EditToolbar";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function ArticleDetailScreen({ match }) {
    const [comment, setComment] = useState('')    

    const { id } = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const articleDetails = useSelector(state => state.articleDetails)
    const { error, loading, article } = articleDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const profileList = useSelector(state => state.profileList)
    const {profiles} = profileList
      
    let keyword = useLocation().search

    useEffect(() => {
        dispatch(listArticleDetails(id))
        dispatch(listProfiles(keyword))

        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

    }, [dispatch, id, keyword])


   return (
    <div className="section1 container">
        <Link className='btn btn-light mt-1 mb-2 ms-1 mx-2 section1' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} to='/articles'>Go Back</Link>
        {
            loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
            : (
            <div>
            <div>
            {!article.image && (
                <div class='row'>
                <div class='col-sm-12 d-flex justify-content-center align-items-center'>
                    <Image src={article.image} alt={article.name} className="card-img-top my-2 img-fluid w-50 " style={{ maxWidth: 500, maxHeight: 550}}/>
                </div>
            </div>
            )}
            <div class='row'>
                <div class='col-sm-12 d-flex justify-content-center align-items-center'>
                    <h3 className='my-1'><b>{article.name}</b></h3> 
                </div>
            </div>
            <div class="d-flex flex-row bd-highlight justify-content-center align-items-center">
                <div class="p-2 bd-highlight align-items-center"><h6><b>Creado por: {article.author}</b></h6></div>
                {article.author && (
                    profiles.map(profile => (
                        profile.name.trim() === article.author.trim() ? <div class="p-2 bd-highlight"><Image className='rounded-circle' src={profile.image} style={{ maxWidth: 65, maxHeight: 50}}/></div> : ''     
                    ))
                )}
                <div class="p-2 bd-highlight align-items-center"><h6><b><Moment format="DD/MM/YYYY hh:mm:ss">{article.createdAt}</Moment></b></h6></div>
            </div>    
            <div class="d-flex flex-row bd-highlight justify-content-center align-items-stretch text-dark" >
                <div class="p-2 bd-highlight justify-content-center align-items-center col-10" style={{background: '#00DDFF'}}>
                    <ReactQuill 
                        theme="snow"
                        readOnly = 'true' 
                        value={article.comment_rtf}
                     />
                    </div>
            </div>
 
            </div>


        </div>
          )
        }
    </div>
  )
}

export default ArticleDetailScreen