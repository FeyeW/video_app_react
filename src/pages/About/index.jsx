import React from 'react'

import './index.less'
import Footer from '../../components/Footer'

import { Empty } from 'antd';

export default function About() {
  return (
    <div className='About'>
      <div className="about-header">
        <img src="https://tuchuangs.com/imgs/2022/09/22/4904f3d712343bc0.jpeg" alt="" />
        <i className='iconfont icon-shezhi'></i>
      </div>
      <div>

      </div>
      <div className="about-user">
        <img src="https://tuchuangs.com/imgs/2022/09/22/c91cc62a9b2bed77.webp" alt="" />
        <div className="user-name">
          <h3>开眼用户</h3>
          <i className='iconfont icon-bianji'></i>
        </div>
        <p className='user-guide'>去编辑资料完善个人简介吧</p>
        <div className="user-content">
          <div >0<h5>粉丝</h5></div>
          <div >0<h5>关注</h5></div>
          <div >0<h5>徽章</h5></div>
        </div>
        <div className="user-add">
          IP属地:<h5>青青草原</h5>
        </div>

      </div>

      <div className="about-content">
        <div className="content-header">
          <button>缓存<div></div></button>
          <button>收藏<div></div></button>
          <button>观看记录</button>
        </div>
        <div className="content-middle">
        <Empty />
        </div>
      </div>
      <Footer />
    </div>
  )
}
