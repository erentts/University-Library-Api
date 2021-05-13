import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Home() {
  const [listOfBooks, setListOfBooks] = useState([]);
  let history = useHistory();
  useEffect(() => {
    axios.get("http://localhost:3001/books").then((response) => {
      setListOfBooks(response.data);
    });
  }, []);
  return (
    <div>
      {listOfBooks.map((value, key) => {
        return (
          <div
            className="book"
            onClick={() => {
              history.push(`/book/${value.id}`);
            }}
          >
            <div className="name"> {value.name}</div>
            <div className="isbn"> {value.isbn}</div>
            <div className="author"> {value.author}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
