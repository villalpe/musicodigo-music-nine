import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom'

function Group({ grupo }) {
  return (
    <Card className='my-3 p-3 rounded card-img-top colorcrd' >
        <Link to={`/group/${grupo._id}`} >
            <Card.Img src={grupo.image} style={{ width: 266, height: 200 }}/>
        </Link>

        <Card.Body>
            <Link to={`/group/${grupo._id}`} className="text-decoration-none">
                <Card.Title as='div' >
                    <strong>{grupo.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
                <div className='my-3'>
                    <Rating value={grupo.rating} text={`${grupo.numReviews} reviews`} color={'#f8e825'}/>
                </div>
                <div>
                    <h6>Members: 8</h6>                
                </div>
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Group