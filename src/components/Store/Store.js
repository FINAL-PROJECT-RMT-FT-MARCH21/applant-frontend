import './Store.scss'
import React from 'react'
import { Link } from 'react-router-dom'

class Store extends React.Component {
  state = {
    storeItems: this.props.allPlants.filter((plant)=>{
      return plant.inStore
    }),
    filteredStoreItems: this.props.allPlants.filter((plant)=>{
      return plant.inStore
    }),
  }

  getSearchBar() {
    return (
      <input
        type="text"
        placeholder="Search plant"
        onChange={(event) => this.filterStoreItems(event, 'commonName')}
      />
    )
  }

  getFilterButtons() {
    return (
      <div className="filter-buttons">
        <button onClick={() => this.filterStoreItems()}>All</button>
        <button onClick={() => this.filterStoreItems(null, 'type', 'indoors')}>
          Indoors
        </button>
        <button onClick={() => this.filterStoreItems(null, 'type', 'outdoors')}>
          Outdoors
        </button>
      </div>
    )
  }

  filterStoreItems(event, by, type) {
    let filteredItems, value
    if (by === 'commonName') {
      value = event.target.value.toLowerCase()
      filteredItems = this.state.storeItems.filter((plant) => {
        return plant[by].includes(value)
      })
    } else if (by === 'type') {
      filteredItems = this.state.storeItems.filter((plant) => {
        return plant[by].includes(type)
      })
    } else {
      filteredItems = this.state.storeItems
    }
    this.setState({ ...this.state, filteredStoreItems: filteredItems })
  }

  getStoreItems() {
    const storeItems = this.state.filteredStoreItems
    return storeItems.map((plant, index) => {

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
          <p><b>PVP</b> {plant.price}€</p>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="Homepage">
        <h1 className="main-title">Store</h1>
        {this.getFilterButtons()}
        {this.getSearchBar()}
        <div className="plant-cards-container">{this.getStoreItems()}</div>
      </div>
    )
  }
}
export default Store
