
import request from './config'


export function getRecommentList() {
    return request.get('/index/tab/allRec?page=0')
}
export function getCardList() {
    return request.get('/index/tab/allRec?page=3')
}
//获取抖音授权码





