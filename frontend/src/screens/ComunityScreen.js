import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Container } from 'react-bootstrap'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Profile from '../components/Profile'
import Grabacion from '../components/Grabacion'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProfiles } from '../actions/profileActions'
import UserCarousel from '../components/UserCarousel'


function ComunityScreen() {
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(null);
     
    const profileList = useSelector(state => state.profileList)
    const {error, loading, profiles } = profileList
      
    let keyword = useLocation().search

    useEffect(() => {
        dispatch(listProfiles(keyword))

        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        
    }, [dispatch, keyword])

    let handleToggle=(id)=>{
        if(toggle===id){
            setToggle(null);
            return false
        }
       setToggle(id)
       
    }
  
    return (
      <div>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
      : 
      <div class='container'>
          <section className='text-white p-1 mt-3 mb-3 text-center align-items-center text-sm-start'>
            <Row className='align-items-center justify-content-around text-center'>
            <Col>
              <h1 className='my-1' style={{ fontFamily: 'rm_typerighter'}}>Comunidad musicodigo</h1> 
            </Col>
            <Col>
                <Link to={`/profilelist`} className='d-flex justify-content-center align-items-center text-decoration-none mt-2'>
                    <h2 style={{ fontFamily: 'rm_typerighter'}}>Te gustaría integrarte?</h2>
                </Link>
            </Col>
            </Row>
            <Row>
              {profiles.map(profile => (
                <Col key={profile._id} lg={4}>
                  <UserCarousel handleToggle={handleToggle} toggle={toggle} profile={profile}/>
                  </Col>
              ))}
            </Row>

        </section>
         
         </div>
        }
      </div>
    )
  }
  
  export default ComunityScreen
