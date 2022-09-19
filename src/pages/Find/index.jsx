import React, { Fragment, useEffect, useState } from 'react'
import './index.less'

import { getClass } from '../../api'
import Footer from '../../components/Footer'


export default function Find() {
  let [tabList, setTab] = useState([])
  let iconList = [
    {
      icon: 'icon-zhongdianguanggaowei'
    },
    { icon: 'icon-shenghuofuwu' },
    { icon: 'icon-donghua' },
    { icon: 'icon-gaoxiaoquwei' },
    { icon: 'icon-meishi' },
    { icon: 'icon-chuangyi' },
    { icon: 'icon-yundonghuwaileimufill' },
    { icon: 'icon-yinle' },
    { icon: 'icon-chongwu' },
    { icon: 'icon-24gf-theater' },
    { icon: 'icon-kejifuwu' },
    { icon: 'icon-feiji' },
    { icon: 'icon-xiaoshipinyingshi48' },
    { icon: 'icon-jilu' },
    { icon: 'icon-wangyou' },
    { icon: 'icon-taiwangdahui-zongyibangdianjitai' },
    { icon: 'icon-shishang' },
    { icon: 'icon-hebing' },

  ]

  async function getdata() {
    let res = await getClass()
    let dataList = res.data.tabInfo.tabList.filter((item, index) => {
      return index > 3
    })
    setTab(dataList.map((item, index) => {
      return { ...item, ...iconList[index] }
    }))
    let List = new Map()
    console.log(dataList.map((item, index) => {
      return { ...item, ...iconList[index] }
    }))
  }

  useEffect(() => {
    getdata()
    return () => {

    };
  }, []);
  return (
    <div className='Find'>
      <div className="Find-header">
        <input type="text" placeholder='搜索视频，作者，用户及标签' />
        <i className='iconfont icon-xiaoxi'></i>
      </div>
      <div className="Find-class">
        <h3>分类</h3>
        <ul>
          {
            tabList.map((item, index) => {
              return (
                <div className='class-content' key={index}>
                  <i className={'iconfont ' + item.icon}></i>
                  <li>{item.name}</li>
                </div>

              )

            })
          }
        </ul>
      </div>
      <Footer />
    </div>
  )
}
