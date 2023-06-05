import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader';
import Message from './Message'
import { listForums } from '../actions/forumActions'

function ForumCarousel() {

    const dispatch = useDispatch()
    const forumList = useSelector(state => state.forumList)
    const { forums, loading, error } = forumList

    useEffect(() => {
        dispatch(listForums())
    }, [dispatch])


  return (
    loading ? <Loader />
    : error ? <Message variant='danger'>{error}</Message>
    : (
        <Carousel pause='hover' className='colormc carousel slide carousel-fade' data-ride='carousel' h-100>
            {forums.map(forum => (
                <Carousel.Item key={forum._id}>
                    <Link to={'/'}>
                        <Image className='img-fluid' img-size src={forum.image} alt={forum.name} />
                        <Carousel.Caption className='carousel.caption'>
                            {forum.name ? <p className='text-uppercase mb-3 text-center h2' style={{ fontFamily: 'rm_typerighter'}}><mark className='colorforum' style={{ fontFamily: 'rm_typerighter'}}><b>{forum.name}</b></mark></p> : ''}
                            {forum.comment ? <p className='text-uppercase text-center h3'><mark className='colorforum1' style={{ fontFamily: 'rm_typerighter'}}><b>{forum.comment}</b></mark></p> : '' }
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
  )
}

export default ForumCarousel