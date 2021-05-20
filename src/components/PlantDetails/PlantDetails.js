import './PlantDetails.scss'
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { MdFavoriteBorder } from 'react-icons/md'
import { MdAddShoppingCart } from 'react-icons/md'

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
    if (this.props.userInfo) {
      this.props.addFavoritePlant(selectedPlantId)
    } else {
      this.props.modalAction('open', 'login')
    }
  }

  showPlantDetails() {
    if (this.state.redirectToAdmin) {
      return <Redirect to="/admin" />
    }
    return (
      <div  className="PlantDetails" >
      <div className="PlantDetailsUp">
        <div className="image">
          <img
            src={this.state.plant.image}
            alt={this.state.plant.commonName}
          />
        </div>
        <div className="infoPlantDetails">
        <div className="buttons">
          <button className="link-btn" onClick={() => this.likeToFavorites()}>
          <MdFavoriteBorder />
          </button>
          <Link
            
            to={`/store-items/${this.props.match.params._id}`}
          >
             <button className="link-btn"><MdAddShoppingCart /> </button> 
          </Link>
          </div>
          <div>
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
              this.toUpper(exposure+" ")
            )}
          </p>

          <p>
            <b>Air purifying:</b> {this.state.plant.purifying ? 'Yes' : 'No'}
          </p>

          <p>
            <b>Pet/baby safe:</b> {this.state.plant.safety}
          </p>
          </div>
          </div>
        </div>
          <div className='About'>
          <h3>
            <b>About {this.toUpper(this.state.plant.commonName)}</b>
          </h3>
          <p>{this.state.plant.about}</p>
        </div>
      </div>
    )
  }

  render() {
    return this.props.allPlants.length ? (
      <div className="PlantDetails">
        {this.showPlantDetails()}
      </div>
    ):( 
      <div className="spinner">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }
  
}
export default PlantDetails
