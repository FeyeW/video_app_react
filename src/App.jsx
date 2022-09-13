import React from 'react'
import Home from './pages/Home'
import { useEffect } from 'react'
import 'antd/dist/antd.css';
import './App.less'

//使用route
import { NavLink, useRoutes } from 'react-router-dom';
import route from '../src/route'


export default function App() {

  const routes = useRoutes(route)

  function getActive({ isActive }) {
    return isActive ? 'Active' : ''
  }


  return (
    <div className='main'>
      <div className="bottom">
        <NavLink className={getActive} to="">首页</NavLink>
        <NavLink className={getActive} to="square">广场</NavLink>
        <NavLink className={getActive} to="add"><i className="iconfont icon-jia"></i></NavLink>
        <NavLink className={getActive} to="find">发现</NavLink>
        <NavLink className={getActive} to="about">我的</NavLink>
      </div>
      {routes}
    </div>
  )
}
