import React, { lazy, Suspense } from 'react';
//路由重定位
import { Navigate } from 'react-router-dom'

//Home组件和其子组件
const Home = lazy(() => import('../pages/Home'))
const Recommend = lazy(() => import('../pages/Home/Recommend'))
import Texts from '../pages/Home/Texts'
import Attention from '../pages/Home/Attention'

import Square from '../pages/Square'
import Add from '../pages/Add'
import Find from '../pages/Find'
import About from '../pages/About'

import Details from '../pages/Details'
import Search from '../../src/components/Search'




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
        path: 'details',
        element: <Details />,
    },
    {
        path: 'search',
        element: <Search />
    },

    {
        path: '/',
        element: <Navigate to="/home/recommend"></Navigate>
    }
]

