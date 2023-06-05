import React, { useEffect } from 'react';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Moment from 'react-moment';
import { listProfiles } from '../actions/profileActions'


function Podcast({ podcast, handleToggle, toggle }) {

  const id = podcast._id
  const dispatch = useDispatch()

  const profileList = useSelector(state => state.profileList)
  const { profiles } = profileList
    
  let keyword = useLocation().search

  useEffect(() => {
    dispatch(listProfiles(keyword))

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    
}, [dispatch, keyword])

    return (
    <Card key={podcast._id} className='my-3 border border-success border-3 colorcrd rounded h-100 w-80'>
      <Card.Header>
        {podcast.image && (
          <Card.Img src={podcast.image} className="card-img-top my-2 img-fluid" alt="Imagen" />
        )} 
        <Link to={`/podcasts/${podcast._id}`}>
          <h5 style={{ fontFamily: 'rm_typerighter'}}><strong>{podcast.name}</strong> </h5>
        </Link>

      </Card.Header>
        <Card.Body>
            <h6 className='text-info' style={{ fontFamily: 'rm_typerighter'}}><b>{podcast.comment}</b></h6>
        </Card.Body> 
      <Card.Footer>
      <div class="d-flex flex-row bd-highlight justify-content-center align-items-center">
      <div class="p-2 bd-highlight align-items-center "><h6 className='text-center fontproject' style={{ fontFamily: 'rm_typerighter'}}><b>Creado por: {podcast.author}</b></h6></div>
      {profiles.map(profile => (
          profile.name.trim() === podcast.author.trim() ? <div class="p-2 bd-highlight"><Image className='rounded-circle' src={profile.image} style={{ width: 65, maxHeight: 50}}/></div> : ''     
      ))}
      <div class="p-2 bd-highlight align-items-center"><h6 className='text-center fontproject' style={{ fontFamily: 'rm_typerighter'}}><b><Moment format="DD/MM/YYYY hh:mm:ss">{podcast.createdAt}</Moment></b></h6></div>
    </div>
      </Card.Footer>  
    </Card>
) 
}

export default Podcast
