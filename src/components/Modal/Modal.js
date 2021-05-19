import './Modal.scss'
import React from 'react'

import 'react-responsive-modal/styles.css'
import { Modal } from "react-responsive-modal";


import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import NewPost from '../NewPost/NewPost'


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
      return (
        <div>
          <Modal open={this.props.modalOpened} onClose={()=>this.props.modalAction('close')}>
            <Signup 
              {...this.props}
            />
          </Modal>
        </div>
      )
    } else if(this.props.modal === 'newPost'){
      return(
        <div>
          <Modal open={this.props.modalOpened} onClose={()=>this.props.modalAction('close')}>
            <NewPost
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
