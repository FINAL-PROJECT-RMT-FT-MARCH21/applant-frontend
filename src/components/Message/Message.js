import './Message.scss'
import React from 'react'

import {BsFillInfoCircleFill} from 'react-icons/bs'

class Message extends React.Component {
  showMsg() {
    setTimeout(() => {
      this.props.cleanMsg()
    }, 2000)
    return <div className="message-container"><BsFillInfoCircleFill/><article>{this.props.msg}</article></div>
  }

  render() {
    return (
      <div className="Message">
        {this.props.msg ? this.showMsg() : null}
      </div>
    )
  }
}

export default Message
