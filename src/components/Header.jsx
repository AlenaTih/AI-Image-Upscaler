import React, { useState} from "react"
import ToggleButton from "./ToggleButton.jsx"
import Logo from "../assets/logo.png"

function Header() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const checkScreenSize = () => {
        if (window.innerWidth < 600) {
            document.querySelector(".header-navbar-links").style.display = "none"
            document.querySelector(".header-mobile-menu").style.display = "flex"
            
        } else {
            document.querySelector(".header-mobile-menu").style.display = "none"
            document.querySelector(".header-navbar-links").style.display = "flex"
        }
    }

    window.addEventListener("load", checkScreenSize())
    window.addEventListener("resize", checkScreenSize())

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
      }

    return (
        <>
            <div className="logo-container">
                <img className="logo-image" src={Logo}></img>
                <h2 className="logo-text">Image Upscaler</h2>
            </div>

            <div className="navbar">

                
                    <div className="header-mobile-menu" onClick={toggleDropdown}>
                        <i className="fa-solid fa-bars burger-icon"></i>
                    
                        {isDropdownOpen && (
                            <div className="mobile-menu-opened">
                                <a href="#main">Upscaler</a>
                                <a href="#how-it-works">How It Works</a>
                                <a href="#authors">Authors</a>
                            </div>

                        )}
                    </div>
                
                <div className="header-navbar-links">
                    <a href="#main">Upscaler</a>
                    <a href="#how-it-works">How It Works</a>
                    <a href="#authors">Authors</a>
                </div>

                <ToggleButton />

            </div>
        </>
    )
}

export default Header
