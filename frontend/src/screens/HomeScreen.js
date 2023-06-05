import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Container } from 'react-bootstrap'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Profile from '../components/Profile'
import Grabacion from '../components/Grabacion'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProfiles } from '../actions/profileActions'
import ForumCarousel from '../components/ForumCarousel'
import UserCarousel from '../components/UserCarousel'
import Paginate from '../components/Paginate'
import picture1 from '../assets/images/proyectos.png'
import picture2 from '../assets/images/grabaciones.png'
import picture3 from '../assets/images/foro.png'
import picture4 from '../assets/images/podcast4.png'
import picture5 from '../assets/images/recursos.png'
import picture6 from '../assets/images/radio.png'
import picture7 from '../assets/images/anuncios1.png'
import picture8 from '../assets/images/blog1.png'


function HomeScreen() {
  const dispatch = useDispatch()

  const [categorypg, setCategorypg] = useState('Grabacion Muestras')
   
  const profileList = useSelector(state => state.profileList)
  const {error, loading, profiles, page, pages} = profileList
    
  let keyword = useLocation().search
  
  useEffect(() => {
      dispatch(listProfiles(keyword))
  }, [dispatch, keyword])

  return (
    <div>
    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
    : 
    <div class='container'>
      <section className='text-dark-50 p-1 text-center text-sm-start'>
          <Row className='align-items-center justify-content-around text-center'>
            <Col lg={6} >
              <h1 className='mx-4 text-center' style={{ fontFamily: 'rm_typerighter'}}><strong>
              Plataforma de interacción multimedia orientada al intercambio de recursos creativos y 
              educativos en el campo de la producción musical</strong>        
              </h1>
            </Col>
            <Col lg={6}>
                <ForumCarousel />          
            </Col>
          </Row>
      </section>
      <section className='text-dark-50 p-1 text-center text-sm-start'>
        <Row>
          <Col lg={3} className='mb-2'>
            <Card className='mb-1 mt-1 mx-1 p-3 h-100 roundedCard colorcrd' >
            <Link to={'/project'} className='d-flex justify-content-center align-items-center mt-2'>
                <Card.Img src={picture1} class="rounded-0 img-fluid border-secondary" alt='fotoP' className='card-img-top cardsize' resizeMode='contain'/>
            </Link>
            <Card.Body>
                <Link to={'/project'} className="text-decoration-none">
                    <Card.Title as='div' >
                        <h3 className='fw-bolder' style={{ fontFamily: 'rm_typerighter'}}>Proyectos Audiovisuales</h3>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <div className='my-3'>
                        <h5 style={{ fontFamily: 'rm_typerighter'}}>Producciones artisticas de la comunidad.</h5>
                    </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} className='mb-2'>
            <Card className='mb-1 mx-1 mt-1 p-3 h-100 roundedCard colorcrd' >
            <Link to={`/recordings/?category=${categorypg}`} className='d-flex justify-content-center align-items-center mt-2'>
                <Card.Img src={picture2} class="rounded-0 img-fluid border-secondary" alt='fotoP' className='card-img-top' resizeMode='contain'/>
            </Link>
      
            <Card.Body>
                <Link to={`/recordings/?category=${categorypg}`} className="text-decoration-none">
                    <Card.Title as='div' >
                        <h3 className='fw-bolder' style={{ fontFamily: 'rm_typerighter'}}>Grabaciones</h3>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <div className='my-3'>
                        <h5 style={{ fontFamily: 'rm_typerighter'}}>Audios y sesiones descargables para remix, sampleo o mezcla de sonido.</h5>
                    </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} className='mb-2'>
            <Card className='mb-1 mx-1 mt-1 p-3 h-100 roundedCard colorcrd' >
            <Link to={'/blogs'} className='d-flex justify-content-center align-items-center mt-2'>
                <Card.Img src={picture3} class="rounded-0 img-fluid border-secondary" alt='fotoP' className='card-img-top' resizeMode='contain'/>
            </Link>
    
            <Card.Body>
              <Link to={'/blogs'} className="text-decoration-none">
                  <Card.Title as='div'>
                      <h3 className='fw-bolder' style={{ fontFamily: 'rm_typerighter'}}>Foro de discusión</h3>
                  </Card.Title>
              </Link>
              <Card.Text as='div'>
                  <div className='my-3'>
                      <h5 style={{ fontFamily: 'rm_typerighter'}}>Crea o consulta un tema de discusión.</h5>
                  </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} className='mb-2'>
          <Card className='mb-1 p-3 mt-1 h-100 roundedCard colorcrd' >
          <Link to={'/podcasts'} className='d-flex justify-content-center align-items-center mt-2'>
              <Card.Img src={picture4} class="rounded-0 img-fluid border-secondary" alt='fotoP' className='card-img-top' resizeMode='contain' />
          </Link>
    
          <Card.Body>
              <Link to={'/podcasts'} className="text-decoration-none">
                  <Card.Title as='div'>
                      <h3 className='fw-bolder' style={{ fontFamily: 'rm_typerighter'}}>Conversatorios</h3>
                  </Card.Title>
              </Link>
              <Card.Text as='div'>
                  <div className='my-3'>
                      <h5 style={{ fontFamily: 'rm_typerighter'}}>Quieres escuchar contenido grabado en audio de diferentes temas...</h5>
                  </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>      
      </Row>
      <Row>
        <Col lg={3} className='mb-2'>
        <Card className='my-1 mx-1 p-3 h-100 roundedCard colorcrd' >
        <Link to={'/resource'} className='d-flex justify-content-center align-items-center mt-2'>
            <Card.Img src={picture5} class="rounded-0 img-fluid border-secondary" alt='fotoP' className='card-img-top' resizeMode='contain'/>
        </Link>

        <Card.Body>
            <Link to={'/resource'} className="text-decoration-none">
                <Card.Title as='div'>
                    <h3 className='fw-bolder' style={{ fontFamily: 'rm_typerighter'}}>Tutoriales</h3>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
                <div className='my-3'>
                    <h5 style={{ fontFamily: 'rm_typerighter'}}>Recursos audiovisuales educativos.</h5>
                </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={3} className='mb-2'>
        <Card className='my-1 mx-1 p-3 h-100 roundedCard colorcrd' >
        <Link to={'/radios'} className='d-flex justify-content-center align-items-center mt-2'>
            <Card.Img src={picture6} class="rounded-0 img-fluid border-secondary" alt='fotoP' className='card-img-top' resizeMode='contain'/>
        </Link>

        <Card.Body>
            <Link to={'/radios'} className="text-decoration-none">
                <Card.Title as='div'>
                    <h3 className='fw-bolder' style={{ fontFamily: 'rm_typerighter'}}>Radio</h3>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
                <div className='my-3'>
                    <h5 style={{ fontFamily: 'rm_typerighter'}}>Conversatorios y lista de reproducción.</h5>
                </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={3} className='mb-2'>
        <Card className='my-1 mx-1 p-3 h-100 roundedCard colorcrd' >
        <Link to={'/forumlist'} className='d-flex justify-content-center align-items-center mt-2'>
            <Card.Img src={picture7} class="rounded-0 img-fluid border-secondary" alt='fotoP' className='card-img-top' resizeMode='contain'/>
        </Link>

        <Card.Body>
            <Link to={'/forumlist'} className="text-decoration-none">
                <Card.Title as='div' >
                    <h3 className='fw-bolder' style={{ fontFamily: 'rm_typerighter'}}>Anuncios</h3>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
                <div className='my-3'>
                    <h5 style={{ fontFamily: 'rm_typerighter'}}>Publica un anuncio en la página principal</h5>
                </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={3} className='mb-2'>
        <Card className='mb-1 p-3 mt-1 h-100 roundedCard colorcrd' >
        <Link to={'/article'} className='d-flex justify-content-center align-items-center mt-2'>
            <Card.Img src={picture8} class="rounded-0 img-fluid border-secondary" alt='fotoP' className='card-img-top' resizeMode='contain'/>
        </Link>

        <Card.Body>
            <Link to={'/article'} className="text-decoration-none">
                <Card.Title as='div'>
                    <h3 className='fw-bolder' style={{ fontFamily: 'rm_typerighter'}}>Blog</h3>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
                <div className='my-3'>
                    <h5 style={{ fontFamily: 'rm_typerighter'}}>Crea o encuentra un artículo.</h5>
                </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      </Row>     
      </section>
        <section className='text-dark-50 p-1 text-center text-sm-start section1 container-fluid'>
          <Link to={`/comunity`} className='d-flex justify-content-center align-items-center text-decoration-none mt-2'>
              <h1 style={{ fontFamily: 'rm_typerighter'}}>Comunidad Musicodigo</h1>
          </Link>
        </section>
       </div>
      }
    </div>
  )
}

export default HomeScreen
