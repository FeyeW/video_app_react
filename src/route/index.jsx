//路由重定位
import { Navigate } from 'react-router-dom'

//Home组件和其子组件
import Home from '../pages/Home'
import Recommend from '../pages/Home/Recommend'
import News from '../pages/Home/News'
import Picture from '../pages/Home/Picture'
import Texts from '../pages/Home/Texts'


import Attention from '../pages/Attention'
import Add from '../pages/Add'
import Message from '../pages/Message'
import About from '../pages/About'



export default [
    {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: 'news',
                element: <News />
            },
            {
                path: 'picture',
                element: <Picture />
            },
            {
                path: 'texts',
                element: <Texts />
            },
            {
                path: 'recommend',
                element: <Recommend />
            }
        ]
    },
    {
        path: 'attention',
        element: <Attention />
    },
    {
        path: 'add',
        element: <Add />
    },
    {
        path: 'message',
        element: <Message />
    },
    {
        path: 'about',
        element: <About />
    },

    {
        path: '/',
        element: <Navigate to="/home/recommend"></Navigate>
    }
]

