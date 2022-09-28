import React, { useEffect, useState, Fragment } from 'react'
import './index.less'
import { getAttention } from '../../../api'
import ListVideo from '../../../components/listVideo'

export default function Attention() {
  let [listData, setData] = useState([])

  async function getData() {
    let res = await getAttention()
    setData(res.data.itemList)
  }
  useEffect(() => {
    getData()
    return () => {

    };
  }, []);
  return (

    <div className='Attention'>
      <div className="listVideo-header">
        <i className='iconfont icon-xinrenzhinan'></i>
        <h4>登陆后探索更多精彩</h4>
      </div>
      <ListVideo listData={listData} />
    </div>
  )
}
