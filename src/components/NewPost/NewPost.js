import './NewPost.scss'
import React from 'react'
import axios from 'axios'

class NewPost extends React.Component {

  state = {
    newPost: {}
  }
  
  handleSubmit(event, data, url) {
    event.preventDefault()
    axios({
      method: 'post',
      url: `http://localhost:5000/${url}`,
      data: data,
      withCredentials: true,
    })
      .then((result) => {
        this.props.addMsg(result.data.data.message)
        this.props.updateState('posts')
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
      newPost: { ...this.state.newPost, [name]: value },
    })
  }

  getNewPostForm() {
    return (
      <div className="form-container">
        <form
          className="form"
          onSubmit={(ev) => this.handleSubmit(ev, this.state.newPost, 'new-post')}
        >
          <h2>New post</h2>
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    onChange={(event) => this.handleInput(event)}
                    type="text"
                    name="title"
                    placeholder="Post title"
                  />
                </td>
                <td>
                  <input
                    onChange={(event) => this.handleInput(event)}
                    type="text"
                    name="image"
                    placeholder="Image URL"
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <textarea
                    id="new-post-textarea"
                    onChange={(event) => this.handleInput(event)}
                    type="text"
                    name="content"
                    placeholder="Post content"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button>Create new post</button>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className="NewPost">
        {this.getNewPostForm()}
      </div>
    )
  }
}

export default NewPost
