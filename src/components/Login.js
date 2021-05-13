import React from "react";
import axios from "axios";

import { Redirect, Link } from "react-router-dom";

class Login extends React.Component {
  state = {
    user: {
      username: "",
      password: "",
    },
  };

  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:5000/login",
      data: this.state.user,
      withCredentials: true,
    })
      .then((result) => {
        const user = result.data.result;
        const message = result.data.message;
        this.props.setAppState(user, message);
        // const user = result.data.result
        // const logInSuccess = true
        // this.props.editState(user, message, 'checkLog')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({
      ...this.state,
      user: { ...this.state.user, [name]: value },
    });
  }

  getLogin() {
    return (
      <div>
        <div className="Login">
          <h1>Login</h1>
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              onChange={(event) => this.handleInput(event)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={(event) => this.handleInput(event)}
            />
            <button>Log in</button>
          </form>
        </div>
        <div>
          <p>
            Don't have an account yet? Register by clicking
            <Link to="/signup"> here</Link>
          </p>
        </div>
      </div>
    );

    // if (this.props.logInSuccess) {
    //   if (this.props.user.admin) {
    //     <Redirect to="/admin" />;
    //   } else {
    //     <Redirect to="/profile" />;
    //   }
    // } else {
    //   return (
    //     <div>
    //       <div className="Login">
    //         <h1>Login</h1>
    //         <form onSubmit={(event) => this.handleSubmit(event)}>
    //           <label htmlFor="username">Username</label>
    //           <input
    //             type="text"
    //             name="username"
    //             onChange={(event) => this.handleInput(event)}
    //           />
    //           <label htmlFor="password">Password</label>
    //           <input
    //             type="password"
    //             name="password"
    //             onChange={(event) => this.handleInput(event)}
    //           />
    //           <button>Log in</button>
    //         </form>
    //       </div>
    //       <div>
    //         <p>
    //           Don't have an account yet? Register by clicking
    //           <Link to="/signup"> here</Link>
    //         </p>
    //       </div>
    //     </div>
    //   );
    // }
  }

  render() {
    return <div className="Login">{/* {this.getLogin()} */}</div>;
  }
}

export default Login;
