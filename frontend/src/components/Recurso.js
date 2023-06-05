import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom'

function Recurso({ recurso }) {
  return (
    <Card className='my-3 p-3 rounded colorcrd'>
        <Link to={`/recurso/${recurso._id}`} >
            <div className='cardimagegrabacion'>
                <Card.Img src={recurso.image} />
            </div>
        </Link>

        <Card.Body>
            <Link to={`/recurso/${recurso._id}`} className="text-decoration-none">
                <Card.Title as='div' >
                    <h5>{recurso.name}</h5>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
                <div className='my-3'>
                    <Rating value={recurso.rating} text={`${recurso.numReviews} reviews`} color={'#f8e825'}/>
                </div>
            </Card.Text>
          </Card.Body>
    </Card>
  )
}

export default Recurso