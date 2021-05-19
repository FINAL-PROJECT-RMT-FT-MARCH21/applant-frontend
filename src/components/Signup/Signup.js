import './Signup.scss'
import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import { Link } from 'react-router-dom'

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
      url: `${process.env.REACT_APP_URL}/app/signup`,
      data: this.state.user,
    })
      .then((result) => {
        console.log('signup good', result)
        if (result.data.successSignup){
          console.log('success')
          this.setState({...this.state, successSignup: true})
          this.props.modalAction('close')
        } else {
          console.log('fail')
        }
        this.props.addMsg(result.data.message)
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

  showLoginModal(){
    this.setState({successSignup: false})
    this.props.modalAction('open', 'login')
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
        <p>
          Do you have an account? Log in<span> </span>
          <Link onClick={()=>this.props.modalAction('open', 'login')}>here</Link>
        </p>
      </div>
    )
  }

  render() {
    return (
      <div className="Signup">
        {this.state.successSignup ? 
        this.showLoginModal()
        : null}
        {this.showSignup()}
      </div>
    )
  }
}

export default Signup
