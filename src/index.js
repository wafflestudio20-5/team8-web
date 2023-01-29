import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {
  CourseDataProvider,
  UserDataProvider,
  ClassDataProvider,
} from './Context'
import { StateDataProvider } from './StateContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <StateDataProvider>
      <CourseDataProvider>
        <ClassDataProvider>
          <UserDataProvider>
            <App />
          </UserDataProvider>
        </ClassDataProvider>
      </CourseDataProvider>
    </StateDataProvider>
  </React.StrictMode>,
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals()
