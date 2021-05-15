import React from 'react'
import { Redirect } from 'react-router-dom'

class Profile extends React.Component {
  toUpper(word) {
    if (word) return word[0].toUpperCase() + word.slice(1)
  }

  getFavoritePlants() {
    const { favoritePlants } = this.props.userInfo
    if (favoritePlants.length > 0) {
      return favoritePlants.map((plant, index) => {
        return (
          <div key={index} className="plant-card">
            <img src={plant.image} alt={plant.commonName} />

            <h2>{this.toUpper(plant.commonName)}</h2>

            <h3>({this.toUpper(plant.botanicalName)})</h3>

            <button
              className="link-btn"
              onClick={() => this.props.deletePlant(plant._id)}
            >
              Delete
            </button>

            <p>
              <b>Maintenance:</b> {this.toUpper(plant.maintenance)}
            </p>

            <p>
              <b>Watering:</b> {this.toUpper(plant.water)}
            </p>

            <p>
              <b>Type: </b>
              {plant.type.map((type) => {
                return `${this.toUpper(type)} `
              })}
            </p>
            <p>{plant.exposure.forEach((exposure) => exposure)}</p>

            <p>
              <b>Air purifying:</b> {plant.purifying ? 'Yes' : 'No'}
            </p>

            <p>
              <b>Pet/baby safe:</b> {plant.safety}
            </p>

            <h3>
              <b>About {this.toUpper(plant.commonName)}</b>
            </h3>
            <p>{plant.about}</p>
          </div>
        )
      })
    }
  }

  render() {
    return this.props.logInSuccess ? (
      <div className="Profile">
        <h1>
          {/* {this.props.userInfo.username[0].toUpper() +
            this.props.userInfo.slice(1)}
          's page */}
        </h1>
        <h2>Your favorite plants</h2>
        <div className="plant-card-container">{this.getFavoritePlants()}</div>
      </div>
    ) : (
      <Redirect to="./" />
    )
  }
}

export default Profile
