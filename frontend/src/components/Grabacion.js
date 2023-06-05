import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom'

function Grabacion({ grabacion }) {
  return (
    <Card className='my-3 p-3 rounded colorcrd'>
        <Link to={'/recordinglist'} >
            <div className='cardimagegrabacion'>
                <Card.Img src={grabacion.image} />
            </div>
        </Link>

        <Card.Body>
            <Link to={`/grabacion/${grabacion._id}`} className="text-decoration-none">
                <Card.Title as='div' >
                    <h5>{grabacion.name}</h5>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
                <div className='my-3'>
                    <Rating value={grabacion.rating} text={`${grabacion.numReviews} reviews`} color={'#f8e825'}/>
                </div>
            </Card.Text>
          </Card.Body>
    </Card>
  )
}

export default Grabacion