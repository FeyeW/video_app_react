import React, { Fragment, useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './index.less'

import { getHotTexts } from '../../api'

export default function Search() {
  const navigate = useNavigate()
  let [hotTexts, setHot] = useState([])


  async function getData() {
    let res = await getHotTexts()
    setHot(res.data)
  }

  let [isIcon, setIcon] = useState(false)
  function focus() {
    setIcon(true)
  }
  function blur() {
    setIcon(false)
  }

  useEffect(() => {
    getData()

    return () => {
    };
  },);
  return (
    <div className='Search'>
      <div className="search-header">
        {
          isIcon ? '' : <i className='iconfont icon-sousuo'></i>
        }

        <input autoFocus className={isIcon ? 'isIcon' : ''} onFocus={focus} onBlur={blur} type="text" placeholder='搜索视频，作者，用户及标签' />
        <p onClick={() => { navigate(-1) }}>取消</p>
      </div>
      <div className="search-content">
        <h4>推荐搜索</h4>
        <ul>
          {
            hotTexts.map((item, index) => {
              return (
                <Fragment key={index}>
                  <li>{item}</li>
                </Fragment>
              )
            })
          }

        </ul>
      </div>
    </div>
  )
}
