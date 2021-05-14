import React from 'react'
import { Link, Redirect } from 'react-router-dom'

class PlantDetails extends React.Component {
  state = {
    toLikeNotLogged: false,
  }
  toUpper(word) {
    return word[0].toUpperCase() + word.slice(1)
  }

  checkIfLogIn() {
    const selectedPlantId = this.props.match.params._id
    if (this.props.logInSuccess) {
      // this.setState({ ...this.state, loggedin: true })
      this.props.setAppState(selectedPlantId)
    } else {
      this.setState({ ...this.state, toLikeNotLogged: true })
    }
  }

  render() {
    const selectedPlantId = this.props.match.params._id
    const allPlants = this.props.allPlants.filter((plant) => {
      return selectedPlantId === plant._id
    })[0]

    return (
      <div className="PlantDetails">
        {/* <h1 className="main-title">PlantDetails</h1> */}
        {this.props.allPlants.length === 0 ? (
          <div className="spinner">
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <div className="PlantDetails">
            <div className="imageAndButtons">
              <img src={allPlants.image} alt={allPlants.commonName} />
              <button className="link-btn" onClick={() => this.checkIfLogIn()}>
                Like
              </button>
              <Link className="link-btn" to={`/store-items/${selectedPlantId}`}>
                Go to store
              </Link>
            </div>
            <div className="infoPlantDetails">
              <h2>{this.toUpper(allPlants.commonName)}</h2>
              <i>
                <h3>{this.toUpper(allPlants.botanicalName)}</h3>
              </i>

              <p>
                <b>Maintenance:</b> {this.toUpper(allPlants.maintenance)}
              </p>

              <p>
                <b>Watering:</b> {this.toUpper(allPlants.water)}
              </p>

              <p>
                <b>Type:</b>{' '}
                {allPlants.type.map((type) => {
                  return `${this.toUpper(type)} `
                })}
              </p>

              <p>
                <b>Exposure: </b>
                {allPlants.exposure.map((exposure) => this.toUpper(exposure))}
              </p>

              <p>
                <b>Air purifying:</b> {allPlants.purifying ? 'Yes' : 'No'}
              </p>

              <p>
                <b>Pet/baby safe:</b> {allPlants.safety}
              </p>

              <h3>
                <b>About {this.toUpper(allPlants.commonName)}</b>
              </h3>
              <p>{allPlants.about}</p>
            </div>
          </div>
        )}
        {this.state.toLikeNotLogged ? <Redirect to="/login" /> : null}
      </div>
    )
  }
}
export default PlantDetails
