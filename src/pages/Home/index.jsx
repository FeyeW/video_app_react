import React, { useEffect } from 'react'
import './index.less'

import { NavLink, Outlet } from 'react-router-dom';

import Footer from '../../components/Footer';

export default function Home() {

  //函数式判断NavLink是否被激活
  function getActive({ isActive }) {
    return isActive ? 'topAcitve' : ''
  }


  return (
    <div className='Home'>
      <div className="header">
        <NavLink to=""><i>qepetizer</i></NavLink>
        <NavLink className={getActive} to="recommend">推荐</NavLink>
        <NavLink className={getActive} to="attention">关注</NavLink>
        <NavLink className={getActive} to="texts">日报</NavLink>
        <NavLink to=""> <i className='iconfont icon-xiaoxi'></i></NavLink>
      </div>
      <div className='content'>
        {<Outlet />}
      </div>
      <Footer />
      <Footer />
      <Footer />
    </div >
  )
}
