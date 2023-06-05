import React, { useState} from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import logo2 from '../assets/images/musicodigo.jpg'

function Footer() {

    const [categorypg, setCategorypg] = useState('Grabacion Muestras')

  return (
    <div class='container' >
    <footer class="container p-0" style={{background: "-webkit-linear-gradient(100deg, #090D3A, #00DDFF )" }}>
        <div style={{backgroundColor: "#090D3A" }}>
            <div class="row">

                   <div class="col-md-4 pt-5" >

                    <img src={logo2} className='img-fluid card-img-top p-2' resizeMode='contain' alt='fotoX'  />

                    <ul class="list-unstyled text-light footer-link-list my-3 p-2">
                        <li className='my-1'>
                            <i class="fas fa-map-marker-alt fa-fw"></i>
                            <span className='h5' style={{ fontFamily: 'rm_typerighter'}}>Facultad de Música UNAM</span><br />
                            <span className='h6' style={{ fontFamily: 'rm_typerighter'}}>C. Xicoténcatl 126, Del Carmen, Coyoacán, 04100 Ciudad de México, CDMX</span>
                        </li>
                        <li className='my-1'>
                            <i class="fa fa-phone fa-fw"></i>
                            <a class="text-decoration-none" href="tel:55-77592879"><span className='h5' style={{ fontFamily: 'rm_typerighter'}}>55-77592879</span></a>
                        </li>
                        <li className='my-1'>
                            <i class="fa fa-envelope fa-fw"></i>
                            <a class="text-decoration-none" href="mailto:info@company.com"><span className='h5' style={{ fontFamily: 'rm_typerighter'}}>info@musicodigo.com</span></a>
                        </li>
                    </ul>
                </div>

                <div class="col-md-4 pt-5">
                    <h2 class="h2 text-light border-bottom pb-3 border-light"><span className='h3' style={{ fontFamily: 'rm_typerighter'}}>Temas</span></h2>
                    <ul class="list-unstyled text-light footer-link-list">
                        <li>
                            <LinkContainer to='/project' className='colorMenu'>
                                <a className="text-decoration-none" href="#"><span className='h5' style={{ fontFamily: 'rm_typerighter'}}>Proyectos</span></a>
                            </LinkContainer>
                        </li>
                        <li>
                            <LinkContainer to={`/recordings/?category=${categorypg}`} className='colorMenu'>
                                <a className="text-decoration-none" href="#"><span className='h5' style={{ fontFamily: 'rm_typerighter'}}>Grabaciones</span></a>
                            </LinkContainer>
                        </li>
                        <li>
                            <LinkContainer to='/blogs' className='colorMenu'>
                                <a className="text-decoration-none" href="#"><span className='h5' style={{ fontFamily: 'rm_typerighter'}}>Foros</span></a>
                            </LinkContainer>
                        </li>
                        <li>
                            <LinkContainer to='/podcasts' className='colorMenu'>
                                <a className="text-decoration-none" href="#"><span className='h5' style={{ fontFamily: 'rm_typerighter'}}>Pódcasts</span></a>
                            </LinkContainer>
                        </li>
                        <li>
                            <LinkContainer to='/resource' className='colorMenu'>
                                <a className="text-decoration-none" href="#"><span className='h5' style={{ fontFamily: 'rm_typerighter'}}>Recursos</span></a>
                            </LinkContainer>                        
                        </li>
                        <li>
                            <LinkContainer to='/radios' className='colorMenu'>
                                <a className="text-decoration-none" href="#"><span className='h5' style={{ fontFamily: 'rm_typerighter'}}>Radio</span></a>
                            </LinkContainer>                        
                        </li>
                        <li>
                            <LinkContainer to='/forumlist' className='colorMenu'>
                                <a className="text-decoration-none" href="#"><span className='h5' style={{ fontFamily: 'rm_typerighter'}}>Anuncios</span></a>
                            </LinkContainer>
                        </li>
                        <li>
                            <LinkContainer to='/article' className='colorMenu'>
                                <a className="text-decoration-none" href="#"><span className='h5' style={{ fontFamily: 'rm_typerighter'}}>Blogs</span></a>
                            </LinkContainer>                                                                                                
                        </li>
                      </ul>
                </div>

                <div class="col-md-4 pt-5">
                    <h2 class="h2 text-light border-bottom pb-3 border-light"><span className='h3' style={{ fontFamily: 'rm_typerighter'}}>Mas información</span></h2>
                    <ul class="list-unstyled text-light footer-link-list">
                        <li><a class="text-decoration-none" href="#"><span className='h5' style={{ fontFamily: 'rm_typerighter'}}>Inicio</span></a></li>
                        <LinkContainer to='/about'>
                            <li><a class="text-decoration-none" href="#"><span className='h5' style={{ fontFamily: 'rm_typerighter'}}>Acerca de musicodigo</span></a></li>
                        </LinkContainer>
                    </ul>
                </div>

            </div>

                <div class="row text-light mb-1">
                    <div class="col-12 mb-1">
                        <div class="w-100 my-3 border-top border-light"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 d-flex justify-content-around align-items-center">
                        <ul class="list-inline text-left footer-icons">
                            <li class="list-inline-item border border-light rounded-circle text-center">
                                <a class="text-light text-decoration-none"  href="http://facebook.com/"><i class="fab fa-facebook-f fa-lg fa-fw"></i></a>
                            </li>
                            <li class="list-inline-item border border-light rounded-circle text-center">
                                <a class="text-light text-decoration-none"  href="https://www.instagram.com/"><i class="fab fa-instagram fa-lg fa-fw"></i></a>
                            </li>
                            <li class="list-inline-item border border-light rounded-circle text-center">
                                <a class="text-light text-decoration-none"  href="https://twitter.com/"><i class="fab fa-twitter fa-lg fa-fw"></i></a>
                            </li>
                            <li class="list-inline-item border border-light rounded-circle text-center">
                                <a class="text-light text-decoration-none"  href="https://www.linkedin.com/"><i class="fab fa-linkedin fa-lg fa-fw"></i></a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-6 d-flex justify-content-center align-items-center mb-1">
                        <Link to={'/profilelist'} className='input-group-text btn-success text-decoration-none' style={{color: '#090D3A', fontFamily: 'rm_typerighter'}}>Registrate en la Comunidad musicodigo</Link>
                    </div>
                </div>
            
        </div>

        <div class="w-100 bg-black py-3">
            <div class="container">
                <div class="row pt-2">
                    <div class="col-12">
                        <span class="text-left text-light h5" style={{ fontFamily: 'rm_typerighter'}}>
                            Copyright &copy; 2022 musicodigo 
                            | Designed by <a href="https://www.eduardovillalpando.com" target="_blank" class='text-light'>Eduardo Villalpando Prieto</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>

    </footer>
    </div>

  )
}

export default Footer
