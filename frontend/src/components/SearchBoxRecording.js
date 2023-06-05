import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'

function SearchBoxRecording() {

  let navigate = useNavigate()
  let location = useLocation()
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
      e.preventDefault()
      if(keyword){
        navigate(`/recordings/?keyword=${keyword}`)
      }else{
        navigate(location.pathname)
      }
  }

  return (
    <Form onSubmit={submitHandler} className='d-flex align-items-center'>
         <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            className='mr-sm-2 ml-sm-5'
        >
        
        </Form.Control>
          <Button
                type='submit'
                variant='outline-primary'
                className='btn-sm px-1 btn-space'
            > 
            BUSCAR
          </Button>
    </Form>
  )
}

export default SearchBoxRecording