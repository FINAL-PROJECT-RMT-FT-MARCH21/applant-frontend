import './Profile.scss'
import React from 'react'
import { GiFlowerPot } from 'react-icons/gi'

class Profile extends React.Component {
  toUpper(word) {
    if (word) return word[0].toUpperCase() + word.slice(1)
  }

  getFavoritePlants() {
    const { favoritePlants } = this.props.userInfo
    if (favoritePlants.length > 0) {
      return favoritePlants.map((plant, index) => {
        return (
          <div key={index} className="Profile">
            <div className="ProfileUp">
              <div className="img">
                <img src={plant.image} alt={plant.commonName} />
              </div>
              <div className="Details">
                <h2>{this.toUpper(plant.commonName)}</h2>
                <h3>({this.toUpper(plant.botanicalName)})</h3>
                <p>
                  <b>Maintenance:</b> {this.toUpper(plant.maintenance)}
                </p>
                <p>
                  <b>Watering:</b> {this.toUpper(plant.water)}
                </p>
                <p>
                  <b>Type: </b>
                    {plant.type ? plant.type.map((type) => {return `${this.toUpper(type)} `}) : null}
                </p>
                <p>
                <b>Exposure: </b>
                {plant.exposure? plant.exposure.map((exposure) => this.toUpper(exposure) +" " ):null}
                </p>
                <p>
                  <b>Air purifying:</b> {plant.purifying ? 'Yes' : 'No'}
                </p>
                <p>
                  <b>Pet/baby safe:</b> {plant.safety}
                </p>
                <button className="link-btn" onClick={() => this.props.removeFavoritePlant(plant._id)}>
                  Delete
                </button> 
              </div>
            </div>
          <div className="ProfileDown">
            <h3>
              <b>About {this.toUpper(plant.commonName)}</b>
            </h3>
            <p>{plant.about}</p>
            </div>
          </div>
        )
      })
    }
  }

  render() {
    return (
      this.props.userInfo ? 
        <div className="Profile">
          <h1>{`${this.toUpper(this.props.userInfo.username)}'s profile`}</h1>
          <p className="p">Your favorite plants <GiFlowerPot /></p>
          
          <div >{this.getFavoritePlants()}</div>
        </div>
      : <h1>Login required</h1>
    )
  }
}

export default Profile
