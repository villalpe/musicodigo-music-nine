import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listUsers, deleteUser } from '../actions/userActions'


function UserListScreen() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector(state => state.userDelete)
  const { success: successDelete } = userDelete
  
  useEffect(() => {
      if(userInfo && userInfo.isAdmin){
        dispatch(listUsers())
      }else{
        navigate('/login');
      }

      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      
  }, [dispatch, navigate, successDelete, userInfo])

  const deleteHandler = (id) => {
    if(window.confirm('Estas seguro de borrar este usuario?')){
      dispatch(deleteUser(id))
    }
  }
  
  return (
    <div className='section1 container'>
    <Link className='btn btn-light m-2' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} to='/' >Go Back</Link>    
        <h1>Lista de Usuarios</h1>
        {loading ? 
          (<Loader />)
        : error ?
          (<Message variant='danger'>{error}</Message>)
        : (
          <Table bordered hover responsive className='table-lg text-dark fs-6' style={{ backgroundColor: '#00DDFF', color: '#000'}}>
            <thead className="table-primary">
              <tr>
                <th style={{ fontFamily: 'rm_typerighter'}}>ID</th>
                <th style={{ fontFamily: 'rm_typerighter'}}>NAME</th>
                <th style={{ fontFamily: 'rm_typerighter'}}>EMAIL</th>
                <th style={{ fontFamily: 'rm_typerighter'}}>ADMIN</th>
                <th></th>
                <th></th>            
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td style={{ fontFamily: 'rm_typerighter'}}>{user._id}</td>
                  <td style={{ fontFamily: 'rm_typerighter'}}>{user.name}</td>
                  <td style={{ fontFamily: 'rm_typerighter'}}>{user.email}</td>
                  <td style={{ fontFamily: 'rm_typerighter'}}>{user.isAdmin ? (
                    <i className='fas fa-check' style={{ color:'green' }}></i>
                  ) : (
                    <i className='fas fa-check' style={{ color:'red' }}></i>                    
                  )}</td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>                    
                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                      <i className='fas fa-trash'></i>
                    </Button>                    
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )  
      }
    </div>
  )
}

export default UserListScreen
