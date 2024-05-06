import React, {useState} from "react"
import "./ToggleButton.css"

function ToggleButton() {

  // const [isLightMode, setIsLightMode] = useState(true)

    const [isLightMode, setIsLightMode] = useState(false) // Makes the app light mode by default

    const toggleMode = () => {
        console.log("clicked", isLightMode)
        setIsLightMode(!isLightMode)
  
        const root = document.getElementById("root")
        // const root = document.querySelector(".container")
  
        if (isLightMode) {
          root.classList.add("light-mode")
          root.classList.remove("dark-mode")

          // document.querySelector(".dropzone-container").style.backgroundColor = "#F5F5F7"
          // document.querySelector(".dropzone").style.backgroundColor = "#F5F5F7"
       } else {
            root.classList.add("dark-mode")
            root.classList.remove("light-mode")
       }
      }


  return (
    <div className="toggle-button-container">
      <p className="toggle-text">Toggle Mode</p>
      <label className="toggle">
        <input type="checkbox" 
          onChange={toggleMode}
        />
        <span className="slider">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
            {/* <path fill="none" d="m4 16.5 8 8 16-16"></path> */}
          </svg>
        </span>
      </label>
    </div>
  )
}

export default ToggleButton

// https://cssnippets.shefali.dev/toggle
