import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [listOfBooks, setListOfBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/books").then((response) => {
      setListOfBooks(response.data);
    });
  }, []);

  return (
    <div className="App">
      {listOfBooks.map((value, key) => {
        return (
          <div className="book">
            <div className="name"> {value.name}</div>
            <div className="isbn"> {value.isbn}</div>
            <div className="author"> {value.author}</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
