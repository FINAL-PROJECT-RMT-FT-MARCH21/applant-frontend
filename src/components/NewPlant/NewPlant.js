import './NewPlant.scss'
import React from 'react'
import axios from 'axios'

class NewPlant extends React.Component {

  state = {
    newPlant: {}
  }
  
  handleSubmit(event, data, url) {
    event.preventDefault()
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_URL}/app/${url}`,
      data: data,
      withCredentials: true,
    })
      .then((result) => {
        this.props.addMsg(result.data.data.message)
        this.props.updateState('plants')
        this.props.modalAction('close')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleInput(event) {
    const { name, value } = event.target
    this.setState({
      ...this.state,
      newPlant: { ...this.state.newPlant, [name]: value },
    })
  }

  getNewPlantForm() {
    return (
        <div className="PlantDetails">
            <form
            className="form"
            onSubmit={(ev) => this.handleSubmit(ev, 'newPlant', 'new-plant')}
            >
                <h2>{this.toUpper(this.state.plant.commonName)}</h2>
                <table>
                    <tbody>
                    <tr>
                        <td>Image URL</td>
                        <td>
                        <input
                            onChange={(event) => this.handleInput(event)}
                            type="text"
                            name="image"
                            value={this.state.plant.image}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>Common name</td>
                        <td>
                        <input
                            onChange={(event) => this.handleInput(event)}
                            type="text"
                            name="commonName"
                            value={this.state.plant.commonName}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>Botanical name</td>
                        <td>
                        <input
                            onChange={(event) => this.handleInput(event)}
                            type="text"
                            name="botanicalName"
                            value={this.state.plant.botanicalName}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>Type</td>
                        <td>
                        <input
                            onChange={(event) => this.handleInput(event)}
                            type="text"
                            name="type"
                            value={this.state.plant.type.join(' ')}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>Maintenance</td>
                        <td>
                        <input
                            onChange={(event) => this.handleInput(event)}
                            type="text"
                            name="maintenance"
                            value={this.state.plant.maintenance}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>Water</td>
                        <td>
                        <input
                            onChange={(event) => this.handleInput(event)}
                            type="text"
                            name="water"
                            value={this.state.plant.water}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>Exposure</td>
                        <td>
                        <input
                            onChange={(event) => this.handleInput(event)}
                            type="text"
                            name="exposure"
                            value={this.state.plant.exposure.join(' ')}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>Safety</td>
                        <td>
                        <input
                            onChange={(event) => this.handleInput(event)}
                            type="text"
                            name="safety"
                            value={this.state.plant.safety}
                        />
                        </td>
                    </tr>
                    {this.state.plant.purifying ? (
                        <tr>
                        <td>Purifying</td>
                        <td>
                            <input
                            onChange={(event) => this.handleInput(event)}
                            type="checkbox"
                            name="purifying"
                            value={1}
                            checked
                            />
                        </td>
                        </tr>
                    ) : (
                        <tr>
                        <td>Purifying</td>
                        <td>
                            <input
                            onChange={(event) => this.handleInput(event)}
                            type="checkbox"
                            name="purifying"
                            value={1}
                            />
                        </td>
                        </tr>
                    )}
                    <tr>
                        <td>About</td>
                        <td>
                        <textarea name="about" value={this.state.plant.about} />
                        </td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td>
                        <input
                            onChange={(event) => this.handleInput(event)}
                            type="number"
                            name="price"
                            value={this.state.plant.price}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>Stock</td>
                        <td>
                        <input
                            onChange={(event) => this.handleInput(event)}
                            type="number"
                            name="stock"
                            value={this.state.plant.stock}
                        />
                        </td>
                    </tr>
                    {this.state.plant.inStore ? (
                        <tr>
                        <td>In store</td>
                        <td>
                            <input
                            onChange={(event) => this.handleInput(event)}
                            type="checkbox"
                            name="inStore"
                            value={1}
                            checked
                            />
                        </td>
                        </tr>
                    ) : (
                        <tr>
                        <td>In store</td>
                        <td>
                            <input
                            onChange={(event) => this.handleInput(event)}
                            type="checkbox"
                            name="inStore"
                            value={1}
                            />
                        </td>
                        </tr>
                    )}
                    </tbody>
                </table>
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
