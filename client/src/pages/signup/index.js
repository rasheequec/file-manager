import React, { useState } from "react"
import { Form, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { ApiService } from "../../services/api.service"
import { useAlert } from 'react-alert'

const SignUp = () => {

    const history = useHistory();
    const alertBox = useAlert()
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: ''
    })

    const changeHandle = e => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const { name, email, password } = input
        if (name && email && password) {
            const data = {
                email,
                password,
                name
            }
            ApiService.callRegister(data).then(data => {
                alertBox.success('You have successfully registered. Please login to continue.')
                history.push('login')
            }).catch(err => {
                alertBox.error(`Something went wrong. error -${err.message && err.data.message._message}`)
            })
        }
        else {
            alert("No fields can be empty")
        }
    }
    
    return (
        <div id="sign-up" >
            <Form className="form" onSubmit={handleSubmit}>
                <h3 className="align-center">REGISTER TO MERN APP</h3>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name='name' onChange={changeHandle} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' onChange={changeHandle} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name='password' onChange={changeHandle} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
                <p className="align-center" onClick={() => history.push('login')}>Already Signup? click here to login</p>
            </Form>
        </div>
    )
}

export default SignUp