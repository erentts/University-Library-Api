import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/createbook">Create A Book</Link>
        <Link to="/">Home Page</Link>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/createbook" exact component={CreateBook} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
