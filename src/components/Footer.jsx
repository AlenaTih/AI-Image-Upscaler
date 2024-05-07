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

            <div className="navbar">

                <h3>Share</h3>
                <h3>Facebook</h3>
                <h3>Twitter (X)</h3>
                <h3>LinkedIn</h3>

            </div>
        </>
    )
}

export default Footer
