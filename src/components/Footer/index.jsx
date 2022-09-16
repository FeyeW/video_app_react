import React from 'react'
import { NavLink, useRoutes } from 'react-router-dom';
import './index.less'

export default function Footer() {
  function getActive({ isActive }) {
    return isActive ? 'Active' : ''
  }
  return (
    <div className="Footer">
      <NavLink className={getActive} to="/home/recommend">首页</NavLink>
      <NavLink className={getActive} to={{ pathname: '/square' }}>广场</NavLink>
      <NavLink className={getActive} to={{ pathname: '/add' }}><i className="iconfont icon-jia"></i></NavLink>
      <NavLink className={getActive} to={{ pathname: '/find' }}>发现</NavLink>
      <NavLink className={getActive} to={{ pathname: '/about' }}>我的</NavLink>
    </div>
  )
}
