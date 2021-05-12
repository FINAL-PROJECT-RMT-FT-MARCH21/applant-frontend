import React from "react";

class Profile extends React.Component {

  render() {
    const username = this.props.userInfo.username
    return (
        <div className="Profile">
            <h1>Hello {username}</h1>
        </div>
    )
  }
}
export default Profile;