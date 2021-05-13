import React from 'react'

class Admin extends React.Component {
  state = {
    newUser: {},
    newPlant: {},
    newPost: {},
    newStoreItem: {},
  }

  render() {
    return (
      <div className="Admin">
        <div className="form">
          <h2>New store item</h2>
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                onChange={(event) => this.handleChange(event)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                onChange={(event) => this.handleChange(event)}
              />
            </div>
            <button>Create new store items</button>
          </form>
        </div>
        <div className="form">
          <h2>New plant</h2>
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <div className="form-field">
              <label htmlFor="name">Common name</label>
              <input
                type="text"
                name="name"
                onChange={(event) => this.handleChange(event)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="description">Botanical name</label>
              <input
                type="text"
                name="description"
                onChange={(event) => this.handleChange(event)}
              />
              <label htmlFor="description">Maintenance</label>
              <input
                type="text"
                name="description"
                onChange={(event) => this.handleChange(event)}
                placeholder="low / medium / high"
              />
            </div>
            <button>Create new plant</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Admin
