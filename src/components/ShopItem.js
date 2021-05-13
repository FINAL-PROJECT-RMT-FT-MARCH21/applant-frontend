import React from "react";

class ShopItem extends React.Component {
  render() {
    const selectedPlantId = this.props.match.params._id;
    const showSelected = this.props.plants.filter((plant) => {
      return selectedPlantId === plant._id;
    })[0];
    console.log(showSelected);

    return this.props.plants.length === 0 ? (
      <div className="ShopItem">
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
            <h3>
              (
              {showSelected.botanicalName[0].toUpperCase() +
                showSelected.botanicalName.slice(1)}
              )
            </h3>
          </div>
        </div>
    </div>
      )
  }
}

export default ShopItem;
