import M from 'materialize-css'
import '../Parallax/Parallax.scss'
import './Blog.scss'
import React from 'react'

class Blog extends React.Component {
  componentDidMount() {
    let elements = document.querySelectorAll('.parallax')
    M.Parallax.init(elements)
  }
  getPosts() {
    return (
      <div className="post-container">
        {this.props.userInfo ? (
          this.props.userInfo.admin ? (
            <div>
              <button
                onClick={() => this.props.modalAction('open', 'new-post')}
              >
                New post
              </button>
            </div>
          ) : null
        ) : null}
        {this.props.posts.reverse().map((post) => {
          return (
            <div className="Parallax">
              <div className="container">
                <div className="parallax-container">
                  <div className="parallax">
                    <img
                      src="https://i.ibb.co/XJrHCWR/Parallax5.jpg"
                      alt="background-img"
                    />
                  </div>
                  <div className="section white">
                    <div className="post">
                      <div>
                        <img src={post.image} alt="post-img" />
                      </div>
                      <div className="post-content">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    return <div className="Blog">{this.getPosts()}</div>
  }
}
export default Blog
