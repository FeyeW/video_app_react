import React, { useEffect, useState, Fragment, useRef } from 'react'
import ReactDOM from "react-dom"
import './index.less'

import { getRecommentList, getCardList } from '../../../api'


export default function Recomment() {

  const player = useRef()


  //开眼编辑精选
  let [recommentEye, setEye] = useState([]);
  //卡片推荐
  let [recommentCard, setCard] = useState([]);
  //设置是否为播放时的icon
  let [Icon, setIcon] = useState(false)

  //获取数据
  async function funData() {
    let resRe = await getRecommentList()
    setEye(resRe.data.itemList[0].data.itemList)

    let resCa = await getCardList()
    setCard(resCa.data.itemList.filter(item => {
      return item.type === 'videoSmallCard'
    }))
  }

  //计算播放时长
  let getTime = (time) => {
    let min = parseInt(time / 60) > 10 ? parseInt(time / 60) : '0' + parseInt(time / 60)
    let se = time - (parseInt(time / 60) * 60) > 10 ? (time - parseInt(time / 60) * 60) : '0' + (time - parseInt(time / 60) * 60)
    return min + ':' + se
  }

  //点击icon播放
  let handlePlay = () => {
    // player.current.play()
    setIcon(true)
  }
  //监听video播放
  let play = (event) => {
    setIcon(true)
  }
  let pause = () => {
    setIcon(false)
  }
  //发起请求
  useEffect(() => {
    // handlePlay()
    funData()
    return () => {

    };
  }, []);


  return (
    <div className='main'>
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
                  <video ref={player} controls autoPlay muted width="345" onPlay={play} onPause={pause}>
                    <source src="http://baobab.kaiyanapp.com/api/v1/playUrl?vid=313543&resourceType=video&editionType=default&source=aliyun&playUrlType=url_oss&udid=&f=iphone&u=&vc=0"
                      type="video/webm" />
                  </video>
                  {
                    Icon == true ? '' :
                      <Fragment>
                        <i onClick={handlePlay} className='iconfont icon-bofang inconVideo'></i>
                        <div className='iconMain'><p>开眼</p><p>精选</p></div>
                      </Fragment>
                  }
                </div> :
                <div>
                  <img src={item.data.content.data.cover.detail} />
                  <i className='iconfont icon-bofang inconVideo'></i>
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
      }
      <hr />
      {
        recommentCard.map((item, index) => {
          return (
            <div className="content-card" key={index}>
              <div className="card-left">
                <img src={item.data.cover.detail} alt="" />
                <i className='iconfont icon-bofang inconVideo'></i>
              </div>
              <div className="card-right">
                <div className="card-right-top">
                  {item.data.title}
                </div>
                <div className="card-right-bottom">
                  <p>#{item.data.tags[1].name}</p>
                  <p>{getTime(item.data.duration)}</p>
                </div>
              </div>
            </div>
          )
        })
      }

    </div>
  )
}
