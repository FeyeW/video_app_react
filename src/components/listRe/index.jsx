import React, { useEffect, useState, Fragment, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './index.less'
import { getTime } from '../../ulits'

export default function listRe(props) {
  const { recommentEye, name } = props
  const navigate = useNavigate()

  //获取元素的dom操作
  const player = useRef()
  //设置是否为播放时的icon
  let [Icon, setIcon] = useState(false)

  //点击icon播放
  let handlePlay = (index) => {
    //函数式路由跳转
    navigate('/details',
      {
        replace: true,
        state: {
          index: index
        }
      }
    )
  }

  //监听video播放
  let play = (event) => {
    setIcon(true)
  }
  //监听video暂停
  let pause = () => {
    setIcon(false)
  }
  return (
    <div className='ListRe'>
      {
        recommentEye.map((item, index) => {
          return (
            <div
              className='content'
              key={index}
            >
              {/* 判断是否为第一个视频 */}
              {index === 0 ?
                <div >
                  {
                    name == 'Texts' ? <img src={item.data.content.data.cover.detail} /> :
                      <video ref={player} controls autoPlay muted width="100%" onPlay={play} onPause={pause} >
                        <source src={recommentEye[0].data.content.data.playUrl}
                          type="video/webm" />
                      </video>
                  }

                  {
                    Icon === true ? '' :
                      <Fragment>
                        <i onClick={() => handlePlay(index)} className='iconfont icon-bofang inconVideo'></i>
                        <div className='iconMain'><p>开眼</p><p>精选</p></div>
                      </Fragment>
                  }
                </div> :
                <div>
                  <img src={item.data.content.data.cover.detail} />
                  <i onClick={() => handlePlay(index)} className='iconfont icon-bofang inconVideo'></i>
                  <div className='iconMain'><p>开眼</p><p>精选</p></div>
                </div>

              }
              <div className="main-footer">
                <div className="footer-left">
                  <img src={item.data.content.data.author.icon} alt="" />
                </div>
                <div className="footer-right">
                  <div className="top">{item.data.header.title}</div>
                  <div className="botoom">
                    {item.data.content.data.titlePgc}&nbsp;
                    #{item.data.content.data.tags[1].name}
                    <i className="iconfont icon-bofang" style={{ fontSize: '.3rem', margin: '0 .2rem' }}>
                    </i>
                    {getTime(item.data.content.data.duration)}
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }</div>
  )
}
