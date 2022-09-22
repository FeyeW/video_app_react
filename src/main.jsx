import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from 'recoil';
import './index.css'


import { Spin } from 'antd';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <React.Suspense fallback={<div className="example">
        <Spin />
      </div>}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>
)
