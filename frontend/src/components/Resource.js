import React, { useEffect } from 'react';
import { Card, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ReactPlayer from 'react-player'
import "video-react/dist/video-react.css"; // import css
import { Player, ControlBar, ForwardControl, LoadingSpinner } from 'video-react'
import Moment from 'react-moment';
import { listProfiles } from '../actions/profileActions'

function Resource({ resource }) {

  const dispatch = useDispatch()

  const profileList = useSelector(state => state.profileList)
  const { profiles } = profileList
    
  let keyword = useLocation().search
  useEffect(() => {
    dispatch(listProfiles(keyword))

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    
}, [dispatch, keyword])


  return (
    <Card className='my-3 border border-success border-3 colorcrd rounded h-60 w-100' style={{ fontFamily: 'rm_typerighter'}}>
        <Card.Header>
            <h2 style={{ fontFamily: 'rm_typerighter'}}>{resource.name}</h2>
        </Card.Header>
        <Card.Body>
            <Player
                fluid={false}
                playsInline
                src={resource.video_file}
                className="mx-auto vplayerres"
                width={580} height={300}
              >
                <LoadingSpinner />
                <ControlBar autoHide={false} >
                  <ForwardControl seconds={5} order={3.1} />
                  <ForwardControl seconds={10} order={3.2} />
                </ControlBar>
              </Player>
              </Card.Body>
            <Card.Footer as='div'>
                <div class="d-flex flex-row bd-highlight justify-content-center align-items-center">
                    <div class="p-2 bd-highlight align-items-center"><h6 style={{ fontFamily: 'rm_typerighter'}}><b>Creado por: {resource.author}</b></h6></div>
                    {profiles.map(profile => (
                        profile.name.trim() === resource.author.trim() ? <div class="p-2 bd-highlight"><Image className='rounded-circle' src={profile.image} style={{ width: 65, maxHeight: 50}}/></div> : ''     
                    ))}
                    <div class="p-2 bd-highlight align-items-center"><h6 style={{ fontFamily: 'rm_typerighter'}}><b><Moment format="DD/MM/YYYY hh:mm:ss">{resource.createdAt}</Moment></b></h6></div>
                </div>
                <div class="d-flex flex-row bd-highlight justify-content-center align-items-center">
                      <h6 style={{ fontFamily: 'rm_typerighter'}}><b>{resource.comment}</b></h6>
                </div>
            </Card.Footer>

    </Card>
  )
}

export default Resource
