
import request from './config'

//获取推荐视频信息
export function getRecommentList() {
    return request.get('/v5/index/tab/allRec?page=0')
}
//获取卡片视频信息
export function getCardList() {
    return request.get('/v5/index/tab/allRec?page=3')
}
//根据id获取分类视频接口
export function getVideoClass(videoId) {
    return request.get(`/v4/video/related?id=${videoId}`)
}





