import React from 'react'
import { Link, Redirect } from 'react-router-dom'

class StoreItem extends React.Component {
  state = {
    selectedPlantId: [],
    quantity: 0,
    totalPrice: 0, 
    toCartLoggedStatus: undefined,
  }

  handleInput(event) {
    const selectedPlantId = this.props.match.params._id
    const quantity = event.target.value
    if (this.props.userInfo) {
      this.setState({ ...this.state, selectedPlantId, quantity })
    }
  }

  addToCart() {
    if (this.props.userInfo) {
      this.props.editStateFromStoreItems(this.state.selectedPlantId, this.state.quantity)
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
    return this.props.plants.length ? (
      <div className="StoreItem">
        <div className="item">
          <img src={showSelected.image} alt={showSelected.commonName} />
          <div className="item-info">
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
            <strong>
              <p>{showSelected.price}€</p>
            </strong>

            <input
              className="input"
              type="number"
              placeholder="Quantity"
              min="0"
              name="quantity"
              onChange={(event) => this.handleInput(event)}
            />
            <button onClick={() => this.addToCart()}>Add to cart</button>

            <Link className="link" to={`/plant-details/${selectedPlantId}`}>View details</Link>
          </div>
        </div>
        {this.state.toCartLoggedStatus === 'not logged' ? (
          this.props.modalAction('open', 'login')
        ) : null}
        {this.state.toCartLoggedStatus === 'logged' ? (
          <Redirect to="/shopping-cart" />
        ) : null}
      </div>
    ) : (
      <div className="spinner-2">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }
}

export default StoreItem
