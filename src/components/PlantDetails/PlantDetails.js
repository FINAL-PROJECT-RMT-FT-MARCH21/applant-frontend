import './PlantDetails.scss'
import React from 'react'
import { Link, Redirect } from 'react-router-dom'

class PlantDetails extends React.Component {
  state = {
    plant: {
      ...this.props.allPlants.filter(
        (plant) => this.props.match.params._id === plant._id
      )[0],
    },
    toLikeNotLogged: false,
    redirectToAdmin: false,
  }

  toUpper(word) {
    return word[0].toUpperCase() + word.slice(1)
  }

  handleInput(event) {
    const { name, value } = event.target
    console.log(name, value)
    this.setState({
      ...this.state,
      plant: { ...this.state.plant, [name]: value },
    })
  }

  adminAction(action) {
    if (action === 'edit') {
      this.props.adminAction(
        this.state.plant,
        `edit-plant/${this.state.plant._id}`
      )
    } else if (action === 'delete') {
      this.props.adminAction(null, `delete-plant/${this.state.plant._id}`)
      this.setState({ ...this.state, redirectToAdmin: true })
    }
  }

  likeToFavorites() {
    const selectedPlantId = this.props.match.params._id
    if (this.props.logInSuccess) {
      this.props.setAppState(selectedPlantId)
    } else {
      this.setState({ ...this.state, toLikeNotLogged: true })
    }
  }

