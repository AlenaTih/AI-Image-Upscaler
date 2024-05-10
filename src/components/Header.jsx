import React from "react"
import ToggleButton from "./ToggleButton.jsx"
import Logo from "../assets/logo.png"

function Header() {

    return (
        <>
            <div className="logo-container">
                <img className="logo-image" src={Logo}></img>
                <h2 className="logo-text">Image Upscaler</h2>
            </div>

            <div className="navbar">

                <div className="header-navbar-links">
                    <h3>Upscaler</h3>
                    <a href="#how-it-works"><h3>How It Works</h3></a>
                    <a href="#authors"><h3>Authors</h3></a>
                </div>

                {/* <button className="toggle-button" onClick={toggleMode}>Toggle Mode</button> */}
                <ToggleButton />

            </div>
        </>
    )
}

export default Header
