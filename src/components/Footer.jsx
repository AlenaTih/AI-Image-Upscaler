import React from "react"

function Footer() {
    const getDynamicYear = () => {
        const date = new Date()
        const year = date.getFullYear()
        return year
    }

    return (
        <>
            <h2 className="footer-title">{getDynamicYear()} &copy; Image Upscaler</h2>

            <div className="footer-navbar">

                <h3 className="footer-share">Share</h3>
                <h3 className="footer-social">Facebook</h3>
                <h3 className="footer-social">Twitter (X)</h3>
                <h3 className="footer-social">LinkedIn</h3>

            </div>
        </>
    )
}

export default Footer
