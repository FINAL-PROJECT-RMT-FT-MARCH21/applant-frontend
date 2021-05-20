import './DeletePost.scss'
import React from 'react'

import { Link } from 'react-router-dom'


class DeletePost extends React.Component {

  state = {
    post: this.props.posts.filter((post)=>{
      return this.props.modal.split('/')[1] == post._id
    })[0]
  }

  toUpper(word) {
    if (word) return word[0].toUpperCase() + word.slice(1)
  }

  deletePost(){
    this.props.adminAction(null, `delete-post/${this.state.post._id}`)
    this.props.modalAction('close')
  }

  getDeletePostForm() {
    return (
      <div className="form-container">
        <h2>Delete post</h2>
        <h3>Are you sure you want to delete the post <i>{this.toUpper(this.state.post.commonName)}</i>?</h3>
        <button onClick={()=>this.deletePost()}>DELETE</button>
        <button onClick={()=>this.props.modalAction('close')}>Cancel</button>
      </div>
    )
  }

  render() {
    return (
      <div className="DeletePost">
        {this.getDeletePostForm()}
      </div>
    )
  }
}

export default DeletePost
