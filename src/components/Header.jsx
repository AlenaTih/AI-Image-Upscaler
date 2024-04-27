import React from "react"
import ToggleButton from "./ToggleButton.jsx"

function Header() {

    return (
        <>
            <h2>Image Upscaler</h2>

            <div className="navbar">

                <h3>Upscaler</h3>
                <a href="#how-it-works"><h3>How It Works</h3></a>
                <a href="#authors"><h3>Authors</h3></a>

                {/* <button className="toggle-button" onClick={toggleMode}>Toggle Mode</button> */}
                <ToggleButton />

            </div>
        </>
    )
}

export default Header
