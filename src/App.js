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
import ShoppingCart from './components/ShoppingCart'

class App extends React.Component {
  state = {
    user: {
      _id: '',
      username: '',
      password: '',
      admin: false,
      favoritePlants: [],
      cart: [],
    },
    logInSuccess: false,
    users: [],
    plants: [],
    message: '',
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: `http://localhost:5000/all-users`,
      withCredentials: true
    })
      .then((result) => {
        this.setState({ ...this.state, users: result.data })
      })
      .catch((error) => {
        console.log(error)
      })
      
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
        stateCopy.user = result.data.data
        this.setState(stateCopy)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  editStateFromStoreItems(selectedPlantId, quantity) {
    axios({
      method: 'post',
      url: 'http://localhost:5000/add-to-cart',
      data: {
        plantId: selectedPlantId,
        quantity: quantity,
        user: this.state.user,
      },
      withCredentials: true,
    })
      .then((result) => {
        const stateCopy = { ...this.state }
        result.data.data.cart.forEach((item) => {
          stateCopy.user.cart.push(item)
        })
        stateCopy.message = result.data.message
        this.setState(stateCopy)
        this.updateUser()
        console.log(this.state.user)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  editStateFromPlantDetails(selectedPlantId) {
    axios({
      method: 'post',
      url: `http://localhost:5000/add-to-favorites/${selectedPlantId}`,
      data: { user: this.state.user },
      withCredentials: true,
    })
      .then((result) => {
        // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> check result
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

  adminAction(data, url) {
    const stateCopy = { ...this.state }
    axios({
      method: 'post',
      url: `http://localhost:5000/${url}`,
      data: data,
      withCredentials: true
    })
    .then((result) => {
      const dataReceived = result.data.data
      const message = result.data.message
      stateCopy.message = message
      stateCopy.plants.push(dataReceived)
      this.setState(stateCopy)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  deleteFavoritePlant(id) {
    axios({
      method: 'post',
      url: `http://localhost:5000/remove-from-favorites/${id}`,
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

  deletePlant = (id) => {
    // juntar con la de arriba?
    const favoritePlantsCopy = [...this.state.user.favoritePlants]
    const updatedPlants = favoritePlantsCopy.filter((plant) => {
      return plant._id !== id
    })
    this.setState(
      {
        ...this.state,
        user: { ...this.state.user, favoritePlants: updatedPlants },
      },
      () => {
        this.deleteFavoritePlant(id)
      }
    )
  }

  addMsg(msg) {
    this.setState({ ...this.state, message: msg })
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
              <StoreItem
                {...routeProps}
                plants={this.state.plants}
                logInSuccess={this.state.logInSuccess}
                setAppState={(selectedPlantId, quantity) =>
                  this.editStateFromStoreItems(selectedPlantId, quantity)
                }
              />
            )}
          />
          <Route
            path="/signup"
            exact
            component={() => <Signup addMsg={(msg) => this.addMsg(msg)} />}
          />
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
              users={this.state.users}
              plants={this.state.plants}
              addMsg={(msg) => this.addMsg(msg)}
              userInfo={this.state.user}
              logInSuccess={this.state.logInSuccess}
              adminAction={(data, url)=>this.adminAction(data, url)}
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

          <Route
            path="/shopping-cart"
            exact
            component={() => (
              <ShoppingCart
                userInfo={this.state.user}
                plants={this.state.plants}
                logInSuccess={this.state.logInSuccess}
              />
            )}
          />
        </Switch>
      </div>
    )
  }
}

export default App
