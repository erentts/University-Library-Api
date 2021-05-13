import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table } from "react-bootstrap";

function Book() {
  let { id } = useParams();
  const [bookObject, setBookObject] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:3001/books/byId/${id}`).then((response) => {
      setBookObject(response.data);
    });
  });

  return (
    <div className="bookPage">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>ISBN</th>
            <th>Author</th>
            <th>createdAt</th>
            <th>updatedAt</th>
            <th>MaterialType</th>
            <th>isAvailable</th>
            <th>isReservation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{bookObject.id}</td>
            <td>{bookObject.name}</td>
            <td>{bookObject.isbn}</td>
            <td>{bookObject.author}</td>
            <td>{bookObject.createdAt}</td>
            <td>{bookObject.updatedAt}</td>
            <td>{bookObject.materialType}</td>
            <td>{bookObject.isAvailable}</td>
            <td>{bookObject.isReservation}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Book;
