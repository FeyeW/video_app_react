import React, { useEffect, useState, Fragment } from 'react'
import './index.less'

import { getRecommentList } from '../../../api'

export default function Recomment() {


  //开眼编辑精选
  let [recommentEye, setEye] = useState([]);
  async function funData() {
    let res = await getRecommentList()
    // setRecomment(res.data.data)

    setEye(res.data.itemList[0].data.itemList)
    console.log(res.data.itemList[0].data.itemList)
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
              <div className="main-footer">
                <div className="footer-left">
                  <img src={item.data.content.data.author.icon} alt="" />
                </div>
                <div className="footer-right">
                  <div className="top">{item.data.header.title}</div>
                  <div className="botoom">
                    {item.data.content.data.titlePgc}&nbsp;
                    #{item.data.content.data.tags[1].name}
                    <i class="iconfont icon-bofang" style={{ fontSize: '.3rem', margin: '0 .2rem' }}>
                    </i>
                    {item.data.content.data.duration}
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }

    </div>
  )
}
