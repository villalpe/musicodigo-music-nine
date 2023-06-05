import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'

function Profile({ profile }) {
  return (
    <Card className='mb-2 p-2 rounded colorcrd h-auto'>
        <Link to={`/profile/${profile._id}`} >
            <div className='cardimage'>
                <Card.Img src={profile.image}/>
            </div>
        </Link>

        <Card.Body>
            <Link to={`/profile/${profile._id}`} className="text-decoration-none">
                <Card.Title as='div' >
                    <h4 className='d-flex justify-content-center align-items-center'>{profile.name}</h4>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
                <div className='my-3'>
                    <span className='d-flex justify-content-center' style={{ color: '#00FFCE'}}>Bio</span>
                    <p>{profile.bio}</p>
                </div>
            </Card.Text>
            <Card.Text as='div'>
                <div className='my-3'>
                    <h5>{profile.comment}</h5>
                </div>
            </Card.Text>
            <Card.Text as='div'>
                <div className='my-3'>
                    <h6>Miembro desde: {profile.createdAt.substring(0,16)}</h6>
                </div>
            </Card.Text>                       
          </Card.Body>
    </Card>
  )
}

export default Profile