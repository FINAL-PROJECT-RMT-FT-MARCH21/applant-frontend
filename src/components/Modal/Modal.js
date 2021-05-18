import './Modal.scss'
import React from 'react'
<<<<<<< HEAD
/* import { Link, Redirect } from 'react-router-dom' */
=======
import 'react-responsive-modal/styles.css'
import { Modal } from "react-responsive-modal";
>>>>>>> 0fdc4e721dea16c790cf3f06584ea9062780bec7

import Login from '../Login/Login'
import Signup from '../Signup/Signup'


class ModalComponent extends React.Component {
  showModal() {

    if(this.props.modal === 'login') {
      return (
        <div>
          <Modal open={this.props.modalOpened} onClose={()=>this.props.modalAction('close')}>
            <Login 
              {...this.props}
            />
          </Modal>
        </div>
      )
    } else if(this.props.modal === 'signup'){
      console.log('modal signup')
      return (
        <div>
          <Modal open={this.props.modalOpened} onClose={()=>this.props.modalAction('close')}>
            <Signup 
              {...this.props}
            />
          </Modal>
        </div>
      )
    }
  }

  render() {
    return <div className="Modal">{this.showModal()}</div>
  }
}

export default ModalComponent
