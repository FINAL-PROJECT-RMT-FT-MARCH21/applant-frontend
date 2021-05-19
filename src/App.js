import './App.scss'
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import ReactJson from 'react-json-view'

//import { loadStripe } from '@stripe/stripe-js'
//import { Elements } from '@stripe/react-stripe-js'

//import CheckoutForm from './components/CheckoutForm'
import Admin from './components/Admin/Admin'
import Navbar from './components/Navbar/Navbar'
import Message from './components/Message/Message'
import Homepage from './components/Homepage/Homepage'
import PlantDetails from './components/PlantDetails/PlantDetails'
import Blog from './components/Blog/Blog'
import Store from './components/Store/Store'
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
      totalPrice: 0,
    },
    users: [],
    plants: [],
    posts: [],
    message: '',
    modal: '',
    modalOpened: false
  }

  componentDidMount() {
    this.updateState('users')
    this.updateState('plants')
    this.updateState('posts')
    this.updateState('user')
  }
  
  updateState(url){
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_URL}/app/${url}`,
      withCredentials: true,
    })
    .then((result) => {
      if(result.data.data){
        this.setState({[url]: result.data.data})
      } else {
        this.setState({[url]: null})
        // return <Redirect to="/"/>
      }
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
    
  authAction(data, url, onlyUpdateState){
    if (onlyUpdateState){
      this.updateUser()
    } else {
      axios({
        method: 'post',
        url: `${process.env.REACT_APP_URL}/app/${url}`,
        data: data,
        withCredentials: true,
      })
        .then((result) => {
          const message = result.data.message
          this.setState({...this.state, message: message})
          this.updateState('user')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  adminAction(data, url) {
    const stateCopy = { ...this.state }
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_URL}/app/${url}`,
      data: data,
      withCredentials: true,
    })
    .then((result) => {
      const message = result.data.message
      stateCopy.message = message
      this.setState(stateCopy)
      this.getUsers()
      this.getPlants()
      this.getPosts()
      this.updateUser()
    })
    .catch((err) => {
      console.log(err)
    })
  }
  
  addFavoritePlant(selectedPlantId) { ////////////////
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_URL}/app/add-to-favorites/${selectedPlantId}`,
      data: { user: this.state.user },
      withCredentials: true,
    })
    .then((result) => {
      this.addMsg(result.data.message)
      this.updateState('user')
    })
    .catch((err) => {
      console.log(err)
    })
  }

  removeFavoritePlant(id) {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_URL}/app/remove-from-favorites/${id}`,
      withCredentials: true,
    })
      .then((result) => {
        this.addMsg(result.data.message)
        this.updateState('user')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  editStateFromStoreItems(selectedPlantId, quantity, totalPrice) {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_URL}/app/add-to-cart`,
      data: {
        plantId: selectedPlantId,
        quantity: quantity,
        user: this.state.user,
        totalPrice: this.state.user.totalPrice
      },
      withCredentials: true,
    })
    .then((result) => {
      console.log('resultado de storeItem', result.data)
      this.addMsg(result.data.message)
      this.updateState('user')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  deleteCartItem(id) {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_URL}/app/remove-from-cart/${id}`,
      data: { user: this.state.user },
      withCredentials: true,
    })
    .then((result) => {
      this.addMsg(result.data.message)
      this.updateState('user')
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
    console.log('>>>', this.state)
    return (
      <div className="App">
        <Navbar
          modalAction={(action, mod)=>this.modalAction(action, mod)}
          userInfo={this.state.user}
          authAction={(data, url, upd) => this.authAction(data, url, upd)}
        />
        <Message msg={this.state.message} cleanMsg={() => this.cleanMsg()} />
        <Modal
          addMsg={(msg) => this.addMsg(msg)}
          modal={this.state.modal}
          modalAction={(action, mod) => this.modalAction(action, mod)}
          modalOpened={this.state.modalOpened}
          updateState={(url) => this.updateState(url)}
          
          authAction={(data, url, upd) => this.authAction(data, url, upd)}
          
          userInfo={this.state.user}
          adminAction={(data, url) => this.adminAction(data, url)}
          editStateFromNewPost={(body, message) => 
            this.editStateFromNewPost(body, message)}
        />


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
                modalAction={(action, mod)=>this.modalAction(action, mod)}
                userInfo={this.state.user}
                addFavoritePlant={(selectedPlantId) =>
                  this.addFavoritePlant(selectedPlantId)
                }
                adminAction={(data, url) => this.adminAction(data, url)}
              />
            )}
          />
          <Route 
            path="/blog" 
            exact 
            component={() => 
              <Blog 
                userInfo={this.state.user}
                posts={this.state.posts}
                modalAction={(action, mod)=>this.modalAction(action, mod)}
              />} />
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
                modalAction={(action, mod)=>this.modalAction(action, mod)}
                userInfo={this.state.user}
                editStateFromStoreItems={(selectedPlantId, quantity, totalPrice) =>
                  this.editStateFromStoreItems(selectedPlantId, quantity, totalPrice)
                }
              />
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
                deleteFromCart={(event) => this.deleteCartItem(event)}
                modalAction={(action, mod) => this.modalAction(action, mod)}
              />
            )}
          />
        </Switch>
      </div>
    )
  }
}

export default App
