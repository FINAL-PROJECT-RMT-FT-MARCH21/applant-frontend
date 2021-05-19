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

  isAdmin() {
    if (this.props.logInSuccess) {
      if (this.props.userInfo.admin) {
        return true
      } else {
        return false
      }
    }
  }

  handleSubmit(event, form, url, index) {
    event.preventDefault()
    index
      ? this.props.adminAction(this.state[form][index], url)
      : this.props.adminAction(this.state[form], url)
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
  
  showNewPlantForm() {
    return (
      <div className="form-container">
        <h2>New plant</h2>
        <form
          className="form"
          onSubmit={(ev) => this.handleSubmit(ev, 'newPlant', 'new-plant')}
        >
          <table>
            <tbody>
              <tr>
                <td className="label-column">
                  <label htmlFor="image">Image URL</label>
                </td>
                <td className="input-column">
                  <input
                    type="text"
                    name="image"
                    onChange={(ev) => this.handleInput(ev, 'newPlant')}
                    placeholder="https://ibb.co/KyKxWZv"
                  />
                </td>
              </tr>
              <tr>
                <td className="label-column">
                  <label htmlFor="commonName">Common name</label>
                </td>
                <td className="input-column">
                  <input
                    type="text"
                    name="commonName"
                    onChange={(ev) => this.handleInput(ev, 'newPlant')}
                    placeholder="encina"
                    />
                </td>
              </tr>
              <tr>
                <td className="label-column">
                  <label htmlFor="botanicalName">Botanical name</label>
                </td>
                <td className="input-column">
                  <input
                    type="text"
                    name="botanicalName"
                    onChange={(ev) => this.handleInput(ev, 'newPlant')}
                    placeholder="quercus ilex"
                  />
                </td>
              </tr>
              <tr>
                <td className="label-column">
                  <label htmlFor="type">Type</label>
                </td>
                <td className="input-column">
                  <input
                    type="text"
                    name="type"
                    onChange={(ev) => this.handleInput(ev, 'newPlant')}
                    placeholder="indoors / outdoors"
                  />
                </td>
              </tr>
              <tr>
                <td className="label-column">
                  <label htmlFor="maintenance">Maintenance</label>
                </td>
                <td className="input-column">
                  <input
                    type="text"
                    name="maintenance"
                    onChange={(ev) => this.handleInput(ev, 'newPlant')}
                    placeholder="low / medium / high"
                    />
                </td>
              </tr>
              <tr>
                <td className="label-column">
                  <label htmlFor="water">Water</label>
                </td>
                <td className="input-column">
                  <input
                    type="text"
                    name="water"
                    onChange={(ev) => this.handleInput(ev, 'newPlant')}
                    placeholder="low / medium / high"
                    />
                </td>
              </tr>
              <tr>
                <td className="label-column">
                  <label htmlFor="exposure">Exposure</label>
                </td>
                <td className="input-column">
                  <input
                    type="text"
                    name="exposure"
                    onChange={(ev) => this.handleInput(ev, 'newPlant')}
                    placeholder="low / medium / high"
                  />
                </td>
              </tr>
              <tr>
                <td className="label-column">
                  <label htmlFor="safety">Safety</label>
                </td>
                <td className="input-column">
                  <input
                    type="text"
                    name="safety"
                    onChange={(ev) => this.handleInput(ev, 'newPlant')}
                    placeholder="yes / (details)"
                  />
                </td>
              </tr>
              <tr>
                <td className="label-column">
                  <label htmlFor="purifying">Purifying</label>
                </td>
                <td className="input-column">
                  <input
                    type="checkbox"
                    name="purifying"
                    onChange={(ev) => this.handleInput(ev, 'newPlant')}
                    value="true"
                  />
                </td>
              </tr>
              <tr>
                <td className="label-column">
                  <label htmlFor="about">About</label>
                </td>
                <td className="input-column">
                  <textarea
                    className="textarea"
                    type="text"
                    name="about"
                    onChange={(ev) => this.handleInput(ev, 'newPlant')}
                    />
                </td>
              </tr>
              <tr>
                <td className="label-column">
                  <label htmlFor="price">Price</label>
                </td>
                <td className="input-column">
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    onChange={(ev) => this.handleInput(ev, 'newPlant')}
                    placeholder="0 €"
                    min={0}
                    />
                </td>
              </tr>
              <tr>
                <td className="label-column">
                  <label htmlFor="stock">Stock</label>
                </td>
                <td className="input-column">
                  <input
                    type="number"
                    name="stock"
                    onChange={(ev) => this.handleInput(ev, 'newPlant')}
                    placeholder={0}
                    />
                </td>
              </tr>
              <tr>
                <td className="label-column">
                  <label htmlFor="inStore">In store </label>
                </td>
                <td className="input-column">
                  <input
                    type="checkbox"
                    name="inStore"
                    onChange={(ev) => this.handleInput(ev, 'newPlant')}
                    value="true"
                    />
                </td>
              </tr>
            </tbody>
          </table>
          <button>Create new plant</button>
        </form>
      </div>
    )
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
                    <Link className="link" onClick={()=>this.props.modalAction('open', `edit-user/${user._id}`)}>
                      Modify user
                    </Link>
                    <Link className="link" onClick={()=>this.props.adminAction(null, `/delete-user/${user._id}`)}>
                      Delete user
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
                    <Link className="link" to={`plant-details/${plant._id}`}>
                      Modify plant
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
        <button onClick={()=>this.props.modalAction('open', 'newPlant')}>New plant</button>
        {this.showUsers()}
        {this.showPlants()}
        {/* {this.showNewPlantForm()} */}
      </div>
    )
  }
}

export default Admin
