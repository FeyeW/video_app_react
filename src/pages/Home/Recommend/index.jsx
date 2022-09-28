import React, { useEffect, useState, Fragment, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './index.less'

import { getRecommentList, getCardList, getVideoClass } from '../../../api'
import { getTime } from '../../../utils'

/* 
1.useRecoilState拿到值并拿来设置数据（类似useState)
2.useSetRecoilState对值进行设置，而又不进行展示
*/
import { useRecoilState, useSetRecoilState } from "recoil"
import { videoState, classState } from '../../../recoil/appState'

import ListRe from '../../../components/listRe'

export default function Recomment() {

  //v5的useHistory=》v6useNavigate
  const navigate = useNavigate()


  //开眼编辑精选
  let [recommentEye, setEye] = useState([]);
  //卡片推荐
  let [recommentCard, setCard] = useState([]);

  //拿到atom
  let setData = useSetRecoilState(videoState)
  let setClassDetails = useSetRecoilState(classState)


  //获取数据
  async function funData() {
    let resRe = await getRecommentList()
    console.log(resRe)
    setEye(resRe.data.itemList[0].data.itemList)

    let resCa = await getCardList()
    setCard(resCa.data.itemList.filter(item => {
      return item.type === 'videoSmallCard'
    }))

  }





  //点击icon播放
  let handlePlay = async (index) => {
    //获取推荐页视频的类似视频
    let res = index < 10 ? await getVideoClass(recommentEye[index].data.header.id) : await getVideoClass(recommentCard[index - 10].data.id)
    let videoData = res.data.itemList.filter((item, index) => {
      return item.type !== 'textCard' && index < 6
    })

    setClassDetails(videoData)
    setData([...recommentEye, ...recommentCard])

    //函数式路由跳转
    navigate('/details',
      {
        replace: true,
        state: {
          index: index
        }
      }
    )


  }

  //发起请求
  useEffect(() => {
    return () => {
      funData()
    };
  }, []);


  return (
    <div className='Recommend'>
      <ListRe recommentEye={recommentEye} handlePlay={handlePlay} />
      <hr />
      {
        recommentCard.map((item, index) => {
          return (
            <div className="content-card" key={index}>
              <div className="card-left">
                <img src={item.data.cover.detail} alt="" />
                <i style={{ color: '#fff' }} onClick={() => handlePlay(index + 10)} className='iconfont icon-bofang inconVideo'></i>
              </div>
              <div className="card-right">
                <div className="card-right-top">
                  {item.data.title}
                </div>
                <div className="card-right-bottom">
                  <p>#{item.data.tags[1].name}</p>
                  <p>{getTime(item.data.duration)}</p>
                </div>
              </div>
            </div>
          )
        })
      }

    </div>
  )
}
