import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'



function AboutScreen() {

 window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

  return (
    <div class='container'>
      <section className='text-dark-50 p-1 text-center text-sm-start my-2'>
          <Row className='align-items-center justify-content-around text-center'>
            <Col lg={6} className='d-flex justify-content-center align-items-center mt-2'>
              <h1 style={{ fontFamily: 'rm_typerighter'}}>Acerca de musicodigo</h1>
            </Col>
          </Row>
          <hr />
          <Row >
            <Col lg={6} className='d-flex justify-content-start align-items-center'>
              <h2 style={{ fontFamily: 'rm_typerighter'}}>Bienvenid@s a Musicódigo.</h2>
            </Col>
          </Row>
          <hr/>
          <Row>
            <Col lg={12} className='d-flex justify-content-center align-items-center colorspan'>
              <h2 style={{ fontFamily: 'rm_typerighter'}}>Una plataforma de interacción multimedia orientada al intercambio de recursos creativos y educativos 
                en el campo de la producción musical. <br />
                <br />
                En musicódigo puedes compartir y publicar grabaciones de audio, archivos de video, artículos sobre temas especializados, 
                crear foros de discusión, publicar conversatorios y crear anuncios de posibles fechas y eventos. <br />  
                <br />
                La plataforma Musicódigo busca  promover la filosofía de la 
                cultura libre y el software libre que abogan por la libertad creativa, la apropiación tecnológica del internet 
                y de las herramientas de producción musical. <br />
                <br />
                Musicódigo es un proyecto creado en el Laboratorio de informática musical y música electroacústica de la facultad de música 
                de la UNAM (LIMME) programado y diseñado por Eduardo Villalpando y Diego Tinajero.</h2>
            </Col>
          </Row>         
          </section>
    </div>
  )
}

export default AboutScreen