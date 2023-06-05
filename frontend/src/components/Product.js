import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom'

function Product({ product }) {
  return (
    <Card className='my-3 p-3 rounded colorcrd'>
        <Link to={`/product/${product._id}`} >
            <div className='cardimage'>
                <Card.Img src={product.image} />
            </div>
        </Link>

        <Card.Body>
            <Link to={`/product/${product._id}`} className="text-decoration-none">
                <Card.Title as='div' >
                    <h5>{product.name}</h5>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
                <div className='my-3'>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                </div>
            </Card.Text>
          </Card.Body>
    </Card>
  )
}

export default Product