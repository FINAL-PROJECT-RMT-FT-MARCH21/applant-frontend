// imports
import './Footer.scss'
import React from 'react';
import { Link } from 'react-router-dom'
import { VscGithub } from 'react-icons/vsc'
import {GrLinkedin} from 'react-icons/gr'

// component
class Footer extends React.Component {
  render() {
    return (
      <div className="Footer">
        <div>
            <h5>About</h5>
            <p>FAQ</p>    
            <p>Contacts:</p>
            <div className="contact">
              <p>Hector Martinez </p>
              <a href="https://github.com/Thornnk" target="_blank" className="icons"><VscGithub /></a> 
              <a href="https://www.linkedin.com/in/hector-md/" target="_blank" className="icons"><GrLinkedin /></a> 
            </div>
            <div className="contact">
              <p>Raquel Rodriguez  </p>
              <a href="https://github.com/srtamaciel" target="_blank" className="icons"><VscGithub /></a>  
              <a href="https://www.linkedin.com/in/raquel-rodriguez-diaz/" target="_blank" className="icons"><GrLinkedin /></a>  
            </div>
            <div className="contact">
              <p>German Delgado  </p>
              <a href="https://github.com/GermanDG6" target="_blank" className="icons"><VscGithub /></a>  
              <a href="https://www.linkedin.com/in/germandelgadogarcia/" target="_blank" className="icons"><GrLinkedin /></a> 
            </div>
        </div>
        <div>
            <h5>Join Applant</h5>
            <div className="Join">
            <Link className="link" onClick={()=>this.props.modalAction('open', 'signup')}>
               <p>Sign up</p>
            </Link>
            <Link className="link" onClick={()=>this.props.modalAction('open', 'login')}>
              <p>Login</p>
            </Link>
            </div>
        </div>
        <div>
            <h5>Terms</h5>
            <div className="Terms">
            <Link to="#">Terms of Service</Link>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Returns and Delivery</Link>
            <Link to="#">Cookies</Link>
            </div>
        </div>
        
      </div>
    );
  }
}

//export
export default Footer;
