import React from "react";
import "antd/dist/antd.css";
import { Table, Tag, Space, Divider } from "antd";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

function ReceivedBooks() {
  const [listOfReceivedBooks, setListofReceivedBooks] = useState([]);
  let history = useHistory();
  useEffect(() => {
    axios.get("http://localhost:3001/receivedbooks").then((response) => {
      setListofReceivedBooks(response.data);
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
      title: "UserId",
      dataIndex: "userId",
      key: "userId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
    },
    {
      title: "Borrow Date",
      dataIndex: "borrowedDate",
      key: "borrowedDate",
    },
    {
      title: "Return Date",
      dataIndex: "returnDate",
      key: "returnDate",
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
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            href={"http://localhost:3000/card/" + record.id}
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
            href={"http://localhost:3000/card/" + record.id}
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
        RECEIVED BOOKS
      </Tag>
      <Table columns={columns} dataSource={listOfReceivedBooks} />
    </div>
  );
}

export default ReceivedBooks;
