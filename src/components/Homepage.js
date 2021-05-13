import React from 'react'
import { Link } from 'react-router-dom'

class Homepage extends React.Component {
  state = {
    filteredPlants: [...this.props.allPlants],
  }

  filterPlants(event) {
    const value = event.target.value.toLowerCase()
    const filteredPlants = this.props.allPlants.filter((plant) => {
      return plant.commonName.includes(value)
    })
    this.setState({ ...this.state, filteredPlants: filteredPlants })
  }
  getPlants() {
    const plants = this.state.filteredPlants
    return plants.map((plant, index) => {
      return (
        <div key={index} className="plant-card">
          <Link className="link" to={`/plant-details/${plant._id}`}>
            <img src={plant.image} alt={plant.commonName} />
          </Link>
          <h2>
            {plant.commonName[0].toUpperCase() + plant.commonName.slice(1)}
          </h2>
          <h3>
            (
            {plant.botanicalName[0].toUpperCase() +
              plant.botanicalName.slice(1)}
            )
          </h3>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="Homepage">
        <h1 className="main-title">All plants</h1>
        <input
          type="text"
          placeholder="Search plant"
          onChange={(event) => this.filterPlants(event)}
        />
        {this.props.allPlants.length === 0 ? (
          <div className="spinner">
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <div className="plant-cards-container">{this.getPlants()}</div>
        )}
      </div>
    )
  }
}
export default Homepage
