import React, { useEffect, useState, Fragment } from 'react'
import { getVideoClass } from '../../../api/index'

export default function videoRe() {

  let [videoClass, setvideoClass] = useState('tom')


  async function getClass() {
    let res = await getVideoClass(312955)
    let videoData = res.data.itemList.filter((item, index) => {
      return item.type !== 'textCard' && index < 7
    })
    setvideoClass('123')
    console.log(videoData)


  }
  useEffect(() => {
    getClass()
    console.log(videoClass)
    return () => {

    };
  }, []);
  return (
    <div className='videoRe'>
      {
        <Fragment >
          <div className="videoRe-header">
            <div className="header-left"></div>
            <div className="header-right"></div>
          </div>
          <div className="video-content">
            <img src="" alt="" />
            <i></i>
          </div>
        </Fragment>
      }

    </div>
  )
}
