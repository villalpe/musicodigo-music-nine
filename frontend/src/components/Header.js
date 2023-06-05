import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, NavDropdown, Image} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions'
import logo1 from '../assets/images/musicodigo2.png'


function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()

  const [categorypg, setCategorypg] = useState('Muestras audio')
 
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
  <header class='container-fluid'>
  <nav class="navbar navbar-dark navbar-expand-xl border-bottom-1 rounded" style={{backgroundColor: "#090D3A"}}>
    <div className='d-flex justify-content-center align-items-center logosize ms-1'>
      <a href="/" class="navbar-brand"><img src={logo1} alt='Logo MC' resizeMode='contain' className='img-fluid' /></a>
    </div>

    <button class="navbar-toggler " data-bs-toggle="collapse" data-bs-target="#navbar">
      <span class="navbar-toggler-icon p-3"></span>
    </button>
    <div class="navbar-collapse collapse align-self-center flex-fill d-xl-flex justify-content-around " id="navbar">
      <NavDropdown title={ <span className="colorMenu h5" style={{ fontFamily: 'rm_typerighter'}}>Sociales</span> } id="nav-dropdown" >
        <LinkContainer to='#' className='colorMenu' >
          <Nav.Link href="https://facebook.com/"><i class="fab fa-facebook-square"></i><span className='h5' style={{ fontFamily: 'rm_typerighter'}}>Facebook</span></Nav.Link>                
        </LinkContainer>
        <LinkContainer to='#' className='colorMenu'>
          <Nav.Link href="https://instagram.com/" style={{ fontFamily: 'rm_typerighter'}}><i class="fab fa-instagram"></i><span className='h5' style={{ fontFamily: 'rm_typerighter'}}>Instagram</span></Nav.Link>                
        </LinkContainer>
        <LinkContainer to='#' className='colorMenu'>
          <Nav.Link href="https://twitter.com/"><i class="fa-brands fa-twitter"></i><span className='h5' style={{ fontFamily: 'rm_typerighter'}}>Twitter</span></Nav.Link>                
        </LinkContainer>                  
      </NavDropdown>
      <LinkContainer to='/about' className='colorMenu menusizefont' style={{ fontFamily: 'rm_typerighter'}}>
        <Nav.Link href="#"><span style={{ fontFamily: 'rm_typerighter'}} className='h5'>Acerca</span></Nav.Link>                
      </LinkContainer>
      
      <NavDropdown title={ <span className="colorMenu h5" style={{ fontFamily: 'rm_typerighter'}}>Temas</span> } id="nav-dropdown" className="colorMenu">
        <NavDropdown title={ <span className="colorMenu h5" style={{ fontFamily: 'rm_typerighter'}}>Proyectos</span> } id="nav-dropdown" className="colorMenu">
          <LinkContainer to='/projectlist' className='colorMenu'>
            <NavDropdown.Item><span className="colorMenu h5" style={{ fontFamily: 'rm_typerighter'}}>Publicar Proyecto</span></NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to='/project' className='colorMenu'>
            <NavDropdown.Item><span className="colorMenu h5" style={{ fontFamily: 'rm_typerighter'}}>Proyectos</span></NavDropdown.Item>
          </LinkContainer>                  
        </NavDropdown>
        <NavDropdown title={ <span className="colorMenu h5" style={{ fontFamily: 'rm_typerighter'}}>Grabaciones</span> } id="nav-dropdown" className="colorMenu">
          <LinkContainer to='/recordinglist' className='colorMenu'>
            <NavDropdown.Item><span className="colorMenu h5" style={{ fontFamily: 'rm_typerighter'}}>Publicar Grabación</span></NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to={`/recordings/?category=${categorypg}`} className='colorMenu'>
            <NavDropdown.Item><span className="colorMenu h5" style={{ fontFamily: 'rm_typerighter'}}>Grabaciones</span></NavDropdown.Item>
          </LinkContainer>                  
        </NavDropdown>
        <NavDropdown title={ <span className="colorMenu h5" style={{ fontFamily: 'rm_typerighter'}}>Foro</span> } id="nav-dropdown" className="colorMenu">
          <LinkContainer to='/bloglist' className='colorMenu'>
            <NavDropdown.Item><span className="h5" style={{ fontFamily: 'rm_typerighter'}}>Publicar Foro</span></NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to='/blogs' className='colorMenu'>
            <NavDropdown.Item><span className="h5" style={{ fontFamily: 'rm_typerighter'}}>Foros</span></NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>                
        <NavDropdown title={ <span className="colorMenu h5" style={{ fontFamily: 'rm_typerighter'}}>Pódcast</span> } id="nav-dropdown" className="colorMenu">
          <LinkContainer to='/podcastlist' className='colorMenu'>
            <NavDropdown.Item><span className="h5" style={{ fontFamily: 'rm_typerighter'}}>Publicar Pódcast</span></NavDropdown.Item>
          </LinkContainer>
      <LinkContainer to='/podcasts' className='colorMenu'>
        <NavDropdown.Item><span className="h5" style={{ fontFamily: 'rm_typerighter'}}>Pódcasts</span></NavDropdown.Item>
      </LinkContainer>
      <LinkContainer to='/podcastgrid' className='colorMenu'>
        <NavDropdown.Item><span className="h5" style={{ fontFamily: 'rm_typerighter'}}>Pódcast Libre</span></NavDropdown.Item>
      </LinkContainer>                  
      </NavDropdown>
      <NavDropdown title={ <span className="colorMenu h5" style={{ fontFamily: 'rm_typerighter'}}>Recursos</span> } id="nav-dropdown" className="colorMenu">
      <LinkContainer to='/resourcelist' className='colorMenu'>
        <NavDropdown.Item><span className="h5" style={{ fontFamily: 'rm_typerighter'}}>Publicar Recurso</span></NavDropdown.Item>
      </LinkContainer>
      <LinkContainer to='/resource' className='colorMenu'>
        <NavDropdown.Item><span className="h5" style={{ fontFamily: 'rm_typerighter'}}>Recursos</span></NavDropdown.Item>
      </LinkContainer>
      </NavDropdown>
      <NavDropdown title={ <span className="colorMenu h5" style={{ fontFamily: 'rm_typerighter'}}>Radio</span> } id="nav-dropdown" className="colorMenu">
      <LinkContainer to='/radiolist' className='colorMenu'>
        <NavDropdown.Item><span className="h5" style={{ fontFamily: 'rm_typerighter'}}>Publicar Radio</span></NavDropdown.Item>
      </LinkContainer>
      <LinkContainer to='/radios' className='colorMenu'>
        <NavDropdown.Item><span className="h5" style={{ fontFamily: 'rm_typerighter'}}>Radio</span></NavDropdown.Item>
      </LinkContainer>
      </NavDropdown>
      <NavDropdown title={ <span className="colorMenu h5" style={{ fontFamily: 'rm_typerighter'}}>Anuncios</span> } id="nav-dropdown" className="colorMenu">
      <LinkContainer to={'/forumlist'} className='colorMenu'>
        <NavDropdown.Item><span className="h5" style={{ fontFamily: 'rm_typerighter'}}>Anuncios</span></NavDropdown.Item>
      </LinkContainer>
      </NavDropdown>
      <NavDropdown title={ <span className="colorMenu h5" style={{ fontFamily: 'rm_typerighter'}}>Blogs</span> } id="nav-dropdown" className="colorMenu">
      <LinkContainer to='/articlelist' className='colorMenu'>
        <NavDropdown.Item><span className="h5" style={{ fontFamily: 'rm_typerighter'}}>Publicar Blog</span></NavDropdown.Item>
      </LinkContainer>
      <LinkContainer to='/articles' className='colorMenu'>
        <NavDropdown.Item><span className="h5" style={{ fontFamily: 'rm_typerighter'}}>Blogs</span></NavDropdown.Item>
      </LinkContainer>
      </NavDropdown>
      </NavDropdown>
              

      {userInfo ? (
      <NavDropdown title={<span className='colorMenu h5' style={{ fontFamily: 'rm_typerighter'}}>{userInfo.name}</span>} id='username'>
          <LinkContainer to={'/profileuser'} className='colorMenu'>
              <NavDropdown.Item><span className="h5" style={{ fontFamily: 'rm_typerighter'}}>Profile</span></NavDropdown.Item>
          </LinkContainer>

          <NavDropdown title={ <span className="colorMenu h5" style={{ fontFamily: 'rm_typerighter'}}>Comunidad</span> } id="nav-dropdown" className="colorMenu">
          <LinkContainer to='/profilelist' className='colorMenu'>
            <NavDropdown.Item><span className="h5" style={{ fontFamily: 'rm_typerighter'}}>Publicar Comunidad</span></NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to='/comunity' className='colorMenu'>
            <NavDropdown.Item><span className="h5" style={{ fontFamily: 'rm_typerighter'}}>Comunidad</span></NavDropdown.Item>
          </LinkContainer>
          </NavDropdown>
          <NavDropdown.Item onClick={logoutHandler}><span className="h5" style={{ fontFamily: 'rm_typerighter'}}>Logout</span></NavDropdown.Item>                          
          </NavDropdown>
      ) : (
      <LinkContainer to='/login' className='colorMenu'>
        <Nav.Link><span className="h5" style={{ fontFamily: 'rm_typerighter'}}>Login</span></Nav.Link>
      </LinkContainer>
      )
      }
      {userInfo && userInfo.isAdmin && (
      <NavDropdown title={ <span className="colorMenu h5" style={{ fontFamily: 'rm_typerighter'}}>Admin</span> } id='adminmenu' style={{backgroundColor: '#090D3A'}}>
      <LinkContainer to={'/admin/userlist'} className='colorMenu'>
          <NavDropdown.Item><span className="h5" style={{ fontFamily: 'rm_typerighter'}}>Usuarios</span></NavDropdown.Item>
      </LinkContainer>
      </NavDropdown>                    
      )}
  </div>
</nav>  
  </header>

  )
}

export default Header
