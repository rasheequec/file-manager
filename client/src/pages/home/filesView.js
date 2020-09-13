import React from "react"
import { Table } from 'react-bootstrap';
import { APIPath } from "../../utilities/constants";

const FilesView = ({ fileData, isAdmin }) => {
  
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          {isAdmin && <th>File Owner</th>}
          <th>File Name</th>
          <th>File</th>
        </tr>
      </thead>
      <tbody>
        {fileData.map((data, i) => {
          return (
            <tr key={data._id}>
              <td>{i + 1}</td>
              {isAdmin && <td>{data.owner}</td>}
              <td>{data.name}</td>
              <td><a target="_blank" href={`${APIPath}/${data.path}`}>View / Download</a></td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default FilesView