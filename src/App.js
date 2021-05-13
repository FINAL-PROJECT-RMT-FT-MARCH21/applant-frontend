import "./App.scss";
import React from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import Admin from "./components/Admin";
import Navbar from "./components/Navbar";
import Message from "./components/Message";
import Homepage from "./components/Homepage";
import PlantDetails from "./components/PlantDetails";
import Forum from "./components/Forum";
import Shop from "./components/Shop";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import ShopItem from "./components/ShopItem";

class App extends React.Component {
  state = {
    user: {
      _id: "",
      username: "",
      password: "",
      admin: false,
      favoritePlants: [],
    },
    logInSuccess: false,
    plants: [],
    message: "",
  };

  componentDidMount() {
    axios({
      method: "get",
      url: `http://localhost:5000/all-plants`,
      withCredentials: true,
    })
      .then((result) => {
        this.setState({ ...this.state, plants: result.data });
      })
      .catch((error) => {
        console.log(error);
      });

    this.updateUser();
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

  updateUser() {
    // No pasar como props para evitar loop
    axios({
      method: "get",
      url: "http://localhost:5000/loggedin",
      withCredentials: true,
    })
      .then((result) => {
        const stateCopy = { ...this.state };
        stateCopy.user = result.data.user;
        this.setState(stateCopy);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  editStateFromPlantDetails(selectedPlantId) {
    axios({
      method: "post",
      url: "http://localhost:5000/add-plant",
      data: { plantId: selectedPlantId, user: this.state.user },
      withCredentials: true,
    })
      .then((result) => {
        const stateCopy = { ...this.state };
        stateCopy.user.favoritePlants.push(selectedPlantId);
        stateCopy.message = result.data.message;
        this.setState(stateCopy);
        this.updateUser();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editStateFromLogin(user, message) {
    const stateCopy = { ...this.state };
    stateCopy["user"] = user;
    stateCopy.message = message;
    user ? (stateCopy.logInSuccess = true) : (stateCopy.logInSuccess = false);
    this.setState(stateCopy);
  }

  editStateFromLogout(message) {
    const stateCopy = { ...this.state };
    stateCopy.message = message;
    stateCopy.logInSuccess = false;
    this.setState(stateCopy);
  }

  cleanMsg() {
    this.setState({ ...this.state, message: "" });
  }

  render() {
    return (
      <div className="App">
        <Navbar
          user={this.state.user}
          auth={this.state.logInSuccess}
          logout={() => this.editStateFromLogout()}
        />
        <Message msg={this.state.message} cleanMsg={() => this.cleanMsg()} />
        <Switch>
          <Route
            path="/"
            exact
            component={() => <Homepage allPlants={this.state.plants} />}
          />
          <Route
            path="/plant-details/:_id"
            exact
            component={(routeProps) => (
              <PlantDetails
                {...routeProps}
                allPlants={this.state.plants}
                setAppState={(selectedPlantId) =>
                  this.editStateFromPlantDetails(selectedPlantId)
                }
              />
            )}
          />
          <Route path="/forum" exact component={() => <Forum />} />
          <Route
            path="/shop"
            exact
            component={() => <Shop allPlants={this.state.plants} />}
          />
          <Route
            path="/shop-items/:_id"
            exact
            component={(routeProps) => (
              <ShopItem {...routeProps} plants={this.state.plants} />
            )}
          />
          <Route path="/signup" exact component={() => <Signup />} />
          <Route
            path="/login"
            exact
            component={() => (
              <Login
                setAppState={(body, message) =>
                  this.editStateFromLogin(body, message)
                }
                logInSuccess={this.state.logInSuccess}
                userInfo={this.state.user}
              />
            )}
          />
          <Route
            path="/logout"
            exact
            component={() => (
              <Logout logout={(message) => this.editStateFromLogout(message)} />
            )}
          />
          <Route
            path="/admin"
            exact
            component={() => (
              <Admin
                userInfo={this.state.user}
                logInSuccess={this.state.logInSuccess}
              />
            )}
          />
          <Route
            path="/profile"
            exact
            component={() => (
              <Profile
                userInfo={this.state.user}
                logInSuccess={this.state.logInSuccess}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
