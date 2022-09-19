import React, { useEffect, useState, Fragment } from 'react'
import './index.less'
import { getAttention } from '../../api'
import { handleTime } from '../../ulits'

export default function listVideo(props) {
  const { listData, name } = props
  let [isAcitive, setAcitive] = useState(false)
  function handleActive() {
    setAcitive(!isAcitive)
  }
  return (
    <div className='listVideo'>
      <hr />
      {
        listData.map((item, index) => {
          return (
            <Fragment key={index}>
              <div className="listVideo-top">
                <img src={name == 'Square' ? item.data.content.data.owner.avatar : item.data.content.data.author.icon} alt="" />
                <div className='listVideo-author'>
                  <p >{name == 'Square' ? item.data.content.data.owner.nickname : item.data.content.data.author.name}</p>
                  <p>{name == 'Square' ? handleTime(item.data.content.data.updateTime) : handleTime(item.data.content.data.date)}</p>
                </div>
                <i className='iconfont icon-jia-fangkuang'></i>
              </div>
              <div className="listVideo-video">
                <div style={{ position: 'relative' }}>
                  <i className='iconfont icon-bofang'></i>
                  <img src={item.data.content.data.cover.detail} alt="" />
                </div>
                <p className={isAcitive ? '' : 'isActive'}>{item.data.content.data.description}</p>
                <h5 onClick={handleActive}>{isAcitive ? '收起' : '展开'}</h5>
              </div>
              <div className="listVideo-bottom">
                <div style={{ display: 'flex' }}>
                  <div className='bottom-icon'>#</div>
                  <p>{name == 'Square' ? '原创' : item.data.content.data.tags[0].name}</p></div>

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
