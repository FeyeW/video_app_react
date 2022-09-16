import React, { useEffect, useState } from 'react'
import { getText } from '../../../api'
import './index.less'

import ListRe from '../../../components/listRe'

export default function Texts() {

  //获取标题
  let [title, setTitle] = useState('')
  let [dataList, setList] = useState([])
  let [name] = useState('Texts')
  async function getData() {
    let res = await getText()
    setTitle(res.data.itemList[0].data.text)
    setList(res.data.itemList.filter(item => {
      return item.type !== 'textCard'
    }))
    console.log(res.data.itemList.filter(item => {
      return item.type !== 'textCard'
    }))
  }
  useEffect(() => {
    getData()
    return () => {

    };
  }, []);
  return (
    <div className='Texts'>
      <h3>{title}</h3>
      <ListRe recommentEye={dataList} name={name} />
    </div>
  )
}
