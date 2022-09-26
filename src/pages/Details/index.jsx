import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './index.less'
import { getVideoClass } from '../../api'
import Comment from '../../components/Details/comment'
import Introduction from '../../components/Details/Introduction'



//useRecoilValue:使用值而不需要对值进行修改
import { useRecoilValue, useRecoilState } from "recoil"
import { videoState, classState, clickVideoState } from '../../Recoil/appState'

import { useLocation } from 'react-router-dom'
import { Fragment } from 'react';

export default function Details() {
  const navigate = useNavigate()

  let getDetails = useRecoilValue(videoState)
  let [getClassDetails, setClassDetails] = useRecoilState(classState)
  let [getClickVideoState, setClickVideoState] = useRecoilState(clickVideoState)



  //推荐页拿过来的index
  const { state: { index } } = useLocation()

  let handleClassDetail = async (index) => {
    //获取推荐页视频的类似视频
    let res = await getVideoClass(getClassDetails[index].data.id)
    let videoData = res.data.itemList.filter((item, index) => {
      return item.type !== 'textCard' && index < 6
    })
    setClassDetails(videoData)
    //获取点击的视频详情
    setClickVideoState(getClassDetails[index])


  }

  //获取元素的dom操作
  const player = useRef()


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

    return () => {
      setClickVideoState('')
    };
  }, []);

  return (
    <div className='Details' >
      <div className='Details-header' >
        <div className="Details-top">
          <i onClick={() => { navigate(-1) }} className='iconfont icon-fanhui'></i>
          <div className='top-author'>
            {
              getClickVideoState === '' ?
                <Fragment>
                  {
                    getDetails[index].type === 'videoSmallCard' ?
                      <Fragment>
                        <img src={getDetails[index].data.author.icon} alt="" />
                        <p>{getDetails[index].data.author.name}</p>
                      </Fragment> :
                      <Fragment>
                        <img src={getDetails[index].data.content.data.author.icon} alt="" />
                        <p>{getDetails[index].data.content.data.author.name}</p>
                      </Fragment>
                  }

                </Fragment> :
                <Fragment>
                  <img src={getClickVideoState.data.author.icon} alt="" />
                  <p>{getClickVideoState.data.author.name}</p>
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
            <Fragment>
              {
                getDetails[index].type !== 'videoSmallCard' ?
                  <source onClick={focus} src={getClickVideoState === '' ? getDetails[index].data.content.data.playUrl : getClickVideoState.data.playUrl}
                    type="video/webm" /> :
                  <source onClick={focus} src={getClickVideoState === '' ? getDetails[index].data.playUrl : getClickVideoState.data.playUrl}
                    type="video/webm" />
              }
            </Fragment>

          </video>
        </div>

        <div className="Details-bottom" >
          <p onClick={() => handleActive(true)} className={isActive == true ? 'deIsActive' : ''}>简介</p>
          <p onClick={() => handleActive(false)} className={isActive == true ? '' : 'deIsActive'}>评论</p>
        </div>
        <hr />
      </div>
      {/* 先判断激活的是简介还是评论组件，再判断推荐页面的是视频列表还是卡片列表 */}
      <Fragment>
        {
          isActive ?
            <Fragment>            {
              getDetails[index].type !== 'videoSmallCard' ?
                <Fragment>
                  {
                    <Introduction
                      listData={
                        getClickVideoState === '' ? {
                          title: getDetails[index].data.content.data.title,
                          description: getDetails[index].data.content.data.description,
                          consumption: getDetails[index].data.content.data.consumption,
                          tags: getDetails[index].data.content.data.tags,
                          collected: getDetails[index].data.content.data.collected
                        } :
                          {
                            title: getClickVideoState.data.title,
                            description: getClickVideoState.data.description,
                            consumption: getClickVideoState.data.consumption,
                            tags: getClickVideoState.data.tags,
                            collected: getClickVideoState.data.collected
                          }
                      }
                      handleClassDetail={handleClassDetail}
                    />
                  }
                </Fragment>
                :
                <Fragment>
                  {
                    <Introduction
                      listData={
                        getClickVideoState === '' ? {
                          title: getDetails[index].data.title,
                          description: getDetails[index].data.description,
                          consumption: getDetails[index].data.consumption,
                          tags: getDetails[index].data.tags,
                          collected: getDetails[index].data.collected
                        } :
                          {
                            title: getClickVideoState.data.title,
                            description: getClickVideoState.data.description,
                            consumption: getClickVideoState.data.consumption,
                            tags: getClickVideoState.data.tags,
                            collected: getClickVideoState.data.collected
                          }
                      }
                      handleClassDetail={handleClassDetail}
                    />
                  }
                </Fragment>
            }</Fragment>
            : <Comment consumption={getClickVideoState === '' ? getDetails[index].data.consumption : getClickVideoState.data.consumption} />
        }


      </Fragment>


    </div>
  )
}
