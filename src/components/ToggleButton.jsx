import React, {useState} from "react"
import "./ToggleButton.css"

function ToggleButton() {

  // Make it so mode doesn't change after reload of the page. Maybe use session storage

  // const [isLightMode, setIsLightMode] = useState(true)

    const [isLightMode, setIsLightMode] = useState(false) // Makes the app light mode by default

    const toggleMode = () => {
        console.log("clicked", isLightMode)
        setIsLightMode(!isLightMode)
  
        const root = document.getElementById("root")

        const backgroundSvgHeader = document.querySelector(".background-svg-header")
        const backgroundSvgMain = document.querySelector(".background-svg-main")

        const headerContainer = document.querySelector(".header-container")
        const mainContainer = document.querySelector(".main-container")
        const authors = document.querySelector(".authors")

        const designerContainer = document.querySelector(".designer-container")
        const frontendDeveloperContainer = document.querySelector(".frontend-developer-container")
        const backgroundSvgDesigner = document.querySelector(".background-svg-designer")
        const backgroundSvgFrontend = document.querySelector(".background-svg-frontend")
  
        if (isLightMode) {
          root.classList.add("light-mode")
          root.classList.remove("dark-mode")

          headerContainer.classList.add("light-mode")
          headerContainer.classList.remove("dark-mode")

          mainContainer.classList.add("light-mode")
          mainContainer.classList.remove("dark-mode")

          backgroundSvgHeader.style.backgroundColor = "#C1C7D7"
          backgroundSvgMain.style.backgroundColor = "#C1C7D7"

          authors.style.backgroundColor = "#C1C7D7"

          designerContainer.style.backgroundColor = "whitesmoke"
          frontendDeveloperContainer.style.backgroundColor = "whitesmoke"
          backgroundSvgDesigner.style.backgroundColor = "whitesmoke"
          backgroundSvgFrontend.style.backgroundColor = "whitesmoke"

          // backgroundSvgHeader.classList.add("light-mode")
          // backgroundSvgMain.classList.remove("dark-mode")
       } else {
            root.classList.add("dark-mode")
            root.classList.remove("light-mode")

            headerContainer.classList.add("dark-mode")
            headerContainer.classList.remove("light-mode")

            mainContainer.classList.add("dark-mode")
            mainContainer.classList.remove("light-mode")

            backgroundSvgHeader.style.backgroundColor = "#2A303C"
            backgroundSvgMain.style.backgroundColor = "#2A303C"

            authors.style.backgroundColor = "#575757"

            designerContainer.style.backgroundColor = "#2A303C"
            frontendDeveloperContainer.style.backgroundColor = "#2A303C"
            backgroundSvgDesigner.style.backgroundColor = "#2A303C"
            backgroundSvgFrontend.style.backgroundColor = "#2A303C"

            // backgroundSvgHeader.classList.add("dark-mode")
            // backgroundSvgMain.classList.remove("light-mode")
       }
      }


  return (
    <div className="toggle-button-container">
      {isLightMode ?
        (<p className="toggle-text">Light</p>) 
        : (<p className="toggle-text">Dark</p>)}
      {/* <p className="toggle-text">Toggle Mode</p> */}
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
