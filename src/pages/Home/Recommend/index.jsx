import React, { useEffect, useState, Fragment } from 'react'
import './index.less'

import { getRecommentList, getCardList } from '../../../api'

export default function Recomment() {


  //开眼编辑精选
  let [recommentEye, setEye] = useState([]);
  let [recommentCard, setCard] = useState([])

  async function funData() {
    let resRe = await getRecommentList()
    setEye(resRe.data.itemList[0].data.itemList)

    let resCa = await getCardList()
    setCard(resCa.data.itemList.filter((item) => {
      if (item.type === 'videoSmallCard') {
        return item
      }
    }))
    console.log(recommentCard)
  }
  //发起请求
  useEffect(() => {

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
              <img src={item.data.content.data.cover.detail} />
              <i className='iconfont icon-bofang inconVideo'></i>
              <div className='iconMain'><p>开眼</p><p>精选</p></div>
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
                    {item.data.content.data.duration}
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
              </div>
              <div className="card-right">
                <div className="card-right-top">
                  {item.data.title}
                </div>
                <div className="card-right-bottom">
                  <p>#{item.data.tags[1].name}</p>
                  <p>{item.data.duration}</p>
                </div>
              </div>
            </div>
          )
        })
      }

    </div>
  )
}
