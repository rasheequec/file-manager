import React, { useEffect, useState } from "react"
import NavBar from '../../components/navbar';
import { ApiService } from "../../services/api.service";
import FilesView from './filesView';
import UploadFile from './uploadFile';
import { useAlert } from 'react-alert'

const Home = () => {
    
    const alertBox = useAlert()
    const [fileData, setFileData] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        fetchFiles()
    }, [])

    const fetchFiles = () => {
        ApiService.fileList().then(res => {
            setFileData(res.data)
            setIsAdmin(res.isAdmin)
        }).catch(err => {
            console.log(err)
        })
    }

    const upload = (e, file) => {
        e.preventDefault()
        if (file) {
            const formData = new FormData();
            formData.append(
                "myFile",
                file,
                file.name
            );
            ApiService.uploadFile(formData).then(data => {
                alertBox.success('You have successfully uploaded the file.')
                fetchFiles()
            }).catch(err => {
                alertBox.error('Upload failed. Please try again.')
            })
        }
        else {
            alert('Please select a file and upload')
        }
    }

    return (
        <div>
            <NavBar />
            <UploadFile upload={upload} />
            <FilesView fileData={fileData} isAdmin={isAdmin} />
        </div>
    )
}

export default Home