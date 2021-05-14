import React from 'react'
import { Link } from 'react-router-dom'

class Store extends React.Component {
  state = {
    filteredPlants: [...this.props.allPlants],
  }
  filterPlantsByName(event) {
    const value = event.target.value.toLowerCase()
    const filteredPlants = this.props.allPlants.filter((plant) => {
      return plant.commonName.includes(value)
    })
    this.setState({ ...this.state, filteredPlants: filteredPlants })
  }
  filterPlantsByType(type) {
    const filteredPlants = this.props.allPlants.filter((plant) => {
      return plant.type.includes(type)
    })
    this.setState({ ...this.state, filteredPlants: filteredPlants })
  }
  getAllPlants() {
    this.setState({ ...this.state, filteredPlants: this.props.allPlants })
  }
  getPlants() {
    const plants = this.state.filteredPlants
    return plants.map((plant, index) => {
      return (
        <div key={index} className="plant-card">
          <Link className="link" to={`/store-items/${plant._id}`}>
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
      <div className="Store">
        <input
          type="text"
          placeholder="Search plant"
          onChange={(event) => this.filterPlantsByName(event)}
        />
        <button onClick={() => this.getAllPlants()}>All</button>
        <button onClick={() => this.filterPlantsByType('indoor')}>
          Indoors
        </button>
        <button onClick={() => this.filterPlantsByType('outdoor')}>
          Outdoors
        </button>
        {this.getPlants()}
      </div>
    )
  }
}
export default Store
