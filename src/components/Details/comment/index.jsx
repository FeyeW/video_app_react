import React, { useEffect } from 'react'
import './index.less'

export default function Comment(props) {
  const { consumption } = props
  useEffect(() => {
    return () => {

    };
  }, []);
  return (
    <div className='Comment'>
      <div className="comment-top">
        <p>最新评论</p>
        <i className='iconfont icon-liebiao2'>&nbsp;按热度</i>
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
        <input placeholder='聊一聊...' type="text" />
        <i className='iconfont icon-dianzan'>
          <p>{consumption.collectionCount}</p>

        </i>
        <i className='iconfont icon-shoucang1'>
          <p>{consumption.shareCount}</p></i>
        <i className='iconfont icon-pinglun1'>
          <p>{consumption.realCollectionCount}</p>
        </i>
      </div>
    </div>
  )
}
