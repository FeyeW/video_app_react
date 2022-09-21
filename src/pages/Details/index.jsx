import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import './index.less'
import { getVideoClass } from '../../api'
import Comment from '../../components/Details/comment'
import Introduction from '../../components/Details/Introduction'



//useRecoilValue:使用值而不需要对值进行修改
import { useRecoilValue, useRecoilState } from "recoil"
import { videoState, classState } from '../../Recoil/appState'

import { useLocation } from 'react-router-dom'
import { Fragment } from 'react';

export default function Details() {
  const navigate = useNavigate()

  let getDetails = useRecoilValue(videoState)
  let [getClassDetails, setClassDetails] = useRecoilState(classState)

  //推荐页拿过来的index
  const { state: { index } } = useLocation()
  //类似页拿过来的id（子传父）
  let handleClassDetail = (index) => {
    console.log(index)
  }

  //获取元素的dom操作
  const player = useRef()

  //获取类似视频
  async function getClass() {
    let res = await getVideoClass(getDetails[index].data.header.id)
    console.log(res.data.itemList)
    let videoData = res.data.itemList.filter((item, index) => {
      return item.type !== 'textCard' && index < 7
    })

    setClassDetails(videoData)
    console.log(getClassDetails)

  }

  //激活样式
  let [isActive, setActive] = useState(true)
  let handleActive = (value) => {
    setActive(value)
  }



  //播放暂停点击
  let [isPlay, setPlay] = useState(false)
  //设置显示icon
  let [isIcon, setIcon] = useState(false)

  let time = ''

  let handlePlay = (value) => {
    !value ? player.current.play() : player.current.pause()
    if (!value && isIcon) {
      clearTimeout(time)
      time = setTimeout(() => {
        setIcon(false)
      }, 3000);
    }
    setPlay(value)
  }
  //进度条加10秒
  function handleEnter() {
    player.current.currentTime += 10
    if (!isPlay && isIcon) {
      clearTimeout(time)
      time = setTimeout(() => {
        setIcon(false)
      }, 3000);
    }
  }

  function handleClick() {
    setIcon(true)
    console.log(isPlay)
  }



  useEffect(() => {
    getClass()
    return () => {

    };
  }, []);

  return (
    <div className='Details' >
      <div className='Details-header' >
        <div className="Details-top">
          <i onClick={() => { navigate(-1) }} className='iconfont icon-fanhui'></i>
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
          <div onClick={handleClick} className='videoMask'>
            {
              isIcon ?
                <div>
                  <i className={isPlay ? 'iconfont icon-bofang' : 'iconfont icon-zanting'} onClick={() => handlePlay(!isPlay)}></i>
                  <i className='iconfont icon-hanhan-011' onClick={handleEnter}></i>
                </div> : ''

            }
          </div>
          <video ref={player} controls autoPlay width='100%' loop>
            <source onClick={focus} src={index < 10 ? getDetails[index].data.content.data.playUrl : getDetails[index].data.playUrl}
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
            handleClassDetail={handleClassDetail}
          /> : <Comment consumption={index < 10 ? getDetails[index].data.content.data.consumption : getDetails[index].data.consumption} />
        }
      </Fragment>

    </div>
  )
}
