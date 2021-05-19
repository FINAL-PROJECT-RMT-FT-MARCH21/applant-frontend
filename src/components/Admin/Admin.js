import './Admin.scss'
import React from 'react'
import { Link } from 'react-router-dom'

class Admin extends React.Component {
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
    adminPermissions: false,
  }

  toUpper(word) {
    if (word) return word[0].toUpperCase() + word.slice(1)
  }

  handleInput(ev, form) {
    const { name, value } = ev.target
    const stateCopy = { ...this.state }
    if (name === 'type') {
      stateCopy[form][name] =
      value === 'all' ? ['indoors', 'outdoors'] : value.split(' ')
    } else if (name === 'exposure') {
      stateCopy[form][name] =
      value === 'all' ? ['low', 'medium', 'high'] : value.split(' ')
    } else if (name === 'purifying' || name === 'inStore') {
      stateCopy[form][name] = value ? true : false
    } else {
      stateCopy[form][name] = value
    }
    this.setState(stateCopy)
  }

  showUsers() {
    return (
      <div className="form-container">
        <h2>List of users</h2>
        <table>
          <tbody>
            {this.props.users.map((user, index) => {
              return (
                <tr>
                  <td>{user.username}</td>
                  <div className="table-btns">
                    <Link className="link" onClick={()=>this.props.modalAction('open', `delete-user/${user._id}`)}>
                      <img src="/icons/delete-icon.png" alt="delete-icon"/>
                    </Link>
                  </div>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  showPlants() {
    return (
      <div className="form-container">
        <h2>List of plants</h2>
        <table>
          <tbody>
            {this.props.plants.map((plant, index) => {
              return (
                <tr>
                  <td>{this.toUpper(plant.commonName)}</td>
                  <div className="table-btns">
                    {/* <Link className="link" to={`plant-details/${plant._id}`}> */}
                    <Link onClick={()=>this.props.modalAction('open', `edit-plant/${plant._id}`)}>
                      <img src="/icons/edit-icon.png" alt="edit-icon"/>
                    </Link>
                  </div>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
  
  render() {
    return (
      <div className="Admin">
        {this.showUsers()}
        <button onClick={()=>this.props.modalAction('open', 'new-lant')}>New plant</button>
        {this.showPlants()}
      </div>
    )
  }
}

export default Admin
