import React from 'react'
import { Navbar, Container, Form, Button } from 'react-bootstrap';
import { ApiService } from '../services/api.service'
import { useAlert } from 'react-alert'
import { useHistory } from "react-router-dom";

const NavBar = () => {

  const history = useHistory();
  const alert = useAlert();

  const logoutHandle = e => {
    e.preventDefault()
    ApiService.callLogout().then(() => {
      alert.success('You have successfully logged out')
      history.push('login')
    }).catch(() => {
      alert.error('Something went wrong. Please try again')
    })
  }

  return (
    <Navbar expand="lg" variant="light" bg="light">
      <Container>
        <Navbar.Brand href="#">MERN APPLICATION</Navbar.Brand>
      </Container>
      <Form inline>
        <Button variant="outline-info" onClick={logoutHandle}>Logout</Button>
      </Form>
    </Navbar>
  )
}

export default NavBar