import './DeleteUser.scss'
import React from 'react'

import { Link } from 'react-router-dom'


class DeleteUser extends React.Component {

  state = {
    user: this.props.users.filter((user)=>{
      return this.props.modal.split('/')[1] == user._id
    })[0]
  }

  deleteUser(){
    this.props.adminAction(null, `delete-user/${this.state.user._id}`)
    this.props.modalAction('close')
  }

  getDeleteUserForm() {
    return (
      <div className="form-container">
        <h2>Delete user</h2>
        <h3>Are you sure you want to delete the user <i>{this.state.user.username}</i>?</h3>
        <button onClick={()=>this.deleteUser()}>DELETE</button>
        <button onClick={()=>this.props.modalAction('close')}>Cancel</button>
      </div>
    )
  }

  render() {
    return (
      <div className="DeleteUser">
        {this.getDeleteUserForm()}
      </div>
    )
  }
}

export default DeleteUser
