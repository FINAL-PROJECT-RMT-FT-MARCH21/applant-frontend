import './Profile.scss'
import React from 'react'

class Profile extends React.Component {
  toUpper(word) {
    if (word) return word[0].toUpperCase() + word.slice(1)
  }

  getFavoritePlants() {
    const { favoritePlants } = this.props.userInfo
    if (favoritePlants.length > 0) {
      return favoritePlants.map((plant, index) => {
        // TODO a veces da undefined
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', plant)
        if (plant){
          return (
            <div key={index} className="plant-card">
              <img src={plant.image} alt={plant.commonName} />
  
              <h2>{this.toUpper(plant.commonName)}</h2>
  
              <h3>({this.toUpper(plant.botanicalName)})</h3>
  
              <button
                className="link-btn"
                onClick={() => this.props.removeFavoritePlant(plant._id)}
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
        }
      })
    }
  }

  render() {
    return (
      this.props.userInfo ? 
        <div className="Profile">
          <h1>{`${this.toUpper(this.props.userInfo.username)}'s page`}</h1>
          <h2>Your favorite plants</h2>
          <div className="plant-cards-container">{this.getFavoritePlants()}</div>
        </div>
      : <h1>Login required</h1>
    )
  }
}

export default Profile
