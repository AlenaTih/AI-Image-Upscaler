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
                    <a href="#how-it-works">How It Works</a>
                    <a href="#authors">Authors</a>
                </div>

                <ToggleButton />

            </div>
        </>
    )
}

export default Header
