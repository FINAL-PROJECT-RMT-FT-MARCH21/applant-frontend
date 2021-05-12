import React from "react";


class Message extends React.Component {

    getMsg(){
        // console.log('msg: ', this.props.msg)
        if (this.props.msg){
            setTimeout(()=>{
                this.props.cleanMsg()
            }, 2000)
            return <p>{this.props.msg}</p>
        }
    }

    render() {
        return  (
            <div className="Message">
                {this.getMsg()}
            </div>
        )
    }
}

export default Message;
