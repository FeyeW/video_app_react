import React, { useEffect } from 'react'
import './index.less'

export default function Comment(props) {
  const { title, description, consumption, collected,tags } = props

  useEffect(() => {
    // console.log(title)
    return () => {

    };
  }, []);
  return (
    <div className='Comment'>
      <h4></h4>
      <div className="comment-top">
        <p></p>
        <i></i>
      </div>
      <div className="comment-users">
        <div className="user-left"></div>
        <div className="user-right">
          <p></p>
          <p></p>
        </div>
        <div className="user-like">
          <i></i>
        </div>
      </div>
      <div className="comment-bottom">
        <input type="text" />
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  )
}
