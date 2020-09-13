import React, { useState } from "react"
import { Form, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { ApiService } from "../../services/api.service"
import { useAlert } from 'react-alert'

const Login = () => {

    const history = useHistory();
    const alertBox = useAlert()
    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    const changeHandle = e => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const { email, password } = input
        if (email && password) {
            ApiService.callLogin(input).then(() => {
                history.push('home')
                alertBox.success('You have successfully logged in')
            }).catch(err => {
                alertBox.error(err.message && err.message)
            })
        }
        else {
            alert('No fields can be empty')
        }
    }
    
    return (
        <div id="sign-up" >
            <Form className="form" onSubmit={handleSubmit}>
                <h3 className="align-center">LOGIN TO MERN APP</h3>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' onChange={changeHandle} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name='password' onChange={changeHandle} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
                <p className="align-center" onClick={() => history.push('signup')}>New user? click here to register</p>
            </Form>
        </div>
    )
}

export default Login