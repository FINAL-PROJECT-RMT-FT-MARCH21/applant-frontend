import './App.css';
import React from 'react'
import { Link, Switch, Route, Redirect } from "react-router-dom";

import Signup from './components/Signup'
import Login from './components/Login'

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Link to="/">Home</Link>
        <h1>Home page</h1>
        <Link to="/signup">Sign up |</Link>
        <Link to="/login"> Log in</Link>
        <Switch>
          <Route path="/signup" exact component={() => <Signup />} />
          <Route path="/login" exact component={() => <Login />} />
        </Switch>
      </div>
    )
  }
}

export default App;
