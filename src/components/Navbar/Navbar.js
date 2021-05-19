import './Navbar.scss'
import React from 'react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  getNavbar() {
    if (this.props.userInfo) {
      if (this.props.userInfo.admin) {
        return (
          <div className="navbar-child">
            <div className="nav-left">
              <Link className="link" to="/">
                <div className="nav-btn">Home</div>
              </Link>
              <Link className="link" to="/blog">
                <div className="nav-btn">Blog</div>
              </Link>
              <Link className="link" to="/store">
                <div className="nav-btn">Store</div>
              </Link>
            </div>
            <div className="nav-right">
              <Link className="link" to="/admin">
                <div className="nav-btn">Admin</div>
              </Link>
              <Link className="link" to="/profile">
                <div className="nav-btn">Profile</div>
              </Link>
              <Link className="link" onClick={()=>this.props.authAction(null, 'logout')}>
                  <div className="nav-btn">Logout</div>
              </Link>
              <div className="nav-btn cart-icon">
                <Link className="link" to="/shopping-cart">
                  <img src="/icons/shopping-cart-icon.png" alt="cart" />
                </Link>
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div className="navbar-child">
            <div className="nav-left">
              <Link className="link" to="/">
                <div className="nav-btn">Home</div>
              </Link>
              <Link className="link" to="/blog">
                <div className="nav-btn">Blog</div>
              </Link>
              <Link className="link" to="/store">
                <div className="nav-btn">Store</div>
              </Link>
            </div>
            <div className="nav-right">
              <Link className="link" to="/profile">
                <div className="nav-btn">Profile</div>
              </Link>
              <Link className="link" onClick={()=>this.props.authAction(null, 'logout')}>
                <div className="nav-btn">Logout</div>
              </Link>
              <div className="nav-btn cart-icon">
                <Link className="link" to="/shopping-cart">
                  <img src="/icons/shopping-cart-icon.png" alt="cart" />
                </Link>
              </div>
            </div>
          </div>
        )
      }
    } else {
      return (
        <div className="navbar-child">
          <div className="nav-left">
            <Link className="link" to="/">
              <div className="nav-btn">Home</div>
            </Link>
            <Link className="link" to="/blog">
              <div className="nav-btn">Blog</div>
            </Link>
            <Link className="link" to="/store">
              <div className="nav-btn">Store</div>
            </Link>
          </div>
          <div className="nav-right">
            <Link className="link" onClick={()=>this.props.modalAction('open', 'login')}>
              <div className="nav-btn">Login</div>
            </Link>
          </div>
        </div>
      )
    }
  }

  /*{ <Link className="link" to="/signup">Sign up | </Link> }*/
  render() {
    return <nav className="Navbar">{this.getNavbar()}</nav>
  }
}

export default Navbar
