import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import Header from './components/Header.jsx'
// import Footer from './components/Footer.jsx'
import './index.css'

function Main() {
    const [isLightMode, setIsLightMode] = useState(true)
  
    const toggleMode = () => {
      console.log("clicked", isLightMode)
      setIsLightMode(!isLightMode)

      const root = document.getElementById("root")

      if (isLightMode) {
        root.classList.add("light-mode")
        root.classList.remove("dark-mode")
     } else {
          root.classList.add("dark-mode")
          root.classList.remove("light-mode")
     }
    }
  
    return (
      <div className="app">
        <h1>Image Upscaler</h1>
        <button className="toggle-button" onClick={toggleMode}>Toggle Mode</button>
        
        <App isLightMode={isLightMode} toggleMode={toggleMode}/>
      </div>
    )
  }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)

// const root = ReactDOM.createRoot(document.getElementById("root"))
// root.render(<Main />)

// className={`app ${isLightMode ? 'light-mode' : 'dark-mode'}`}
