import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer} from 'react-toastify';

import WebSocketComponent from './components/Websocket.tsx';

import './style/index.css';
import './style/App.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer />
    <WebSocketComponent/>
  </React.StrictMode>,
)
