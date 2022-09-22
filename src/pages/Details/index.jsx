import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import './index.less'
import { getVideoClass } from '../../api'
import Comment from '../../components/Details/comment'
import Introduction from '../../components/Details/Introduction'



//useRecoilValue:使用值而不需要对值进行修改
import { useRecoilValue, useRecoilState } from "recoil"
import { videoState, classState, classIndexState } from '../../Recoil/appState'

import { useLocation } from 'react-router-dom'
import { Fragment } from 'react';

export default function Details() {
  const navigate = useNavigate()

  let getDetails = useRecoilValue(videoState)
  let [getClassDetails, setClassDetails] = useRecoilState(classState)

  //推荐页拿过来的index
  const { state: { index } } = useLocation()
  //类似页拿过来的id（子传父）
  let [classIndex, setClassIndex] = useState('')

  let handleClassDetail = async (index) => {
    setClassIndex(index)
    //获取推荐页视频的类似视频
    let res = await getVideoClass(getClassDetails[index].data.id)
    let videoData = res.data.itemList.filter((item, index) => {
      return item.type !== 'textCard' && index < 6
    })
    setClassDetails(videoData)

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

    };
  }, []);

  return (
    <div className='Details' >
      <div className='Details-header' >
        <div className="Details-top">
          <i onClick={() => { navigate(-1) }} className='iconfont icon-fanhui'></i>
          <div className='top-author'>
            {
              classIndex === '' ?
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
                  <img src={getClassDetails[classIndex].data.author.icon} alt="" />
                  <p>{getClassDetails[classIndex].data.author.name}</p>
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
                  <source onClick={focus} src={classIndex === '' ? getDetails[index].data.content.data.playUrl : getClassDetails[classIndex].data.playUrl}
                    type="video/webm" /> :
                  <source onClick={focus} src={classIndex === '' ? getDetails[index].data.playUrl : getClassDetails[classIndex].data.playUrl}
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
      <Fragment>
        {
          getDetails[index].type !== 'videoSmallCard' ?
            <Fragment>
              {
                isActive ?
                  <Introduction
                    title={
                      classIndex === '' ? getDetails[index].data.content.data.title : getClassDetails[classIndex].data.title
                    }
                    description={classIndex === '' ? getDetails[index].data.content.data.description : getClassDetails[classIndex].data.description}
                    consumption={classIndex === '' ? getDetails[index].data.content.data.consumption : getClassDetails[classIndex].data.consumption}
                    tags={classIndex === '' ? getDetails[index].data.content.data.tags : getClassDetails[classIndex].data.tags}
                    collected={classIndex === '' ? getDetails[index].data.content.data.collected : getClassDetails[classIndex].data.collected}
                    handleClassDetail={handleClassDetail}
                  />

                  :
                  <Comment consumption={classIndex === '' ? getDetails[index].data.content.data.consumption : getClassDetails[classIndex].data.consumption} />
              }
            </Fragment>
            :
            <Fragment>
              {
                isActive ?
                  <Introduction
                    title={
                      classIndex === '' ? getDetails[index].data.title : getClassDetails[classIndex].data.title
                    }
                    description={classIndex === '' ? getDetails[index].data.description : getClassDetails[classIndex].data.description}
                    consumption={classIndex === '' ? getDetails[index].data.consumption : getClassDetails[classIndex].data.consumption}
                    tags={classIndex === '' ? getDetails[index].data.tags : getClassDetails[classIndex].data.tags}
                    collected={classIndex === '' ? getDetails[index].data.collected : getClassDetails[classIndex].data.collected}
                    handleClassDetail={handleClassDetail}
                  />

                  :
                  <Comment consumption={classIndex === '' ? getDetails[index].data.consumption : getClassDetails[classIndex].data.consumption} />
              }
            </Fragment>
        }

      </Fragment>


    </div>
  )
}
