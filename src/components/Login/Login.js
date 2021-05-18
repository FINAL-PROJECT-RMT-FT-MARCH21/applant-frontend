import './Login.scss'
import React from 'react'
import axios from 'axios'

<<<<<<< HEAD:src/components/Login.js
import { Redirect } from 'react-router-dom'
=======
import { Link } from 'react-router-dom'
>>>>>>> 0fdc4e721dea16c790cf3f06584ea9062780bec7:src/components/Login/Login.js

class Login extends React.Component {
  state = {
    user: {
      username: '',
      password: '',
    },
    redirect: false,
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
        console.log('logging in!')
        const user = result.data.data
        const message = result.data.message
        this.props.setAppState(user, message)
        this.setState({ ...this.state, redirect: true })
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
      user: { ...this.state.user, [name]: value },
    })
  }

  getLogin() {
    return (
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={(event) => this.handleSubmit(event)}>
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
        {/* <form className="form" onSubmit={(event) => this.handleSubmit(event)}>
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
        </form> */}
        
        <p>
          Don't have an account yet? Register by clicking<span> </span>.
          <Link onClick={()=>this.props.modalAction('open', 'signup')}>here</Link>
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
      </div>
    )
  }
}

export default Login
