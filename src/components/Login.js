import React from 'react'
import axios from 'axios'

import { Redirect, Link } from 'react-router-dom'

class Login extends React.Component {
  state = {
    user: {
      username: '',
      password: '',
    },
  }

  handleSubmit(event) {
    event.preventDefault()
    axios({
      method: 'post',
      url: 'http://localhost:5000/login',
      data: this.state.user,
      withCredentials: true,
    })
      .then((result) => {
        const user = result.data.result
        const message = result.data.message
        this.props.setAppState(user, message)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleInput(event) {
    const { name, value } = event.target
    this.setState({
      ...this.state,
      user: { ...this.state.user, [name]: value },
    })
  }

  getLogin() {
    return (
      <div>
        <h1>Login</h1>

        <form className="form" onSubmit={(event) => this.handleSubmit(event)}>
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              onChange={(event) => this.handleInput(event)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={(event) => this.handleInput(event)}
            />
          </div>
          <button className="loginButton">Log in</button>
        </form>
        <p>
          Don't have an account yet? Register by clicking<span> </span>
          <Link to="/signup">here</Link>
        </p>
      </div>
    )
  }

  checkUser(mode) {
    if (this.props.logInSuccess) {
      if (mode === 'admin') {
        if (this.props.userInfo.admin) {
          return true
        }
      } else {
        return true
      }
    }
  }

  render() {
    return (
      <div className="Login">
        {this.getLogin()}
        {this.checkUser() ? (
          this.checkUser('admin') ? (
            <Redirect to="/admin" />
          ) : (
            <Redirect to="/profile" />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </div>
    )
  }
}

export default Login
