import './Homepage.scss'
import React from 'react'
import { Link } from 'react-router-dom'

import Parallax from '../Parallax/Parallax'

class Homepage extends React.Component {
  state = {
    filteredPlants: [...this.props.allPlants],
  }

  getSearchBar() {
    return (
      <input
        type="text"
        placeholder="Search plant by name"
        onChange={(event) => this.filterPlants(event, 'commonName')}
      />
    )
  }

  getFilterButtons() {
    return (
      <div className="filter-buttons">
        <button onClick={() => this.filterPlants()}>All</button>
        <button onClick={() => this.filterPlants(null, 'type', 'indoors')}>
          Indoors
        </button>
        <button onClick={() => this.filterPlants(null, 'type', 'outdoors')}>
          Outdoors
        </button>
      </div>
    )
  }

  filterPlants(event, by, type) {
    let filteredPlants, value
    if (by === 'commonName') {
      value = event.target.value.toLowerCase()
      filteredPlants = this.props.allPlants.filter((plant) =>
        plant[by].includes(value)
      )
    } else if (by === 'type') {
      filteredPlants = this.props.allPlants.filter((plant) =>
        plant.type.includes(type)
      )
    } else {
      filteredPlants = this.props.allPlants
    }
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
          <Link className="link" to={`/plant-details/${plant._id}`}>
            <div className="seeDetails">
                <p>See details</p>
            </div>
          </Link>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="Homepage">
          <Parallax />
        {this.getFilterButtons()}
        {this.getSearchBar()}
        <div className="plant-cards-container">
          {this.getPlants()}
        </div>
    </div>
    )
  }
}
export default Homepage
