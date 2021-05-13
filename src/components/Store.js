import React from 'react'
import { Link } from 'react-router-dom'

class Store extends React.Component {
  getPlants() {
    const plants = this.props.allPlants
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
    return <div className="Store">{this.getPlants()}</div>
  }
}
export default Store
