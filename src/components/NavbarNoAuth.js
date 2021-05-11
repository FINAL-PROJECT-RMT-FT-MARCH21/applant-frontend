import React from "react";

class NavbarAuth extends React.Component {

    getNavbar(side){
        if (side === 'left'){
            return (
                <div className="navbar-left">
                    <Link className="link" to="/">Home | </Link>
                </div>
            )
        } else if (side === 'right'){
            return (
                <div className="navbar-right">
                    <Link className="link" to="/login">Login </Link>
                </div>
            )
        }
    }
    
    {/* <Link className="link" to="/signup">Sign up | </Link> */}
  render() {
      console.log(this.props.match)
    return (
        <nav className="Navbar">
            {this.getNavbar('left')}
            {this.getNavbar('right')}
        </nav>
    )
  }
}
export default NavbarAuth;