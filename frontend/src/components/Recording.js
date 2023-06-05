import React, { useEffect, useState } from 'react';
import { Card, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Moment from 'react-moment';
import fileDownload from 'js-file-download';
import AudioPlayer from "react-h5-audio-player";
import axios from 'axios'
import { listProfiles } from '../actions/profileActions'

function Recording({ recording, handleToggle, toggle }) {

  const id = recording._id
  const dispatch = useDispatch()

  const profileList = useSelector(state => state.profileList)
  const { profiles } = profileList
    
  let keyword = useLocation().search

  useEffect(() => {
    dispatch(listProfiles(keyword))

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    
}, [dispatch, keyword])

  const handleAudioDownload = (fileAudio) => {
    console.log('Archivo Audio ' + fileAudio)
    axios.get(`/api/recordings/downloadaudio/${id}`, { 
        responseType: 'blob',
    }).then(res => {
        fileDownload(res.data, fileAudio);
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}

const handleZipDownload = (fileZip) => {
  console.log('Archivo Zip ' + fileZip)
  axios.get(`/api/recordings/downloadzip/${id}`, { 
      responseType: 'blob',
  }).then(res => {
      fileDownload(res.data, fileZip);
      console.log(res);
  }).catch(err => {
      console.log(err);
  })
}

const [trackIndex, setTrackIndex] = useState(0);

const handleClickPrevious = () => {
  setTrackIndex((currentTrack) =>
    currentTrack === 0 ? recording.length - 1 : currentTrack - 1
  );
};

const handleClickNext = () => {
  setTrackIndex((currentTrack) =>
    currentTrack < recording.length - 1 ? currentTrack + 1 : 0
  );
};


  return (
    <Card className='my-1 rounded border border-success border-2 colorcrd' key={recording._id} h-100>
      <Card.Header 
        onClick={()=>handleToggle(recording._id)} style={{cursor:"pointer"}}> <h5 style={{ fontFamily: 'rm_typerighter'}}>{(recording._id===toggle)?'-':'+'} <strong>{recording.name}</strong> </h5>
      </Card.Header>
      <Card.Body>
        {(recording._id===toggle)?
            <h6 className='text-warning' style={{ fontFamily: 'rm_typerighter'}}><b>{recording.comment}</b></h6>
        : ''}

          <AudioPlayer
            // style={{ width: "300px" }}
            style={{ borderRadius: "1rem" }}
            autoPlay={false}
            // layout="horizontal"
            src={recording.audio_file}
            onPlay={(e) => console.log("onPlay")}
            showSkipControls={true}
            showJumpControls={false}
            header={`${recording.name}`}
            footer={`Archivo por: ${recording.author}`}
            onClickPrevious={handleClickPrevious}
            onClickNext={handleClickNext}
            onEnded={handleClickNext}
            className='my-3 audioplayer'
          // other props here
          />
 
        </Card.Body>
        <Card.Footer>
          <div class="d-flex flex-row bd-highlight justify-content-center align-items-center">
            <div class="p-2 bd-highlight align-items-center "><h6 className='text-center fontproject' style={{ fontFamily: 'rm_typerighter'}}><b>Creado por: {recording.author}</b></h6></div>
            {profiles.map(profile => (
                profile.name.trim() === recording.author.trim() ? <div class="p-2 bd-highlight"><Image className='rounded-circle' src={profile.image} style={{ width: 65, maxHeight: 50}}/></div> : ''     
            ))}
            <div class="p-2 bd-highlight align-items-center"><h6 className='text-center fontproject' style={{ fontFamily: 'rm_typerighter'}}><b><Moment format="DD/MM/YYYY hh:mm:ss">{recording.createdAt}</Moment></b></h6></div>
          </div>
          {recording.licencia === 'Dominio público' ?  <span className='licencia text-warning d-flex flex-row bd-highlight justify-content-center align-items-center my-1' style={{ fontFamily: 'rm_typerighter'}}>Dominio público <i class="fa-brands fa-creative-commons-pd"></i></span>  : ''}
          {recording.licencia === 'Atribución' ?  <span className='licencia text-warning d-flex flex-row bd-highlight justify-content-center align-items-center my-1' style={{ fontFamily: 'rm_typerighter'}}>Atribución <i class="fa-brands fa-creative-commons-by"></i></span>  : ''}
          {recording.licencia === 'Obras derivadas' ?  <span className='licencia text-warning d-flex flex-row bd-highlight justify-content-center align-items-center my-1' style={{ fontFamily: 'rm_typerighter'}}>Obras derivadas <i class="fa-brands fa-creative-commons-nd"></i></span>  : ''}
          {recording.licencia === 'Compartir igual' ?  <span className='licencia text-warning d-flex flex-row bd-highlight justify-content-center align-items-center my-1' style={{ fontFamily: 'rm_typerighter'}}>Compartir igual <i class="fa-brands fa-creative-commons-sa"></i></span>  : ''}
          {recording.licencia === 'No comercial' ?  <span className='licencia text-warning d-flex flex-row bd-highlight justify-content-center align-items-center my-1' style={{ fontFamily: 'rm_typerighter'}}>No comercial <i class="fa-brands fa-creative-commons-nc"></i></span>  : ''}
          <div class='row '>    
          <div className='col-sm-6 d-flex justify-content-center align-items-center my-1 container-fluid'>
              <button
                  onClick={() => handleAudioDownload(recording.audio_file)} className="btn btn-info btn-sm text-dark" style={{ fontFamily: 'rm_typerighter'}}>Descargar Audio
              </button>
          </div>
          {recording.category === 'Grabacion Multicanal' ? (
            <div className='col-sm-6 d-flex justify-content-center align-items-center my-1 container-fluid'>
              <button
                  onClick={() => handleZipDownload(recording.zip_file)} className="btn btn-info btn-sm text-dark" style={{ fontFamily: 'rm_typerighter'}}>Descargar Zip
              </button>    
            </div>
          ) : ''}
      </div>
      <div class='row mt-2'>
        <div className='col-sm-12 d-flex justify-content-center align-items-center'>
          <span className='licencia1 text-warning text-center'><b>Favor de esperar mientras empieza la descarga</b></span>
        </div>
      </div>
        </Card.Footer>
    </Card>
  )
}

export default Recording
