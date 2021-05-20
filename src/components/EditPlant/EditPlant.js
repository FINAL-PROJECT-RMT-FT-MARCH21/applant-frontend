import './EditPlant.scss'
import React from 'react'

class EditPlant extends React.Component {
  
  state = {
    editPlant: this.props.plants.filter((plant)=>{
      return this.props.modal.split('/')[1] === plant._id
    })[0]
  }

  editPlant(event) {
    event.preventDefault()
    this.props.adminAction(this.state.editPlant, `edit-plant/${this.state.editPlant._id}`)
    this.props.modalAction('close')
  }

  swapCheckbox(property){
    const stateCopy = {...this.state}
    stateCopy.editPlant[[property]] = !stateCopy.editPlant[[property]]
    this.setState(stateCopy)
  }

  handleInput(event, form) {
    const stateCopy = {...this.state}
    let { name, value } = event.target
    if (name === 'type'){
      stateCopy[form][name] =
      value === 'all' ? ['indoors, outdoors'] : value.split(' ')
    } else if (name === 'exposure'){
      stateCopy[form][name] = 
      value === 'all' ? ['low', 'medium', 'high'] : value.split(' ')
    } else if (name === 'purifying' || name === 'inStore'){
      return
    } else {
      stateCopy[form][name] = value
    }
    this.setState(stateCopy)
  }

  getEditPlantForm() {
    return (
      <div className="form-container">
        <form
          className="form"
          onSubmit={(event) => this.editPlant(event)}
        >
          <h2>Edit plant</h2>
          <table>
            <tbody>
              <tr>
                <td>Image URL</td>
                <td>
                <input
                    onChange={(event) => this.handleInput(event, 'editPlant')}
                    type="text"
                    name="image"
                    value={this.state.editPlant.image}
                />
                </td>
              </tr>
              <tr>
                <td>Common name</td>
                <td>
                <input
                  onChange={(event) => this.handleInput(event, 'editPlant')}
                  type="text"
                  name="commonName"
                  value={this.state.editPlant.commonName}
                />
                </td>
              </tr>
              <tr>
                <td>Botanical name</td>
                <td>
                <input
                  onChange={(event) => this.handleInput(event, 'editPlant')}
                  type="text"
                  name="botanicalName"
                  value={this.state.editPlant.botanicalName}
                />
                </td>
              </tr>
              <tr>
                <td>Type</td>
                <td>
                <input
                  onChange={(event) => this.handleInput(event, 'editPlant')}
                  type="text"
                  name="type"
                  value={this.state.editPlant.type.join(' ')}
                />
                </td>
              </tr>
              <tr>
                <td>Maintenance</td>
                <td>
                <input
                  onChange={(event) => this.handleInput(event, 'editPlant')}
                  type="text"
                  name="maintenance"
                  value={this.state.editPlant.maintenance}
                />
                </td>
              </tr>
              <tr>
                <td>Water</td>
                <td>
                <input
                  onChange={(event) => this.handleInput(event, 'editPlant')}
                  type="text"
                  name="water"
                  value={this.state.editPlant.water}
                />
                </td>
              </tr>
              <tr>
                <td>Exposure</td>
                <td>
                <input
                  onChange={(event) => this.handleInput(event, 'editPlant')}
                  type="text"
                  name="exposure"
                  value={this.state.editPlant.exposure.join(' ')}
                />
                </td>
              </tr>
              <tr>
                <td>Safety</td>
                <td>
                <input
                  onChange={(event) => this.handleInput(event, 'editPlant')}
                  type="text"
                  name="safety"
                  value={this.state.editPlant.safety}
                />
                </td>
              </tr>
              <tr>
              <td>Purifying</td>
              <td>
                {this.state.editPlant.purifying ?
                <input onClick={()=>this.swapCheckbox('purifying')} onChange={(event) => this.handleInput(event, 'editPlant')}
                  type="checkbox" name="purifying" checked/>
                : <input onClick={()=>this.swapCheckbox('purifying')} onChange={(event) => this.handleInput(event, 'editPlant')}
                type="checkbox" name="purifying"/>}
              </td>
              </tr>
              <tr>
                <td>About</td>
                <td>
                <textarea name="about" value={this.state.editPlant.about} />
                </td>
              </tr>
              <tr>
                <td>Price</td>
                <td>
                <input
                  onChange={(event) => this.handleInput(event, 'editPlant')}
                  type="number"
                  name="price"
                  value={this.state.editPlant.price}
                />
                </td>
              </tr>
              <tr>
                <td>Stock</td>
                <td>
                <input
                  onChange={(event) => this.handleInput(event, 'editPlant')}
                  type="number"
                  name="stock"
                  value={this.state.editPlant.stock}
                />
                </td>
              </tr>
                <td>On sale</td>
                {this.state.editPlant.inStore ?
                  <input onClick={()=>this.swapCheckbox('inStore')} onChange={(event) => this.handleInput(event, 'editPlant')}
                    type="checkbox" name="inStore" checked/>
                  : <input onClick={()=>this.swapCheckbox('inStore')} onChange={(event) => this.handleInput(event, 'editPlant')}
                  type="checkbox" name="inStore"/>}
            </tbody>
          </table>
          <button>Edit plant</button>
        </form>
        <button onClick={()=>this.props.modalAction('open', `delete-plant/${this.state.editPlant._id}`)}>Delete plant</button>
      </div>
    )
  }

  render() {
    return (
      <div className="EditPlant">
        {this.getEditPlantForm()}
      </div>
    )
  }
}

export default EditPlant
