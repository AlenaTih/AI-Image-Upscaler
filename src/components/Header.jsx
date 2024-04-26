import React, {useState} from "react"

function Header() {

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
        <>
            <h2>Image Upscaler</h2>

            <div className="navbar">

                <h3>Upscaler</h3>
                <a href="#how-it-works"><h3>How It Works</h3></a>
                <a href="#authors"><h3>Authors</h3></a>

                <button className="toggle-button" onClick={toggleMode}>Toggle Mode</button>

            </div>
        </>
    )
}

export default Header
