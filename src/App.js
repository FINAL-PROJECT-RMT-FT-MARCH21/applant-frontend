import './App.scss'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'
import ReactJson from 'react-json-view'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import CheckoutForm from './components/CheckoutForm'
import Admin from './components/Admin/Admin'
import Navbar from './components/Navbar/Navbar'
import Message from './components/Message/Message'
import Homepage from './components/Homepage/Homepage'
import PlantDetails from './components/PlantDetails'
import Forum from './components/Forum/Forum'
import Store from './components/Store/Store'
import Logout from './components/Logout'
import Profile from './components/Profile/Profile'
import StoreItem from './components/StoreItem'
import ShoppingCart from './components/ShoppingCart'
import Modal from './components/Modal/Modal'

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
    modal: {
      login: false,
      signup: false,
      payment: false,
    },
    modal: '',
    modalOpened: false
  }

  componentDidMount() {
    this.getUsers()
    this.getPlants()
    this.updateUser()
    this.editStateFromStoreItems()
  }

  getUsers() {
    axios({
      method: 'get',
      url: `http://localhost:5000/all-users`,
      withCredentials: true,
    })
      .then((result) => {
        this.setState({ ...this.state, users: result.data })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getPlants() {
    axios({
      method: 'get',
      url: `http://localhost:5000/all-plants`,
      withCredentials: true,
    })
      .then((result) => {
        this.setState({ ...this.state, plants: result.data })
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  modalAction(action, mod) {
    if(mod) {
      this.setState({modal: mod})}
    if(action === 'open'){
      this.setState({modalOpened: true})
    } else if(action === 'close'){
      this.setState({modalOpened: false})
    }
  }

  updateUser() {
    axios({
      method: 'get',
      url: 'http://localhost:5000/loggedin',
      withCredentials: true,
    })
      .then((result) => {
        this.setState({ ...this.state, user: result.data.data})
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
    stateCopy.user = user
    stateCopy.message = message
    user ? (stateCopy.logInSuccess = true) : (stateCopy.logInSuccess = false)
    stateCopy.modal.login = false
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
      withCredentials: true,
    })
      .then((result) => {
        // const dataReceived = result.data.data
        const message = result.data.message
        stateCopy.message = message
        // stateCopy.plants.push(dataReceived)
        this.setState(stateCopy)
        this.getUsers()
        this.getPlants()
        this.updateUser()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  deleteCartItem(id) {
    axios({
      method: 'post',
      url: `http://localhost:5000/remove-from-cart/${id}`,
      data: { user: this.state.user },
      withCredentials: true,
    })
      .then((result) => {
        console.log(result)
        const cartItemsCopy = [...this.state.user.cart]
        const updatedItems = cartItemsCopy.filter((item) => {
          return item._id !== id
        })
        this.setState({
          ...this.state,
          user: { ...this.state.user, cart: updatedItems },
        })
        this.updateUser()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  removeFavoritePlant(id) {
    axios({
      method: 'post',
      url: `http://localhost:5000/remove-from-favorites/${id}`,
      withCredentials: true,
    })
      .then((result) => {
        this.setState({...this.state, message: result.data.message})
        this.updateUser()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  addMsg(msg) {
    this.setState({ ...this.state, message: msg })
  }

  cleanMsg() {
    this.setState({ ...this.state, message: '' })
  }

  render() {
    const promise = loadStripe(
      'pk_test_51IrpUwINyfw3Ussjr5TrEoNC8GW0dM1LdTMSLYsAIhofMEO44bCM8br241Ywwi96IRkCNMgKI4kMoSI8nugv9CSA0097t9atRk'
    )

    return (
      <div className="App">
        <Navbar
          modalAction={(action, mod)=>this.modalAction(action, mod)}
          user={this.state.user}
          auth={this.state.logInSuccess}
          logout={() => this.editStateFromLogout()}
        />
        <Message msg={this.state.message} cleanMsg={() => this.cleanMsg()} />
        <Modal
          addMsg={(msg) => this.addMsg(msg)}
          modal={this.state.modal}
          modalAction={(action, mod) => this.modalAction(action, mod)}
          modalOpened={this.state.modalOpened}
          logInSuccess={this.state.logInSuccess}
          userInfo={this.state.user}
          setAppState={(body, message) =>
            this.editStateFromLogin(body, message)
          }
        />

        {/* <div className="CheckoutForm">
          <Elements stripe={promise}>
            <CheckoutForm />
          </Elements>
        </div> */}

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
                userInfo={this.state.user}
                logInSuccess={this.state.logInSuccess}
                setAppState={(selectedPlantId) =>
                  this.editStateFromPlantDetails(selectedPlantId)
                }
                adminAction={(data, url) => this.adminAction(data, url)}
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
                adminAction={(data, url) => this.adminAction(data, url)}
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
                removeFavoritePlant={(event) => this.removeFavoritePlant(event)}
              />
            )}
          />

          <Route
            path="/shopping-cart"
            exact
            component={() => (
              <ShoppingCart
                userInfo={this.state.user}
                logInSuccess={this.state.logInSuccess}
                deleteFromCart={(event) => this.deleteCartItem(event)}
              />
            )}
          />
        </Switch>
      </div>
    )
  }
}

export default App
