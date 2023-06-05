import React, { useEffect, useState } from 'react';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Moment from 'react-moment';
import { listProfiles } from '../actions/profileActions'
import { listPodcastDetails } from '../actions/podcastActions'
import AudioPlayer from "react-h5-audio-player";


function PodcastDetailScreen() {

  const { id } = useParams();

  const podcastDetails = useSelector(state => state.podcastDetails)
  const { podcast } = podcastDetails

  const profileList = useSelector(state => state.profileList)
  const {loading, error, profiles} = profileList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()
  let keyword = useLocation().search

  useEffect(() => {

    dispatch(listPodcastDetails(id))
    dispatch(listProfiles(keyword))

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    
}, [dispatch, keyword, id])

const [trackIndex, setTrackIndex] = useState(0);

const handleClickPrevious = () => {
  setTrackIndex((currentTrack) =>
    currentTrack === 0 ? podcast.length - 1 : currentTrack - 1
  );
};

const handleClickNext = () => {
  setTrackIndex((currentTrack) =>
    currentTrack < podcast.length - 1 ? currentTrack + 1 : 0
  );
};

  return (
    <div className="section1 container">
    <Link className='btn btn-light m-1 section1' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} to='/podcasts'>Go Back</Link>
        {
            loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
            : (
            <div>
            {podcast.image && (
              <div class='row'>
                <div class='col-sm-12 d-flex justify-content-center align-items-center'>
                  <Image src={podcast.image} alt={podcast.name} className="card-img-top my-2 img-fluid w-50 h-100" style={{ maxHeight: 550}}/>
                </div>
            </div>
            )}

            <div class='row'>
                <div class='col-sm-12 d-flex justify-content-center align-items-center mb-1'>
                    <h2 className='my-1' style={{ fontFamily: 'rm_typerighter'}}><b>{podcast.name}</b></h2> 
                </div>
            </div>
            <div class="d-flex flex-row bd-highlight justify-content-center align-items-center">
                <div class="p-2 bd-highlight align-items-center"><h6><b>Creado por: {podcast.author}</b></h6></div>
                {podcast.author && (
                    profiles.map(profile => (
                        profile.name.trim() === podcast.author.trim() ? <div class="p-2 bd-highlight"><Image className='rounded-circle' src={profile.image} style={{ width: 65, maxHeight: 50}}/></div> : ''     
                    ))
                )}
                <div class="p-2 bd-highlight align-items-center"><h6><b><Moment format="DD/MM/YYYY hh:mm:ss">{podcast.createdAt}</Moment></b></h6></div>
            </div>    
            <Row>
                <Col lg={3}></Col>
                <Col lg={6} className='d-flex justify-content-center align-items-center'>
                    <span className='my-2 forocoment'><b>{podcast.comment}</b></span>
                </Col>
                <Col lg={3}></Col>
            </Row>
            <div class="d-flex flex-row bd-highlight justify-content-center align-items-center">
                <div class="p-2 bd-highlight">

                <AudioPlayer
                    // style={{ width: "300px" }}
                    style={{ borderRadius: "1rem", width: '600px' }}
                    // layout="horizontal"
                    src={podcast.audio_file}
                    onPlay={(e) => console.log("onPlay")}
                    showSkipControls={true}
                    showJumpControls={false}
                    header={`Podcast: ${podcast.name}`}
                    footer={`Realizado por: ${podcast.author}`}
                    onClickPrevious={handleClickPrevious}
                    onClickNext={handleClickNext}
                    onEnded={handleClickNext}
                    className='my-3 audioplayer'
                    // other props here
                />
                </div>
            </div>
            <div class="d-flex flex-row bd-highlight justify-content-center align-items-center border border-success border-2">
              <div class="col-md p-2 bd-highlight align-items-center">
                <span className='text-dark h6'><b>Transcripción:</b> {podcast.transcription}</span>
              </div>
            </div>

        </div>
          )
        }
    </div>


    
       


) 
}

export default PodcastDetailScreen
