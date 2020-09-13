import React, { useState } from "react"
import { Form, Button } from 'react-bootstrap';

const UploadFile = props => {

    const [file, setFile] = useState('')

    return (
        <Form onSubmit={e => props.upload(e, file)} className="align-center">
            <input
                type="file"
                onChange={e => setFile(e.target.files[0])}
            />
            <Button type="submit">Upload</Button>
        </Form>
    )
}

export default UploadFile