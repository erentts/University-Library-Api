import React from "react";
import axios from "axios";
import { Table, Tag, Space, Divider } from "antd";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function Books() {
  const [listOfBooks, setListOfBooks] = useState([]);
  let history = useHistory();
  useEffect(() => {
    axios.get("http://localhost:3001/books").then((response) => {
      setListOfBooks(response.data);
    });
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "updatedAt",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "Material Type",
      dataIndex: "materialType",
      key: "materialType",
    },
    {
      title: "Available",
      dataIndex: "isAvailable",
      key: "isAvailable",
    },
    {
      title: "Reservation",
      dataIndex: "isReservation",
      key: "isReservation",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            href={"http://localhost:3000/book/" + record.id}
            style={{ color: "orange", fontWeight: "bold" }}
          >
            Update
          </a>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            href={"http://localhost:3000/book/" + record.id}
            style={{ color: "red", fontWeight: "bold" }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Tag
        color="volcano"
        style={{
          marginTop: "20px",
          marginLeft: "40%",
          marginRight: "50%",
          marginBottom: "20px",
          textAlign: "center",
          fontSize: "25px",
          padding: "15px",
        }}
      >
        BOOKS
      </Tag>

      <Table columns={columns} dataSource={listOfBooks} />
    </div>
  );
}

export default Books;
