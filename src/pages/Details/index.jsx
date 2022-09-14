import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import './index.less'

import Comment from '../../components/Details/comment'
import Introduction from '../../components/Details/Introduction'

//useRecoilValue:使用值而不需要对值进行修改
import { useRecoilValue } from "recoil"
import { videoState } from '../../Recoil/appState'

import { useLocation } from 'react-router-dom'

export default function Details() {
  let getDetails = useRecoilValue(videoState)
  let [isActive, setActive] = useState(true)
  const { state: { index } } = useLocation()

  let handleActive = (value) => {
    console.log(value)
    setActive(value)
  }

  useEffect(() => {
    console.log(getDetails[index])
    console.log(index)
    return () => {

    };
  }, []);

  return (
    <div className='Details'>
      <div className="Details-top">
        <i className='iconfont icon-fanhui'></i>
        <div className='top-author'>
          <img src={getDetails[index].data.content.data.author.icon} alt="" />
          <p>{getDetails[index].data.content.data.author.name}</p>
        </div>
        <i className='iconfont icon-jia'></i>
      </div>
      {<video controls autoPlay width='100%'>
        <source src={getDetails[index].data.content.data.playUrl}
          type="video/webm" />
      </video>}
      {/*  <ReactPlayer controls autoPlay url={getDetails[index].data.content.data.playUrl} width='100%' height='200' /> */}
      <div className="Details-bottom">
        <p onClick={() => handleActive(true)} className={isActive == true ? 'deIsActive' : ''}>简介</p>
        <p onClick={() => handleActive(false)} className={isActive == true ? '' : 'deIsActive'}>评论</p>
        <Introduction
          title={getDetails[index].data.content.data.title}
          description={getDetails[index].data.content.data.description}
          consumption={getDetails[index].data.content.data.consumption}
          tags={getDetails[index].data.content.data.tags}
          collected={getDetails[index].data.content.data.collected}
        />
      </div>
    </div>
  )
}
