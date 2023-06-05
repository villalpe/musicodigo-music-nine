import React, { useEffect } from 'react';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Player, ControlBar, ForwardControl, LoadingSpinner } from 'video-react'
import "video-react/dist/video-react.css"; // import css
import Moment from 'react-moment';
import { listProfiles } from '../actions/profileActions'

function Topic({ topic }) {

    const dispatch = useDispatch()

    const profileList = useSelector(state => state.profileList)
    const {profiles} = profileList
      
    let keyword = useLocation().search
  
    useEffect(() => {
      dispatch(listProfiles(keyword))
  
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      
  }, [dispatch, keyword])
  return (
    <Card className='my-3 p-3 rounded card-img-top colorcrd border border-success border-3 h-100' >
        <Card.Header>
            <Link to={`/topic/${topic._id}`} >
            <Card.Img src={topic.image} className="card-img-top my-2 img-fluid" alt="Imagen" />
            </Link>
        </Card.Header>
        <Card.Body>
            <h5><strong>{topic.name}</strong></h5>
        </Card.Body>
        <Card.Footer as='div'>
        <div class="d-flex flex-row bd-highlight justify-content-center align-items-center">
            <div class="p-2 bd-highlight align-items-center"><h6 className='fontblog'>Creado por: {topic.author}</h6></div>
            {profiles.map(profile => (
                profile.name === topic.author ? <div class="p-2 bd-highlight"><Image className='rounded-circle' src={profile.image} style={{ maxWidth: 45, maxHeight: 45}}/></div> : ''     
            ))}
            <div class="p-2 bd-highlight align-items-center"><h6 className='fontblog'><Moment format="DD/MM/YYYY hh:mm:ss">{topic.createdAt}</Moment></h6></div>
        </div>
 
        </Card.Footer>
    </Card>    
  )
}

export default Topic
