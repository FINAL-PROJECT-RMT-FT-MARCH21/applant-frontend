import React from 'react'
import { Link } from 'react-router-dom'

class Store extends React.Component {
  state = {
    filteredStoreItems: [...this.props.allPlants],
  }

  getSearchBar(){
    return (
      <input type="text" placeholder="Search plant" onChange={(event) => this.filterStoreItems(event, 'commonName')} />
    )
  }

  getFilterButtons(){
    return (
      <div className="filter-buttons">
        <button onClick={() => this.filterStoreItems()}>All</button>
        <button onClick={() => this.filterStoreItems(null, 'type', 'indoors')}>Indoors</button>
        <button onClick={() => this.filterStoreItems(null, 'type', 'outdoors')}>Outdoors</button>
      </div>
    )
  }

  filterStoreItems(event, by, type){
    let filteredStoreItems, value
    if (by === 'commonName'){
      value = event.target.value.toLowerCase()
      filteredStoreItems = this.props.allPlants.filter((plant) => plant[by].includes(value))
    } else if (by === 'type'){
      filteredStoreItems = this.props.allPlants.filter((plant) => plant.type.includes(type))
    } else {
      filteredStoreItems = this.props.allPlants
    }
    this.setState({ ...this.state, filteredStoreItems: filteredStoreItems })
  }

  getStoreItems() {
    const storeItems = this.state.filteredStoreItems
    return storeItems.map((plant, index) => {
      return (
        <div key={index} className="plant-card">
          <Link className="link" to={`/store-items/${plant._id}`}>
            <img src={plant.image} alt={plant.commonName} />
          </Link>
          <h2>{plant.commonName[0].toUpperCase() + plant.commonName.slice(1)}</h2>
          <h3>({plant.botanicalName[0].toUpperCase() + plant.botanicalName.slice(1)})</h3>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="Homepage">
        <h1 className="main-title">Store</h1>
        {this.getSearchBar()}
        {this.getFilterButtons()}
        <div className="plant-cards-container">{this.getStoreItems()}</div>
      </div>
    )
  }
}
export default Store
