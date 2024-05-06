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

        const headerContainer = document.querySelector(".header-container")
        const mainContainer = document.querySelector(".main-container")
        const authors = document.querySelector(".authors")
  
        if (isLightMode) {
          root.classList.add("light-mode")
          root.classList.remove("dark-mode")

          headerContainer.classList.add("light-mode")
          headerContainer.classList.remove("dark-mode")

          mainContainer.classList.add("light-mode")
          mainContainer.classList.remove("dark-mode")

          authors.style.backgroundColor = "#C1C7D7"
       } else {
            root.classList.add("dark-mode")
            root.classList.remove("light-mode")

            headerContainer.classList.add("dark-mode")
            headerContainer.classList.remove("light-mode")

            mainContainer.classList.add("dark-mode")
            mainContainer.classList.remove("light-mode")

            authors.style.backgroundColor = "#575757"
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
