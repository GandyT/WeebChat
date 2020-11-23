import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
/* PAGES */
import Home from "./Pages/Home/component.js";
import Chat from "./Pages/Chat/component.js";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/room" component={Chat} />
        </Switch>
      </Router>
    );
  }
}

export default App;
