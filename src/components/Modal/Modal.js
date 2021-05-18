import './Modal.scss'
import React from 'react'
/* import { Link, Redirect } from 'react-router-dom' */

import Login from '../Login'

class Modal extends React.Component {
  showModal() {
    // if (this.props.modal.login) {
    return (
      <div>
        <div id="openModal" className="modalDialog">
          <div className="form-container">
            <a href="#close" title="Close" className="close">
              X
            </a>
            <Login setAppState={this.props.setAppState} />
          </div>
        </div>
      </div>
    )
    // } else if (this.props.modal.signup) {
    //   return (
    //     <div>
    //       <div id="openModal" className="modalDialog">
    //         <div className="form-container">
    //           <Link
    //             to="#"
    //             onClick={() => this.props.swapModal()}
    //             title="Close"
    //             className="close"
    //           >
    //             X
    //           </Link>
    //           Hola me llamo lola
    //         </div>
    //       </div>
    //     </div>
    //   )
    // } else if (this.props.modal.payment) {
    //   console.log(this.props)
    //   return (
    //     <div>
    //       <div id="openModal" className="modalDialog">
    //         <div className="form-container">
    //           <a
    //             href="#close"
    //             onClick={() => this.props.swapModal()}
    //             title="Close"
    //             className="close"
    //           >
    //             X
    //           </a>
    //           This is the payment modal<a href="#">Hola</a>
    //         </div>
    //       </div>
    //     </div>
    //   )
    // }
  }

  render() {
    return <div className="Modal">{this.showModal()}</div>
  }
}

export default Modal