  showPlantDetails() {
    if (this.state.redirectToAdmin) {
      return <Redirect to="/admin" />
    }
    if (this.props.userInfo){
      if (this.props.userInfo.admin) {
        return (
          <div className="PlantDetails">
            <div className="imageAndButtons">
              <img
                src={this.state.plant.image}
                alt={this.state.plant.commonName}
              />
              <button
                className="link-btn"
                onClick={() => this.adminAction('edit')}
              >
                Edit
              </button>
              <button
                className="link-btn"
                onClick={() => this.adminAction('delete')}
              >
                Delete
              </button>
            </div>
            <div className="infoPlantDetails">
              <form
                className="form"
                onSubmit={(ev) => this.handleSubmit(ev, 'newPlant', 'new-plant')}
              >
                <h2>{this.toUpper(this.state.plant.commonName)}</h2>
                <table>
                  <tbody>
                    <tr>
                      <td>Image URL</td>
                      <td>
                        <input
                          onChange={(event) => this.handleInput(event)}
                          type="text"
                          name="image"
                          value={this.state.plant.image}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Common name</td>
                      <td>
                        <input
                          onChange={(event) => this.handleInput(event)}
                          type="text"
                          name="commonName"
                          value={this.state.plant.commonName}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Botanical name</td>
                      <td>
                        <input
                          onChange={(event) => this.handleInput(event)}
                          type="text"
                          name="botanicalName"
                          value={this.state.plant.botanicalName}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Type</td>
                      <td>
                        <input
                          onChange={(event) => this.handleInput(event)}
                          type="text"
                          name="type"
                          value={this.state.plant.type.join(' ')}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Maintenance</td>
                      <td>
                        <input
                          onChange={(event) => this.handleInput(event)}
                          type="text"
                          name="maintenance"
                          value={this.state.plant.maintenance}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Water</td>
                      <td>
                        <input
                          onChange={(event) => this.handleInput(event)}
                          type="text"
                          name="water"
                          value={this.state.plant.water}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Exposure</td>
                      <td>
                        <input
                          onChange={(event) => this.handleInput(event)}
                          type="text"
                          name="exposure"
                          value={this.state.plant.exposure.join(' ')}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Safety</td>
                      <td>
                        <input
                          onChange={(event) => this.handleInput(event)}
                          type="text"
                          name="safety"
                          value={this.state.plant.safety}
                        />
                      </td>
                    </tr>
                    {this.state.plant.purifying ? (
                      <tr>
                        <td>Purifying</td>
                        <td>
                          <input
                            onChange={(event) => this.handleInput(event)}
                            type="checkbox"
                            name="purifying"
                            value={1}
                            checked
                          />
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td>Purifying</td>
                        <td>
                          <input
                            onChange={(event) => this.handleInput(event)}
                            type="checkbox"
                            name="purifying"
                            value={1}
                          />
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td>About</td>
                      <td>
                        <textarea name="about" value={this.state.plant.about} />
                      </td>
                    </tr>
                    <tr>
                      <td>Price</td>
                      <td>
                        <input
                          onChange={(event) => this.handleInput(event)}
                          type="number"
                          name="price"
                          value={this.state.plant.price}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Stock</td>
                      <td>
                        <input
                          onChange={(event) => this.handleInput(event)}
                          type="number"
                          name="stock"
                          value={this.state.plant.stock}
                        />
                      </td>
                    </tr>
                    {this.state.plant.inStore ? (
                      <tr>
                        <td>In store</td>
                        <td>
                          <input
                            onChange={(event) => this.handleInput(event)}
                            type="checkbox"
                            name="inStore"
                            value={1}
                            checked
                          />
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td>In store</td>
                        <td>
                          <input
                            onChange={(event) => this.handleInput(event)}
                            type="checkbox"
                            name="inStore"
                            value={1}
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        )
      } else {
        return (
          <div className="PlantDetails">
            <div className="imageAndButtons">
              <img
                src={this.state.plant.image}
                alt={this.state.plant.commonName}
              />
              <button className="link-btn" onClick={() => this.likeToFavorites()}>
                Like
              </button>
              <Link
                className="link-btn"
                to={`/store-items/${this.props.match.params._id}`}
              >
                Go to store
              </Link>
            </div>
            <div className="infoPlantDetails">
              <h2>{this.toUpper(this.state.plant.commonName)}</h2>
              <i>
                <h3>{this.toUpper(this.state.plant.botanicalName)}</h3>
              </i>

              <p>
                <b>Maintenance:</b> {this.toUpper(this.state.plant.maintenance)}
              </p>

              <p>
                <b>Watering:</b> {this.toUpper(this.state.plant.water)}
              </p>

              <p>
                <b>Type:</b>{' '}
                {this.state.plant.type.map((type) => {
                  return `${this.toUpper(type)} `
                })}
              </p>

              <p>
                <b>Exposure: </b>
                {this.state.plant.exposure.map((exposure) =>
                  this.toUpper(exposure)
                )}
              </p>

              <p>
                <b>Air purifying:</b> {this.state.plant.purifying ? 'Yes' : 'No'}
              </p>

              <p>
                <b>Pet/baby safe:</b> {this.state.plant.safety}
              </p>

              <h3>
                <b>About {this.toUpper(this.state.plant.commonName)}</b>
              </h3>
              <p>{this.state.plant.about}</p>
            </div>
          </div>
        )
      }
    } else {
      return (
        <div className="PlantDetails">
          <div className="imageAndButtons">
            <img
              src={this.state.plant.image}
              alt={this.state.plant.commonName}
            />
            <button className="link-btn" onClick={() => this.likeToFavorites()}>
              Like
            </button>
            <Link
              className="link-btn"
              to={`/store-items/${this.props.match.params._id}`}
            >
              Go to store
            </Link>
          </div>
          <div className="infoPlantDetails">
            <h2>{this.toUpper(this.state.plant.commonName)}</h2>
            <i>
              <h3>{this.toUpper(this.state.plant.botanicalName)}</h3>
            </i>

            <p>
              <b>Maintenance:</b> {this.toUpper(this.state.plant.maintenance)}
            </p>

            <p>
              <b>Watering:</b> {this.toUpper(this.state.plant.water)}
            </p>

            <p>
              <b>Type:</b>{' '}
              {this.state.plant.type.map((type) => {
                return `${this.toUpper(type)} `
              })}
            </p>

            <p>
              <b>Exposure: </b>
              {this.state.plant.exposure.map((exposure) =>
                this.toUpper(exposure)
              )}
            </p>

            <p>
              <b>Air purifying:</b> {this.state.plant.purifying ? 'Yes' : 'No'}
            </p>

            <p>
              <b>Pet/baby safe:</b> {this.state.plant.safety}
            </p>

            <h3>
              <b>About {this.toUpper(this.state.plant.commonName)}</b>
            </h3>
            <p>{this.state.plant.about}</p>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="PlantDetails">
        <h2 className="main-title">PlantDetails</h2>
        {this.showPlantDetails()}
        {this.state.toLikeNotLogged ? <Redirect to="/login" /> : null}
      </div>
    )
  }
}
export default PlantDetails
