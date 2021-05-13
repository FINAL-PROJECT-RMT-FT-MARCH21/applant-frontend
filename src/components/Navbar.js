import React from "react";
import { Link } from "react-router-dom";
// import axios from "axios";

class Navbar extends React.Component {
  // handleLogout = () => {
  //     axios.get("http://localhost:5000/logout")
  //     .then((result) => {
  //         this.props.logout()
  //     })
  //     .catch((err) => {
  //         console.log(err)
  //     })
  // }

  getNavbar() {
    if (this.props.auth) {
      if (this.props.user.admin) {
        return (
          <div className="navbar-child">
            <div className="nav-left">
              <div className="nav-btn">
                <Link className="link" to="/">
                  Home
                </Link>
              </div>
              <div className="nav-btn">
                <Link className="link" to="/forum">
                  Forum
                </Link>
              </div>
              <div className="nav-btn">
                <Link className="link" to="/shop">
                  Store
                </Link>
              </div>
            </div>
            <div className="nav-right">
              <div className="nav-btn-container">
                <div className="nav-btn">
                  <Link className="link" to="/admin">
                    Admin
                  </Link>
                </div>
              </div>
              <div className="nav-btn-container">
                <div className="nav-btn">
                  <Link className="link" to="/profile">
                    Profile
                  </Link>
                </div>
              </div>
              <div className="nav-btn-container">
                <div className="nav-btn">
                  <Link className="link" to="/logout">
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="navbar-child">
            <div className="nav-left">
              <div className="nav-btn">
                <Link className="link" to="/">
                  Home
                </Link>
              </div>
              <div className="nav-btn">
                <Link className="link" to="/forum">
                  Forum
                </Link>
              </div>
              <div className="nav-btn">
                <Link className="link" to="/shop">
                  Store
                </Link>
              </div>
            </div>
            <div className="nav-right">
              <div className="nav-btn-container">
                <div className="nav-btn">
                  <Link className="link" to="/profile">
                    Profile
                  </Link>
                </div>
              </div>
              <div className="nav-btn-container">
                <div className="nav-btn">
                  <Link className="link" to="/logout">
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="navbar-child">
          <div className="nav-left">
            <Link className="link" to="/">
              <div className="nav-btn">Home</div>
            </Link>
            <Link className="link" to="/forum">
              <div className="nav-btn">Forum</div>
            </Link>
            <Link className="link" to="/shop">
              <div className="nav-btn">Store</div>
            </Link>
          </div>
          <div className="nav-right">
            <Link className="link" to="/login">
              <div className="nav-btn">Log in</div>
            </Link>
          </div>
        </div>
      );
    }
  }

  /*{ <Link className="link" to="/signup">Sign up | </Link> }*/
  render() {
    return <nav className="Navbar">{this.getNavbar()}</nav>;
  }
}

export default Navbar;
