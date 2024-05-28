import React, { useState, useEffect } from "react"
import ToggleButton from "./ToggleButton.jsx"
import Logo from "../assets/logo.png"

function Header() {
    
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600)

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 600)
  }

  useEffect(() => {
    // Set up an event listener
    window.addEventListener("resize", checkScreenSize)

    // Check screen size on initial load
    checkScreenSize()

    // Clean up an event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <>
      <div className="logo-container">
        <img className="logo-image" src={Logo} alt="Logo" />
        <h2 className="logo-text">Image Upscaler</h2>
      </div>

      <div className="navbar">
        {isMobile ? (
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
        ) : (
          <div className="header-navbar-links">
            <a href="#main">Upscaler</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#authors">Authors</a>
          </div>
        )}

        <ToggleButton />
      </div>
    </>
  )
}

export default Header


