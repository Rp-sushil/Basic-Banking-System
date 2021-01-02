import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Import components
import Customers from "./components/Customers";
import Transfers from "./components/Transfers";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <span>
            <Link to="/">Home</Link>
          </span>
          <span>
            <Link to="/customers">Customers</Link>
          </span>
          <span>
            <Link to="/transfers">Transfers</Link>
          </span>
        </nav>
        <Switch>
          <Route path="/customers">
            <Customers />
          </Route>
          <Route path="/transfers">
            <Transfers />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
