import React, { useEffect, useState, Fragment } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import './index.less'

import { getSquare } from '../../api'
import Footer from '../../components/Footer'
import ListVideo from '../../components/listVideo';


import { Carousel } from 'antd';



export default function Square() {


  let [bannerImg, setBanner] = useState([])
  let [cardImg, setCard] = useState([])
  let [reImg, setRe] = useState([])

  async function getData() {
    let res = await getSquare()
    setBanner(res.data.itemList[0].data.itemList)
    setCard(res.data.itemList.filter((item, index) => {
      return item.type == 'pictureFollowCard' && index < 5
    }))
    setRe(res.data.itemList.filter((item, index) => {
      return item.type == 'pictureFollowCard' && index > 6
    }))
    console.log(res.data.itemList.filter((item, index) => {
      return item.type == 'pictureFollowCard' && index > 6
    }))
  }
  useEffect(() => {
    getData()
    return () => {

    };
  }, []);
  return (
    <div className='Square'>
      <div className="Square-header">
        <NavLink to={{ pathname: '/search' }}><i className='iconfont icon-sousuo'></i></NavLink>
        <p>eqepetizer</p>
        <NavLink to=""> <i className='iconfont icon-xiaoxi'></i></NavLink>
      </div>

      <div className='Square-banner'>
        <Carousel autoplay dots={false}>
          {
            bannerImg.map((item, index) => {
              return (
                <Fragment key={index}>
                  <img src={item.data.image} alt="" />
                </Fragment>

              )
            })
          }
        </Carousel>
        <div className='banner-node'>
          <p>了解详情&nbsp;&nbsp;
            <i className='iconfont icon-xiangyou3'></i>
          </p>
          <i className='iconfont icon-1zhanshigouwu'></i>
        </div>
      </div>
      <hr />
      <div className="Square-card">
        {
          cardImg.map((item, index) => {
            return (
              <div key={index}>
                <img src={item.data.content.data.url} alt="" />
                <h5>{item.data.content.data.description}</h5>
                <div className='card-user'>
                  <div className="user-name">
                    <img src={item.data.content.data.owner.avatar} alt="" />
                    <p>{item.data.content.data.owner.nickname}</p>
                  </div>
                  <i className='iconfont icon-dianzan'></i>
                </div>
              </div>
            )
          })
        }
      </div>

      <ListVideo listData={reImg} name="Square" />
      <Footer />
    </div>
  )
}
