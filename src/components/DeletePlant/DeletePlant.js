import './DeletePlant.scss'
import React from 'react'

class DeletePlant extends React.Component {

  state = {
    plant: this.props.plants.filter((plant)=>{
      return this.props.modal.split('/')[1] === plant._id
    })[0]
  }

  toUpper(word) {
    if (word) return word[0].toUpperCase() + word.slice(1)
  }

  deletePlant(){
    this.props.adminAction(null, `delete-plant/${this.state.plant._id}`)
    this.props.modalAction('close')
  }

  getDeletePlantForm() {
    return (
      <div className="form-container">
        <h2>Delete plant</h2>
        <h3>Are you sure you want to delete the plant <i>{this.toUpper(this.state.plant.commonName)}</i>?</h3>
        <button onClick={()=>this.deletePlant()}>DELETE</button>
        <button onClick={()=>this.props.modalAction('close')}>Cancel</button>
      </div>
    )
  }

  render() {
    return (
      <div className="DeletePlant">
        {this.getDeletePlantForm()}
      </div>
    )
  }
}

export default DeletePlant
