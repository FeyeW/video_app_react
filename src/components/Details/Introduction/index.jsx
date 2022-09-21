import React, { Fragment, useEffect, useState } from 'react'
import './index.less'

import VideoRe from './videoRe'

export default function Introduction(props) {

  let { title, description, consumption, tags, handleClassDetail } = props

  let [iconShow, setShow] = useState(false)
  function handleHidden(value) {
    setShow(value)
  }
  useEffect(() => {

    return () => {

    };
  },);
  return (
    <div className="Introduction">
      <div className='introduction-text'>
        <h4>{title}</h4>
        {tags[1].name !== '' ?
          <p className='introduction-tags'>#{tags[0].name} #{tags[1].name}</p>
          : ''
        }
        <div>
          <p className={iconShow == false ? 'introduction-text isShow' : 'introduction-text'}>{description}
          </p>
          {
            description.length > 95 ?
              <div className={iconShow == false ? 'showIcon up' : 'showIcon down'}>
                <i onClick={() => handleHidden(!iconShow)}
                  className='iconfont icon-xiangxia'></i>
              </div> : ''
          }
        </div>

        <div className={iconShow == false ? 'showHidden ' : 'showHidden hidden'} style={{ height: '1rem' }}></div>
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
        <VideoRe handleClassDetail={handleClassDetail} />
      </div>
    </div>
  )
}
