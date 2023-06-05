import React, { useEffect } from 'react';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Player, ControlBar, ForwardControl, LoadingSpinner } from 'video-react'
import "video-react/dist/video-react.css"; // import css
import Moment from 'react-moment';
import { listProfiles } from '../actions/profileActions'

function Article({ article }) {

    const dispatch = useDispatch()

    const profileList = useSelector(state => state.profileList)
    const {profiles} = profileList
      
    let keyword = useLocation().search
  
    useEffect(() => {
      dispatch(listProfiles(keyword))
  
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      
  }, [dispatch, keyword])
  return (
    <Card className='mb-3 p-3 rounded card-img-top colorcrd border border-success border-2 h-70 roundedCard' >
        {article.image && (
        <Card.Header>
            <Card.Img src={article.image} className="card-img-top my-2 img-fluid h-50 w-50" alt="Imagen" />
        </Card.Header>
        )}
        <Card.Body>
            <Link to={`/article/${article._id}`}>
                <h5 style={{ fontFamily: 'rm_typerighter'}}><strong>{article.name}</strong></h5>
            </Link>
        </Card.Body>
        <Card.Footer as='div'>
        <div class="d-flex flex-row bd-highlight justify-content-center align-items-center">
            <div class="p-2 bd-highlight align-items-center"><h6 style={{ fontFamily: 'rm_typerighter'}}>Creado por: {article.author}</h6></div>
            {profiles.map(profile => (
                profile.name === article.author ? <div class="p-2 bd-highlight"><Image className='rounded-circle' src={profile.image} style={{ width: 65, maxHeight: 50}}/></div> : ''     
            ))}
            <div class="p-2 bd-highlight align-items-center"><h6 style={{ fontFamily: 'rm_typerighter'}}><Moment format="DD/MM/YYYY hh:mm:ss">{article.createdAt}</Moment></h6></div>
        </div>
 
        </Card.Footer>
    </Card>    
  )
}

export default Article
