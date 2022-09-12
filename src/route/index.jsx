//路由重定位
import { Navigate } from 'react-router-dom'

//Home组件和其子组件
import Home from '../pages/Home'
import Recommend from '../pages/Home/Recommend'
import Texts from '../pages/Home/Texts'
import Attention from '../pages/Home/Attention'

import Square from '../pages/Square'
import Add from '../pages/Add'
import Find from '../pages/Find'
import About from '../pages/About'



export default [
    {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: 'recommend',
                element: <Recommend />
            },
            {
                path: 'attention',
                element: <Attention />
            },
            {
                path: 'texts',
                element: <Texts />
            },
        ]
    },
    {
        path: 'square',
        element: <Square />
    },
    {
        path: 'add',
        element: <Add />
    },
    {
        path: 'find',
        element: <Find />
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

