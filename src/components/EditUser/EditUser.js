import './EditUser.scss'
import React from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

class EditUser extends React.Component {

  state = {
    editUser: {}
  }
  
  handleSubmit(event, data, url) {
    event.preventDefault()
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_URL}/app/${url}`,
      data: data,
      withCredentials: true,
    })
      .then((result) => {
        this.props.addMsg(result.data.data.message)
        this.props.updateState('users')
        this.props.modalAction('close')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleInput(event) {
    const { name, value } = event.target
    this.setState({
      ...this.state,
      editUser: { ...this.state.editUser, [name]: value },
    })
  }

  getEditUserForm() {
    const userToEdit = this.props.users.filter((user)=>{
            return this.props.modal.split('/')[1] === user._id
          })[0]
          {console.log(userToEdit)}
    return (
      <div className="form-container">
        <form
          className="form"
          onSubmit={(ev) => this.handleSubmit(ev, this.state.editUser, `edit-user/${userToEdit._id}`)}
        >
          <h2>Edit user</h2>
          <table>
            <tbody>
            <tr>
              <td><input type="text" name="username" value={userToEdit.username}/></td>
              <td><input type="password" name="password" value={userToEdit.password}/></td>
              <div className="table-btns">
                <Link className="link" onClick={()=>this.props.adminAction(this.state.editUser, `/edit-user/${userToEdit._id}`)}>
                  Edit user
                </Link>
                <Link className="link" onClick={()=>this.props.adminAction(null, `/delete-user/${userToEdit._id}`)}>
                  Delete user
                </Link>
              </div>
            </tr>
            </tbody>
          </table>
          <button>Edit user</button>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className="EditUser">
        {this.getEditUserForm()}
      </div>
    )
  }
}

export default EditUser
