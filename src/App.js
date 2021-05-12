import './App.scss';
import React from 'react'
import { Switch, Route } from "react-router-dom";
import axios from 'axios'

import Navbar from './components/Navbar'
import Message from './components/Message'
import Homepage from './components/Homepage'
import PlantDetails from './components/PlantDetails'
import Forum from './components/Forum'
import Shop from './components/Shop'
import Signup from './components/Signup'
import Login from './components/Login'
import Logout from './components/Logout'
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
    plants: [],
    message: "",
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `http://localhost:5000/all-plants`,
    })
    .then((result)=>{
      console.log(result)
        this.setState({...this.state, plants: result.data})
    })
    .catch((error)=>{
        console.log(error)
    })
  }

 /*  editState(message, body){
    console.log(arguments)
    const stateCopy = {...this.state}
    arguments.forEach((argument)=>{
      console.log(argument)
      if(argument === 'checkLog') {
        stateCopy.logInSuccess = true
      } else {
        stateCopy.[argument] = argument
      }
    }) 
  } */

  editStateFromLogin(body, message) {
    const stateCopy = { ...this.state };
    stateCopy.user = body;
    stateCopy.message = message
    stateCopy.logInSuccess = true;
    this.setState(stateCopy);
  }
  
  editStateFromLogout() {
    const stateCopy = { ...this.state };
    stateCopy.logInSuccess = false;
    this.setState(stateCopy);
  }

  cleanMsg(){
    this.setState({...this.state, message: ''})
  }
  
  render(){
    return (
      <div className="App">
        <Navbar auth={this.state.logInSuccess } logout={()=>this.editStateFromLogout()}/>
        <Message msg={this.state.message} cleanMsg={()=>this.cleanMsg()}/>
        <Switch>
          <Route path="/" exact component={() => <Homepage allPlants={this.state.plants} />} />
          <Route path="/plant-details/:_id" exact component={(routeProps)=><PlantDetails {...routeProps} allPlants={this.state.plants} />}/>
          <Route path="/forum" exact component={() => <Forum />} />
          <Route path="/shop" exact component={() => <Shop />} />
          <Route path="/signup" exact component={() => <Signup logInSuccess={this.state.logInSuccess}/>}/>
          <Route path="/login" exact component={() => <Login 
                setAppState={(body, message) => this.editStateFromLogin(body, message)}
                logInSuccess={this.state.logInSuccess}
                // editState={()=>this.editState()}
                />} />
          <Route path="/logout" exact component={()=> <Logout userInfo={this.state.user} logInSuccess={this.state.logInSuccess}/>} />
          <Route path="/profile" exact component={()=> <Profile userInfo={this.state.user} logInSuccess={this.state.logInSuccess} />} />
        </Switch>
      </div>
    )
  }
}

export default App;
