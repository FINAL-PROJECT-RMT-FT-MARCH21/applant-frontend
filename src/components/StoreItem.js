import React from 'react'
import { Link } from 'react-router-dom'

class StoreItem extends React.Component {
  render() {
    const selectedPlantId = this.props.match.params._id
    const showSelected = this.props.plants.filter((plant) => {
      return selectedPlantId === plant._id
    })[0]
    console.log(showSelected)

    return this.props.plants.length === 0 ? (
      <div className="spinner">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    ) : (
      <div className="plant-cards-container">
        <div className="plant-card">
          <img src={showSelected.image} alt={showSelected.commonName} />
          <h2>
            {showSelected.commonName[0].toUpperCase() +
              showSelected.commonName.slice(1)}
          </h2>
          <p>
            <i>
              {showSelected.botanicalName[0].toUpperCase() +
                showSelected.botanicalName.slice(1)}
            </i>
          </p>
          <input className="input" type="number" placeholder="1" min="0" />
          <strong>
            <p>{showSelected.price}€</p>
          </strong>
          <button>Add to cart</button>
          <Link to={`/plant-details/${selectedPlantId}`}>View details</Link>
        </div>
      </div>
    )
  }
}

export default StoreItem
