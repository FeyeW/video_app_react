
import request from './config'

/* axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' */
const config = {
    headers: {
        project_token: 'EFBEE5780E404E81929FBBC2BBD1650A',
        token: 'rgrhrhhj-sfsag',
        uk: 'safsafasfffs',
        channel: 'cretin_open_ap',
        app: 'Android 10',
        device: 'HUAWEI;CDY-AN00'
    }
}


//获取首页数据
export function getHome() {
    return request.post('/douyin/list', {}, config)
}


