import React, { Fragment, useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './index.less'

import { getHotTexts, getSearch } from '../../api'

export default function Search() {
  const navigate = useNavigate()
  const videoContent = useRef()

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

  let [filterCard, setCard] = useState([])
  let time = ''
  function change() {
    clearTimeout(time)
    console.log(videoContent.current.value)
    if (videoContent.current.value !== '') {
      time = setTimeout(async () => {
        let res = await getSearch(videoContent.current.value)
        setCard(res.data.itemList.filter((item) => {
          return item.type == 'followCard'
        }))
        console.log(res.data.itemList.filter((item) => {
          return item.type == 'followCard'
        }))
      }, 800)
    }


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
        <input onChange={change} ref={videoContent} autoFocus className={isIcon ? 'isIcon' : ''} onFocus={focus} onBlur={blur} type="text" placeholder='搜索视频，作者，用户及标签' />
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
      <div className="search-text">
        {
          filterCard.map((item, index) => {
            return (
              <Fragment key={index}>
                <p>{item.data.content.data.title}</p>
              </Fragment>
            )

          })
        }
      </div>
    </div>
  )
}
