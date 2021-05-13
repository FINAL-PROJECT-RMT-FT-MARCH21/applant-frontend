import './App.scss'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'
import ReactJson from 'react-json-view'

import Admin from './components/Admin'
import Navbar from './components/Navbar'
import Message from './components/Message'
import Homepage from './components/Homepage'
import PlantDetails from './components/PlantDetails'
import Forum from './components/Forum'
import Store from './components/Store'
import Signup from './components/Signup'
import Login from './components/Login'
import Logout from './components/Logout'
import Profile from './components/Profile'
import StoreItem from './components/StoreItem'

class App extends React.Component {
  state = {
    user: {
      _id: '',
      username: '',
      password: '',
      admin: false,
      favoritePlants: [],
    },
    logInSuccess: false,
    plants: [],
    message: '',
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: `http://localhost:5000/all-plants`,
      withCredentials: true,
    })
      .then((result) => {
        this.setState({ ...this.state, plants: result.data })
      })
      .catch((error) => {
        console.log(error)
      })

    this.updateUser()
  }

  updateUser() {
    // No pasar como props para evitar loop
    axios({
      method: 'get',
      url: 'http://localhost:5000/loggedin',
      withCredentials: true,
    })
      .then((result) => {
        const stateCopy = { ...this.state }
        stateCopy.user = result.data.user
        this.setState(stateCopy)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  editStateFromPlantDetails(selectedPlantId) {
    axios({
      method: 'post',
      url: 'http://localhost:5000/add-plant',
      data: { plantId: selectedPlantId, user: this.state.user },
      withCredentials: true,
    })
      .then((result) => {
        const stateCopy = { ...this.state }
        stateCopy.user.favoritePlants.push(selectedPlantId)
        stateCopy.message = result.data.message
        this.setState(stateCopy)
        this.updateUser()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  editStateFromLogin(user, message) {
    const stateCopy = { ...this.state }
    stateCopy['user'] = user
    stateCopy.message = message
    user ? (stateCopy.logInSuccess = true) : (stateCopy.logInSuccess = false)
    this.setState(stateCopy)
  }

  editStateFromLogout(message) {
    const stateCopy = { ...this.state }
    stateCopy.message = message
    stateCopy.logInSuccess = false
    stateCopy.user = ''
    this.setState(stateCopy)
  }

  deleteFavoritePlant(selectedPlantId) {
    axios({
      method: 'post',
      url: 'http://localhost:5000/delete-plant/:_id',
      data: { user: this.state.user },
      withCredentials: true,
    })
      .then((result) => {
        console.log(`Esto es el result => ${result}`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  deletePlant = (event) => {
    console.log('EVEEEENT' + event.target)
    const deleteId = event.target._id
    const favoritePlantsCopy = [...this.state.user.favoritePlants]
    const updatedPlants = favoritePlantsCopy.filter((plant) => {
      return plant._id !== deleteId
    })
    this.setState({ ...this.state.user, favoritePlants: updatedPlants })
  }

  cleanMsg() {
    this.setState({ ...this.state, message: '' })
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
            path="/all-plants"
            exact
            component={() => (
              <ReactJson src={this.state.plants} theme="hopscotch" />
            )}
          />

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
                logInSuccess={this.state.logInSuccess}
                setAppState={(selectedPlantId) =>
                  this.editStateFromPlantDetails(selectedPlantId)
                }
              />
            )}
          />
          <Route path="/forum" exact component={() => <Forum />} />
          <Route
            path="/store"
            exact
            component={() => <Store allPlants={this.state.plants} />}
          />
          <Route
            path="/store-items/:_id"
            exact
            component={(routeProps) => (
              <StoreItem {...routeProps} plants={this.state.plants} />
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
            component={(routeProps) => (
              <Profile
                {...routeProps}
                userInfo={this.state.user}
                logInSuccess={this.state.logInSuccess}
                deletePlant={(event) => this.deletePlant(event)}
              />
            )}
          />
        </Switch>
      </div>
    )
  }
}

export default App
