import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams, useNavigate } from 'react-router-dom';
import { listTopicDetails, createTopicDetail } from '../actions/topicActions'
import { listProfiles } from '../actions/profileActions'
import { TOPIC_CREATE_DETAILS_RESET } from '../constants/topicConstants'
import Moment from 'react-moment';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import EditorToolbar, { modules, formats } from "./EditToolbar";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function TopicDetailScreen({ match }) {


    const [comment, setComment] = useState('')    

    const { id } = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch()

    

    const topicDetails = useSelector(state => state.topicDetails)
    const { error, loading, topic } = topicDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const profileList = useSelector(state => state.profileList)
    const {profiles} = profileList
      
    let keyword = useLocation().search

    useEffect(() => {
        dispatch(listTopicDetails(id))
        dispatch(listProfiles(keyword))

        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [dispatch, id, keyword])


   return (
    <div className="section1 container-fluid">
        <Link className='btn btn-light mt-1 mb-2 ms-1 section1' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} to='/topic'>Go Back</Link>
        {
            loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
            : (
            <div>
            <div>
            <div class='row'>
                <div class='col-sm-12 d-flex justify-content-center align-items-center'>
                    <Image src={topic.image} alt={topic.name} className="card-img-top my-2 img-fluid w-50 " style={{ maxHeight: 550}}/>
                </div>
            </div>
            <div class='row'>
                <div class='col-sm-12 d-flex justify-content-center align-items-center'>
                    <h3 className='my-1'><b>{topic.name}</b></h3> 
                </div>
            </div>
            <div class="d-flex flex-row bd-highlight justify-content-center align-items-center">
                <div class="p-2 bd-highlight align-items-center"><h6><b>Creado por: {topic.author}</b></h6></div>
                {profiles.map(profile => (
                    profile.name === topic.author ? <div class="p-2 bd-highlight"><Image className='rounded-circle' src={profile.image} style={{ width: 65, maxHeight: 50}}/></div> : ''     
                ))}
                <div class="p-2 bd-highlight align-items-center"><h6><b><Moment format="DD/MM/YYYY hh:mm:ss">{topic.createdAt}</Moment></b></h6></div>
            </div>    
            <div class="d-flex flex-row bd-highlight justify-content-center align-items-stretch text-dark" style={{color: '#090D3A', backgroundColor: 'transparent'}}>
                <div class="p-2 bd-highlight justify-content-center align-items-center col-6">       
                    <ReactQuill 
                        theme="snow" 
                        value={topic.comment_rtf} 
                     />
                    </div>
            </div>
            <script>
                ClassicEditor.create(document.getElementById('my_editor'))    
            </script>
 
            </div>


        </div>
          )
        }
    </div>
  )
}


export default TopicDetailScreen
