import React from "react";
/* import { Redirect } from "react-router-dom"; */
import axios from 'axios'

class PlantDetails extends React.Component {
  state ={
    plants: [],
    createdSuccess: false,
  }

  toUpper(word){
    return word[0].toUpperCase()+word.slice(1)
  }

 /*  addToProfile(name, image) {
    axios({
      method: "post",
      url: "http://localhost:5000/add-plant",
      data: { name: name, image: image },
      withCredentials: true,
    })
      .then((result) => {
        this.setState({ ...this.state, createdSuccess: true });
      })
      .catch((err) => {
        console.log(err);
      });
  } */

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

            <h2>{this.toUpper(allPlants.commonName)}</h2>

            <h3>({this.toUpper(allPlants.botanicalName)})</h3>

            <p><b>Maintenance:</b> {this.toUpper(allPlants.maintenance)}</p>

            <p><b>Watering:</b> {this.toUpper(allPlants.water)}</p>

            <p><b>Type:</b> {allPlants.type.map((type) => { return `${this.toUpper(type)} `})}</p>
            <p><b>Type:</b> {allPlants.type.map((type) => { return `${this.toUpper(type)} `})}</p>
            <p>{allPlants.exposure.forEach((exposure) => exposure)}</p>

            <p><b>Air purifying:</b> {allPlants.purifying ? 'Yes' : 'No'}</p>

            <p><b>Pet/baby safe:</b> {allPlants.safety}</p>

            <h3><b>About  {this.toUpper(allPlants.commonName)}</b></h3>
            <p>{allPlants.about}</p>
            
          </div>
        )}
        {/* <button onClick={() => this.addToProfile(name, sprite)}>
            <i class="far fa-heart"></i>
            </button> */}
      </div>
    );
  }
}
export default PlantDetails;
