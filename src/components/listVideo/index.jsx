import React, { useEffect, useState, Fragment } from 'react'
import './index.less'
import { getAttention } from '../../api'
import { handleTime } from '../../ulits'

export default function listVideo() {
  let [listData, setData] = useState([])

  async function getData() {
    let res = await getAttention()
    setData(res.data.itemList)
    console.log(res.data.itemList)
  }
  useEffect(() => {
    getData()
    return () => {

    };
  }, []);
  return (
    <div className='listVideo'>
      <div className="listVideo-header">
        <i className='iconfont icon-xinrenzhinan'></i>
        <h4>登陆后探索更多精彩</h4>
      </div>

      <hr />
      {
        listData.map((item, index) => {
          return (
            <Fragment key={index}>
              <div className="listVideo-top">
                <img src={item.data.content.data.author.icon} alt="" />
                <div className='listVideo-author'>
                  <p >{item.data.content.data.author.name}</p>
                  <p>{handleTime(item.data.content.data.date)}</p>
                </div>
                <i className='iconfont icon-jia-fangkuang'></i>
              </div>
              <div className="listVideo-video">
                <i className='iconfont icon-bofang'></i>
                <img src={item.data.content.data.cover.detail} alt="" />
                <p>{item.data.content.data.description}</p>
                <p></p>
              </div>
              <div className="listVideo-bottom">
                <div style={{ display: 'flex' }}>
                  <div className='bottom-icon'>#</div>
                  <p>{item.data.content.data.tags[0].name}</p></div>

                <div className='bottom-icon2'>
                  <i className='iconfont icon-dianzan'><p>{item.data.content.data.consumption.collectionCount}</p></i>
                  <i className='iconfont icon-shoucang1'><p>{item.data.content.data.consumption.realCollectionCount}</p></i>
                  <i className='iconfont icon-pinglun1'><p>{item.data.content.data.consumption.replyCount}</p></i>
                  <i style={{ position: 'absolute', right: '-1rem' }} className='iconfont icon-fenxiang1'></i>
                </div>
              </div>
              <hr />
            </Fragment>
          )
        })
      }

    </div>
  )
}
