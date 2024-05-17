import React from 'react'
import ReactDOM from 'react-dom/client'
// import { Helmet } from "react-helmet"
import App from './App.jsx'
import './index.css'

  function Main() {
    return (
      // <>
      //   <Helmet>
      //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      //   </Helmet>
        <div className="app">
          <App />
        </div>
      // </>
    )
  }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)

// const root = ReactDOM.createRoot(document.getElementById("root"))
// root.render(<Main />)
