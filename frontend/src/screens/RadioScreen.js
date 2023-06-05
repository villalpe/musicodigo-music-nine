import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SearchBoxProject from '../components/SearchBoxProject';
import { listRadios } from '../actions/radioActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import Radio from '../components/Radio';
import { RADIO_CREATE_DETAILS_RESET } from '../constants/radioConstants'


function RadioScreen({ match }) {
    const [toggle, setToggle] = useState(null);
    const dispatch = useDispatch()
    
    const radioList = useSelector(state => state.radioList)
    const {error, loading, radios} = radioList
   
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
 
    const { id } = useParams();
    let navigate = useNavigate();
    let keyword = useLocation().search

    
    
    useEffect(() => {
       dispatch(listRadios(keyword))

       window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
       
    }, [dispatch, keyword])

    /*const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createBlogDetail(id, {
            rating,
            comment
        }))
    }*/

    return (
      <div className="section1 container">
          <Link className='btn btn-light ms-3 section1' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} to='/login' >Go Back</Link>
              {loading ? 
                <Loader /> 
                : error ? <Message variant='danger'>{error}</Message>
                :
                <div>
                  <div class='row'>
                    <div class='col-sm-6 d-flex justify-content-start align-items-center mt-4'>
                      <h1 className='mx-3 my-2' style={{ fontFamily: 'rm_typerighter'}}>Radio musicodigo</h1>                  
                    </div>
                  </div>                    
                  <Row className='mx-1'>
                  {radios.length === 0 ? <h4><b>No existen archivos de Radio actualmente</b></h4> : ''}
                    {radios.map(radio => (
                       <Col key={radio._id} lg={12}>
                          <Radio radio={radio} />
                       </Col>                        
                     
                  ))}

                  </Row>

                </div>
              }
          </div>
            )

        }


export default RadioScreen
