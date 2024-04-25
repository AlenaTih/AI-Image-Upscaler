import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import Header from './components/Header.jsx'
// import Footer from './components/Footer.jsx'
import './index.css'

  function Main() {
    return (
      <div className="app">
        <App />
      </div>
    )
  }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)

// const root = ReactDOM.createRoot(document.getElementById("root"))
// root.render(<Main />)
