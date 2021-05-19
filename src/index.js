import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './App.scss'
import { BrowserRouter } from 'react-router-dom'

const App = lazy(() => import('./App'))

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="spinner">
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>
        }
      >
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
  
)
