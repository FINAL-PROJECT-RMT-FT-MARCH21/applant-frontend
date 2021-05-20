import './NewPlant.scss'
import React from 'react'
import axios from 'axios'

class NewPlant extends React.Component {

  state = {
    newPlant: {}
  }

  createPlant(event){
    event.preventDefault()
    this.props.adminAction(this.state.newPlant, 'new-plant')
    this.props.updateState('plants')
    this.props.modalAction('close')
}

  handleInput(event, form) {
    const stateCopy = { ...this.state }
    const { name, value } = event.target
    if (name === 'type') {
        stateCopy[form][name] =
        value === 'all' ? ['indoors', 'outdoors'] : value.split(' ')
    } else if (name === 'exposure') {
        stateCopy[form][name] =
      value === 'all' ? ['low', 'medium', 'high'] : value.split(' ')
    } else if (name === 'purifying' || name === 'inStore') {
        stateCopy[form][name] = value ? true : false
    } else {
        stateCopy[form][name] = value
    }
    this.setState(stateCopy)
  }

  getNewPlantForm() {
    return (
        <div className="PlantDetails">
            <form
            className="form"
            onSubmit={(event) => this.createPlant(event)}
            >
                <h2>New plant</h2>
                <table>
                    <tbody>
                    <tr>
                        <td>Image URL</td>
                        <td>
                        <input
                            onChange={(event) => this.handleInput(event, 'newPlant')}
                            type="text"
                            name="image"
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>Common name</td>
                        <td>
                        <input
                            onChange={(event) => this.handleInput(event, 'newPlant')}
                            type="text"
                            name="commonName"
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>Botanical name</td>
                        <td>
                        <input
                            onChange={(event) => this.handleInput(event, 'newPlant')}
                            type="text"
                            name="botanicalName"
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>Type</td>
                        <td>
                        <input
                            onChange={(event) => this.handleInput(event, 'newPlant')}
                            type="text"
                            name="type"
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>Maintenance</td>
                        <td>
                        <input
                            onChange={(event) => this.handleInput(event, 'newPlant')}
                            type="text"
                            name="maintenance"
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>Water</td>
                        <td>
                        <input
                            onChange={(event) => this.handleInput(event, 'newPlant')}
                            type="text"
                            name="water"
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>Exposure</td>
                        <td>
                        <input
                            onChange={(event) => this.handleInput(event, 'newPlant')}
                            type="text"
                            name="exposure"
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>Safety</td>
                        <td>
                        <input
                            onChange={(event) => this.handleInput(event, 'newPlant')}
                            type="text"
                            name="safety"
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>Purifying</td>
                        <td>
                            <input
                            onChange={(event) => this.handleInput(event, 'newPlant')}
                            type="checkbox"
                            name="purifying"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>About</td>
                        <td>
                        <textarea type="text" name="about"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td>
                        <input
                            onChange={(event) => this.handleInput(event, 'newPlant')}
                            type="number"
                            name="price"
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>Stock</td>
                        <td>
                        <input
                            onChange={(event) => this.handleInput(event, 'newPlant')}
                            type="number"
                            name="stock"
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>In store</td>
                        <td>
                            <input
                            onChange={(event) => this.handleInput(event, 'newPlant')}
                            type="checkbox"
                            name="inStore"
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button>Create new plant</button>
            </form>
        </div>
    )
  }

  render() {
    return (
      <div className="NewPlant">
        {this.getNewPlantForm()}
      </div>
    )
  }
}

export default NewPlant
