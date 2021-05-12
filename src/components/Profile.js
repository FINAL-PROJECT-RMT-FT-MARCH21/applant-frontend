import React from "react";
import {Redirect} from 'react-router-dom'

class Profile extends React.Component {

  render() {
    const username = this.props.userInfo.username
    return this.props.logInSuccess ? (
      
      <div className="Profile">
        <h1>Hello {username}</h1>
      </div>
    )
    :
    <Redirect to='./' />
  }
}
export default Profile;
