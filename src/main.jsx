import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

console.log("React is starting..."); // This will show in browser console

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)