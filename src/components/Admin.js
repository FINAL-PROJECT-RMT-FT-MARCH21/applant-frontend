import React from 'react'

class Admin extends React.Component {
  state = {
    newUser: {},
    newPlant: {
      commonName: '',
      botanicalName: '',
      type: [],
      maintenance: [],
      water: [],
      exposure: [],
      safety: '',
      purifying: false,
      about: '',
      price: 0,
      stock: 0,
    },
    newPost: {},
  }

  handleSubmit(event) {
    const {
      commonName,
      botanicalName,
      type,
      maintenance,
      water,
      exposure,
      safety,
      purifying,
      about,
      price,
      stock,
    } = this.state.newPlant
  }

  showLog() {
    console.log(this.state)
  }

  handleInput(event) {
    const { name, value } = event.target
    if (name === 'exposure') {
    } else {
      this.setState({
        ...this.state,
        newPlant: { ...this.state.newPlant, [name]: value },
      })
    }
  }

  getAdminForms() {
    return (
      <div className="form-container">
        <h2>New plant</h2>
        <button onClick={() => this.showLog()}>See log</button>
        <form className="form" onSubmit={(event) => this.handleSubmit(event)}>
          <div className="form-field">
            <label htmlFor="commonName">Common name</label>
            <input
              type="text"
              name="commonName"
              onChange={(event) => this.handleInput(event)}
              placeholder="encina"
            />
          </div>
          <div className="form-field">
            <label htmlFor="botanicalName">Botanical name</label>
            <input
              type="text"
              name="botanicalName"
              onChange={(event) => this.handleInput(event)}
              placeholder="quercus ilex"
            />
          </div>
          <div className="form-field">
            <label htmlFor="type">Type</label>
            <input
              type="text"
              name="type"
              onChange={(event) => this.handleInput(event)}
              placeholder="indoor / outdoor"
            />
          </div>
          <div className="form-field">
            <label htmlFor="maintenance">Maintenance</label>
            <input
              type="text"
              name="maintenance"
              onChange={(event) => this.handleInput(event)}
              placeholder="low / medium / high"
            />
          </div>
          <div className="form-field">
            <label htmlFor="water">Water</label>
            <input
              type="text"
              name="water"
              onChange={(event) => this.handleInput(event)}
              placeholder="low / medium / high"
            />
          </div>
          <div className="form-field">
            <label htmlFor="water">Exposure</label>
            <input
              type="text"
              name="water"
              onChange={(event) => this.handleInput(event)}
              placeholder="low / medium / high"
            />
          </div>
          <div className="form-field">
            <label htmlFor="safety">Safety</label>
            <input
              type="text"
              name="safety"
              onChange={(event) => this.handleInput(event)}
              placeholder="yes / (details)"
            />
          </div>
          <div className="checkbox">
            <label htmlFor="purifying">Purifying</label>
            <input
              type="checkbox"
              name="purifying"
              onChange={(event) => this.handleInput(event)}
              placeholder="true / false"
            />
          </div>
          <div className="form-field">
            <label htmlFor="about">About</label>
            <textarea
              className="textarea"
              type="text"
              name="about"
              onChange={(event) => this.handleInput(event)}
            />
          </div>
          <hr></hr>
          <div className="form-field">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              step="0.01"
              name="price"
              onChange={(event) => this.handleInput(event)}
              placeholder="0 €"
              min={0}
            />
          </div>
          <div className="checkbox">
            <label htmlFor="stock">Stock </label>
            <input
              type="checkbox"
              name="stock"
              onChange={(event) => this.handleInput(event)}
            />
          </div>
          <button>Create new plant</button>
        </form>
      </div>
    )
  }

  render() {
    return <div className="Admin">{this.getAdminForms()}</div>
  }
}

export default Admin
