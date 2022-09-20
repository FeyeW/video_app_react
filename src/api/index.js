
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
//获取关注的内容
export function getAttention() {
    return request.get('/v5/community/tab/follow')
}
//获取日报的内容
export function getText() {
    return request.get('/v5/index/tab/feed')
}
//获取广场的内容
export function getSquare() {
    return request.get('/v5/index/tab/ugcSelected')
}

//获取分类
export function getClass() {
    return request.get(`/v5/index/tab/list`)
}
//获取搜索关键词
export function getHotTexts()
{
    return request.get(`/v3/queries/hot`)
}




