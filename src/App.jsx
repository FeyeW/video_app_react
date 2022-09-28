import React from 'react'
import Home from './pages/Home'
import { useEffect } from 'react'
import 'antd/dist/antd.css';
import './App.less'

//使用route
import { NavLink, useRoutes } from 'react-router-dom';
import route from '../src/route'


export default React.memo(function App() {

  const routes = useRoutes(route)

  return (
    <div className='App'>
      {routes}
    </div>
  )
}
)
