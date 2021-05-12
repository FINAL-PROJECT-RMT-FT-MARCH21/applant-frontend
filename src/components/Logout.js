import React from "react"
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class Logout extends React.Component {

    handleLogout = () => {
        axios.get("http://localhost:5000/logout")
        .then((result) => {
            this.props.logout()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="Logout">
                {this.handleLogout()}
                <Redirect to='./' />
            </div>
        )
    }
}
export default Logout;
