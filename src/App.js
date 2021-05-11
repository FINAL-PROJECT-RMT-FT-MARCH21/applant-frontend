import './App.scss';
import React from 'react'
import { Switch, Route } from "react-router-dom";
import axios from 'axios'

import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import PlantDetails from './components/PlantDetails'
import Forum from './components/Forum'
import Shop from './components/Shop'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'

class App extends React.Component {
  state = {
    user: {
      _id: "",
      username: "",
      password: "",
      favoritePlants: [],
    },
    logInSuccess: false,
    plants: []
  }

  componentDidMount() {
    axios({
          method: "get",
      url: `http://localhost:5000/all-plants`,
    })
    .then((result)=>{
        console.log(result.data)
        this.setState({...this.state, plants: result.data})
    })
    .catch((error)=>{
        console.log(error)
    })
  }

  editStateFromLogin(body) {
    const stateCopy = { ...this.state };
    stateCopy.user = body;
    stateCopy.logInSuccess = true;
    this.setState(stateCopy);
  }
  
  render(){
    return (
      <div className="App">
        <Navbar auth={this.state.logInSuccess}/>
        <Switch>
          <Route path="/" exact component={() => <Homepage allPlants={this.state.plants} />} />
          <Route path="/plant-details/:_id" exact component={(routeProps)=><PlantDetails {...routeProps} allPlants={this.state.plants} />}/>
          <Route path="/forum" exact component={() => <Forum />} />
          <Route path="/shop" exact component={() => <Shop />} />
          <Route path="/signup" exact component={() => <Signup />} />
          <Route path="/login" exact component={() => <Login 
                setAppState={(body) => this.editStateFromLogin(body)}
                logInSuccess={this.state.logInSuccess} />} />
          <Route path="/profile" exact component={()=> <Profile />} />
        </Switch>
      </div>
    )
  }
}

export default App;
