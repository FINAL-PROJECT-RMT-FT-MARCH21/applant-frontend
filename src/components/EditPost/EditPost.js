import './EditPost.scss'
import React from 'react'
import axios from 'axios'


class EditPost extends React.Component {
  
  state = {
    editPost: this.props.posts.filter((post)=>{
      return this.props.modal.split('/')[1] === post._id
    })[0]
  }

  editPost(event) {
    event.preventDefault()
    this.props.adminAction(this.state.editPost, `edit-post/${this.state.editPost._id}`)
    this.props.modalAction('close')
  }

  handleInput(event, form) {
    const { name, value } = event.target
    this.setState({
      ...this.state,
      [form]: { ...this.state[form], [name]: value },
    })
  }

  getEditPostForm() {
    return (
      <div className="form-container">
        <form
          className="form"
          onSubmit={(event) => this.editPost(event)}
        >
          <h2>Edit post</h2>
          <table>
            <tbody>
              <tr>
                <td>Image URL</td>
                <td>
                <input
                    onChange={(event) => this.handleInput(event, 'editPost')}
                    type="text"
                    name="image"
                    value={this.state.editPost.image}
                />
                </td>
              </tr>
              <tr>
                <td>Title</td>
                <td>
                <input
                  onChange={(event) => this.handleInput(event, 'editPost')}
                  type="text"
                  name="title"
                  value={this.state.editPost.title}
                />
                </td>
              </tr>
              <tr>
                <td>Content</td>
                <td>
                <textarea
                  onChange={(event) => this.handleInput(event, 'editPost')}
                  type="text"
                  name="content"
                  value={this.state.editPost.content}
                />
                </td>
              </tr>
            </tbody>
          </table>
          <button>Edit post</button>
        </form>
        <button onClick={()=>this.props.modalAction('open', `delete-post/${this.state.editPost._id}`)}>Delete post</button>
      </div>
    )
  }

  render() {
    return (
      <div className="EditPost">
        {this.getEditPostForm()}
      </div>
    )
  }
}

export default EditPost
