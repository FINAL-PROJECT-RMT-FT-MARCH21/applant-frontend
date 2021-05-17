import React from 'react'
import { Link, Redirect } from 'react-router-dom'

class StoreItem extends React.Component {
  state = {
    selectedPlantId: [],
    quantity: 0,
    toCartLoggedStatus: undefined,
  }

  handleInput(event) {
    const selectedPlantId = this.props.match.params._id
    const quantity = event.target.value
    if (this.props.logInSuccess) {
      this.setState({ ...this.state, selectedPlantId, quantity })
    }
  }

  addToCart() {
    if (this.props.logInSuccess) {
      this.props.setAppState(this.state.selectedPlantId, this.state.quantity)
      this.setState({ ...this.state, toCartLoggedStatus: 'logged' })
    } else {
      this.setState({ ...this.state, toCartLoggedStatus: 'not logged' })
    }
  }

  render() {
    const selectedPlantId = this.props.match.params._id
    const showSelected = this.props.plants.filter((plant) => {
      return selectedPlantId === plant._id
    })[0]

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
          <input
            className="input"
            type="number"
            placeholder="0"
            min="0"
            name="quantity"
            onChange={(event) => this.handleInput(event)}
          />
          <strong>
            <p>{showSelected.price}€</p>
          </strong>

          <button onClick={() => this.addToCart()}>Add to cart</button>

          <Link to={`/plant-details/${selectedPlantId}`}>View details</Link>
        </div>
        {this.state.toCartLoggedStatus === 'not logged' ? (
          <Redirect to="#openModal" />
        ) : null}
        {this.state.toCartLoggedStatus === 'logged' ? (
          <Redirect to="/shopping-cart" />
        ) : null}
      </div>
    )
  }
}

export default StoreItem
