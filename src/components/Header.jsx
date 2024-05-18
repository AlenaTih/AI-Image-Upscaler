import React from "react"
import ToggleButton from "./ToggleButton.jsx"
import Logo from "../assets/logo.png"

function Header() {

    const checkScreenSize = () => {
        if (window.innerWidth < 600) {
            document.querySelector(".header-navbar-links").style.display = "none"
            document.querySelector(".header-mobile-menu").style.display = "block"
            
        } else {
            document.querySelector(".header-mobile-menu").style.display = "none"
            document.querySelector(".header-navbar-links").style.display = "flex"
        }
    }

    window.addEventListener("load", checkScreenSize)
    window.addEventListener("resize", checkScreenSize)

    

    return (
        <>
            <div className="logo-container">
                <img className="logo-image" src={Logo}></img>
                <h2 className="logo-text">Image Upscaler</h2>
            </div>

            <div className="navbar">

                <div className="header-mobile-menu">Burger menu</div>
                
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
