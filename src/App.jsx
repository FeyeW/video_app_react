import React from 'react'
import Home from './pages/Home'
import { useEffect } from 'react'
import 'antd/dist/antd.css';
import './App.less'

//使用route
import { NavLink, useRoutes } from 'react-router-dom';
import route from '../src/route'

//renderRoutes 读取路由配置转化为 Route 标签


export default function App() {
  const routes = useRoutes(route)

  /*   useEffect(() => {
      async function funData() {
        let res = await getData()
        console.log(res)
      }
      funData()
  
      return () => {
  
      };
    }, []); */
  return (
    <div className='main'>
      <div className="bottom">
        <NavLink to="/home/recommend">首页</NavLink>
        <NavLink to="attention">关注</NavLink>
        <NavLink className="iconfont icon-jia" to="add"><i></i></NavLink>
        <NavLink to="message">消息</NavLink>
        <NavLink to="about">我的</NavLink>
      </div>
      {routes}
    </div>
  )
}
