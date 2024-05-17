import React from "react"

function Footer() {
    const getDynamicYear = () => {
        const date = new Date()
        const year = date.getFullYear()
        return year
    }

    return (
        <>
            <div className="footer-title-container">
                <h2 className="footer-title">{getDynamicYear()} &copy; Image Upscaler</h2>
            </div>

            <div className="footer-navbar">

                <h3 className="footer-share">Share</h3>
                <a className="footer-social" href="#">Facebook</a>
                <a className="footer-social" href="#">Twitter (X)</a>
                <a className="footer-social" href="#">LinkedIn</a>

            </div>
        </>
    )
}

export default Footer
