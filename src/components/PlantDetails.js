import React from "react";
/* import { Redirect } from "react-router-dom"; */

class PlantDetails extends React.Component {
  render() {
    const selectedPlant = this.props.match.params._id;
    const allPlants = this.props.allPlants.filter((plant) => {
      return selectedPlant === plant._id;
    })[0];

    return (
      <div className="PlantDetails">
        <h1 className="main-title">PlantDetails</h1>
        {this.props.allPlants.length === 0 ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <img src={allPlants.image} alt={allPlants.commonName} />
            <h2>
              {allPlants.commonName[0].toUpperCase() +
                allPlants.commonName.slice(1)}
            </h2>
            <h3>
              (
              {allPlants.botanicalName[0].toUpperCase() +
                allPlants.botanicalName.slice(1)}
              )
            </h3>
            <p>
              <b>Maintenance:</b> {allPlants.maintenance[0].toUpperCase() +
                allPlants.maintenance.slice(1)}
            </p>
            <p><b>Watering:</b> {allPlants.water[0].toUpperCase() +
                allPlants.water.slice(1)}</p>

            <p><b>Type:</b> {allPlants.type.map((type) => { return `${type[0].toUpperCase() +
                type.slice(1)} `})}</p>
            <p><b>Air purifying:</b> {allPlants.purifying ? 'Yes' : 'No'}</p>
            <p><b>Pet/baby safe:</b> {allPlants.safety}</p>
            <h3><b>About  {allPlants.commonName[0].toUpperCase() +
                allPlants.commonName.slice(1)}</b></h3>
            <p>{allPlants.about}</p>
            <p>{allPlants.exposure.forEach((exposure) => exposure)}</p>
          </div>
        )}
      </div>
    );
  }
}
export default PlantDetails;
