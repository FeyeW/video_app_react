import React from 'react'
import Home from './pages/Home'
import { useEffect } from 'react'

//renderRoutes 读取路由配置转化为 Route 标签


export default function App() {

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
    <div>
      <Home></Home>
    </div>
  )
}
