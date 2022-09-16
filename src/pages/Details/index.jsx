import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import './index.less'
import { getVideoClass } from '../../api'
import Comment from '../../components/Details/comment'
import Introduction from '../../components/Details/Introduction'



//useRecoilValue:使用值而不需要对值进行修改
import { useRecoilValue, useSetRecoilState } from "recoil"
import { videoState } from '../../Recoil/appState'

import { useLocation } from 'react-router-dom'
import { Fragment } from 'react';

export default function Details() {
  const navigate = useNavigate()
  let getDetails = useRecoilValue(videoState)
  let setDeatails = useSetRecoilState(videoState)


  const { state: { index } } = useLocation()

  //获取元素的dom操作
  const player = useRef()

  //获取类似视频
  let [recommentCard, setCard] = useState([]);
  async function getClass() {
    let res = index < 10 ?
      await getVideoClass(getDetails[index].data.header.id) :
      await getVideoClass(getDetails[index].data.id)

    let videoData = res.data.itemList.filter((item, index) => {
      return item.type !== 'textCard' && index < 7
    })
    setCard(videoData)

    setDeatails([...getDetails, ...videoData])

  }
  //激活样式
  let [isActive, setActive] = useState(true)
  let handleActive = (value) => {
    setActive(value)
  }
  function back() {
    navigate(-1)
  }

  //播放暂停点击
  let [isPlay, setPlay] = useState(true)
  //设置显示icon
  let [isIcon, setIcon] = useState(true)
  let time = ''
  let handlePlay = (value) => {
    value == false ? player.current.play() : player.current.pause()
    setPlay(value)
    if (value == false) {
      clearTimeout(time)
      time = setTimeout(() => {
        setIcon(false)
      }, 1000);
    }
  }
  //进度条加10秒
  function handleEnter() {
    player.current.currentTime += 10
  }

  function focus() {
    setIcon(true)
    if (isPlay == false) {
      clearTimeout(time)
      time = setTimeout(() => {
        setIcon(false)
      }, 3000);
    }
  }

  useEffect(() => {
    getClass()
    return () => {

    };
  }, []);

  return (
    <div className='Details' onFocus={focus}>
      <div className='Details-header' >
        <div className="Details-top">
          <i onClick={back} className='iconfont icon-fanhui'></i>
          <div className='top-author'>
            {
              index < 10 ?
                <Fragment>
                  <img src={getDetails[index].data.content.data.author.icon} alt="" />
                  <p>{getDetails[index].data.content.data.author.name}</p>
                </Fragment> :
                <Fragment>
                  <img src={getDetails[index].data.author.icon} alt="" />
                  <p>{getDetails[index].data.author.name}</p>
                </Fragment>
            }

          </div>
          <i className='iconfont icon-jia'></i>
        </div>
        <div className='playVideo' style={{ position: 'relative' }} >
          {
            isIcon ?
              <div>
                <i className={isPlay ? 'iconfont icon-bofang' : 'iconfont icon-zanting'} onClick={() => handlePlay(!isPlay)}></i>
                <i className='iconfont icon-hanhan-011' onClick={handleEnter}></i>
              </div> : ''

          }
          <video ref={player} controls autoPlay width='100%' >
            <source src={index < 10 ? getDetails[index].data.content.data.playUrl : getDetails[index].data.playUrl}
              type="video/webm" />
          </video>
        </div>

        <div className="Details-bottom" >
          <p onClick={() => handleActive(true)} className={isActive == true ? 'deIsActive' : ''}>简介</p>
          <p onClick={() => handleActive(false)} className={isActive == true ? '' : 'deIsActive'}>评论</p>
        </div>
        <hr />
      </div>
      <Fragment>
        {
          isActive ? <Introduction
            title={index < 10 ? getDetails[index].data.content.data.title : getDetails[index].data.title}
            description={index < 10 ? getDetails[index].data.content.data.description : getDetails[index].data.description}
            consumption={index < 10 ? getDetails[index].data.content.data.consumption : getDetails[index].data.consumption}
            tags={index < 10 ? getDetails[index].data.content.data.tags : getDetails[index].data.tags}
            collected={index < 10 ? getDetails[index].data.content.data.collected : getDetails[index].data.collected}
            recommentCard={recommentCard}
          /> : <Comment consumption={index < 10 ? getDetails[index].data.content.data.consumption : getDetails[index].data.consumption} />
        }
      </Fragment>

    </div>
  )
}
