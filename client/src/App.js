import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Books from "./pages/Books";
import CreateBook from "./pages/CreateBook";
import Book from "./pages/Book";
import Cards from "./pages/Cards";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          {/* Comment Line */}
          <Link to="/books">Books Page</Link>
          <Link to="/cards"> Cards Page</Link>
          <Link to="/createbook"> Create A Book</Link>
        </div>
        <Switch>
          <Route path="/books" exact component={Books} />
          <Route path="/createbook" exact component={CreateBook} />
          <Route path="/book/:id" exact component={Book} />
          <Route path="/cards" exact component={Cards} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
