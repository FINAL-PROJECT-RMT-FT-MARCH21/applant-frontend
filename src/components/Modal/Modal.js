import './Modal.scss'
import React from 'react'

import 'react-responsive-modal/styles.css'
import { Modal } from "react-responsive-modal";

import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import EditUser from '../EditUser/EditUser'
import NewPlant from '../NewPlant/NewPlant'
import NewPost from '../NewPost/NewPost'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../CheckoutForm'
import { loadStripe } from '@stripe/stripe-js'

class ModalComponent extends React.Component {
  
  showModal() {
    const promise = loadStripe(
      'pk_test_51IrpUwINyfw3Ussjr5TrEoNC8GW0dM1LdTMSLYsAIhofMEO44bCM8br241Ywwi96IRkCNMgKI4kMoSI8nugv9CSA0097t9atRk')
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
    } else if(this.props.modal.includes('edit-user')){
      return(
        <div>
          <Modal open={this.props.modalOpened} onClose={()=>this.props.modalAction('close')}>
            <EditUser
              {...this.props}
            />
          </Modal>
        </div>
      )
    } else if(this.props.modal === 'newPlant'){
      return(
        <div>
          <Modal open={this.props.modalOpened} onClose={()=>this.props.modalAction('close')}>
            {/* <NewPlant
              {...this.props}
            /> */}
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
    } else if(this.props.modal === 'payment'){
      return(
        <div>
          <Modal open={this.props.modalOpened} onClose={()=>this.props.modalAction('close')}>
            <Elements
              {...this.props}
              stripe={promise}>
              <CheckoutForm {...this.props}/>
            </Elements>
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
