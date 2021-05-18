import './Forum.scss'
import React from 'react'

class Forum extends React.Component {
  getPosts(){
    return (
      <div>
        {this.props.posts.map((post)=>{
          return (
            <div className="post">
              <div><img src={post.image} alt="post-img"/></div>
              <div>
                <h2>{post.title}</h2>
                <p>{post.postContent}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <div className="Forum">
        <h1>Posts</h1>
        {this.getPosts()}
      </div>
    )
  }
}
export default Forum
