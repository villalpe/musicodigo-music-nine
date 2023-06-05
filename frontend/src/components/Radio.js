import React, { useEffect, useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { listProfiles } from '../actions/profileActions'

function Radio({ radio }) {

    const profileList = useSelector(state => state.profileList)
    const { profiles } = profileList

    const dispatch = useDispatch()
  let keyword = useLocation().search

  useEffect(() => {
    dispatch(listProfiles(keyword))

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    
}, [dispatch, keyword])

const musicTracks = [
    {
      name: "Memories",
      src: "https://www.bensound.com/bensound-music/bensound-memories.mp3"
    },
    {
      name: "Creative Minds",
      src: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3"
    },
    {
      name: "Acoustic Breeze",
      src: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3"
    },
    {
      name: "Sunny",
      src: "https://www.bensound.com/bensound-music/bensound-sunny.mp3"
    },
    {
      name: "Tenderness",
      src: "https://www.bensound.com/bensound-music/bensound-tenderness.mp3"
    },
    {
      name: "Once Again",
      src: "https://www.bensound.com/bensound-music/bensound-onceagain.mp3"
    },
    {
      name: "Sweet",
      src: "https://www.bensound.com/bensound-music/bensound-sweet.mp3"
    },
    {
      name: "Love",
      src: "https://www.bensound.com/bensound-music/bensound-love.mp3"
    },
    {
      name: "Piano Moment",
      src: "https://www.bensound.com/bensound-music/bensound-pianomoment.mp3"
    },
    {
      name: "E.R.F",
      src: "https://www.bensound.com/bensound-music/bensound-erf.mp3"
    },
    {
      name: "Dreams",
      src: "https://www.bensound.com/bensound-music/bensound-dreams.mp3"
    },
    {
      name: "A Day To Remember",
      src:
        "https://www.bensound.com/royalty-free-music/track/a-day-to-remember-wedding-music"
    },
    {
      name: "Adventure",
      src: "https://www.bensound.com/bensound-music/bensound-adventure.mp3"
    },
    {
      name: "Photo Album",
      src: "https://www.bensound.com/bensound-music/bensound-photoalbum.mp3"
    },
    {
      name: "November",
      src: "https://www.bensound.com/bensound-music/bensound-november.mp3"
    }
  ];

  const [trackIndex, setTrackIndex] = useState(0);

  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) =>
      currentTrack === 0 ? musicTracks.length - 1 : currentTrack - 1
    );
  };

  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < musicTracks.length - 1 ? currentTrack + 1 : 0
    );
  };

  return (

    <section class='container-fluid mb-2'>

    <div class='row'>
      <div class='col-sm-12 d-flex justify-content-center align-items-center'>
        <span className='mb-1 mt-3 text-warning h5 text-center' style={{ fontFamily: 'rm_typerighter'}}><b>Espere por favor a que el archivo de audio se cargue...</b></span>
      </div>
    </div>

    <div class="d-flex flex-row bd-highlight justify-content-center align-items-center">
                <AudioPlayer
                // style={{ width: "300px" }}
                style={{ borderRadius: "1rem" }}
                autoPlay={true}
                // layout="horizontal"
                src={radio.audio_file}
                onPlay={(e) => console.log("onPlay")}
                showSkipControls={true}
                showJumpControls={false}
                header={`Escuchándose: ${radio.name}`}
                footer={`Toda esta colección es por: ${radio.author}`}
                onClickPrevious={handleClickPrevious}
                onClickNext={handleClickNext}
                onEnded={handleClickNext}
                className='my-3 audioplayer'
                // other props here
            />
    </div>        

        <div class="d-flex flex-row bd-highlight justify-content-center align-items-center">
            <div class="p-2 bd-highlight align-items-center"><h6 style={{ fontFamily: 'rm_typerighter'}}><b>Creado por: {radio.author}</b></h6></div>
        {profiles.map(profile => (
            profile.name === radio.author ? <div class="p-2 bd-highlight"><Image className='rounded-circle' src={profile.image} style={{ width: 65, maxHeight: 50}}/></div> : ''     
        ))}
            <div class="p-2 bd-highlight align-items-center"><h6 style={{ fontFamily: 'rm_typerighter'}}><b><Moment format="DD/MM/YYYY hh:mm:ss">{radio.createdAt}</Moment></b></h6></div>
        </div>
        
        <div class="d-flex flex-row bd-highlight justify-content-center align-items-center">
            <h6 style={{ fontFamily: 'rm_typerighter'}}><b>{radio.comment}</b></h6>
        </div>
    
    </section>

  )
}

export default Radio
