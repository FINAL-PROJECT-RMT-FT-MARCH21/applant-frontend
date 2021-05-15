import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class Admin extends React.Component {
  state = {
    users: [],
    newPlant: {
      commonName: '',
      botanicalName: '',
      type: [],
      maintenance: [],
      water: [],
      exposure: [],
      safety: '',
      purifying: false,
      about: '',
      price: 0,
      stock: 0,
      inStore: false,
    },
    newPost: {},
    adminPermissions: false
  }

  componentDidMount(){
    this.getUsers()
  }
  
  getUsers(){
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

  toUpper(word) {
    if (word) return word[0].toUpperCase() + word.slice(1)
  }

  isAdmin(){
    if (this.props.logInSuccess){
      if (this.props.userInfo.admin){
        return true
      } else {
        return false
      }
    }
  }

  showLog() {
    console.log(this.state)
  }


  handleSubmitNewPlant(event) {
    event.preventDefault()
    axios({
      method: 'post',
      url: 'http://localhost:5000/new-plant',
      data: this.state.newPlant,
      withCredentials: true,
    })
      .then((result) => {
        const newPlant = result.data.result
        const message = result.data.message
        this.props.setAppState(newPlant, message)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleInputNewPlant(event) {
    const { name, value } = event.target
    const stateCopy = { ...this.state }
    if (name === 'type') {
      stateCopy.newPlant.type = value.includes('all')
        ? ['indoors', 'outdoors']
        : value.split(' ')
    } else if (name === 'exposure') {
      stateCopy.newPlant.exposure = value.includes('all')
        ? ['low', 'medium', 'high']
        : value.split(' ')
    } else if (name === 'purifying' || name === 'inStore') {
      stateCopy.newPlant[name] = value ? true : false
    } else {
      stateCopy.newPlant[[name]] = value
    }
    this.setState(stateCopy)
  }

  actionUsers(event, action, userId){
    if (action === 'edit'){
      const hola = null
    } else if (action === 'delete'){
      event.preventDefault()
      axios({
        method: 'post',
        url: `http://localhost:5000/delete-user/${userId}`,
        withCredentials: true,
      })
      .then((result) => {
          console.log('deleted!', result.data)
          const message = result.data.message
          this.props.addMsg(message)
        })
        .catch((error) => {
          console.log(error)
        })
        this.getUsers()
    }
  }

  showUsers(){
    return (
      <div className="form-container">
        <h2>Users</h2>
        <table>
          <thead><tr><th>Username</th><th>Admin</th><th>Favorites</th><th>Cart</th></tr></thead>
          <tbody>
            {this.state.users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td><input type="checkbox" name="admin" value={1}/></td>
                    <td>
                      <ul>
                        {user.favoritePlants.map((plant) => {
                          return (
                            <li>{this.toUpper(plant.commonName)}</li>
                          )
                        })}
                      </ul>
                    </td>
                    <td>
                      <ul>
                        {user.favoritePlants.map((plant) => {
                          return (
                            <li>{this.toUpper(plant.commonName)}</li>
                          )
                        })}
                      </ul>
                    </td>
                    <td>
                      <button onClick={(event)=>this.actionUsers(event, 'delete', user._id)}><img src="/icons/delete-icon.png" alt="delete"/></button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    )
  }

  showNewPlantForm() {
    return (
      <div className="form-container">
        <h2>New plant</h2>
        <form
          className="form"
          onSubmit={(event) => this.handleSubmitNewPlant(event)}
        >
          <div className="form-field">
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              name="image"
              onChange={(event) => this.handleInputNewPlant(event)}
              placeholder="https://ibb.co/KyKxWZv"
            />
          </div>
          <div className="form-field">
            <label htmlFor="commonName">Common name</label>
            <input
              type="text"
              name="commonName"
              onChange={(event) => this.handleInputNewPlant(event)}
              placeholder="encina"
            />
          </div>
          <div className="form-field">
            <label htmlFor="botanicalName">Botanical name</label>
            <input
              type="text"
              name="botanicalName"
              onChange={(event) => this.handleInputNewPlant(event)}
              placeholder="quercus ilex"
            />
          </div>
          <div className="form-field">
            <label htmlFor="type">Type</label>
            <input
              type="text"
              name="type"
              onChange={(event) => this.handleInputNewPlant(event)}
              placeholder="indoors / outdoors"
            />
          </div>
          <div className="form-field">
            <label htmlFor="maintenance">Maintenance</label>
            <input
              type="text"
              name="maintenance"
              onChange={(event) => this.handleInputNewPlant(event)}
              placeholder="low / medium / high"
            />
          </div>
          <div className="form-field">
            <label htmlFor="water">Water</label>
            <input
              type="text"
              name="water"
              onChange={(event) => this.handleInputNewPlant(event)}
              placeholder="low / medium / high"
            />
          </div>
          <div className="form-field">
            <label htmlFor="exposure">Exposure</label>
            <input
              type="text"
              name="exposure"
              onChange={(event) => this.handleInputNewPlant(event)}
              placeholder="low / medium / high"
            />
          </div>
          <div className="form-field">
            <label htmlFor="safety">Safety</label>
            <input
              type="text"
              name="safety"
              onChange={(event) => this.handleInputNewPlant(event)}
              placeholder="yes / (details)"
            />
          </div>
          <div className="checkbox">
            <label htmlFor="purifying">Purifying</label>
            <input
              type="checkbox"
              name="purifying"
              onChange={(event) => this.handleInputNewPlant(event)}
              value="true"
            />
          </div>
          <div className="form-field">
            <label htmlFor="about">About</label>
            <textarea
              className="textarea"
              type="text"
              name="about"
              onChange={(event) => this.handleInputNewPlant(event)}
            />
          </div>
          <hr></hr>
          <div className="form-field text-centered">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              step="0.01"
              name="price"
              onChange={(event) => this.handleInputNewPlant(event)}
              placeholder="0 €"
              min={0}
            />
          </div>
          <div className="form-field text-centered">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              name="stock"
              onChange={(event) => this.handleInputNewPlant(event)}
              placeholder={0}
            />
          </div>
          <div className="checkbox">
            <label htmlFor="inStore">In store </label>
            <input
              type="checkbox"
              name="inStore"
              onChange={(event) => this.handleInputNewPlant(event)}
              value="true"
            />
          </div>
          <button>Create new plant</button>
          <button onClick={() => this.showLog()}>See log</button>
        </form>
        {/* {!this.isAdmin() ? <Redirect to="/login" /> : null} */}
      </div>
    )
  }

  render() {
    return (
      <div className="Admin">
        {this.showUsers()}
        {this.showNewPlantForm()}
      </div>
    )
  }
}

export default Admin
