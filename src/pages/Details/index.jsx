import React from 'react'

import Comment from '../../components/Details/comment'
import Introduction from '../../components/Details/Introduction'

export default function Details() {
  return (
    <div className='main'>
      <div className="main-top">
        <div className="top"></div>
        <video src=""></video>
        <div className="bottom">
          <Comment />
          <Introduction />
        </div>
      </div>
    </div>
  )
}
