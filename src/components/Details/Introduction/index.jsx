import React, { useEffect } from 'react'
import './index.less'

import VideoRe from '../videoRe'

export default function Introduction(props) {
  const { title, description, consumption, collected, tags } = props

  let number = parseInt(Math.random() * 10 - 1)
  //  console.log(tags[number - 1].name)

  return (
    <div className="Introduction">
      <div className='introduction-text'>
        <h4>{title}</h4>
        <p className='introduction-tags'>#{tags[number].name} #{tags[number - 1].name}</p>
        <p className='introduction-text'>{description}</p>
      </div>
      <div className='introduction-icon'>
        <div>
          <i className='iconfont icon-dianzan'></i>
          <p>{consumption.collectionCount}</p>
        </div>
        <div>
          <i className='iconfont icon-shoucang1'></i>
          <p>收藏</p>
        </div>
        <div>
          <i className='iconfont icon-pinglun1'></i>
          <p>{consumption.realCollectionCount}</p>
        </div>
        <div>
          <i className='iconfont icon-xiazai'></i>
          <p>缓存</p>
        </div>
        <div>
          <i className='iconfont icon-fenxiang'></i>
          <p>{consumption.replyCount}</p>
        </div>
      </div>
      <hr />
      <div className="introduction-extend">
        <VideoRe />
      </div>
    </div>
  )
}
