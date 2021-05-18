import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class Signup extends React.Component {
  state = {
    user: {
      username: ``,
      password: ``,
    },
    successSignup: false,
  }

  handleSubmit(event) {
    event.preventDefault()
    axios({
      method: 'post',
      url: 'http://localhost:5000/signup',
      data: this.state.user,
    })
      .then((result) => {
        if (result.data.successSignup)
          this.setState({ ...this.state, successSignup: true })
        this.props.addMsg(result.data.message)
        this.props.modalAction('close')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleChange(event) {
    const { value, name } = event.target
    this.setState({
      ...this.state,
      user: { ...this.state.user, [name]: value },
    })
  }

  showSignup() {
    return (
      <div className="form-container">
        <h2>Sign up</h2>
        <form className="form" onSubmit={(event) => this.handleSubmit(event)}>
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              onChange={(event) => this.handleChange(event)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={(event) => this.handleChange(event)}
            />
          </div>
          <button>Register new user</button>
        </form>
      </div>
    )
  }

  render() {
    return this.state.successSignup ? (
      <Redirect to="#openModal" />
    ) : (
      <div className="Signup">{this.showSignup()}</div>
    )
  }
}
export default Signup
