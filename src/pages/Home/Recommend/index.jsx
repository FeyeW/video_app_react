import React, { useEffect, useState, Fragment, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './index.less'

import { getRecommentList, getCardList } from '../../../api'
import { getTime } from '../../../ulits'

/* 
1.useRecoilState拿到值并拿来设置数据（类似useState)
2.useSetRecoilState对值进行设置，而又不进行展示
*/
import { useRecoilState, useSetRecoilState } from "recoil"
import { videoState } from '../../../Recoil/appState'

export default function Recomment() {

  //获取元素的dom操作
  const player = useRef()
  //v5的useHistory=》v6useNavigate
  const navigate = useNavigate()


  //开眼编辑精选
  let [recommentEye, setEye] = useState([]);
  //卡片推荐
  let [recommentCard, setCard] = useState([]);
  //设置是否为播放时的icon
  let [Icon, setIcon] = useState(false)
  //拿到atom
  let setData = useSetRecoilState(videoState)


  //获取数据
  async function funData() {
    let resRe = await getRecommentList()
    setEye(resRe.data.itemList[0].data.itemList)
    setData(resRe.data.itemList[0].data.itemList)
    console.log(recommentEye)

    // console.log(recommentEye[0].data.content.data.playUrl)


    let resCa = await getCardList()
    setCard(resCa.data.itemList.filter(item => {
      return item.type === 'videoSmallCard'
    }))
  }



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
  //发起请求
  useEffect(() => {
    funData()
    return () => {

    };
  }, []);


  return (
    <div className='Recommend'>
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
                  <video ref={player} controls autoPlay muted width="100%" onPlay={play} onPause={pause} >
                    <source src={recommentEye[0].data.content.data.playUrl}
                      type="video/webm" />
                  </video>
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
      }
      <hr />
      {
        recommentCard.map((item, index) => {
          return (
            <div className="content-card" key={index}>
              <div className="card-left">
                <img src={item.data.cover.detail} alt="" />
                <i style={{ color: '#fff' }} onClick={() => handlePlay(index)} className='iconfont icon-bofang inconVideo'></i>
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
