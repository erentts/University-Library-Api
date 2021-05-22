import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Books from "./pages/Books";
import CreateBook from "./pages/CreateBook";
import Book from "./pages/Book";
import Cards from "./pages/Cards";
import CreateCard from "./pages/CreateCard";
import ReceivedBooks from "./pages/ReceivedBooks";
import CreateReceivedBooks from "./pages/CreateReceivedBooks";
import ReservedBooks from "./pages/ReservedBooks";
import CreateReservedBooks from "./pages/CreateReservedBooks";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            {/* Comment Line */}
            <Link to="/books">Books Page</Link>
            <Link to="/cards"> Cards Page</Link>
            <Link to="/receivedbooks"> Received Books Page</Link>
            <Link to="/reservedbooks"> Reserved Books Page</Link>
            <Link to="/createbook"> Create A Book</Link>
            <Link to="/createcard"> Create A Card</Link>
            <Link to="/borrowbook"> Borrow A Book</Link>
            <Link to="/reservebook"> Reserve A Book</Link>
            {!authState && (
              <>
                <Link to="/login"> Login</Link>
                <Link to="/register"> Register</Link>
              </>
            )}
          </div>
          <Switch>
            <Route path="/books" exact component={Books} />
            <Route path="/createbook" exact component={CreateBook} />
            <Route path="/book/:id" exact component={Book} />
            <Route path="/cards" exact component={Cards} />
            <Route path="/createcard" exact component={CreateCard} />
            <Route path="/receivedbooks" exact component={ReceivedBooks} />
            <Route path="/borrowbook" exact component={CreateReceivedBooks} />
            <Route path="/reservedbooks" exact component={ReservedBooks} />
            <Route path="/reservebook" exact component={CreateReservedBooks} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
