import './Blog.scss'
import React from 'react'

class Blog extends React.Component {
  getPosts(){
    return (
      <div className="post-container">
        {this.props.userInfo ? 
          (this.props.userInfo.admin ?
          <div><button onClick={()=>this.props.modalAction('open', 'newPost')}>
              New post
            </button></div>
          : null)
        : null}
        {this.props.posts.reverse().map((post)=>{
          return (
            <div className="post">
              <div><img src={post.image} alt="post-img"/></div>
              <div className="post-content">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <div className="Blog">
        {this.getPosts()}
      </div>
    )
  }
}
export default Blog
