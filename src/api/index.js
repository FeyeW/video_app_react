
import request from './config'


export function getRecommentList() {
    return request.get('/index/tab/allRec?page=0')
}

//获取抖音授权码





