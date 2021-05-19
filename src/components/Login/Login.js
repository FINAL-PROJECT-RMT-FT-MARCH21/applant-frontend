import './Login.scss'
import React from 'react'
import axios from 'axios'

import { Link, Redirect } from 'react-router-dom'

class Login extends React.Component {
  state = {
    user: {
      username: '',
      password: '',
    },
  }

  login(event){
    event.preventDefault()
    this.props.authAction(this.state.user, 'login')
    this.props.modalAction('close')
  }

  handleInput(event) {
    const { name, value } = event.target
    this.setState({
      ...this.state,
      user: { ...this.state.user, [name]: value },
    })
  }

  getLoginForm() {
    return (
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={(event) => this.login(event)}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              onChange={(event) => this.handleInput(event)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={(event) => this.handleInput(event)}
            />
          </div>
          <button>Log in</button> 
        </form>
        <p>
          Don't you have an account yet? Register by clicking<span> </span>
          <Link onClick={()=>this.props.modalAction('open', 'signup')}>here</Link>
        </p>
      </div>
    )
  }

  render() {
    return (
      <div className="Login">
        {this.getLoginForm()}
      </div>
    )
  }
}

export default Login
