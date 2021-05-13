import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import Book from "./pages/Book";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/"> Home Page</Link>
          <Link to="/createbook"> Create A Book</Link>
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/createbook" exact component={CreateBook} />
          <Route path="/book/:id" exact component={Book} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
